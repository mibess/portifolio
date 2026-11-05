"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

/** Aproxima levemente o elemento do cursor (até 8 px). Desligado com movimento reduzido. */
export default function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });

  const mover = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduzido || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-8, Math.min(8, dx * 0.18)));
    y.set(Math.max(-8, Math.min(8, dy * 0.25)));
  };
  const soltar = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={mover}
      onPointerLeave={soltar}
    >
      {children}
    </motion.div>
  );
}
