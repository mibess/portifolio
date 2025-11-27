"use client";

import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Cpu,
  Server,
  Code,
  Cloud,
  History,
  Terminal,
  ExternalLink,
  MessageCircle
} from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import Header from "./components/header";

const timeline = [
  {
    role: "Desenvolvedor de Sistemas",
    company: "AMcom · Squad CCEE",
    period: "jan 2024 — atual",
    details: [
      "Desenvolvo novas funcionalidades e mantenho microsserviços críticos da CCEE usando Java, Spring Boot e banco Oracle.",
      "Construo interfaces Angular com foco em desempenho e consistência da experiência do usuário.",
      "Atuo com Git (GitHub/Bitbucket), Jira e práticas ágeis para garantir cadência e qualidade das entregas.",
    ],
  },
  {
    role: "Desenvolvedor Full Stack Java",
    company: "Rtools Desenvolvimento de Sistemas",
    period: "jan 2010 — set 2023",
    details: [
      "Liderei soluções web para sindicatos e associações, cobrindo módulos de arrecadação, financeiro e social.",
      "Implementei integrações bancárias (Itaú, BB, Santander, Bradesco, Caixa) e pagamentos via PIX.",
      "Projetei microserviços para controle de acesso com cartão e biometria, aplicando as melhores práticas de desenvolvimento.",
      "Migrei workloads para AWS EC2 com Docker, estruturando pipelines CI/CD e observabilidade contínua.",
      "Produzi relatórios avançados com Jasper Reports e mantive bases PostgreSQL e MySQL.",
    ],
  },
  {
    role: "Instrutor de Informática",
    company: "Master Company Informática",
    period: "jan 2009 — dez 2009",
    details: [
      "Ministrei aulas de Photoshop, CorelDraw e Microsoft Office para turmas com diferentes níveis de conhecimento.",
      "Desenvolvi materiais didáticos personalizados e apoiei projetos de design gráfico da escola.",
    ],
  },
];

