"use client";

import { ArrowUpRight, ExternalLink, Terminal } from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ProjectVideoPreview } from "./project-video-preview";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-gray-50 relative border-y border-gray-200 overflow-hidden">
      {/* Background Image Effect */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image 
          src="/projects-bg.png" 
          alt="Projects Background" 
          fill 
          className="object-cover opacity-25" 
          priority 
        />
        <div className="absolute inset-0 bg-linear-to-b from-gray-50 via-transparent to-gray-50"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-16">
          <span className="text-purple-600 mr-4">
            <Terminal className="w-8 h-8 drop-shadow-[0_0_6px_rgba(188,19,254,0.2)]" />
          </span>
          <h3 className="text-3xl font-display font-bold text-gray-800 tracking-widest uppercase">
            PROJ.<span className="text-purple-600">exec()</span>
          </h3>
        </div>

        <div className="space-y-12">
          {projectsData.map((project, index) => {
            const reverse = index % 2 !== 0;
            return (
              <article key={project.title} className="flex flex-col relative overflow-hidden rounded-3xl border border-white/50 bg-white/60 hover:bg-white/80 backdrop-blur-md transition-all duration-300 ease-out hover:border-purple-300/30 hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(188,19,254,0.05)]">

                <div className="group  flex flex-col lg:flex-row items-center gap-8 p-8 md:p-10">
                  {/* Liquid glass border-glow and ambient backdrop glow effects */}
                  <div className="pointer-events-none absolute -inset-px rounded-3xl bg-linear-to-r from-purple-500/0 via-cyan-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 group-hover:from-purple-500/5 group-hover:via-cyan-400/5 group-hover:to-purple-500/5 transition-all duration-700 -z-10" />
                  <div className="pointer-events-none absolute -left-24 -top-24 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl opacity-60 transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-4" />
                  <div className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-cyan-400/5 blur-3xl opacity-60 transition-transform duration-700 ease-out group-hover:-translate-x-6 group-hover:-translate-y-2" />

                  {/* Left/Right Media Column - Original Static Logo Image */}
                  <div className={`relative w-full lg:w-5/12 ${reverse ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50 shadow-md transition-all duration-300 ease-out group-hover:shadow-[0_8px_25px_rgba(188,19,254,0.06)] group-hover:border-purple-300/40">
                      <div className="absolute inset-0 bg-linear-to-tr from-purple-500/5 via-transparent to-blue-500/5 transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:-translate-y-2" />
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  {/* Left/Right Text Column */}
                  <div className={`flex-1 text-left ${reverse ? "lg:order-1" : ""}`}>
                    <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-100 px-3 py-1 text-[11px] font-mono text-purple-600 mb-4 transition-all duration-300 group-hover:bg-purple-100/70 group-hover:border-purple-200">
                      <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_6px_#bc13fe]" />
                      Projeto em produção
                    </div>

                    <h4 className="text-3xl font-display font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 mb-3">
                      {project.title}
                    </h4>
                    
                    <p className="text-gray-600 font-mono text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-blue-600 font-mono transition-all duration-300 group-hover:border-purple-200 group-hover:bg-purple-50/50 hover:translate-y-[-1px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm font-mono">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/30 px-4 py-2 text-gray-800 font-mono transition-all duration-200 ease-out hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50/40"
                        aria-label={`Código no GitHub de ${project.title}`}
                      >
                        <SiGithub className="w-4 h-4" />
                        <span>Ver código</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover/link:translate-x-1 group-hover/link:-translate-y-[2px]" />
                      </a>

                      {project.demoUrl && project.demoUrl !== "#" && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/30 px-4 py-2 text-gray-800 font-mono transition-all duration-200 ease-out hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50/40"
                          aria-label={`Demo online de ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Ver demo</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Looping preview video of the project, placed below but inside the card */}
                <div className="w-full px-10">

                  <ProjectVideoPreview videoUrl={project.videoUrl} title={project.title} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
