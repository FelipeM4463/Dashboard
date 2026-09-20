'use client';

import React, { useState } from 'react';
import { Link2, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('recuperacao');
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
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 space-x-1">
          <span>Recuperação de receita pós-venda</span>
          <span>·</span>
          <span>Prevenção de devolução na origem</span>
          <span>·</span>
          <span>Priorizador de margem e receita</span>
          <span>·</span>
          <span>Memo executivo</span>
          <span>·</span>
          <span>Vértice Retail</span>
        </p>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[130px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              MARGEM REALIZADA
            </span>
            <div className="text-xl font-bold text-gray-900">40,8%</div>
            <div className="text-xs text-gray-500 mt-0.5">vs. 54,4% contábil</div>
          </div>
          {/* Sparkline Blue */}
          <div className="h-8 w-full mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path
                d="M 0,25 Q 15,5 30,22 T 60,10 T 80,20 L 100,22"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Card 2 */}
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
          {/* Sparkline Red */}
          <div className="h-8 w-full mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path
                d="M 0,25 L 15,20 L 30,28 L 45,22 L 60,25 L 75,15 L 90,17 L 100,25"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[130px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              DESCONTO CONCEDIDO
            </span>
            <div className="text-xl font-bold text-gray-900">R$ 1.635.489</div>
            <div className="text-xs text-amber-600 font-medium mt-0.5">
              35,5% dos pedidos
            </div>
          </div>
          {/* Sparkline Yellow */}
          <div className="h-8 w-full mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path
                d="M 0,22 L 20,22 L 35,15 L 50,22 L 65,22 L 80,12 L 100,22"
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[130px]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-1">
              RECEITA LÍQUIDA
            </span>
            <div className="text-xl font-bold text-gray-900">R$ 18.872.128</div>
            <div className="text-xs text-emerald-600 font-medium mt-0.5">
              27.730 pedidos
            </div>
          </div>
          {/* Sparkline Green */}
          <div className="h-8 w-full mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path
                d="M 0,22 L 15,22 L 25,18 L 40,22 L 55,22 L 75,22 L 85,15 L 100,22"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
              />
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
          <span>Guia do painel — o que cada aba faz</span>
        </button>
        {guideOpen && (
          <div className="mt-3 pl-6 text-gray-600 space-y-1">
            <p><strong>Recuperação de Receita Pós-Venda:</strong> Fila priorizada para pedidos pendentes ou cancelados.</p>
            <p><strong>Prevenção de Devolução na Origem:</strong> Análise preventiva de riscos de devolução.</p>
            <p><strong>Priorizador de Margem e Receita:</strong> Otimização de margens em vendas ativas.</p>
            <p><strong>Memo Executivo:</strong> Resumo executivo consolidado para liderança.</p>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-300 mb-6 flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('recuperacao')}
          className={`py-2.5 px-4 text-xs font-semibold uppercase tracking-wider rounded-t transition-colors ${
            activeTab === 'recuperacao'
              ? 'bg-[#e2e7f0] text-gray-800 border-b-2 border-indigo-900'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
          }`}
        >
          RECUPERAÇÃO DE RECEITA PÓS-VENDA
        </button>
        <button
          onClick={() => setActiveTab('prevencao')}
          className={`py-2.5 px-4 text-xs font-semibold uppercase tracking-wider rounded-t transition-colors ${
            activeTab === 'prevencao'
              ? 'bg-[#e2e7f0] text-gray-800 border-b-2 border-indigo-900'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
          }`}
        >
          PREVENÇÃO DE DEVOLUÇÃO NA ORIGEM
        </button>
        <button
          onClick={() => setActiveTab('priorizador')}
          className={`py-2.5 px-4 text-xs font-semibold uppercase tracking-wider rounded-t transition-colors ${
            activeTab === 'priorizador'
              ? 'bg-[#e2e7f0] text-gray-800 border-b-2 border-indigo-900'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
          }`}
        >
          PRIORIZADOR DE MARGEM E RECEITA
        </button>
        <button
          onClick={() => setActiveTab('memo')}
          className={`py-2.5 px-4 text-xs font-semibold uppercase tracking-wider rounded-t transition-colors ${
            activeTab === 'memo'
              ? 'bg-[#e2e7f0] text-gray-800 border-b-2 border-indigo-900'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
          }`}
        >
          MEMO EXECUTIVO
        </button>
      </div>

      {/* Tab Content Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 bg-gray-900"></span>
            Fila priorizada: pedidos com pagamento pendente ou cancelado
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Arquitetura Planejamento + Reflexão sobre scoring determinístico (v4/09 e v4/10) · LLM local via Ollama/Gemma, sem tool use
          </p>
        </div>

        {/* Input & Info Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <label className="text-xs text-gray-700 flex items-center gap-1 mb-1.5">
              <span>Data de referência da rodada (simula 'hoje')</span>
              <HelpCircle className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
            </label>
            <input
              type="text"
              value={referenceDate}
              onChange={(e) => setReferenceDate(e.target.value)}
              className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm font-mono text-gray-800 w-48 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="text-xs text-gray-500 self-end md:self-auto">
            Modelo: <span className="font-semibold text-gray-700">gemma3:4b</span> via Ollama (http://localhost:11434) · janela 90 dias · top 15 pedidos/rodada
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button className="bg-[#f0f0ed] hover:bg-[#e4e4e0] text-gray-800 border border-gray-300 rounded px-4 py-2 text-xs font-medium shadow-sm transition-colors">
            Gerar fila da rodada
          </button>
        </div>

        {/* Bottom Banner Message */}
        <div className="bg-[#e4ecf7] text-[#1e3a8a] border border-[#d0dbe9] rounded-md p-4 text-xs font-normal shadow-sm">
          Escolha a data de referência e clique em 'Gerar fila da rodada'.
        </div>
      </div>
    </div>
  );
}
