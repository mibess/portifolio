import { Reveal } from "../motion/reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  numero: string;
  rotulo: string;
  titulo: React.ReactNode;
  tituloId: string;
  lede?: React.ReactNode;
  tom?: "claro" | "escuro";
  className?: string;
}

/** Abre cada seção com a chamada de corte numerada (como nas plantas técnicas), título e texto de apoio. */
export default function SectionHeader({ numero, rotulo, titulo, tituloId, lede, tom = "claro", className }: SectionHeaderProps) {
  const escuro = tom === "escuro";
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <div className={cn("callout mb-8", escuro ? "text-planta" : "text-planta-forte")}>
        <span className="callout-num">{numero}</span>
        <span className="t-eyebrow whitespace-nowrap">{rotulo}</span>
        <span className="callout-rule" />
      </div>
      <h2 id={tituloId} className="t-section">
        {titulo}
      </h2>
      {lede ? <p className={cn("t-lede mt-5 max-w-[60ch]", escuro ? "text-claro-suave" : "text-ardosia")}>{lede}</p> : null}
    </Reveal>
  );
}
