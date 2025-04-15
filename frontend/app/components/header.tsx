import React from 'react';
import { ThemeSwitcher } from './theme-switcher';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 shadow-md sticky top-0 z-50 opacity-90 backdrop-blur transition-all duration-300 bg-white dark:bg-slate-900">
      <nav className="container mx-auto px-4 flex justify-between items-center">
      <div>
          {/* Usar Link para a home page */}
          <Link href="/" className="text-xl font-bold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Mibess
          </Link>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6"> {/* Aumentado espaço em telas maiores */}
          {/* Links de Navegação */}
          <a href="#sobre" className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Sobre
          </a>
          <a href="#projetos" className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Projetos
          </a>
          <a href="#contato" className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Contato
          </a>

          {/* Separador visual opcional */}
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-600 hidden md:block"></div>

          <ThemeSwitcher /> {/* Botão de tema */}
        </div>
      </nav>
    </header>
  );
}