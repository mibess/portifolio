// components/Contact.tsx
import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react'; // Importar ícones

export default function Contact() {
  return (
    <section id="contato" className="py-16 md:py-20 bg-slate-100 dark:bg-slate-800/50"> {/* Fundo similar ao Sobre */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">
          Entre em Contato
        </h2>
        {/* Linha decorativa */}
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">

          {/* Coluna de Informações de Contato */}
          <div className="space-y-6 text-slate-700 dark:text-slate-300">
            <p className="text-lg leading-relaxed">
              Estou sempre aberto a novas oportunidades, projetos interessantes ou apenas um bate-papo sobre tecnologia. Sinta-se à vontade para me contatar através dos canais abaixo:
            </p>

            <a href="mailto:c.silverio@live.com" className="flex items-center space-x-3 group">
              <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors break-all">c.silverio@live.com</span>
            </a>

             <a href="https://www.linkedin.com/in/claudemircustodio" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
               <Linkedin className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
               <span className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">LinkedIn (/claudemircustodio)</span>
             </a>

             <a href="https://github.com/mibess" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
               <Github className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
               <span className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">GitHub (/mibess)</span>
             </a>

             {/* Telefone (opcional, pode comentar se preferir) */}
             {/* <div className="flex items-center space-x-3">
               <Phone className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
               <span>+55 16 99720-0212</span>
             </div> */}

             {/* <div className="flex items-center space-x-3">
               <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
               <span>Ribeirão Preto - SP, Brasil</span>
             </div> */}
          </div>

          {/* Coluna do Placeholder do Formulário */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Ou me envie uma mensagem direta</h3>
            <div className="text-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-md p-8">
              <p className="mb-2">Acessem minhas redes sociais 😊</p>{/* Emoticon de sorriso */}
            </div>
            {/* Aqui entrariam os campos do formulário: Nome, Email, Mensagem, Botão Enviar */}
          </div>

        </div>
      </div>
    </section>
  );
}