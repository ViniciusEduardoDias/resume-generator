import "../styles/globals.css";
import type { Metadata } from "next";
import { Header, Footer, Container } from "@/components";

export const metadata: Metadata = {
  title: "Gerador de Currículo",
  description: "Crie seu currículo interativamente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-100">
        <Header />
        <Container>{children}</Container>
        <Footer />
      </body>
    </html>
  );
}
