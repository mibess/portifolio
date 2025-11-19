if (typeof window === 'undefined' && typeof localStorage !== 'undefined' && typeof localStorage.getItem !== 'function') {
  // @ts-ignore
  global.localStorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { },
    clear: () => { },
    length: 0,
    key: () => null,
  } as Storage;
}

import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

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
  description: "Full Stack Java Developer - Especialista em arquitetura Java, Cloud AWS e Microsserviços.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jetbrainsMono.variable} ${orbitron.variable} scroll-smooth`}>
      <body className="bg-cyber-black text-slate-200 font-mono antialiased overflow-x-hidden selection:bg-neon-cyan selection:text-black">
        <div className="scanline"></div>
        {children}
      </body>
    </html>
  );
}
