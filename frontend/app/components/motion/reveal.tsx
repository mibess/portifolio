"use client";

import { motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const tags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  ul: motion.ul,
  ol: motion.ol,
  header: motion.header,
  p: motion.p,
} as const;

type Tag = keyof typeof tags;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
  id?: string;
}

/** Revela o conteúdo ao entrar na tela: sobe 24 px e ganha foco. Respeita movimento reduzido via MotionConfig. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div", id }: RevealProps) {
  const Comp = tags[as];
  return (
    <Comp
      id={id}
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

const grupo: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Grupo que revela os filhos em sequência (70 ms entre itens). */
export function RevealGroup({ children, className, as = "div" }: Omit<RevealProps, "delay" | "y">) {
  const Comp = tags[as];
  return (
    <Comp
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={grupo}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<RevealProps, "delay" | "y">) {
  const Comp = tags[as];
  return (
    <Comp data-reveal="" className={className} variants={item}>
      {children}
    </Comp>
  );
}
