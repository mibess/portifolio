"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { projectsData } from '@/lib/projects-data';

const SCROLL_DISTANCE = 280;

function getPrimaryLink(project: (typeof projectsData)[number]) {
  if (project.demoUrl && project.demoUrl !== "#") {
    return {
      href: project.demoUrl,
      label: "Acessar demo",
      icon: <ExternalLink className="w-4 h-4" aria-hidden="true" />,
    };
  }

  return {
    href: project.githubUrl,
    label: "Ver código no GitHub",
    icon: <Github className="w-4 h-4" aria-hidden="true" />,
  };
}

export default function ProjectStories() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const scrollBy = direction === "left" ? -SCROLL_DISTANCE : SCROLL_DISTANCE;
    container.scrollBy({ left: scrollBy, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="project-stories-title"
      className="w-full dark:border-slate-800/80 bg-slate-900/5 dark:bg-slate-50/5 py-10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-500/80 font-semibold">
              Destaques
            </p>
            <h2
              id="project-stories-title"
              className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100"
            >
              Projetos em foco
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="rounded-full border border-slate-300/50 dark:border-slate-700/50 p-2 text-slate-600 hover:text-amber-500 hover:border-amber-400/80 transition-colors cursor-pointer"
              aria-label="Ver projetos anteriores"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="rounded-full border border-slate-300/50 dark:border-slate-700/50 p-2 text-slate-600 hover:text-amber-500 hover:border-amber-400/80 transition-colors cursor-pointer"
              aria-label="Ver próximos projetos"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16" />

          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-6 overflow-x-hidden py-6 snap-x snap-mandatory"
          >
            {projectsData.map((project) => {
              const primaryLink = getPrimaryLink(project);

              return (
                <Link
                  key={project.title}
                  href={primaryLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-48 shrink-0 snap-start flex-col items-center gap-3 rounded-3xl border border-slate-200/80 bg-white/70 p-4 text-center transition-all hover:-translate-y-1 hover:border-amber-400/80 dark:border-slate-700/70 dark:bg-slate-900/60"
                >
                  <span className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/5 via-transparent to-amber-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/80 dark:border-slate-700/60 dark:bg-slate-800/80">
                    <Image
                      src={project.imageUrl}
                      alt={`Pré-visualização do projeto ${project.title}`}
                      fill
                      sizes="192px"
                      className="object-cover"
                    />
                  </div>

                  <div className="relative flex flex-col items-center gap-1">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                      {project.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-amber-600 dark:text-amber-300">
                      {primaryLink.label}
                      {primaryLink.icon}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-center sm:hidden">
          <div className="inline-flex rounded-full border border-slate-300/60 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/70 shadow-sm">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-amber-500 cursor-pointer"
              aria-label="Ver projetos anteriores"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </button>
            <span className="mx-px h-6 w-px self-center bg-slate-200 dark:bg-slate-700" />
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-amber-500 cursor-pointer"
              aria-label="Ver próximos projetos"
            >
              Próximo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
