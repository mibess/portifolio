
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { ThemeSwitcher } from "./theme-switcher";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-purple-200/60 dark:border-purple-900/30 dark:from-slate-950/90 dark:via-slate-900/90 dark:to-slate-950/90 backdrop-blur shadow-sm transition-all duration-300">
      <nav className="w-full glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 text-neon-cyan font-display font-bold text-xl tracking-widest">
              <Link href="/" className="flex items-center gap-2" aria-label="Ir para a página inicial">
                <Image
                  src="/logo.png"
                  alt="Logo Mibess"
                  width={1000}
                  height={1000}
                  className="h-8 w-auto transition-opacity duration-300"
                  priority
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8 font-mono text-sm items-center">
                <a href="#about" className="text-gray-300 hover:text-neon-cyan transition-colors duration-300">DATA.resumo</a>
                <a href="#stack" className="text-gray-300 hover:text-neon-cyan transition-colors duration-300">SYS.skills</a>
                <a href="#xp" className="text-gray-300 hover:text-neon-cyan transition-colors duration-300">LOG.experiência</a>
                <a href="#projects" className="text-gray-300 hover:text-neon-cyan transition-colors duration-300">PROJ.exec</a>
                <a href="#contact" className="px-4 py-2 rounded border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300 ">INIT.contato</a>
                {/* TODO: make site light and dark mode */}
                {/* <ThemeSwitcher /> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
