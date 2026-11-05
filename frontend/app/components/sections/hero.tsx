import { Fragment } from "react";
import Image from "next/image";
import { ArrowRight, Download, Linkedin, MessageCircle } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import HeroCanvas from "../motion/hero-canvas";
import RotatingWords from "../motion/rotating-words";
import { RETRATO, bio, contato, perfil, INICIO_CARREIRA } from "@/lib/content";

const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;

const palavras = perfil.tituloInicio.join(" ").split(" ");

export default function Hero({ anos }: { anos: number }) {
  const redes = [
    { href: contato.linkedin, label: "LinkedIn de Claudemir Custódio", icon: <Linkedin className="h-5 w-5" /> },
    { href: contato.github, label: "GitHub de Claudemir Custódio", icon: <SiGithub className="h-5 w-5" /> },
    { href: contato.whatsappUrl, label: "WhatsApp de Claudemir Custódio", icon: <MessageCircle className="h-5 w-5" /> },
  ];

  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="band-noite relative isolate overflow-hidden">
      <HeroCanvas />
      <div className="container-site grid items-center gap-14 pb-[clamp(4rem,8vw,7rem)] pt-[calc(72px+clamp(2.5rem,6vw,5rem))] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="t-eyebrow entrada text-planta" style={atraso(0)}>
            {perfil.papel}
          </p>

          <h1 id="hero-titulo" className="t-display mt-6 text-[clamp(2.4rem,5.2vw,4.6rem)]">
            <span className="sr-only">
              {perfil.tituloInicio.join(" ")} {perfil.frases.join(", ")}
            </span>
            <span aria-hidden="true">
              {palavras.map((p, i) => (
                <Fragment key={`${p}-${i}`}>
                  <span className="palavra">
                    <span className="entrada-mascara" style={atraso(80 + i * 60)}>
                      {p}
                    </span>
                  </span>{" "}
                </Fragment>
              ))}
              <span className="linha">
                <span className="entrada-mascara" style={atraso(80 + palavras.length * 60)}>
                  <RotatingWords words={perfil.frases} className="text-mel" />
                </span>
              </span>
            </span>
          </h1>

          <p className="t-lede entrada mt-8 max-w-[56ch] text-claro-suave" style={atraso(360)}>
            {bio(anos)}
          </p>

          <div className="entrada mt-10 flex flex-wrap items-center gap-3" style={atraso(460)}>
            <a href="#contato" className="btn btn-mel">
              Agendar conversa
              <ArrowRight aria-hidden="true" />
            </a>
            <a href={contato.curriculo} download className="btn btn-linha-escuro">
              Baixar currículo
              <Download aria-hidden="true" />
            </a>
          </div>

          <ul className="entrada mt-10 flex items-center gap-2" style={atraso(560)}>
            {redes.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.label}
                  className="grid h-11 w-11 place-items-center rounded border border-transparent text-claro-suave transition-colors duration-300 hover:border-traco hover:text-claro"
                >
                  {r.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="entrada lg:col-span-5" style={atraso(420)}>
          <Ficha anos={anos} />
        </div>
      </div>
    </section>
  );
}

function Ficha({ anos }: { anos: number }) {
  const linhas = [
    { k: "Nome", v: perfil.nome },
    { k: "Atuação", v: "Arquitetura Java & Cloud · Mentoria técnica" },
    { k: "Experiência", v: `desde ${INICIO_CARREIRA} · ${anos} anos` },
    { k: "Stack", v: perfil.stack },
    { k: "Base", v: contato.local },
  ];

  return (
    <figure className="relative overflow-hidden rounded border border-traco bg-tinta/80 backdrop-blur-sm">
      {RETRATO ? (
        <div className="relative aspect-[4/5] w-full">
          <Image src={RETRATO} alt={`Retrato de ${perfil.nome}`} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
      ) : null}
      <div className="flex items-center justify-between border-b border-traco px-5 py-3">
        <span className="t-eyebrow text-claro-suave">Ficha técnica</span>
        <span className="flex items-center gap-2 font-mono text-xs text-mel">
          <span className="h-1.5 w-1.5 animate-[pulso_2.4s_ease-in-out_infinite] rounded-full bg-mel" aria-hidden="true" />
          Disponível
        </span>
      </div>
      <dl className="divide-y divide-traco">
        {linhas.map((l) => (
          <div key={l.k} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 px-5 py-3.5">
            <dt className="t-eyebrow pt-0.5 text-claro-suave">{l.k}</dt>
            <dd className="text-[15px] text-claro">{l.v}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="border-t border-traco px-5 py-5 text-[15px] leading-relaxed text-claro-suave">
        <span className="text-claro">{perfil.apresentacao}</span> {perfil.crenca}
      </figcaption>
    </figure>
  );
}
