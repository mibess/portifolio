"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
}

/**
 * Conta de 0 até o valor quando o número se aproxima da tela.
 * O HTML do servidor já traz o valor final (sem JS e para buscadores o número está correto).
 */
export default function CountUp({ value, duration = 1200, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let feito = false;

    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting || feito) return;
        feito = true;
        io.disconnect();
        const inicio = performance.now();
        el.textContent = "0";
        const passo = (agora: number) => {
          const k = Math.min(1, (agora - inicio) / duration);
          const suave = 1 - Math.pow(1 - k, 3);
          el.textContent = String(Math.round(suave * value));
          if (k < 1) raf = requestAnimationFrame(passo);
        };
        raf = requestAnimationFrame(passo);
      },
      { rootMargin: "0px 0px 12% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(value);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
