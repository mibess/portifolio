import { ArrowUpRight, ExternalLink, Terminal } from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-200 relative border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-12">
            <span className="text-purple-500 mr-4"><Terminal className="w-8 h-8" /></span>
            <h3 className="text-3xl font-display font-bold text-gray-800">PROJ.exec()</h3>
          </div>

          <div className="space-y-10">
            {projectsData.map((project, index) => {
              const reverse = index % 2 !== 0;
              return (
                <article
                  key={project.title}
                  className="group relative overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-lg flex flex-col lg:flex-row items-center gap-8 p-8 md:p-10 transition-transform duration-200 ease-out hover:-translate-y-1"
                >
                  <div className="pointer-events-none absolute -left-24 -top-24 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-cyan-400/15 blur-3xl transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-4" />
                  <div className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-pink-400/15 blur-3xl transition-transform duration-700 ease-out group-hover:-translate-x-6 group-hover:-translate-y-2" />

                  <div
                    className={`relative w-full lg:w-5/12 ${reverse ? "lg:order-2" : ""}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-md transition-transform duration-200 ease-out group-hover:shadow-lg group-hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:-translate-y-2" />
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

                  <div className={`flex-1 text-left ${reverse ? "lg:order-1" : ""}`}>
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-mono text-gray-600 mb-4 transition-colors duration-200 ease-out group-hover:bg-purple-50">
                      <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" ></div>
                      Projeto em produção
                    </div>

                    <h4 className="text-3xl font-display font-bold text-gray-900 mb-3">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 font-mono text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-3 py-1 rounded-full border border-gray-200 bg-gray-100 text-blue-600 font-mono transition-transform duration-200 ease-out group-hover:translate-y-[-1px]"
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
                        className="group/link inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-gray-800 transition-colors duration-200 ease-out hover:border-purple-400 hover:text-purple-600"
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
                          className="group/link inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-gray-800 transition-colors duration-200 ease-out hover:border-blue-400 hover:text-blue-600"
                          aria-label={`Demo online de ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Ver demo</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover/link:translate-x-1 group-hover/link:-translate-y-[2px]" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
  );
}
