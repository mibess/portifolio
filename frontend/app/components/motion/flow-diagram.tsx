"use client";

import { useEffect, useRef } from "react";

export interface FlowNode {
  x: number;
  y: number;
  w: number;
  h: number;
  titulo: string;
  sub?: string;
  destaque?: boolean;
}

export interface FlowLink {
  d: string;
  /** Também envia pulsos no sentido contrário (ex.: retorno do banco). */
  volta?: boolean;
}

interface FlowDiagramProps {
  largura: number;
  altura: number;
  nos: FlowNode[];
  ligacoes: FlowLink[];
  rotulo: string;
  tom?: "claro" | "escuro";
}

/**
 * Diagrama de arquitetura com dados fluindo: as linhas se desenham na primeira vez que aparecem
 * e pulsos percorrem as conexões enquanto o diagrama está na tela.
 */
export default function FlowDiagram({ largura, altura, nos, ligacoes, rotulo, tom = "claro" }: FlowDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pulsosRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const grupo = pulsosRef.current;
    if (!svg || !grupo) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const caminhos = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-link]"));
    const NS = "http://www.w3.org/2000/svg";

    type Pulso = { el: SVGCircleElement; path: SVGPathElement; len: number; t: number; dir: 1 | -1; v: number };
    const pulsos: Pulso[] = [];
    caminhos.forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = "0";
      const sentidos: (1 | -1)[] = p.dataset.volta === "true" ? [1, -1] : [1];
      sentidos.forEach((dir, j) => {
        const el = document.createElementNS(NS, "circle");
        el.setAttribute("r", "3.5");
        el.setAttribute("class", dir === 1 ? "fill-mel" : tom === "claro" ? "fill-planta-forte" : "fill-planta");
        grupo.appendChild(el);
        pulsos.push({ el, path: p, len, t: (i * 0.17 + j * 0.5) % 1, dir, v: 0.16 + ((i * 37) % 10) / 100 });
      });
    });

    const posicionar = () => {
      for (const q of pulsos) {
        const pos = q.path.getPointAtLength((q.dir === 1 ? q.t : 1 - q.t) * q.len);
        q.el.setAttribute("cx", String(pos.x));
        q.el.setAttribute("cy", String(pos.y));
      }
    };
    posicionar();

    let raf = 0;
    let rodando = false;
    let ultimo = 0;
    const laco = (agora: number) => {
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;
      for (const q of pulsos) q.t = (q.t + dt * q.v) % 1;
      posicionar();
      if (rodando) raf = requestAnimationFrame(laco);
    };
    const iniciar = () => {
      if (reduzido || rodando || document.hidden) return;
      rodando = true;
      ultimo = performance.now();
      raf = requestAnimationFrame(laco);
    };
    const parar = () => {
      rodando = false;
      cancelAnimationFrame(raf);
    };

    const desenharLinhas = () => {
      if (reduzido) return;
      caminhos.forEach((p, i) => {
        const len = p.getTotalLength();
        p.style.transition = "none";
        p.style.strokeDashoffset = String(len);
        p.getBoundingClientRect();
        p.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1) ${i * 0.07}s`;
        p.style.strokeDashoffset = "0";
      });
    };

    let desenhado = false;
    let visivel = false;
    const io = new IntersectionObserver(
      ([e]) => {
        visivel = e.isIntersecting;
        if (visivel) {
          if (!desenhado) {
            desenhado = true;
            desenharLinhas();
          }
          iniciar();
        } else parar();
      },
      { threshold: 0.25 },
    );
    io.observe(svg);
    const aoMudarVisibilidade = () => (document.hidden ? parar() : visivel && iniciar());
    document.addEventListener("visibilitychange", aoMudarVisibilidade);

    return () => {
      parar();
      io.disconnect();
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      grupo.replaceChildren();
    };
  }, [tom]);

  const escuro = tom === "escuro";

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${largura} ${altura}`}
      role="img"
      aria-label={rotulo}
      className="mx-auto block h-auto w-full min-w-[360px] max-w-[460px]"
    >
      {ligacoes.map((l, i) => (
        <path
          key={i}
          data-link=""
          data-volta={l.volta ? "true" : undefined}
          d={l.d}
          className={`flow-link ${escuro ? "stroke-planta/55" : "stroke-planta-forte/45"}`}
        />
      ))}
      <g ref={pulsosRef} />
      {nos.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height={n.h}
            rx={4}
            className={
              escuro
                ? n.destaque
                  ? "fill-grafite stroke-planta"
                  : "fill-grafite stroke-traco"
                : n.destaque
                  ? "fill-branco stroke-tinta"
                  : "fill-branco stroke-linha"
            }
          />
          <text
            x={n.x + 12}
            y={n.sub ? n.y + n.h / 2 - 3 : n.y + n.h / 2 + 5}
            className={`font-sans text-[14px] font-semibold ${escuro ? "fill-claro" : "fill-tinta"}`}
          >
            {n.titulo}
          </text>
          {n.sub ? (
            <text
              x={n.x + 12}
              y={n.y + n.h / 2 + 15}
              className={`font-mono text-[12px] ${escuro ? "fill-claro-suave" : "fill-ardosia"}`}
            >
              {n.sub}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}
