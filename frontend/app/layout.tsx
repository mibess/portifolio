import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider/theme-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claudemir Custódio | Java Full Stack | Portfolio v2.0",
  description: "Full Stack Java Developer - Focado em arquitetura Java, Cloud AWS e Microsserviços.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jetbrainsMono.variable} ${orbitron.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-cyber-black text-slate-200 font-mono antialiased overflow-x-hidden selection:bg-neon-cyan selection:text-black">
        <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
          <div className="scanline"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>


  );
}

// <html lang="pt-BR" suppressHydrationWarning>
//     <body className={`flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 min-h-screen transition-all duration-300`}>
//       <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
//           <Header />
//           <main>
//             {children}
//           </main>
//           <Footer />
//       </ThemeProvider>
//     </body>
// </html>