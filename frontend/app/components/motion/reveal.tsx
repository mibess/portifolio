import type { CSSProperties, ReactNode } from "react";

/**
 * Revelação ao rolar, feita com CSS e um único IntersectionObserver em script inline (ver `revelacao.ts`).
 * Os componentes são HTML puro: não entram na hidratação do React e funcionam mesmo se o JavaScript
 * do Next demorar ou falhar. Sem JavaScript, o conteúdo aparece direto (o CSS só esconde com a classe `js`).
 */

type Tag = "div" | "li" | "article" | "ul" | "ol" | "header" | "p";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos. */
  delay?: number;
  /** Deslocamento inicial em px. */
  y?: number;
  as?: Tag;
  id?: string;
}

/** Revela o bloco ao entrar na tela: sobe 24 px e ganha foco. */
export function Reveal({ children, className, delay = 0, y = 24, as: Comp = "div", id }: RevealProps) {
  const estilo = { "--revelar-atraso": `${Math.round(delay * 1000)}ms`, "--revelar-y": `${y}px` } as CSSProperties;
  return (
    <Comp id={id} data-reveal="" data-reveal-foco="" className={className} style={estilo}>
      {children}
    </Comp>
  );
}

/** Grupo que revela os itens em sequência (70 ms entre eles) quando entra na tela. */
export function RevealGroup({ children, className, as: Comp = "div" }: Omit<RevealProps, "delay" | "y">) {
  return (
    <Comp data-reveal-grupo="" className={className}>
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as: Comp = "div" }: Omit<RevealProps, "delay" | "y">) {
  return (
    <Comp data-reveal="" className={className}>
      {children}
    </Comp>
  );
}
