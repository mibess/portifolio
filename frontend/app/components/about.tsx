// components/About.tsx
import { Download } from 'lucide-react';
import React from 'react';

export default function About() {
  return (
    <section id="sobre" className="px-8 py-16 md:py-20 bg-slate-100 dark:bg-slate-800/50"> {/* Fundo levemente diferente */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">
          Sobre Mim
        </h2>
        {/* Linha decorativa */}
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-12"></div>

        <div className="max-w-4xl mx-auto text-slate-700 dark:text-slate-300 space-y-8"> {/* Container para o texto */}

          {/* Resumo/Introdução */}
          <p className="text-lg leading-relaxed">
            Tenho experiência na criação de sistemas web eficientes.
            Nos últimos anos, venho atuando com tecnologias modernas no desenvolvimento de aplicações que otimizam a produtividade e impulsionam resultados das empresas.
            Sou movido por desafios, aprendizado contínuo e pela busca constante de melhoria técnica e entrega de valor
          </p>

          {/* Experiência */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Experiência Principal</h3>
            <div className="space-y-4">
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    Desenvolvedor Full Stack Java na CCEE (alocado pela AMCom)
                </p>
                <p>
                    Atualmente sou responsável pelo desenvolvimento de novas funcionalidades, otimizações de desempenho e manutenção nos vários microsserviços utilizados pela empresa.
                </p>

                <p>
                    Trabalho com Java e Spring Boot, Angular, e banco de dados Oracle.
                    Utilizo ferramentas de versionamento como Git (GitHub e Bitbucket), seguindo boas práticas de desenvolvimento ágil e foco em qualidade de entrega.
                </p>

                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    Desenvolvedor Full Stack Java na Rtools Desenvolvimento de Sistemas
                </p>

                <p>
                    Atuei por quase 14 anos como Desenvolvedor Full Stack Java na Rtools Desenvolvimento de Sistemas, onde gerenciei e desenvolvi aplicações web complexas para sindicatos e associações.
                </p>
                <p>
                    Fui responsável pela implementação de diversos módulos de sistemas (Arrecadação, Financeiro, Social), criação de microserviços para controle de acesso, desenvolvimento de relatórios com Jasper Reports e integrações bancárias via API (Itaú, BB, Santander, etc.) e PIX.
                </p>
                <p>
                    Nos últimos anos, liderei a migração de aplicações para a AWS EC2 utilizando Docker e implementei práticas de CI/CD para automação de deploy, além de adotar princípios de Clean Architecture e Clean Code. Usei Git (GitHub/Bitbucket) para controle de versão por mais de 10 anos.
                </p>
            </div>
          </div>

          {/* Habilidades */}
          <div>
             <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Habilidades Técnicas</h3>
             <div className="flex flex-wrap gap-2">
               {/* Lista de Habilidades */}
               {[
                 'Java', 'Spring Boot', 'HTML', 'CSS', 'JavaScript', 'Primefaces',
                 'Angular', 'ReactJS', 'PostgreSQL', 'MySQL', 'Docker', 'AWS EC2',
                 'CI/CD', 'Git', 'Jasper Reports', 'API Integration', 'Microservices',
                 'Clean Architecture', 'Delphi', 'RabbitMQ', 'Oracle', 'Bitbucket'
               ].map((skill) => (
                 <span key={skill} className="bg-amber-100 text-amber-800 dark:bg-amber-800/50 dark:text-amber-200 text-sm font-medium px-3 py-1 rounded-full">
                   {skill}
                 </span>
               ))}
             </div>
          </div>

          {/* Formação */}
          <div>
             <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Formação</h3>
             <p>
               Técnico em Informática, Gestão de Projetos de TI - ETEC - Escola Técnica Estadual de São Paulo (2008 - 2009).
             </p>
          </div>

           {/* Idiomas */}
           <div>
             <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Idiomas</h3>
             <p>Português (Nativo), Inglês (Intermediário).</p>
           </div>
            {/* === Botão de Download do CV === */}
            <div className="text-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-700/50"> {/* Separador visual */}
                <a
                    href="/Profile.pdf" // Certifique-se que o nome do arquivo está correto
                    download="Claudemir_Custodio_CV.pdf" // Nome sugerido para o arquivo baixado
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition-all duration-300 hover:shadow-amber-500/20 hover:-translate-y-0.5"
                >
                    <Download size={18} />
                    Baixar Currículo (PDF)
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    (Clique para fazer o download do meu currículo em formato PDF)
                </p>
            </div>
            {/* === Fim Botão de Download do CV === */}
        </div>
      </div>
    </section>
  );
}