// components/Projects.tsx
import React from 'react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react'; // Importar ícones
import { projectsData } from '@/lib/projects-data';

// Componente do Card do Projeto (Opcional, mas organiza o código)
const ProjectCard = ({ project }: { project: (typeof projectsData)[number] }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col h-full transform transition duration-300 hover:scale-[1.02] hover:shadow-xl">
    <div className="relative w-full h-48">
      <Image
        src={project.imageUrl}
        alt={`Imagem do ${project.title}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Otimização de imagem
      />
    </div>
    <div className="p-6 flex flex-col flex-grow"> {/* flex-grow para empurrar links para baixo */}
      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{project.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">{project.description}</p> {/* flex-grow para ocupar espaço */}

      {/* Tags */}
      <div className="mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="inline-block bg-amber-100 text-amber-800 dark:bg-amber-800/50 dark:text-amber-200 text-xs font-medium px-2.5 py-0.5 rounded-full mr-1 mb-1">
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex justify-start space-x-3 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700"> {/* mt-auto empurra para o fim */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver código no GitHub"
          className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          title="Código Fonte (GitHub)"
        >
          <Github size={20} />
        </a>
        {project.demoUrl && project.demoUrl !== "#" && ( // Só mostra se tiver demoUrl válido
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver demonstração online"
            className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            title="Ver Demo Online"
          >
            <ExternalLink size={20} />
          </a>
        )}
         {/* Editar aqui: Adicionar mais links se necessário (ex: artigo de blog) */}
      </div>
    </div>
  </div>
);

export default function Projects() {
  return (
    <section id="projetos" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900"> {/* Fundo um pouco diferente */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">
          Meus Projetos
        </h2>
        {/* Linha decorativa */}
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-12"></div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
          {/* Adicionar mais <ProjectCard /> aqui ou editar o array projectsData */}
        </div>

         {/* Botão Opcional para Ver Mais no GitHub */}
         <div className="text-center mt-12">
             <a
               href="https://github.com/mibess?tab=repositories"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold px-6 py-3 rounded-md shadow transition duration-300 ease-in-out"
             >
               Ver Todos os Repositórios no GitHub
               <ExternalLink size={18} />
             </a>
         </div>
          {/* Editar aqui: Você pode querer adicionar uma forma de filtrar os projetos no futuro */}
      </div>
    </section>
  );
}
