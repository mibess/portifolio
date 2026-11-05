import { cn } from "@/lib/utils";
import { COR_MEL, LOGO_PATH, LOGO_PINGO, LOGO_VIEWBOX } from "@/lib/logo-path";

/**
 * Logo "mibess" (direção D: Assinatura): Archivo expandida convertida em curvas, com o pingo do "i" em mel.
 * As letras usam a cor do texto (currentColor). Arquivos para download em /public/brand.
 */
export default function Logo({ className, titulo = "mibess" }: { className?: string; titulo?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} role="img" aria-label={titulo} className={cn("inline-block h-[0.74em] w-auto align-baseline", className)}>
      <path fill="currentColor" d={LOGO_PATH} />
      <rect x={LOGO_PINGO.x} y={LOGO_PINGO.y} width={LOGO_PINGO.lado} height={LOGO_PINGO.lado} fill={COR_MEL} />
    </svg>
  );
}
