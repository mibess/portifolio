"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ChevronDown } from "lucide-react";
import SectionHeader from "../ui/section-header";
import { Reveal, RevealGroup, RevealItem } from "../motion/reveal";
import { formacao, trajetoria } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="trajetoria" aria-labelledby="trajetoria-titulo" className="band-papel section-y">
      <div className="container-site">
        <SectionHeader numero="04" rotulo="Trajetória" tituloId="trajetoria-titulo" titulo="Trajetória profissional" />

        <div className="relative mt-14">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-linha" aria-hidden="true" />
          <motion.div className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-planta-forte" style={{ scaleY: progresso }} aria-hidden="true" />
          <ol ref={ref} className="relative space-y-6">
            {trajetoria.map((item, i) => (
              <Item key={item.company} item={item} atual={i === 0} />
            ))}
          </ol>
        </div>

        <Reveal className="mt-16">
          <h3 className="t-eyebrow text-planta-forte">Formação, idioma e base</h3>
        </Reveal>
        <RevealGroup as="ul" className="mt-5 grid gap-px overflow-hidden rounded border border-linha bg-linha sm:grid-cols-2 lg:grid-cols-4">
          {formacao.map((f) => (
            <RevealItem as="li" key={f.titulo} className="bg-branco p-5">
              <p className="font-mono text-xs text-ardosia">{f.periodo === f.tipo ? f.tipo : `${f.periodo} · ${f.tipo}`}</p>
              <p className="t-card mt-2 text-lg">{f.titulo}</p>
              <p className="mt-1 text-[15px] text-ardosia">{f.instituicao}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Item({ item, atual }: { item: (typeof trajetoria)[number]; atual: boolean }) {
  const [aberto, setAberto] = useState(false);
  const [primeiro, ...resto] = item.details;
  const idDetalhes = `detalhes-${item.company.split(" ")[0].toLowerCase()}`;

  return (
    <li className="relative pl-10 md:pl-14">
      <span
        className={cn(
          "absolute left-0 top-7 h-[15px] w-[15px] rounded-full border-2 bg-papel",
          atual ? "border-mel" : "border-planta-forte",
        )}
        aria-hidden="true"
      >
        {atual ? <span className="absolute inset-[3px] animate-[pulso_2.4s_ease-in-out_infinite] rounded-full bg-mel" /> : null}
      </span>
      <Reveal>
        <article className="rounded border border-linha bg-branco p-6 md:p-8">
          <div className="flex flex-col gap-2 border-b border-linha pb-5 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="t-card text-[1.5rem]">{item.company}</h3>
              <p className="mt-1 text-planta-forte">{item.role}</p>
            </div>
            <p className="font-mono text-sm text-ardosia">{item.period}</p>
          </div>
          <p className="mt-5 max-w-[75ch]">{primeiro}</p>

          {resto.length ? (
            <>
              <AnimatePresence initial={false}>
                {aberto ? (
                  <motion.ul
                    id={idDetalhes}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-[75ch] overflow-hidden"
                  >
                    {resto.map((d) => (
                      <li key={d} className="relative mt-4 pl-5 text-ardosia">
                        <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-planta-forte" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </motion.ul>
                ) : null}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => setAberto((v) => !v)}
                aria-expanded={aberto}
                aria-controls={idDetalhes}
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-planta-forte hover:text-tinta"
              >
                {aberto ? "Ver menos" : `Ver detalhes (${resto.length})`}
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", aberto && "rotate-180")} aria-hidden="true" />
              </button>
            </>
          ) : null}
        </article>
      </Reveal>
    </li>
  );
}
