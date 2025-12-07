import React from 'react';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <section id="contact" className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-20 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-display font-bold mb-8 text-gray-200">INICIAR CONEXÃO?</h2>
            <p className="text-gray-300 mb-10 font-mono">Estou disponível para novos projetos e desafios.</p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
                <a href="mailto:c.silverio@live.com" className="group relative px-8 py-4 bg-transparent border border-gray-300 overflow-hidden rounded hover:border-blue-500 transition-colors">
                    <div className="absolute inset-0 w-0 bg-blue-500 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                    <span className="relative group-hover:text-blue-500 font-bold tracking-wider font-mono flex items-center justify-center">
                    <Mail className="mr-2 w-5 h-5" /> ENVIAR EMAIL
                    </span>
                </a>

                <a href="https://wa.me/5516997200212" className="group relative px-8 py-4 bg-transparent border border-gray-300 overflow-hidden rounded hover:border-green-500 transition-colors">
                    <div className="absolute inset-0 w-0 bg-green-500 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                    <span className="relative group-hover:text-green-500 font-bold tracking-wider font-mono flex items-center justify-center">
                    <MessageCircle className="mr-2 w-5 h-5" /> WHATSAPP
                    </span>
                </a>
            </div>

            <div className="mt-6 flex justify-center gap-4 text-sm text-gray-300 font-mono">
                <a
                    href="https://www.linkedin.com/in/claudemircustodio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-neon-cyan transition-colors duration-200"
                    aria-label="LinkedIn de Claudemir Custódio"
                >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                    href="https://github.com/mibess"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-neon-cyan transition-colors duration-200"
                    aria-label="GitHub de Claudemir Custódio"
                >
                    <Github className="w-4 h-4" /> GitHub
                </a>
            </div>
        </div>

        <footer className="mt-20 border-t border-gray-200 pt-8 text-gray-300 text-sm font-mono">
            <div className="flex justify-center mb-4">
                <Image
                    src="/logo.svg"
                    alt="Logo Mibess"
                    width={512}
                    height={124}
                    className="h-8 w-auto transition-opacity duration-300"
                    priority
                />
            </div>
            <p>&copy; {currentYear} Claudemir Custódio. System.exit(0);</p>
        </footer>
    </section>
  );
}
