import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Mibess Dev",
  description: "Não é só desenvolvimento, é o meu estilo de vida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
        <body className={`flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 min-h-screen transition-all duration-300`}>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
              <Header />
              <main>
                {children}
              </main>
              <Footer />
          </ThemeProvider>
        </body>
    </html>
  );
}
