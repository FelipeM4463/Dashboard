import React from 'react';

interface CanalMargem {
  canal: string;
  margemLiquida: number;
  margemDeclarada: number;
  corPrincipal: string;
  corSuave: string;
  corTexto: string;
}

const dadosCanais: CanalMargem[] = [
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

export default function GraficoMargemCanais() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-4xl font-sans">
      <h3 className="text-sm font-bold text-gray-900 mb-6">
        Margem de Contribuição por Canal (Líquida vs. Declarada)
      </h3>

      <div className="space-y-5">
        {dadosCanais.map((item) => {
          const deltaMargem = Math.max(0, item.margemDeclarada - item.margemLiquida);

          return (
            <div key={item.canal} className="space-y-1.5">
              {/* Rótulo Superior */}
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-800">{item.canal}</span>
                <span className={`font-bold ${item.corTexto}`}>
                  {item.margemLiquida.toFixed(1).replace('.', ',')}% (Líquida) vs.{' '}
                  {item.margemDeclarada.toFixed(1).replace('.', ',')}% (Declarada)
                </span>
              </div>

              {/* Barra Progressiva Composta */}
              <div className="w-full bg-gray-100 h-3.5 rounded-full overflow-hidden flex">
                {/* Barra Escura: Margem Líquida */}
                <div
                  className={`h-full ${item.corPrincipal} transition-all duration-500`}
                  style={{ width: `${item.margemLiquida}%` }}
                />
                {/* Barra Clara: Excedente/Gap até a Margem Declarada */}
                <div
                  className={`h-full ${item.corSuave} transition-all duration-500`}
                  style={{ width: `${deltaMargem}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}