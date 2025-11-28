import { ExternalLink, Terminal } from "lucide-react";
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <div key={project.title} className="bg-white rounded-xl overflow-hidden group hover:border-neon-cyan transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h4 className="text-white font-bold font-display text-xl">{project.title}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm font-mono mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded border border-gray-200 bg-gray-200 text-blue-500 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.githubUrl} target="_blank" className="flex items-center text-xs font-bold text-gray-800 hover:text-blue-500 transition-colors">
                      <SiGithub className="w-4 h-4 mr-2" /> CODE
                    </a>
                    {project.demoUrl && project.demoUrl !== "#" && (
                      <a href={project.demoUrl} target="_blank" className="flex items-center text-xs font-bold text-gray-800 hover:text-green-500 transition-colors">
                        <ExternalLink className="w-4 h-4 mr-2" /> DEMO
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}