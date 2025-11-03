// components/Contact.tsx
import React from "react";
import {
  Mail,
  Linkedin,
  Github,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

const contactOptions = [
  {
    label: "E-mail",
    href: "mailto:c.silverio@live.com",
    description: "Retorno em até 24h com agenda e próximos passos.",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/claudemircustodio",
    description: "Vamos falar sobre carreira, desafios técnicos e liderança.",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/mibess",
    description: "Analise meu código, abra uma issue ou proponha colaboração.",
    icon: Github,
  },
];

const availability = [
  "Projetos de transformação digital e squads ágeis.",
  "Consultoria técnica focada em arquitetura e performance.",
  "Mentorias e apoio para times que precisam de liderança técnica.",
];

const followUp = [
  "Entendimento do contexto e objetivos do projeto.",
  "Proposta de caminhos técnicos e estimativa inicial.",
  "Kick-off com plano de ação alinhado com stakeholders.",
];

export default function Contact() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/40 to-white py-24 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(254,240,138,0.15),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.12),_transparent_55%)]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-amber-200/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 shadow-sm dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-200">
            Contato
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
            Vamos construir algo impactante
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Aberto a novas oportunidades, projetos sob demanda e parcerias de
            longo prazo. Escolha o canal que preferir e vamos conversar.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.8fr)]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-10 shadow-xl shadow-amber-100/40 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-none">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Escolha o melhor canal para você
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Respondo pessoalmente e costumo agendar uma call rápida para
              entender contexto, expectativas e próximos passos.
            </p>

            <div className="mt-10 space-y-4">
              {contactOptions.map(({ label, href, description, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-slate-200/70 bg-white/80 px-5 py-4 shadow-sm shadow-amber-100/40 transition-all hover:-translate-y-1 hover:border-amber-300/70 hover:shadow-amber-200/70 dark:border-slate-800/60 dark:bg-slate-900/70"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100/80 text-amber-600 shadow-inner shadow-amber-200/70 transition-all group-hover:bg-amber-500 group-hover:text-white dark:bg-amber-500/20 dark:text-amber-200 dark:group-hover:bg-amber-400/30">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {label}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-amber-500 transition-transform group-hover:translate-x-1 dark:text-amber-200" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-amber-200/70 bg-amber-50/80 p-8 shadow-lg shadow-amber-100/40 backdrop-blur dark:border-amber-500/30 dark:bg-amber-500/10">
              <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-100">
                Como posso ajudar agora
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-amber-700/90 dark:text-amber-100">
                {availability.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-amber-500 dark:text-amber-200" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-900/20 bg-slate-900 p-8 text-white shadow-2xl shadow-amber-500/20 dark:border-slate-700/60">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/30 blur-3xl" />
              <div className="absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="relative">
                <h3 className="text-lg font-semibold">
                  Alinhemos os próximos passos
                </h3>
                <p className="mt-3 text-sm text-slate-200">
                  Após o primeiro contato, envio um e-mail com possíveis horários
                  e uma pauta objetiva para nossa conversa.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-slate-100/90">
                  {followUp.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CalendarDays className="h-5 w-5 flex-shrink-0 text-amber-200" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:c.silverio@live.com"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-white"
                >
                  Iniciar conversa
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