const skills = {
  backend: ["Java", "Spring Boot", "JPA/Hibernate", "REST API", "DDD", "Microservices", "RabbitMQ"],
  frontend: ["Angular", "React", "TypeScript", "JavaScript", "HTML", "CSS", "JSF", "Primefaces"],
  infra: ["AWS EC2/S3/ECS", "Docker", "CI/CD", "PostgreSQL", "Oracle", "Git", "Bitbucket"]
};

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Header />
      
      {/* Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center py-16">
        {/* Grid Background Effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="relative inline-block mb-8 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/20 bg-black">
              <Image
                src="/profile.png"
                alt="Claudemir Custódio"
                fill
                className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-4 tracking-tighter">
            CLAUDEMIR CUSTÓDIO
          </h1>
          <h2 className="text-xl md:text-2xl text-neon-cyan mb-8 tracking-widest uppercase border-l-4 border-neon-purple pl-4 inline-block bg-white/5 py-1 pr-4 font-mono">
            Full Stack Java Developer
          </h2>

          <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base mb-10 leading-relaxed font-mono">
            <span className="text-neon-purple">&gt;</span> Mais de 14 anos de experiência.<br />
            <span className="text-neon-purple">&gt;</span> Focado em arquitetura Java, Cloud AWS e Microsserviços.<br />
            <span className="text-neon-purple">&gt;</span> Transformando ideias complexas em código eficiente.
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <a href="https://github.com/mibess" target="_blank" className="text-gray-400 hover:text-white hover:scale-110 transition-transform">
              <Github className="w-8 h-8" />
            </a>
            <a href="https://www.linkedin.com/in/claudemircustodio" target="_blank" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-transform">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="https://wa.me/5516997200212" target="_blank" className="text-gray-400 hover:text-green-400 hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8" />
            </a>
          </div>

          <div className="flex justify-center">
            <a
              href="/Profile.pdf"
              download="Claudemir_Custodio_CV.pdf"
              className="group relative px-6 py-3 bg-transparent border border-neon-cyan/50 overflow-hidden rounded hover:border-neon-cyan transition-colors"
            >
              <div className="absolute inset-0 w-0 bg-neon-cyan transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="relative group-hover:text-neon-cyan font-bold tracking-wider font-mono text-neon-cyan flex items-center">
                <ExternalLink className="mr-2 w-4 h-4" /> BAIXAR CURRÍCULO
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Agora / Próximo Passo */}
      <section className="py-10 bg-black/20 relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-panel p-6 rounded-xl border-l-4 border-neon-cyan">
              <h3 className="text-neon-cyan font-display font-bold text-lg mb-2">AGORA</h3>
              <p className="text-gray-300 font-mono text-sm leading-relaxed">
                Entregando novas funcionalidades e otimizações em microsserviços da CCEE, com Java,
                Spring Boot, Oracle e Angular alinhados às rotinas regulatórias do setor elétrico.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl border-l-4 border-neon-purple">
              <h3 className="text-neon-purple font-display font-bold text-lg mb-2">PRÓXIMO PASSO</h3>
              <p className="text-gray-300 font-mono text-sm leading-relaxed">
                Se tornar especialista e acelerar roadmaps que precisem de microsserviços robustos, frontends modernos e
                governança CI/CD para escala e observabilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills / Tech Stack (Terminal Style) */}
      <section id="stack" className="py-20 bg-black/30 relative border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-12">
            <span className="text-neon-purple mr-4"><Cpu className="w-8 h-8" /></span>
            <h3 className="text-3xl font-display font-bold text-white">SYSTEM.skills_load()</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Backend */}
            <div className="glass-panel p-6 rounded hover:border-neon-cyan transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-neon-cyan font-bold text-lg font-mono">Backend.Core</h4>
                <Server className="text-gray-600 group-hover:text-neon-cyan w-6 h-6" />
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map(skill => (
                  <span key={skill} className="bg-gray-800 text-xs px-3 py-1 rounded border border-gray-700 font-mono text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Frontend */}
            <div className="glass-panel p-6 rounded hover:border-neon-purple transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-neon-purple font-bold text-lg font-mono">Frontend.UI</h4>
                <Code className="text-gray-600 group-hover:text-neon-purple w-6 h-6" />
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map(skill => (
                  <span key={skill} className="bg-gray-800 text-xs px-3 py-1 rounded border border-gray-700 font-mono text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Card DevOps/Cloud */}
            <div className="glass-panel p-6 rounded hover:border-neon-green transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-neon-green font-bold text-lg font-mono">Infra.Cloud</h4>
                <Cloud className="text-gray-600 group-hover:text-neon-green w-6 h-6" />
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.infra.map(skill => (
                  <span key={skill} className="bg-gray-800 text-xs px-3 py-1 rounded border border-gray-700 font-mono text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Log */}
      <section id="xp" className="py-20 max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-12 justify-end">
          <h3 className="text-3xl font-display font-bold text-white text-right">MISSION.log()</h3>
          <span className="text-neon-cyan ml-4"><History className="w-8 h-8" /></span>
        </div>

        <div className="relative pl-8 border-l-2 border-gray-800 space-y-12">
          {timeline.map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[41px] top-0 w-5 h-5 bg-neon-cyan rounded-full shadow-neon-blue"></div>
              <div className="glass-panel p-8 rounded-xl hover:bg-white/5 transition-colors">
                <div className="flex flex-col md:flex-row justify-between mb-4 border-b border-white/10 pb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-white font-display">{item.company}</h4>
                    <p className="text-neon-cyan font-mono">{item.role}</p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <span className="text-gray-500 font-mono text-sm">{item.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 text-gray-300 font-mono text-sm">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-neon-purple mr-2">➜</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 border-t-4 border-neon-green">
            <h5 className="text-neon-green font-mono text-sm mb-2">2023 // GRADUAÇÃO</h5>
            <h4 className="text-xl font-bold text-white font-display">Engenharia de Software</h4>
            <p className="text-gray-400 font-mono">ALURA</p>
          </div>
          <div className="glass-panel p-6 border-t-4 border-gray-600">
            <h5 className="text-gray-400 font-mono text-sm mb-2">2008 - 2009 // TÉCNICO</h5>
            <h4 className="text-xl font-bold text-white font-display">Informática & Gestão de TI</h4>
            <p className="text-gray-400 font-mono">ETEC - Escola Técnica Estadual de SP</p>
          </div>
          <div className="glass-panel p-6 border-t-4 border-neon-purple">
            <h5 className="text-neon-purple font-mono text-sm mb-2">IDIOMAS</h5>
            <h4 className="text-xl font-bold text-white font-display">Português · Nativo</h4>
            <p className="text-gray-400 font-mono">Inglês · Intermediário</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black/30 relative border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-12">
            <span className="text-neon-purple mr-4"><Terminal className="w-8 h-8" /></span>
            <h3 className="text-3xl font-display font-bold text-white">PROJ.exec()</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <div key={project.title} className="glass-panel rounded-xl overflow-hidden group hover:border-neon-cyan transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h4 className="text-white font-bold font-display text-lg">{project.title}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-sm font-mono mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded border border-gray-700 bg-gray-800 text-neon-cyan font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.githubUrl} target="_blank" className="flex items-center text-xs font-bold text-white hover:text-neon-cyan transition-colors">
                      <Github className="w-4 h-4 mr-2" /> CODE
                    </a>
                    {project.demoUrl && project.demoUrl !== "#" && (
                      <a href={project.demoUrl} target="_blank" className="flex items-center text-xs font-bold text-white hover:text-neon-green transition-colors">
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

      {/* Contact / Footer */}
      <section id="contact" className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/10 to-transparent opacity-20 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-display font-bold mb-8 text-white">INICIAR CONEXÃO?</h2>
          <p className="text-gray-400 mb-10 font-mono">Estou disponível para novos projetos e desafios na stack Java/Cloud.</p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="mailto:c.silverio@live.com" className="group relative px-8 py-4 bg-transparent border border-white/30 overflow-hidden rounded hover:border-neon-cyan transition-colors">
              <div className="absolute inset-0 w-0 bg-neon-cyan transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="relative group-hover:text-neon-cyan font-bold tracking-wider font-mono flex items-center justify-center">
                <Mail className="mr-2 w-5 h-5" /> ENVIAR EMAIL
              </span>
            </a>

            <a href="https://wa.me/5516997200212" className="group relative px-8 py-4 bg-transparent border border-white/30 overflow-hidden rounded hover:border-neon-green transition-colors">
              <div className="absolute inset-0 w-0 bg-neon-green transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="relative group-hover:text-neon-green font-bold tracking-wider font-mono flex items-center justify-center">
                <MessageCircle className="mr-2 w-5 h-5" /> WHATSAPP
              </span>
            </a>
          </div>
        </div>

        <footer className="mt-20 border-t border-white/5 pt-8 text-gray-600 text-sm font-mono">
          <p>&copy; 2025 Claudemir Custódio. System.exit(0);</p>
        </footer>
      </section>
    </>
  );
}
