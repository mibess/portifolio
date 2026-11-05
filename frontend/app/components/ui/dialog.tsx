"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useTravaDeRolagem } from "@/lib/scroll-lock";
import { cn } from "@/lib/utils";

interface DialogProps {
  aberto: boolean;
  aoFechar: () => void;
  tituloId: string;
  children: React.ReactNode;
  className?: string;
}

const FOCAVEIS = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

/** Diálogo acessível: foco preso, Esc fecha, foco volta ao gatilho e a rolagem da página trava. */
export default function Dialog({ aberto, aoFechar, tituloId, children, className }: DialogProps) {
  const painelRef = useRef<HTMLDivElement>(null);
  const fecharRef = useRef(aoFechar);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);
  useEffect(() => {
    fecharRef.current = aoFechar;
  }, [aoFechar]);
  useTravaDeRolagem(aberto);

  useEffect(() => {
    if (!aberto) return;
    const anterior = document.activeElement as HTMLElement | null;
    const focaveis = () => Array.from(painelRef.current?.querySelectorAll<HTMLElement>(FOCAVEIS) ?? []);
    const raf = requestAnimationFrame(() => (focaveis()[0] ?? painelRef.current)?.focus({ preventScroll: true }));

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        fecharRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const lista = focaveis();
      if (!lista.length) return;
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", aoTeclar);
      anterior?.focus?.({ preventScroll: true });
    };
  }, [aberto]);

  if (!montado) return null;

  return createPortal(
    <AnimatePresence>
      {aberto ? (
        <motion.div
          key="dialogo"
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-noite/85 backdrop-blur-sm" onClick={() => fecharRef.current()} aria-hidden="true" />
          <motion.div
            ref={painelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={tituloId}
            tabIndex={-1}
            data-lenis-prevent=""
            className={cn(
              "relative z-10 max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-lg sm:rounded-lg focus:outline-none",
              className,
            )}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
