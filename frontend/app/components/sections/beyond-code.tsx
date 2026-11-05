"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeader from "../ui/section-header";
import Dialog from "../ui/dialog";
import { Reveal } from "../motion/reveal";
import { alemDoCodigo } from "@/lib/content";
import { fotosPessoais } from "@/lib/personal-data";

export default function BeyondCode() {
  const [indice, setIndice] = useState<number | null>(null);
  const trilhoRef = useRef<HTMLUListElement>(null);
  const arraste = useRef({ ativo: false, x: 0, scroll: 0, moveu: false });

  const fechar = useCallback(() => setIndice(null), []);
  const total = fotosPessoais.length;
  const passo = useCallback((d: number) => setIndice((i) => (i === null ? i : (i + d + total) % total)), [total]);

  useEffect(() => {
    if (indice === null) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") passo(1);
      if (e.key === "ArrowLeft") passo(-1);
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [indice, passo]);

  const rolar = (d: number) => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const card = trilho.querySelector("li");
    trilho.scrollBy({ left: d * ((card?.clientWidth ?? 300) + 20), behavior: "smooth" });
  };

  // Arrastar com o mouse (no toque, a rolagem nativa já resolve)
  const iniciarArraste = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !trilhoRef.current) return;
    arraste.current = { ativo: true, x: e.clientX, scroll: trilhoRef.current.scrollLeft, moveu: false };
  };
  const moverArraste = (e: React.PointerEvent<HTMLUListElement>) => {
    const a = arraste.current;
    if (!a.ativo || !trilhoRef.current) return;
    const dx = e.clientX - a.x;
    if (Math.abs(dx) > 4) a.moveu = true;
    trilhoRef.current.scrollLeft = a.scroll - dx;
  };
  const encerrarArraste = () => {
    arraste.current.ativo = false;
  };

  const foto = indice === null ? null : fotosPessoais[indice];

  return (
    <section id="alem-do-codigo" aria-labelledby="alem-titulo" className="band-noite section-y overflow-hidden">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              numero="07"
              rotulo={alemDoCodigo.subtitulo}
              tituloId="alem-titulo"
              titulo={alemDoCodigo.titulo}
              tom="escuro"
            />
          </div>
          <Reveal className="space-y-4 text-claro-suave lg:col-span-5" delay={0.1}>
            {alemDoCodigo.manifesto.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
          <p className="font-mono text-xs text-claro-suave">Arraste ou use as setas · toque numa foto para ler a história</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => rolar(-1)}
              className="grid h-11 w-11 place-items-center rounded border border-traco text-claro hover:border-planta"
              aria-label="Fotos anteriores"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => rolar(1)}
              className="grid h-11 w-11 place-items-center rounded border border-traco text-claro hover:border-planta"
              aria-label="Próximas fotos"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={trilhoRef}
        className="sem-scrollbar mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scroll-padding-inline:max(1.25rem,calc((100vw-1240px)/2+2rem))] md:cursor-grab"
        style={{ paddingInline: "max(1.25rem, calc((100vw - 1240px) / 2 + 2rem))" }}
        onPointerDown={iniciarArraste}
        onPointerMove={moverArraste}
        onPointerUp={encerrarArraste}
        onPointerLeave={encerrarArraste}
      >
        {fotosPessoais.map((f, i) => (
          <li key={f.id} className="w-[72vw] max-w-[320px] flex-none snap-start sm:w-[300px]">
            <button
              type="button"
              className="group block w-full text-left"
              onClick={(e) => {
                if (arraste.current.moveu) {
                  e.preventDefault();
                  arraste.current.moveu = false;
                  return;
                }
                setIndice(i);
              }}
              aria-label={`${f.legenda}: abrir foto`}
            >
              <motion.div layoutId={`foto-${f.id}`} className="relative aspect-[3/4] overflow-hidden rounded bg-tinta">
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  quality={80}
                  draggable={false}
                  sizes="(min-width: 640px) 300px, 72vw"
                  className="object-cover saturate-[.92] transition-transform duration-700 ease-saida group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-noite/85 to-transparent" aria-hidden="true" />
              </motion.div>
              <span className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[15px] font-medium text-claro">{f.legenda}</span>
                <span className="font-mono text-xs text-claro-suave">{String(i + 1).padStart(2, "0")}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog aberto={foto !== null} aoFechar={fechar} tituloId="foto-titulo" className="max-w-5xl bg-tinta text-claro">
        {foto && indice !== null ? (
          <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <motion.div layoutId={`foto-${foto.id}`} className="relative aspect-[3/4] max-h-[58dvh] w-full bg-noite md:max-h-none">
              <Image src={foto.src} alt={foto.alt} fill quality={90} sizes="(min-width: 768px) 55vw, 100vw" className="object-contain" />
            </motion.div>
            <div className="flex flex-col p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs text-claro-suave">
                  {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
                <button
                  type="button"
                  onClick={fechar}
                  className="grid h-11 w-11 flex-none place-items-center rounded border border-traco hover:border-planta"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <h3 id="foto-titulo" className="t-card mt-4 text-[1.5rem]">
                {foto.legenda}
              </h3>
              <p className="mt-4 leading-relaxed text-claro-suave">{foto.description}</p>
              <div className="mt-auto flex gap-2 pt-8">
                <button
                  type="button"
                  onClick={() => passo(-1)}
                  className="inline-flex min-h-11 items-center gap-2 rounded border border-traco px-4 hover:border-planta"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Anterior
                </button>
                <button
                  type="button"
                  onClick={() => passo(1)}
                  className="inline-flex min-h-11 items-center gap-2 rounded border border-traco px-4 hover:border-planta"
                >
                  Próxima <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Dialog>
    </section>
  );
}
