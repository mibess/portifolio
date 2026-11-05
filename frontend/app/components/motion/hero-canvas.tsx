"use client";

import { useEffect, useRef } from "react";

interface Linha {
  y0: number;
  amp: number;
  freq: number;
  fase: number;
  vel: number;
  alfa: number;
  pulso: { p: number; v: number } | null;
}

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * Fundo do hero: grid de planta, células hexagonais e linhas que fluem com pulsos de mel.
 * Canvas 2D, pausa fora da tela e com a aba oculta; com movimento reduzido desenha um quadro estático.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let rodando = false;
    let visivel = true;
    const t0 = performance.now();
    let linhas: Linha[] = [];
    let hexes: { x: number; y: number; r: number }[] = [];

    const montar = () => {
      const n = w < 700 ? 16 : 26;
      linhas = Array.from({ length: n }, (_, i) => ({
        y0: h * 0.16 + h * 0.7 * (i / (n - 1)),
        amp: rnd(14, 40),
        freq: rnd(0.5, 1.2),
        fase: rnd(0, Math.PI * 2),
        vel: rnd(0.03, 0.07),
        alfa: rnd(0.1, 0.34),
        pulso: Math.random() < 0.32 ? { p: Math.random(), v: rnd(0.035, 0.07) } : null,
      }));
      const r = Math.max(26, Math.min(46, w / 30));
      const s3 = Math.sqrt(3);
      const cx = w * (w < 1024 ? 0.86 : 0.8);
      const cy = h * 0.52;
      const celulas = [[0, 0], [1, 0], [0.5, 1], [-0.5, 1], [0.5, -1], [1.5, -1], [1.5, 1], [2, 0]];
      hexes = celulas.map(([a, b]) => ({ x: cx + a * s3 * r, y: cy + b * 1.5 * r, r }));
    };

    const yEm = (l: Linha, x: number, t: number) => {
      let f = Math.max(0, 1 - Math.abs(x - 0.52) / 0.34);
      f = f * f * (3 - 2 * f);
      return l.y0 + Math.sin(x * Math.PI * 2 * l.freq + l.fase + t * l.vel * Math.PI * 2) * l.amp * f;
    };

    const desenhar = (agora: number) => {
      const t = (agora - t0) / 1000;
      const movel = w < 700;
      const k = movel ? 0.55 : 1;
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 24) {
        ctx.strokeStyle = `rgba(127,166,204,${(gx % 120 === 0 ? 0.07 : 0.03) * k})`;
        ctx.beginPath();
        ctx.moveTo(gx + 0.5, 0);
        ctx.lineTo(gx + 0.5, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += 24) {
        ctx.strokeStyle = `rgba(127,166,204,${(gy % 120 === 0 ? 0.07 : 0.03) * k})`;
        ctx.beginPath();
        ctx.moveTo(0, gy + 0.5);
        ctx.lineTo(w, gy + 0.5);
        ctx.stroke();
      }

      ctx.strokeStyle = `rgba(127,166,204,${0.3 * k})`;
      for (const hx of hexes) {
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const a = ((-90 + 60 * j) * Math.PI) / 180;
          const px = hx.x + hx.r * Math.cos(a);
          const py = hx.y + hx.r * Math.sin(a);
          if (j) ctx.lineTo(px, py);
          else ctx.moveTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }

      for (const l of linhas) {
        ctx.beginPath();
        for (let s = 0; s <= 90; s++) {
          const x = s / 90;
          const px = x * w;
          const py = yEm(l, x, t);
          if (s) ctx.lineTo(px, py);
          else ctx.moveTo(px, py);
        }
        const g = ctx.createLinearGradient(0, 0, w, 0);
        g.addColorStop(0, "rgba(127,166,204,0)");
        g.addColorStop(movel ? 0.15 : 0.4, `rgba(127,166,204,${l.alfa * k * 0.35})`);
        g.addColorStop(0.64, `rgba(127,166,204,${l.alfa * k})`);
        g.addColorStop(1, `rgba(127,166,204,${l.alfa * k * 0.7})`);
        ctx.strokeStyle = g;
        ctx.stroke();

        if (l.pulso) {
          const xx = 1 - ((l.pulso.p + t * l.pulso.v) % 1);
          const qx = xx * w;
          const qy = yEm(l, xx, t);
          const fade = Math.max(0, Math.min(1, (xx - 0.2) / 0.25));
          if (fade > 0) {
            const rg = ctx.createRadialGradient(qx, qy, 0, qx, qy, 12);
            rg.addColorStop(0, `rgba(244,169,60,${0.75 * fade * k})`);
            rg.addColorStop(1, "rgba(244,169,60,0)");
            ctx.fillStyle = rg;
            ctx.beginPath();
            ctx.arc(qx, qy, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(255,220,160,${fade * k})`;
            ctx.beginPath();
            ctx.arc(qx, qy, 1.7, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      const veu = ctx.createLinearGradient(0, 0, w * (movel ? 1 : 0.6), 0);
      veu.addColorStop(0, "rgba(7,17,28,0.88)");
      veu.addColorStop(1, "rgba(7,17,28,0)");
      ctx.fillStyle = veu;
      ctx.fillRect(0, 0, w, h);
    };

    const laco = (agora: number) => {
      desenhar(agora);
      if (rodando) raf = requestAnimationFrame(laco);
    };
    const iniciar = () => {
      if (reduzido || rodando || !visivel || document.hidden) return;
      rodando = true;
      raf = requestAnimationFrame(laco);
    };
    const parar = () => {
      rodando = false;
      cancelAnimationFrame(raf);
    };

    const redimensionar = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      montar();
      desenhar(performance.now());
    };

    const ro = new ResizeObserver(redimensionar);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) iniciar();
      else parar();
    });
    io.observe(canvas);
    const aoMudarVisibilidade = () => (document.hidden ? parar() : iniciar());
    document.addEventListener("visibilitychange", aoMudarVisibilidade);

    redimensionar();
    iniciar();

    return () => {
      parar();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />;
}
