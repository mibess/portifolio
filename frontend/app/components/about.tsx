// components/About.tsx
import { Download } from "lucide-react";
import React from "react";

const timeline = [
  {
    role: "Desenvolvedor Full Stack Java",
    company: "CCEE · alocado pela AMCom",
    period: "2022 — atual",
    details: [
      "Evoluo microsserviços críticos com Java, Spring Boot, mensageria e observabilidade completa.",
      "Desenho e desenvolvo experiências em Angular e React focadas na jornada do usuário.",
      "Lidero iniciativas de performance, qualidade e governança técnica com equipes multidisciplinares.",
    ],
  },
  {
    role: "Desenvolvedor Full Stack Java",
    company: "Rtools Desenvolvimento de Sistemas",
    period: "2008 — 2022",
    details: [
      "Conduzi modernização de módulos complexos, integrações bancárias e PIX.",
      "Implementei arquitetura baseada em microserviços, CI/CD e monitoramento em AWS.",
      "Atuei em todas as fases do produto: discovery, desenvolvimento, deploy e suporte.",
    ],
  },
];

const focusAreas = [
  {
    title: "Arquitetura & Escalabilidade",
    description:
      "Microsserviços Java, mensageria, observabilidade e alto nível de resiliência.",
  },
  {
    title: "Frontend Experiencial",
    description:
      "Interfaces vivas em Angular e React, com micro frontends e design systems reutilizáveis.",
  },
  {
    title: "DevOps & Cloud",
    description:
      "CI/CD, Docker, pipelines automatizados e ambientes seguros em AWS e Azure.",
  },
];

const skills = [
  "Java",
  "Spring Boot",
  "Angular",
  "React",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Primefaces",
  "PostgreSQL",
  "MySQL",
  "Oracle",
  "Docker",
  "AWS EC2",
  "CI/CD",
  "Git",
  "RabbitMQ",
  "Jasper Reports",
  "Integrações Bancárias",
  "Microservices",
  "Clean Architecture",
  "Bitbucket",
  "Delphi",
];

export default function About() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/40 to-white py-24 text-slate-800 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 dark:text-slate-100"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.12),_transparent_55%)]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-amber-200/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 shadow-sm dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-200">
            Sobre mim
          </span>
          <h2 className="mt-6 text-3xl font-semibold md:text-4xl">
            Muito além de linhas de código
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            Tenho trajetória sólida entregando produtos digitais escaláveis para
            setores regulados e ambientes de missão crítica. Minha abordagem une
            estratégia, engenharia e empatia com as pessoas que usam o produto.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="space-y-10">
            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg shadow-amber-100/40 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-none">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Experiências principais
              </h3>

              <div className="mt-8 space-y-8">
                {timeline.map((item) => (
                  <article
                    key={item.company}
                    className="relative rounded-2xl border border-amber-200/70 bg-white/80 p-6 shadow-sm shadow-amber-100/30 backdrop-blur dark:border-amber-500/20 dark:bg-slate-900/60"
                  >
                    <span className="absolute left-4 top-0 h-1 w-16 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-400 dark:to-amber-200" />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                      <div>
                        <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                          {item.role}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {item.company}
                        </p>
                      </div>
                      <span className="rounded-full border border-amber-200/60 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                        {item.period}
                      </span>
                    </div>

                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-amber-400 dark:text-slate-300 dark:marker:text-amber-200">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-lg shadow-amber-100/30 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-none">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                O que move meu trabalho
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {focusAreas.map((area) => (
                  <div
                    key={area.title}
                    className="rounded-2xl border border-amber-200/70 bg-amber-50/60 p-4 text-sm text-slate-700 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100"
                  >
                    <h4 className="font-semibold text-amber-700 dark:text-amber-200">
                      {area.title}
                    </h4>
                    <p className="mt-2 text-slate-600 dark:text-amber-100/90">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-lg shadow-amber-100/30 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-none">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Habilidades técnicas
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-amber-200/70 bg-amber-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-lg shadow-amber-100/30 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-none">
                <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Formação
                </h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Técnico em Informática · Gestão de Projetos de TI
                  <br />
                  ETEC — Escola Técnica Estadual de São Paulo
                  <br />
                  2008 — 2009
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-lg shadow-amber-100/30 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-none">
                <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Idiomas
                </h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Português · Nativo
                  <br />
                  Inglês · Intermediário
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200/80 bg-amber-100/60 p-6 text-center shadow-lg shadow-amber-200/40 backdrop-blur dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
              <p className="text-sm text-amber-700 dark:text-amber-100">
                Gostaria de ver mais detalhes sobre minha carreira?
              </p>
              <a
                href="/Profile.pdf"
                download="Claudemir_Custodio_CV.pdf"
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-amber-500/30 transition-transform hover:-translate-y-0.5 hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 dark:border-amber-400/70 dark:bg-amber-400 dark:text-slate-900 dark:hover:bg-amber-300"
              >
                <Download className="h-4 w-4" aria-hidden />
                Baixar currículo (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
