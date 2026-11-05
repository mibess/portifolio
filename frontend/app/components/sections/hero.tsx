import { Fragment } from "react";
import Image from "next/image";
import { Download, Linkedin, MessageCircle } from "lucide-react";
import { SiGithub, SiWhatsapp } from "@icons-pack/react-simple-icons";
import HeroBackdrop from "../motion/hero-backdrop";
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
      <HeroBackdrop />
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
            <a href={contato.whatsappAgendar} target="_blank" rel="noopener noreferrer" className="btn btn-mel">
              <SiWhatsapp aria-hidden="true" />
              Agendar pelo WhatsApp
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

        <div className="entrada lg:col-span-5" style={atraso(240)}>
          {RETRATO ? <Retrato src={RETRATO} anos={anos} /> : <Ficha anos={anos} />}
        </div>
      </div>
    </section>
  );
}

/** Retrato da sessão de fotos, esmaecendo no fundo da cena, com a ficha resumida por cima da base. */
function Retrato({ src, anos }: { src: string; anos: number }) {
  const dados = [
    { k: "Desde", v: `${INICIO_CARREIRA} · ${anos} anos` },
    { k: "Stack", v: "Java · Spring · AWS" },
    { k: "Base", v: "Ribeirão Preto" },
  ];
  return (
    <figure className="relative mx-auto w-full max-w-[460px] lg:mr-0">
      <div className="retrato-mascara relative aspect-[4/5] w-full">
        <Image
          src={src}
          alt={`Retrato de ${perfil.nome}`}
          fill
          preload
          quality={80}
          sizes="(min-width: 1024px) 460px, (min-width: 500px) 460px, 92vw"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="relative -mt-24 px-2 sm:px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="t-card text-[1.375rem] text-claro">{perfil.nome}</p>
            <p className="mt-1 font-mono text-xs text-claro-suave">Arquitetura Java & Cloud · Mentoria técnica</p>
          </div>
          <span className="flex flex-none items-center gap-2 font-mono text-xs text-mel">
            <span className="h-1.5 w-1.5 animate-[pulso_2.4s_ease-in-out_infinite] rounded-full bg-mel" aria-hidden="true" />
            Disponível
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)_minmax(0,0.95fr)] gap-px overflow-hidden rounded border border-traco bg-traco">
          {dados.map((d) => (
            <div key={d.k} className="min-w-0 bg-noite/85 px-3 py-2.5 backdrop-blur-sm">
              <dt className="t-eyebrow text-claro-suave">{d.k}</dt>
              <dd className="mt-1 truncate text-[13px] text-claro">{d.v}</dd>
            </div>
          ))}
        </dl>
      </figcaption>
    </figure>
  );
}

/** Ficha técnica usada quando não há retrato. */
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
    </figure>
  );
}
