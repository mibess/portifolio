"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Contêiner com rolagem horizontal que só vira parada de teclado quando o conteúdo realmente transborda
 * (no celular, os diagramas dos cases). Assim quem navega pelo teclado consegue rolar, e no desktop
 * não sobra uma parada inútil.
 */
export default function RegiaoRolavel({ children, className, rotulo }: { children: React.ReactNode; className?: string; rotulo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rolavel, setRolavel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => setRolavel(el.scrollWidth > el.clientWidth + 1);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      tabIndex={rolavel ? 0 : undefined}
      role={rolavel ? "region" : undefined}
      aria-label={rolavel ? rotulo : undefined}
    >
      {children}
    </div>
  );
}
