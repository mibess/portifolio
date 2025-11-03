// components/Projects.tsx
import React from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { projectsData } from "@/lib/projects-data";

const ProjectCard = ({
  project,
}: {
  project: (typeof projectsData)[number];
}) => (
  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-lg shadow-amber-100/45 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-amber-300/70 hover:shadow-amber-200/60 dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-none">
    <div className="relative h-52 overflow-hidden">
      <span className="pointer-events-none absolute inset-x-6 top-6 z-10 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-70 dark:via-white/30" />
      <Image
        src={project.imageUrl}
        alt={`Imagem do projeto ${project.title}`}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
      <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-600 shadow-sm dark:border-white/20 dark:bg-white/10 dark:text-amber-200">
        Destaque
      </div>
    </div>

    <div className="flex flex-1 flex-col gap-5 p-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 transition-colors group-hover:text-amber-600 dark:text-slate-100 dark:group-hover:text-amber-300">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-amber-200/70 bg-amber-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200/70 pt-4 text-sm dark:border-slate-800/60">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/90 px-3 py-1.5 font-semibold text-amber-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-500 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:border-amber-400 dark:hover:text-amber-100"
        >
          <Github className="h-4 w-4" aria-hidden />
          Código
        </a>

        {project.demoUrl && project.demoUrl !== "#" ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-amber-500 px-4 py-1.5 font-semibold text-white shadow-md shadow-amber-500/30 transition-all hover:-translate-y-0.5 hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            Ver demo
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-amber-50/80 px-3 py-1.5 font-semibold text-amber-600 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            Em breve
          </span>
        )}
      </div>
    </div>
  </article>
);

export default function Projects() {
  return (
    <section
      id="projetos"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white py-24 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_55%)] dark:bg-[radial-gradient(circle_at_bottom,_rgba(253,230,138,0.12),_transparent_55%)]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-amber-200/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 shadow-sm dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-200">
            Portfólio
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
            Projetos em destaque
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Seleção de produtos digitais onde atuei ponta a ponta — da concepção
            ao monitoramento, sempre com atenção à performance, acessibilidade e
            métricas de negócio.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://github.com/mibess?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/90 px-6 py-3 text-sm font-semibold text-amber-600 shadow-md shadow-amber-200/40 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white hover:text-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:border-amber-400 dark:hover:text-amber-100"
          >
            Ver todos os repositórios
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
