// app/page.tsx
"use client";

import Image from "next/image";
import {
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  Download,
  Sparkles,
} from "lucide-react";
import About from "./components/about";
import Projects from "./components/projects";
import ProjectStories from "./components/project-stories";
import Contact from "./components/contact";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  const coverSrc = "/cover.png";
  const profileSrc = "/profile.png";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return <LoadingScreen />;
  }

  const stats = [
    {
      value: "14 anos",
      label: "de experiência com Java, HTML, CSS e JavaScript",
    },
    {
      value: "12 anos",
      label: "orquestrando integrações bancárias e relatórios com Jasper Reports",
    },
    {
      value: "3 anos",
      label: "guiando migração para AWS EC2 com Docker e pipelines CI/CD",
    },
  ];

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/claudemircustodio",
      label: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" aria-hidden />,
    },
    {
      href: "https://github.com/mibess",
      label: "GitHub",
      icon: <Github className="h-4 w-4" aria-hidden />,
    },
    {
      href: "https://www.instagram.com/csilverios/",
      label: "Instagram",
      icon: <Instagram className="h-4 w-4" aria-hidden />,
    },
  ];

  return (
    <>

      <ProjectStories />

      <section
        id="inicio"
        className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-slate-100 py-12 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100"
      >
        <div className="absolute inset-0 -z-20">
          <Image
            src={coverSrc}
            alt="Padrão abstrato como textura de fundo"
            fill
            priority
            className="object-cover opacity-30 mix-blend-luminosity dark:opacity-25"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(252,211,77,0.25),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(253,230,138,0.15),_transparent_55%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-white/80 via-transparent to-amber-100/40 dark:from-slate-950/80 dark:via-slate-900/40 dark:to-amber-500/10 backdrop-blur-[2px]" />

        <div className="container relative mx-auto px-4">
          <div className="space-y-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm backdrop-blur dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              <Sparkles className="h-4 w-4 animate-pulse" aria-hidden />
              Java · Spring Boot · Angular · CI/CD · Inteligência Artificial
            </span>

            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Olá, eu sou Claudemir Custódio.
                <div className="block text-transparent bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text dark:from-amber-400 dark:to-amber-200">
                  Desenvolvedor Full Stack.
                </div>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
                Com foco em microsserviços Java e frontends modernos.
                Hoje fortaleço os sistemas de clientes com Spring Boot, Angular e Oracle.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#projetos"
                className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Ver projetos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/Profile.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-6 py-3 text-sm font-semibold text-amber-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 dark:border-amber-500/40 dark:bg-transparent dark:text-amber-200 dark:hover:border-amber-400 dark:hover:bg-amber-400/10"
              >
                <Download className="h-4 w-4" aria-hidden />
                Baixar Currículo
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                Vamos nos conectar:
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/70 bg-white/80 text-amber-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white hover:text-amber-500 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:border-amber-400 dark:hover:bg-amber-400/10"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/60 bg-white/70 p-6 text-slate-700 shadow-lg shadow-amber-100/40 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200"
                >
                  <p className="text-3xl font-semibold text-amber-600 dark:text-amber-400">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section
        aria-labelledby="professional-radar-title"
        className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 text-white"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(253,230,138,0.18),_transparent_55%)] opacity-60" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(15,23,42,0.65),_transparent_60%)]" />
        <div className="container relative mx-auto grid gap-16 px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-10 bg-amber-500/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-8 shadow-2xl shadow-amber-500/20 backdrop-blur-xl">
              <div className="relative w-full overflow-hidden">
                <Image
                  src={profileSrc}
                  alt="Foto de Claudemir Custódio"
                  width={420}
                  height={420}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
                Claudemir Custódio
              </p>
              <p className="mt-2 text-center text-xs text-slate-200/80">
                Desenvolvedor · FullStack · JAVA
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                Radar profissional
              </span>
              <h2
                id="professional-radar-title"
                className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl"
              >
                Fortalecendo microsserviços Java e plataformas web
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200">
                Na AMcom, alocado à CCEE, evoluo microsserviços críticos com Java, Spring Boot e Oracle,
                além de interfaces Angular voltadas à performance. Foram 13 anos entregando
                soluções completas para sindicatos e associações, com integrações bancárias, PIX e módulos
                financeiros. Atuo conectando backend, frontend responsivo e entrega contínua confiável.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-amber-100">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                Java & Spring Boot
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                Angular & React
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                Integrações
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                CI/CD & AWS
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                Inteligência Artificial
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-inner shadow-amber-500/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">
                  Agora
                </p>
                <p className="mt-3 text-sm text-slate-100">
                  Entregando novas funcionalidades e otimizações em microsserviços da CCEE, com Java,
                  Spring Boot, Oracle e Angular alinhados às rotinas regulatórias do setor elétrico.
                </p>
              </div>
              
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-inner shadow-amber-500/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">
                  Próximo passo
                </p>
                <p className="mt-3 text-sm text-slate-100">
                  Se tornar especialista e acelerar roadmaps que precisem de microsserviços robustos, frontends modernos e
                  governança CI/CD para escala e observabilidade.
                </p>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-inner shadow-amber-500/10 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">
                  Disponibilidade
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-100">
                  <li>- Evolução de microsserviços Java/Spring Boot e camadas web com Angular ou React.</li>
                  <li>- Consultorias em integrações bancárias, cobrança automática e PIX.</li>
                  <li>- Migrações para AWS EC2 com Docker, Git e pipelines de integração contínua.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:c.silverio@live.com"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-white/20 transition-all hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Vamos falar sobre o seu projeto
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="/Profile.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              >
                Baixar currículo
                <Download className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto">
        <About />
        <Projects />
        <Contact />
      </section>
    </>
  );
}
