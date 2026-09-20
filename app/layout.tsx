import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Painel Único de Decisão Comercial',
  description: 'Painel de decisão comercial e recuperação de receita pós-venda',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased bg-[#f6f5f1]">{children}</body>
    </html>
  );
}
