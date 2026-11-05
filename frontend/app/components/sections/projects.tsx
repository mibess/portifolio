"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Play, X } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import SectionHeader from "../ui/section-header";
import Dialog from "../ui/dialog";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { projectsData, type ProjectInfo } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [aberto, setAberto] = useState<ProjectInfo | null>(null);
  const fechar = useCallback(() => setAberto(null), []);
  const destaques = projectsData.filter((p) => p.featured);
  const outros = projectsData.filter((p) => !p.featured);

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="band-papel section-y">
      <div className="container-site">
        <SectionHeader
          numero="06"
          rotulo="Projetos autorais"
          tituloId="projetos-titulo"
          titulo="Projetos autorais"
          lede="Produtos que construo de ponta a ponta para explorar arquiteturas, testar ideias e manter a mão no código."
        />

        <RevealGroup as="ul" className="mt-14 grid gap-5 md:grid-cols-3">
          {destaques.map((p) => (
            <RevealItem as="li" key={p.slug}>
              <CardProjeto projeto={p} aoAbrir={() => setAberto(p)} grande />
            </RevealItem>
          ))}
        </RevealGroup>

        <h3 className="t-eyebrow mt-14 text-planta-forte">Outros projetos</h3>
        <RevealGroup as="ul" className="sem-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {outros.map((p) => (
            <RevealItem as="li" key={p.slug} className="w-[78%] flex-none snap-start sm:w-auto">
              <CardProjeto projeto={p} aoAbrir={() => setAberto(p)} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Dialog aberto={Boolean(aberto)} aoFechar={fechar} tituloId="projeto-titulo" className="max-w-4xl bg-branco text-tinta">
        {aberto ? <DetalheProjeto projeto={aberto} aoFechar={fechar} /> : null}
      </Dialog>
    </section>
  );
}

function CardProjeto({ projeto, aoAbrir, grande = false }: { projeto: ProjectInfo; aoAbrir: () => void; grande?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const tocar = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !videoRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const v = videoRef.current;
    if (!v.src && projeto.videoUrl) v.src = projeto.videoUrl;
    v.play().catch(() => undefined);
  };
  const pausar = () => videoRef.current?.pause();
  const Titulo = grande ? "h3" : "h4";

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded border border-linha bg-branco transition-colors duration-300 hover:border-tinta/30"
      onPointerEnter={tocar}
      onPointerLeave={pausar}
    >
      <button type="button" onClick={aoAbrir} className="block text-left" aria-label={`Ver detalhes de ${projeto.title}`}>
        <motion.div layoutId={`midia-${projeto.slug}`} className="relative aspect-[16/10] overflow-hidden bg-nevoa">
          <Image
            src={projeto.imageUrl}
            alt=""
            fill
            sizes={grande ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 ease-saida group-hover:scale-[1.03]"
          />
          {projeto.videoUrl ? (
            <>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded bg-noite/80 px-2 py-1 font-mono text-[12px] text-claro">
                <Play className="h-3 w-3" aria-hidden="true" /> vídeo
              </span>
            </>
          ) : null}
        </motion.div>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <Titulo className={cn("t-card", grande ? "text-xl" : "text-lg")}>
          <button type="button" onClick={aoAbrir} className="link-sublinhado text-left">
            {projeto.title}
          </button>
        </Titulo>
        {grande ? <p className="mt-2 line-clamp-3 text-[15px] text-ardosia">{projeto.description}</p> : null}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {projeto.tags.slice(0, grande ? 4 : 3).map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        <Links projeto={projeto} className="mt-auto pt-5" />
      </div>
    </article>
  );
}

function Links({ projeto, className }: { projeto: ProjectInfo; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-x-5 gap-y-2 text-sm", className)}>
      {projeto.githubUrl ? (
        <a
          href={projeto.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 font-medium hover:text-planta-forte"
          aria-label={`Código de ${projeto.title} no GitHub`}
        >
          <SiGithub className="h-4 w-4" aria-hidden="true" /> Ver código
        </a>
      ) : null}
      {projeto.demoUrl ? (
        <a
          href={projeto.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 font-medium hover:text-planta-forte"
          aria-label={`Demonstração online de ${projeto.title}`}
        >
          Ver demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}

function DetalheProjeto({ projeto, aoFechar }: { projeto: ProjectInfo; aoFechar: () => void }) {
  return (
    <div>
      <motion.div layoutId={`midia-${projeto.slug}`} className="relative aspect-video overflow-hidden bg-noite">
        {projeto.videoUrl ? (
          <video
            src={projeto.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            controls
            poster={projeto.imageUrl}
            className="h-full w-full object-cover"
            aria-label={`Vídeo de demonstração de ${projeto.title}`}
          />
        ) : (
          <Image src={projeto.imageUrl} alt={`Capa do projeto ${projeto.title}`} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
        )}
      </motion.div>
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 id="projeto-titulo" className="t-card text-[1.75rem]">
            {projeto.title}
          </h3>
          <button
            type="button"
            onClick={aoFechar}
            className="grid h-11 w-11 flex-none place-items-center rounded border border-linha hover:border-tinta"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-4 max-w-[65ch] text-ardosia">{projeto.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {projeto.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        <Links projeto={projeto} className="mt-6 border-t border-linha pt-4" />
      </div>
    </div>
  );
}
