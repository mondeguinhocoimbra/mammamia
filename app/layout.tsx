export const metadata = {
  title: 'Mammamia · Gestão de Compras',
  description: 'Compras, faturas, fichas técnicas e food cost',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
