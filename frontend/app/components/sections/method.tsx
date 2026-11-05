"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import SectionHeader from "../ui/section-header";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { metodo } from "@/lib/content";

export default function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="metodo" aria-labelledby="metodo-titulo" className="band-tinta section-y relative overflow-hidden">
      <div className="grid-planta pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeader numero="03" rotulo="Método" tituloId="metodo-titulo" titulo={metodo.titulo} lede={metodo.intro} tom="escuro" />

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-[19px] top-0 h-full w-px bg-traco md:left-0 md:right-0 md:top-[19px] md:h-px md:w-full" aria-hidden="true" />
          <motion.div
            className="absolute left-[19px] top-0 h-full w-px origin-top bg-mel md:hidden"
            style={{ scaleY: progresso }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-0 right-0 top-[19px] hidden h-px origin-left bg-mel md:block"
            style={{ scaleX: progresso }}
            aria-hidden="true"
          />
          <RevealGroup as="ol" className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {metodo.etapas.map((e, i) => (
              <RevealItem as="li" key={e.titulo} className="relative pl-16 md:pl-0 md:pt-16">
                <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-planta bg-tinta font-mono text-xs text-claro">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-card text-[1.375rem] text-claro">{e.titulo}</h3>
                <p className="mt-3 max-w-[34ch] text-claro-suave">{e.texto}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
