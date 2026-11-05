"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RotatingWordsProps {
  words: readonly string[];
  className?: string;
  interval?: number;
}

/**
 * Troca as frases com deslize vertical e desfoque. Todas ficam na mesma célula de grid,
 * então a largura é reservada e o layout não salta (substitui o efeito de digitação).
 */
export default function RotatingWords({ words, className, interval = 2800 }: RotatingWordsProps) {
  const [indice, setIndice] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || words.length < 2) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: number | undefined;
    let visivel = false;

    const iniciar = () => {
      if (timer || !visivel || document.hidden) return;
      timer = window.setInterval(() => setIndice((v) => (v + 1) % words.length), reduzido ? 4000 : interval);
    };
    const parar = () => {
      window.clearInterval(timer);
      timer = undefined;
    };

    const io = new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting;
      if (visivel) iniciar();
      else parar();
    });
    io.observe(el);
    const aoMudarVisibilidade = () => (document.hidden ? parar() : iniciar());
    document.addEventListener("visibilitychange", aoMudarVisibilidade);

    return () => {
      parar();
      io.disconnect();
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
    };
  }, [words.length, interval]);

  const anterior = (indice - 1 + words.length) % words.length;

  return (
    <span ref={ref} className={cn("rot", className)} aria-hidden="true">
      {words.map((w, k) => (
        <span key={w} className={k === indice ? "on" : k === anterior ? "out" : undefined}>
          {w}
        </span>
      ))}
    </span>
  );
}
