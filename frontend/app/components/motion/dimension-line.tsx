"use client";

import { useEffect, useRef } from "react";

interface DimensionLineProps {
  inicio: string;
  fim: string;
}

/** Linha de cota (como em planta técnica) que se desenha entre dois marcos. */
export default function DimensionLine({ inicio, fim }: DimensionLineProps) {
  const linhaRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const linha = linhaRef.current;
    if (!linha || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const len = 1000;
    linha.style.strokeDasharray = String(len);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        linha.style.transition = "none";
        linha.style.strokeDashoffset = String(len);
        linha.getBoundingClientRect();
        linha.style.transition = "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)";
        linha.style.strokeDashoffset = "0";
      },
      { rootMargin: "0px 0px 12% 0px" },
    );
    io.observe(linha);
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full">
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="block h-6 w-full" aria-hidden="true">
        <line x1="1" y1="6" x2="1" y2="34" className="stroke-planta/50" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="999" y1="6" x2="999" y2="34" className="stroke-planta/50" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line ref={linhaRef} x1="0" y1="20" x2="1000" y2="20" className="stroke-planta" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between font-mono text-xs text-claro-suave">
        <span>{inicio}</span>
        <span>{fim}</span>
      </div>
    </div>
  );
}
