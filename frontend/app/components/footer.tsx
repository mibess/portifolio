// components/Footer.tsx
import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react'; // Ícones

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-200 dark:bg-slate-900 py-8 mt-16"> {/* Ajuste padding/margem */}
      <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">

        {/* Links Sociais */}
        <div className="flex justify-center space-x-6 mb-6">
           <a href="https://www.linkedin.com/in/claudemircustodio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
             <Linkedin size={24} />
           </a>
           <a href="https://github.com/mibess" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
             <Github size={24} />
           </a>
            <a href="https://www.instagram.com/csilverios/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
             <Instagram size={24} />
           </a>
           {/* Adicionar mais links se desejar */}
        </div>

        {/* Copyright */}
        <p className="text-sm mb-2">
          &copy; {currentYear} Mibess. Todos os direitos reservados.
        </p>

        {/* Crédito Tecnologias (Opcional) */}
        <p className="text-xs">
          Feito com <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600 dark:hover:text-amber-400">Next.js</a> e <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600 dark:hover:text-amber-400">Tailwind CSS</a>.
        </p>
      </div>
    </footer>
  );
}