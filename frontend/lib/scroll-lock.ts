"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

let travas = 0;

/** Trava a rolagem da página (modais, menu, chat no celular) e pausa o scroll suave. */
export function travarRolagem() {
  travas += 1;
  if (travas === 1) {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.travado = "true";
    window.__lenis?.stop();
  }
}

export function liberarRolagem() {
  travas = Math.max(0, travas - 1);
  if (travas === 0) {
    document.documentElement.style.overflow = "";
    delete document.documentElement.dataset.travado;
    window.__lenis?.start();
  }
}

export function useTravaDeRolagem(ativo: boolean) {
  useEffect(() => {
    if (!ativo) return;
    travarRolagem();
    return () => liberarRolagem();
  }, [ativo]);
}
