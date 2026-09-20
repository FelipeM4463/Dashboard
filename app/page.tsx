'use client';

import React, { useEffect, useState } from 'react';
import { 
  Link2, 
  ChevronDown, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Target
} from 'lucide-react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

import GraficoMargemCanais from '../components/GraficoMargemCanais';

interface MonthlyData {
  mes: string;
  receita: number;
  margemPct: number;
  novosClientes: number;
  sac: number;
}

const canais = [
  {
    canal: 'Email Marketing',
    margemLiquida: 51.4,
    margemDeclarada: 59.6,
    corPrincipal: 'bg-indigo-600',
    corSuave: 'bg-indigo-200',
    corTexto: 'text-indigo-700',
  },
  {
    canal: 'Google Ads',
    margemLiquida: 50.3,
    margemDeclarada: 59.7,
    corPrincipal: 'bg-blue-600',
    corSuave: 'bg-blue-200',
    corTexto: 'text-blue-700',
  },
  {
    canal: 'Influenciador',
    margemLiquida: 50.6,
    margemDeclarada: 59.6,
    corPrincipal: 'bg-purple-600',
    corSuave: 'bg-purple-200',
    corTexto: 'text-purple-700',
  },
  {
    canal: 'Instagram Ads',
    margemLiquida: 50.6,
    margemDeclarada: 59.6,
    corPrincipal: 'bg-pink-600',
    corSuave: 'bg-pink-200',
    corTexto: 'text-pink-700',
  },
  {
    canal: 'Marketplace',
    margemLiquida: 47.5,
    margemDeclarada: 59.7,
    corPrincipal: 'bg-rose-600',
    corSuave: 'bg-rose-200',
    corTexto: 'text-rose-700',
  },
  {
    canal: 'Orgânico',
    margemLiquida: 51.0,
    margemDeclarada: 59.7,
    corPrincipal: 'bg-emerald-600',
    corSuave: 'bg-emerald-200',
    corTexto: 'text-emerald-700',
  },
  {
    canal: 'TikTok Ads',
    margemLiquida: 50.9,
    margemDeclarada: 59.9,
    corPrincipal: 'bg-cyan-600',
    corSuave: 'bg-cyan-200',
    corTexto: 'text-cyan-700',
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [guideOpen, setGuideOpen] = useState(false);
  
  // Estados para dados dinâmicos vindos do FastAPI
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);

    // 1. Defina a interface
    interface OperacoesData {
      skusRuptura: number;
      coberturaDias: number;
      receitaPerdidaEstimada: number;
    }
  
    // 2. Adicione o estado dentro do componente Dashboard
    const [operacoes, setOperacoes] = useState<OperacoesData>({
      skusRuptura: 0,
      coberturaDias: 0,
      receitaPerdidaEstimada: 0
    });

    interface IniciativaData {
      iniciativa: string;
      prazo: string;
      impacto: number;
      score: string;
      status: string;
    }
    
    interface PriorizacaoData {
      impactoTotal: number;
      iniciativas: IniciativaData[];
    }
    
    // Dentro do componente Dashboard:
    const [priorizacao, setPriorizacao] = useState<PriorizacaoData>({
      impactoTotal: 0,
      iniciativas: []
    });

    useEffect(() => {
      async function fetchData() {
        const results = await Promise.allSettled([
          fetch('http://localhost:8000/api/dashboard-mensal').then(res => res.json()),
          fetch('http://localhost:8000/api/margem-canais').then(res => res.json()),
          fetch('http://localhost:8000/api/operacoes').then(res => res.json()),
          fetch('http://localhost:8000/api/priorizacao').then(res => res.json())
        ]);
    
        if (results[0].status === 'fulfilled') setMonthlyData(results[0].value);
        if (results[2].status === 'fulfilled') setOperacoes(results[2].value);
        if (results[3].status === 'fulfilled') setPriorizacao(results[3].value);
    
        setLoading(false);
      }
    
      fetchData();
    }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f5f1] flex items-center justify-center font-sans text-sm text-gray-600">
        Carregando dados em tempo real da API FastAPI...
      </div>
    );
  }

  // Totais calculados dinamicamente
  const totalReceita = monthlyData.reduce((acc, curr) => acc + curr.receita, 0);
  const totalNovosClientes = monthlyData.reduce((acc, curr) => acc + curr.novosClientes, 0);
  const totalSac = monthlyData.reduce((acc, curr) => acc + curr.sac, 0);
  // Obtém o último registo com receita/margem válida ou cai no padrão 0
  const ultimoMesValido = [...monthlyData].reverse().find(item => item.margemPct !== 0 && item.receita > 0);
  const ultimaMargem = ultimoMesValido ? ultimoMesValido.margemPct : (monthlyData[monthlyData.length - 1]?.margemPct || 0);

  return (
    <div className="min-h-screen bg-[#f6f5f1] p-6 max-w-[1400px] mx-auto text-gray-800 font-sans">
      {/* Top Header */}
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Dashboard de Gestão
            </h1>
            <Link2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="bg-white border border-gray-200 rounded px-3 py-1.5 shadow-sm text-gray-700 font-mono text-xs">
              {monthlyData[0]?.mes || '2023-01'} – {monthlyData[monthlyData.length - 1]?.mes || '2024-01'}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 space-x-1">
          <span>Visão Geral</span>
          <span>·</span>
          <span>Margem</span>
          <span>·</span>
          <span>Canais / Comercial</span>
          <span>·</span>
          <span>Clientes</span>
          <span>·</span>
          <span>Operações</span>
          <span>·</span>
          <span>Atendimento</span>
          <span>·</span>
        </p>
      </header>

      {/* KPI Cards Grid (Global) com Sparklines Interativos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Card 1: Receita Líquida */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[135px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              RECEITA LÍQUIDA TOTAL
            </span>
            <div className="text-xl font-bold text-gray-900">
              R$ {totalReceita.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Atualizado via API
            </div>
          </div>
          <div className="h-9 w-full mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '11px' }}
                  formatter={(value: any) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Receita']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Line type="monotone" dataKey="receita" stroke="#16a34a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Margem de Contribuição */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[135px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              MARGEM DE CONTRIBUIÇÃO (ATUAL)
            </span>
            <div className="text-xl font-bold text-gray-900">{ultimaMargem}%</div>
            <div className="text-xs text-rose-500 font-medium mt-0.5 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> Mês recente
            </div>
          </div>
          <div className="h-9 w-full mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '11px' }}
                  formatter={(value: any) => [`${value}%`, 'Margem']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Line type="monotone" dataKey="margemPct" stroke="#dc2626" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Total Clientes */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[135px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              TOTAL CLIENTES (NOVOS)
            </span>
            <div className="text-xl font-bold text-gray-900">{totalNovosClientes.toLocaleString('pt-BR')}</div>
            <div className="text-xs text-indigo-600 font-medium mt-0.5">
              Cadastrados no período
            </div>
          </div>
          <div className="h-9 w-full mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '11px' }}
                  formatter={(value: any) => [value, 'Novos Clientes']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Line type="monotone" dataKey="novosClientes" stroke="#4f46e5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 4: Chamados SAC */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[135px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              CHAMADOS SAC / DEVOLUÇÕES
            </span>
            <div className="text-xl font-bold text-gray-900">{totalSac.toLocaleString('pt-BR')}</div>
            <div className="text-xs text-amber-600 font-medium mt-0.5">
              Tickets registrados
            </div>
          </div>
          <div className="h-9 w-full mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '11px' }}
                  formatter={(value: any) => [value, 'Devoluções/Chamados']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Line type="monotone" dataKey="sac" stroke="#d97706" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Accordion / Guia do painel */}
      <div className="mb-6 bg-[#f0eee9] border border-gray-200 rounded-lg p-3 text-xs text-gray-700 shadow-sm">
        <button
          onClick={() => setGuideOpen(!guideOpen)}
          className="flex items-center gap-2 font-medium hover:text-gray-900 w-full text-left"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${guideOpen ? 'rotate-90' : ''}`} />
          <span>Guia do painel — navegação e objetivos de cada aba</span>
        </button>
        {guideOpen && (
          <div className="mt-3 pl-6 text-gray-600 space-y-1.5 border-t border-gray-200 pt-2">
            <p><strong>0. Visão Geral:</strong> Capa executiva com síntese de desempenho e status das 4 Quick Wins.</p>
            <p><strong>1. Margem:</strong> Detalhamento de margem real vs. declarada por canal, categoria e impacto do desconto.</p>
            <p><strong>2. Canais / Comercial:</strong> Performance comparativa de canais e governança de dados.</p>
            <p><strong>3. Clientes:</strong> Matriz RFM, evolução do LTV/CAC e taxa de recompra por canal.</p>
            <p><strong>4. Operações:</strong> Ruptura de estoque em SKUs críticos e análise de devoluções por motivo/categoria.</p>
            <p><strong>5. Atendimento:</strong> Pareto de chamados, custos e migração do volume para automação (ChatBot).</p>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-300 mb-6 flex flex-wrap gap-1">
        {[
          { id: 'visao-geral', label: '0. Visão Geral' },
          { id: 'margem', label: '1. Margem' },
          { id: 'canais', label: '2. Canais / Comercial' },
          { id: 'clientes', label: '3. Clientes' },
          { id: 'operacoes', label: '4. Operações' },
          { id: 'atendimento', label: '5. Atendimento' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2.5 px-3.5 text-xs font-semibold uppercase tracking-wider rounded-t transition-colors ${
              activeTab === tab.id
                ? 'bg-[#e2e7f0] text-gray-900 border-b-2 border-indigo-900 font-bold'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Section */}
      <div className="space-y-6">

        {/* 0. VISÃO GERAL */}
        {activeTab === 'visao-geral' && (
          <div className="space-y-6">
            <div className="bg-[#1e293b] text-white p-5 rounded-lg shadow-sm border border-gray-700">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 block mb-1">
                Headline Executiva
              </span>
              <h2 className="text-xl font-medium tracking-tight">
                "Metade da queda de margem vem do crescimento acelerado do marketplace com desconto descontrolado."
              </h2>
              <p className="text-xs text-gray-300 mt-2">
                Apesar do crescimento de receita, a margem de contribuição real é afetada por devoluções, cancelamentos e fretes.
              </p>
            </div>

            {/* Gráfico Interativo de Evolução Mensal da Receita */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Evolução da Receita Líquida Mensal (R$)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`} />
                    <Tooltip 
                      formatter={(val: any) => [`R$ ${Number(val).toLocaleString('pt-BR')}`, 'Receita Líquida']}
                    />
                    <Line type="monotone" dataKey="receita" stroke="#16a34a" strokeWidth={3} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Wins Status */}
            <div>
            

              

              

                
              </div>
            </div>
        )}

        {/* 1. MARGEM */}
        {activeTab === 'margem' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Evolução Mensal da Margem de Contribuição (%)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `${val}%`} />
                    <Tooltip formatter={(val: any) => [`${val}%`, 'Margem Real']} />
                    <Line type="monotone" dataKey="margemPct" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Margens por Canal Carregadas Dinamicamente */}
            <GraficoMargemCanais/>
            
          </div>
        )}

        {/* 2. CANAIS / COMERCIAL */}
        {activeTab === 'canais' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Alerta de Qualidade de Dados (Governança):</strong>
                CAC, ROAS e Métricas de Funil de Marketing foram marcados temporariamente como <span className="underline font-bold">não confiáveis devido a inconsistências de escala</span> na base `marketing.csv`. Exibindo apenas dados consolidados de vendas.
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Canal</th>
                    <th className="p-3 text-right">Margem Líquida (API)</th>
                    <th className="p-3 text-right">Margem Declarada (API)</th>
                    <th className="p-3 text-center">Status Comercial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  {canais.map((canal) => (
                    <tr key={canal.canal}>
                      <td className="p-3 font-medium">{canal.canal}</td>
                      <td className="p-3 text-right font-bold text-emerald-600">{canal.margemLiquida}%</td>
                      <td className="p-3 text-right font-bold text-gray-500">{canal.margemDeclarada}%</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-medium">Ativo</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. CLIENTES */}
        {activeTab === 'clientes' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Evolução da Aquisição de Novos Clientes por Mês</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(val: any) => [val, 'Novos Clientes']} />
                    <Line type="monotone" dataKey="novosClientes" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* 4. OPERAÇÕES */}
        {activeTab === 'operacoes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-1">SKUs Críticos com Ruptura de Estoque</h3>
                <p className="text-xs text-gray-500 mb-4">Produtos de alta margem indisponíveis para venda</p>
                <div className="text-3xl font-bold text-rose-600 mb-1">
                  {operacoes.skusRuptura} SKUs
                </div>
                <p className="text-xs text-gray-600">
                  Estimativa de <strong className="text-gray-900">R$ {(operacoes.receitaPerdidaEstimada / 1000000).toFixed(1)}M em receita perdida/ano</strong> por falha de reposição.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-gray-900">Cobertura de Estoque (Dias)</h3>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">Snapshot</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Fotografia direcional da base `estoque.csv`.
                </p>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {operacoes.coberturaDias} dias
                </div>
                <p className="text-xs text-gray-600">Média ponderada do estoque atual na central de distribuição.</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. ATENDIMENTO */}
        {activeTab === 'atendimento' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Evolução Mensal de Chamados SAC / Devoluções</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(val: any) => [val, 'Devoluções / Tickets']} />
                    <Line type="monotone" dataKey="sac" stroke="#d97706" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}