'use client';

import React, { useState } from 'react';
import { 
  Link2, 
  ChevronDown, 
  ChevronRight, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  MessageSquare, 
  Target,
  BarChart3,
  Percent
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [referenceDate, setReferenceDate] = useState('2024/01/26');
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f5f1] p-6 max-w-[1400px] mx-auto text-gray-800 font-sans">
      {/* Top Header */}
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Painel Único de Decisão Comercial
            </h1>
            <Link2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="bg-white border border-gray-200 rounded px-3 py-1.5 shadow-sm text-gray-700 font-mono text-xs">
              2023/01/01 – 2024/01/26
            </div>
            <div className="relative">
              <select className="bg-white border border-gray-200 rounded px-3 py-1.5 pr-8 shadow-sm text-gray-700 appearance-none text-xs cursor-pointer focus:outline-none">
                <option>Todos os canais</option>
                <option>Site Próprio</option>
                <option>Marketplace</option>
                <option>B2B / Atacado</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
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
          <span>Priorização & Impacto</span>
        </p>
      </header>

      {/* KPI Cards Grid (Global) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[130px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              RECEITA LÍQUIDA
            </span>
            <div className="text-xl font-bold text-gray-900">R$ 18.872.128</div>
            <div className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12,4% vs. ano anterior
            </div>
          </div>
          <div className="h-8 w-full mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M 0,22 L 15,22 L 25,18 L 40,22 L 55,22 L 75,22 L 85,15 L 100,10" fill="none" stroke="#16a34a" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[130px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              MARGEM DE CONTRIBUIÇÃO (REAL)
            </span>
            <div className="text-xl font-bold text-gray-900">40,8%</div>
            <div className="text-xs text-rose-500 font-medium mt-0.5 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> -13,6 p.p. vs 54,4% contábil
            </div>
          </div>
          <div className="h-8 w-full mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M 0,10 Q 15,5 30,18 T 60,22 T 80,25 L 100,28" fill="none" stroke="#dc2626" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[130px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              MARGEM NÃO REALIZADA
            </span>
            <div className="text-xl font-bold text-gray-900">R$ 2.562.440</div>
            <div className="text-xs text-rose-500 font-medium mt-0.5">
              devolução + cancel. + pendente
            </div>
          </div>
          <div className="h-8 w-full mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M 0,25 L 15,20 L 30,28 L 45,22 L 60,25 L 75,15 L 90,17 L 100,25" fill="none" stroke="#dc2626" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[130px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              DESCONTO CONCEDIDO
            </span>
            <div className="text-xl font-bold text-gray-900">R$ 1.635.489</div>
            <div className="text-xs text-amber-600 font-medium mt-0.5">
              35,5% dos pedidos acima do teto
            </div>
          </div>
          <div className="h-8 w-full mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M 0,22 L 20,22 L 35,15 L 50,22 L 65,22 L 80,12 L 100,22" fill="none" stroke="#d97706" strokeWidth="2" />
            </svg>
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
            <p><strong>2. Canais / Comercial:</strong> Performance comparativa de canais e governança de dados (ex: alertas de CAC/ROAS).</p>
            <p><strong>3. Clientes:</strong> Matriz RFM, evolução do LTV/CAC e taxa de recompra por canal.</p>
            <p><strong>4. Operações:</strong> Ruptura de estoque em SKUs críticos e análise de devoluções por motivo/categoria.</p>
            <p><strong>5. Atendimento:</strong> Pareto de chamados, custos e migração do volume para automação (ChatBot).</p>
            <p><strong>6. Priorização & Impacto:</strong> Rastreador executivo do roadmap 30-60-90 com score e impacto financeiro.</p>
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
          { id: 'priorizacao', label: '6. Priorização & Impacto' },
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
            {/* Headline Banner */}
            <div className="bg-[#1e293b] text-white p-5 rounded-lg shadow-sm border border-gray-700">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 block mb-1">
                Headline Executiva
              </span>
              <h2 className="text-xl font-medium tracking-tight">
                "Metade da queda de margem vem do crescimento acelerado do marketplace com desconto descontrolado."
              </h2>
              <p className="text-xs text-gray-300 mt-2">
                Apesar do crescimento de receita (+12,4%), a margem de contribuição real caiu de 54,4% (contábil) para 40,8% (líquida de devoluções, cancelamentos e taxas).
              </p>
            </div>

            {/* Quick Wins Status */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-900" />
                Semáforo de Quick Wins
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gray-700">1. Redefinir Métrica de Margem</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Concluído
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Mudar de margem contábil para margem real líquida de devoluções em todos os relatórios.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-3 block">Impacto: R$ 2,5M recuperados em visibilidade</span>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gray-700">2. Teto de Desconto Operacional</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Em Andamento
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Bloquear alçadas de cupom superior a 15% sem aprovação prévia do Gerente Comercial.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-3 block">Impacto: R$ 820 mil/ano</span>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gray-700">3. Migração Atendimento ChatBot</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Em Andamento
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Migrar tickets de nível 1 (status pedido / troca) para automação via WhatsApp.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-3 block">Impacto: R$ 340 mil/ano</span>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gray-700">4. Reposição de SKUs Críticos</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Planejado
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Priorizar ordens de compra para os 417 SKUs com ruptura recorrente e alta margem.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-3 block">Impacto: R$ 1,1M/ano</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 1. MARGEM */}
        {activeTab === 'margem' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Margem de Contribuição por Canal (Líquida vs. Declarada)</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Site Próprio</span>
                    <span className="text-emerald-700 font-bold">24,2% (Líquida) vs. 32,0% (Declarada)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-600 h-full" style={{ width: '24.2%' }}></div>
                    <div className="bg-emerald-200 h-full" style={{ width: '7.8%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>B2B / Atacado</span>
                    <span className="text-blue-700 font-bold">18,5% (Líquida) vs. 21,0% (Declarada)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden flex">
                    <div className="bg-blue-600 h-full" style={{ width: '18.5%' }}></div>
                    <div className="bg-blue-200 h-full" style={{ width: '2.5%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Marketplace</span>
                    <span className="text-rose-700 font-bold">8,1% (Líquida) vs. 22,4% (Declarada)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden flex">
                    <div className="bg-rose-600 h-full" style={{ width: '8.1%' }}></div>
                    <div className="bg-rose-200 h-full" style={{ width: '14.3%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Categoria em Destaque: Moda</h3>
                <p className="text-xs text-gray-600 mb-4">
                  Devolução 3x maior do que a média geral dos produtos. Impacta drasticamente a margem do canal online.
                </p>
                <div className="text-2xl font-bold text-rose-600 mb-1">18,4%</div>
                <div className="text-xs text-gray-500">Taxa de devolução na categoria Moda (média geral: 5,8%)</div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Pedidos Acima do Teto de Desconto</h3>
                <p className="text-xs text-gray-600 mb-4">
                  Pedidos com cupom ou desconto direto superior a 15% reduzem a margem unitária a níveis insustentáveis.
                </p>
                <div className="text-2xl font-bold text-amber-600 mb-1">35,5%</div>
                <div className="text-xs text-gray-500">do total de pedidos aplicaram descontos excessivos no último ano</div>
              </div>
            </div>
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
                    <th className="p-3 text-right">Participação Receita</th>
                    <th className="p-3 text-right">Margem Líquida</th>
                    <th className="p-3 text-right">Crescimento YoY</th>
                    <th className="p-3 text-center">Status Comercial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  <tr>
                    <td className="p-3 font-medium">Site Próprio</td>
                    <td className="p-3 text-right">42,5%</td>
                    <td className="p-3 text-right text-emerald-600 font-bold">24,2%</td>
                    <td className="p-3 text-right">+8,1%</td>
                    <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">Foco em Retenção</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Marketplace</td>
                    <td className="p-3 text-right">38,1%</td>
                    <td className="p-3 text-right text-rose-600 font-bold">8,1%</td>
                    <td className="p-3 text-right text-emerald-600">+28,4%</td>
                    <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-medium">Revisão de Margem</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">B2B / Atacado</td>
                    <td className="p-3 text-right">19,4%</td>
                    <td className="p-3 text-right text-blue-600 font-bold">18,5%</td>
                    <td className="p-3 text-right">+3,2%</td>
                    <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">Estável</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. CLIENTES */}
        {activeTab === 'clientes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quadrante RFM */}
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Matriz Quadrante RFM</h3>
                <div className="grid grid-cols-2 gap-3 h-64">
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded flex flex-col justify-between">
                    <span className="text-xs font-bold text-emerald-900">Base Rentável</span>
                    <span className="text-lg font-bold text-emerald-700">22% dos clientes</span>
                    <span className="text-[10px] text-emerald-800">Alta recência & Alta frequência</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded flex flex-col justify-between">
                    <span className="text-xs font-bold text-blue-900">Ocasionais de Alto Valor</span>
                    <span className="text-lg font-bold text-blue-700">15% dos clientes</span>
                    <span className="text-[10px] text-blue-800">Baixa recência & Alto ticket</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded flex flex-col justify-between">
                    <span className="text-xs font-bold text-amber-900">Alto Volume / Baixa Margem</span>
                    <span className="text-lg font-bold text-amber-700">38% dos clientes</span>
                    <span className="text-[10px] text-amber-800">Compram só com cupom</span>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 p-3 rounded flex flex-col justify-between">
                    <span className="text-xs font-bold text-rose-900">Custo de Servir Elevado</span>
                    <span className="text-lg font-bold text-rose-700">25% dos clientes</span>
                    <span className="text-[10px] text-rose-800">Altas trocas & suporte</span>
                  </div>
                </div>
              </div>

              {/* LTV/CAC e Recompra */}
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Evolução da Relação LTV / CAC</h3>
                  <p className="text-xs text-gray-500 mb-4">Queda gradual nos últimos 12 meses devido ao custo de aquisição</p>
                  
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-gray-900">2,4x</span>
                    <span className="text-xs text-rose-600 font-semibold">Anterior: 3,1x</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    O LTV/CAC caiu 0,7x em relação ao ano passado, indicando necessidade urgente de focar em retenção e recompra.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="text-xs font-bold text-gray-800 mb-2">Taxa de Recompra em 12 Meses por Canal</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Site Próprio</span>
                      <span className="font-bold">34,2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketplace</span>
                      <span className="font-bold text-gray-500">11,8%</span>
                    </div>
                  </div>
                </div>
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
                <div className="text-3xl font-bold text-rose-600 mb-1">417 SKUs</div>
                <p className="text-xs text-gray-600">
                  Estimativa de <strong className="text-gray-900">R$ 1,1M em receita perdida/ano</strong> por falha de reposição.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-gray-900">Cobertura de Estoque (Dias)</h3>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">Snapshot Snapshot</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Nota: Trata-se de uma fotografia direcional da base `estoque.csv` e não uma série temporal.
                </p>
                <div className="text-3xl font-bold text-gray-900 mb-1">48 dias</div>
                <p className="text-xs text-gray-600">Média ponderada do estoque atual na central de distribuição.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Motivos de Devolução por Categoria</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">Moda & Calçados</span>
                    <span className="text-gray-500">Tamanho/Caimento incorreto (72%) vs. Arrependimento (28%)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-indigo-600 h-full" style={{ width: '72%' }}></div>
                    <div className="bg-gray-400 h-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">Eletrônicos & Acessórios</span>
                    <span className="text-gray-500">Defeito/Avaria (61%) vs. Arrependimento (39%)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-rose-600 h-full" style={{ width: '61%' }}></div>
                    <div className="bg-gray-400 h-full" style={{ width: '39%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. ATENDIMENTO */}
        {activeTab === 'atendimento' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Volume Mensal de Tickets</span>
                <div className="text-2xl font-bold text-gray-900 mt-1">8.420</div>
                <span className="text-xs text-gray-500">Atendimentos iniciados</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Migrado para ChatBot</span>
                <div className="text-2xl font-bold text-emerald-600 mt-1">38%</div>
                <span className="text-xs text-emerald-700">Meta: atingir 65%</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Economia Estimada</span>
                <div className="text-2xl font-bold text-indigo-900 mt-1">R$ 340 mil/ano</div>
                <span className="text-xs text-gray-500">Com automação de nível 1</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Pareto dos Motivos de Chamados no SAC</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>1. Status da entrega e rastreio do pedido</span>
                  <span className="font-bold text-gray-800">42% dos chamados</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>2. Solicitação de troca ou devolução (tamanho)</span>
                  <span className="font-bold text-gray-800">28% dos chamados</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>3. Dúvidas de pagamento e 2ª via de nota</span>
                  <span className="font-bold text-gray-800">16% dos chamados</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>4. Outros (reclamações, elogios, suporte técnico)</span>
                  <span className="font-bold text-gray-800">14% dos chamados</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. PRIORIZAÇÃO & IMPACTO */}
        {activeTab === 'priorizacao' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Rastreador Executivo do Roadmap 30-60-90</h3>
                  <p className="text-xs text-gray-500">Acompanhamento consolidado de iniciativas do diagnóstico à ação</p>
                </div>
                <span className="text-xs font-mono bg-indigo-100 text-indigo-900 font-bold px-2.5 py-1 rounded">
                  Impacto Total: R$ 4,76M/ano
                </span>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Iniciativa / Ação</th>
                    <th className="p-3">Prazo</th>
                    <th className="p-3 text-right">Impacto Financ. (R$/ano)</th>
                    <th className="p-3 text-center">Score Prioridade</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  <tr>
                    <td className="p-3 font-medium">Redefinição da métrica de margem nos relatórios</td>
                    <td className="p-3">30 Dias</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-700">R$ 2.500.000</td>
                    <td className="p-3 text-center font-bold">9,8 / 10</td>
                    <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">Concluído</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Teto de desconto e controle de alçada de cupom</td>
                    <td className="p-3">30 Dias</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-700">R$ 820.000</td>
                    <td className="p-3 text-center font-bold">9,2 / 10</td>
                    <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">Em Execução</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Reposição emergencial de estoque dos 417 SKUs críticos</td>
                    <td className="p-3">60 Dias</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-700">R$ 1.100.000</td>
                    <td className="p-3 text-center font-bold">8,7 / 10</td>
                    <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">Planejado</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Automação do Atendimento via ChatBot (Nível 1)</td>
                    <td className="p-3">90 Dias</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-700">R$ 340.000</td>
                    <td className="p-3 text-center font-bold">8,1 / 10</td>
                    <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">Em Execução</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
