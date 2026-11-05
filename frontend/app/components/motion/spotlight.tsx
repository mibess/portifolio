"use client";

import { cn } from "@/lib/utils";

/** Card com uma luz suave em mel que segue o cursor (só com mouse). */
export default function Spotlight({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const mover = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tag className={cn("spotlight", className)} onPointerMove={mover}>
      {children}
    </Tag>
  );
}
