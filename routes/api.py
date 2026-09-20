import os
from pathlib import Path
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Diretório dos ficheiros CSV
DOCS_DIR = Path(os.getenv("DOCS_DIR", Path(__file__).resolve().parent.parent / "docs"))

# --- Parâmetros globais ---
SAC_INCLUI_DEVOLUCOES = False  # True = volta a somar chamados + devoluções no campo "sac"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------------------------------
# Limpeza e Auxiliares
# ----------------------------------------------------------------------------
_TRUE_VALUES = {"true", "1", "sim", "s", "yes", "y", "verdadeiro", "t"}

def _to_bool(series):
    """Converte valores em texto ('Sim'/'Não') em booleano real."""
    if series.dtype == bool:
        return series
    return series.astype(str).str.strip().str.lower().isin(_TRUE_VALUES)

def _to_dates(series):
    """Lê ISO (YYYY-MM-DD) normalmente ou força formato DD/MM/YYYY caso contrário."""
    series = series.astype(str).str.strip()
    if series.str.match(r"^\d{4}-\d{2}-\d{2}").all():
        return pd.to_datetime(series, errors="coerce")
    return pd.to_datetime(series, dayfirst=True, errors="coerce")

def _to_num(df, cols):
    for c in cols:
        if c in df.columns:
            df[c] = pd.to_numeric(df[c], errors="coerce")

def _records(df):
    """Converte DataFrame para lista de dicts limpando NaNs para evitar quebras de JSON."""
    return df.astype(object).where(df.notna(), None).to_dict("records")

# ----------------------------------------------------------------------------
# Carga dos dados com normalização
# ----------------------------------------------------------------------------
def _get_vendas():
    path = DOCS_DIR / "vendas.csv"
    df = pd.read_csv(path)
    df.columns = df.columns.str.strip().str.lower()
    
    if "sku_id" not in df.columns and "sku" in df.columns:
        df = df.rename(columns={"sku": "sku_id"})

    df["data_pedido"] = _to_dates(df["data_pedido"])
    df = df.dropna(subset=["data_pedido"]).copy()
    _to_num(df, ["receita_liquida", "margem_contribuicao", "quantidade"])
    
    df["devolvido"] = _to_bool(df["devolvido"])
    df["aprovado"] = df["status_pagamento"].astype(str).str.strip().str.lower().eq("aprovado")
    df["realizado"] = df["aprovado"] & ~df["devolvido"]
    df["mes"] = df["data_pedido"].dt.strftime("%Y-%m")
    return df

def _get_clientes():
    path = DOCS_DIR / "clientes.csv"
    df = pd.read_csv(path)
    df.columns = df.columns.str.strip().str.lower()
    
    # Fallback para customer_id / id_cliente
    if "customer_id" not in df.columns and "id_cliente" in df.columns:
        df = df.rename(columns={"id_cliente": "customer_id"})

    df["data_cadastro"] = _to_dates(df["data_cadastro"])
    df = df.dropna(subset=["data_cadastro"]).copy()
    df["mes"] = df["data_cadastro"].dt.strftime("%Y-%m")
    return df

def _get_atendimento():
    path = DOCS_DIR / "atendimento.csv"
    df = pd.read_csv(path)
    df.columns = df.columns.str.strip().str.lower()
    
    df["data_abertura"] = _to_dates(df["data_abertura"])
    df = df.dropna(subset=["data_abertura"]).copy()
    df["mes"] = df["data_abertura"].dt.strftime("%Y-%m")
    return df

def _get_estoque():
    path = DOCS_DIR / "estoque.csv"
    df = pd.read_csv(path)
    df.columns = df.columns.str.strip().str.lower()
    
    if "sku_id" not in df.columns and "sku" in df.columns:
        df = df.rename(columns={"sku": "sku_id"})

    _to_num(df, ["estoque_disponivel"])
    df["critico"] = (
        df["status_disponibilidade"]
        .astype(str)
        .str.strip()
        .str.lower()
        .isin(["ruptura", "estoque crítico", "estoque critico"])
    )
    return df

# ----------------------------------------------------------------------------
# Rotas
# ----------------------------------------------------------------------------
@app.get("/api/dashboard-mensal")
def get_dashboard_mensal():
    v = _get_vendas()
    c = _get_clientes()
    s = _get_atendimento()

    # Janela temporária dinâmica (13 meses sem filtro rígido de ano)
    meses = pd.period_range(v["data_pedido"].min(), v["data_pedido"].max(), freq="M").strftime("%Y-%m")
    m = pd.DataFrame(index=pd.Index(meses, name="mes"))

    # Agregações
    m = m.join(v.groupby("mes").agg(
        receita_total=("receita_liquida", "sum"),
        margem_contabil=("margem_contribuicao", "sum"),
        devolucoes=("devolvido", "sum"),
    ))
    m = m.join(v[v["realizado"]].groupby("mes").agg(
        receita_real=("receita_liquida", "sum"),
        margem_real=("margem_contribuicao", "sum"),
    ))
    m = m.join(c.groupby("mes")["customer_id"].nunique().rename("novosClientes"))
    m = m.join(s.groupby("mes").size().rename("chamados"))

    # Meses sem vendas mantêm NaN na receita para não virarem 0 na API
    m["chamados"] = m["chamados"].fillna(0).astype(int)
    m["devolucoes"] = m["devolucoes"].fillna(0).astype(int)
    m["novosClientes"] = m["novosClientes"].fillna(0).astype(int)

    base = m["receita_total"]
    m["receita"] = m["receita_real"].round(2)
    m["receitaTotal"] = m["receita_total"].round(2)
    
    # margemPct = margem dos realizados / receita de TODOS os pedidos (notebook 03 -> 40,8%)
    m["margemPct"] = (m["margem_real"] / base * 100).round(1)
    m["margemContabilPct"] = (m["margem_contabil"] / base * 100).round(1)
    
    m["sac"] = m["chamados"] + (m["devolucoes"] if SAC_INCLUI_DEVOLUCOES else 0)

    cols = ["mes", "receita", "margemPct", "novosClientes", "sac",
            "receitaTotal", "margemContabilPct", "chamados", "devolucoes"]
    
    return _records(m.reset_index()[cols])

@app.get("/api/operacoes")
def get_operacoes():
    v = _get_vendas() # Utiliza todos os pedidos para reproduzir os 417 SKUs
    e = _get_estoque()

    dias = max((v["data_pedido"].max() - v["data_pedido"].min()).days, 1)

    # Identificação da Curva A (acumulado até 80% da receita total)
    sku_rec = v.groupby("sku_id")["receita_liquida"].sum().sort_values(ascending=False)
    cum = sku_rec.cumsum() / sku_rec.sum()
    curva_a = set(cum.index[cum <= 0.80])

    # SKUs críticos na Curva A e em Ruptura
    criticos_a = e[e["sku_id"].isin(curva_a) & e["critico"]]
    receita_dia_risco = sku_rec[sku_rec.index.isin(criticos_a["sku_id"])].sum() / dias

    # Cobertura considerando o estoque_disponivel real
    venda_diaria_total = v["quantidade"].sum() / dias
    cobertura = e["estoque_disponivel"].sum() / venda_diaria_total if venda_diaria_total > 0 else 0

    return {
        "skusRuptura": int(len(criticos_a)),
        "coberturaDias": round(float(cobertura), 1),
        "receitaPerdidaEstimada": round(float(receita_dia_risco * 365), 2) # sem multiplicador estático (2635)
    }