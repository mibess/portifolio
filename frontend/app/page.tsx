"use client";

import {
  History
} from "lucide-react";

import Header from "./components/header";
import Hero from "./components/hero";
import NextStep from "./components/next-step";
import Skills from "./components/skills";
import Projects from "./components/projects";
import Footer from "./components/footer";

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

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Header />
      
      {/* Hero Section */}
      <Hero />

      {/* Agora / Próximo Passo */}
      <NextStep />

      {/* Skills / Tech Stack (Terminal Style) */}
      <Skills />

      {/* Experience Log */}
      <section id="xp" className="py-20 max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-12 justify-end">
          <h3 className="text-3xl font-display font-bold text-gray-200 text-right">MISSION.log()</h3>
          <span className="text-blue-500 ml-4"><History className="w-8 h-8" /></span>
        </div>

        <div className="relative pl-8 border-l-2 border-gray-200 space-y-12">
          {timeline.map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[41px] top-0 w-5 h-5 bg-blue-500 rounded-full shadow-neon-blue shadow-lg"></div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row justify-between mb-4 border-b border-gray-200 pb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800 font-display">{item.company}</h4>
                    <p className="text-blue-500 font-mono">{item.role}</p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <span className="text-gray-500 font-mono text-sm">{item.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 text-gray-600 font-mono text-sm">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-purple-500 mr-2">➜</span>
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
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
            <h5 className="text-green-500 font-mono text-sm mb-2">2023 // CURSO</h5>
            <h4 className="text-xl font-bold text-gray-800 font-display">Engenharia de Software</h4>
            <p className="text-gray-500 font-mono">ALURA</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gray-300">
            <h5 className="text-gray-500 font-mono text-sm mb-2">2008 - 2009 // TÉCNICO</h5>
            <h4 className="text-xl font-bold text-gray-800 font-display">Informática & Gestão de TI</h4>
            <p className="text-gray-500 font-mono">ETEC - Escola Técnica Estadual de SP</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
            <h5 className="text-purple-500 font-mono text-sm mb-2">IDIOMAS</h5>
            <h4 className="text-xl font-bold text-gray-800 font-display">Inglês · Intermediário</h4>
            <p className="text-gray-500 font-mono">Espanhol · Básico</p>
            <p className="text-gray-500 font-mono">Português · Nativo</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Contact / Footer */}
      <Footer />
    </>
  );
}
