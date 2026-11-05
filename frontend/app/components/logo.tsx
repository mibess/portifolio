import { cn } from "@/lib/utils";

/** Logo tipográfica "mibess" (direção D: Assinatura). Provisória até a escolha final da logo. */
export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("logo-wordmark", className)} role="img" aria-label="mibess">
      <span aria-hidden="true">
        m
        <span className="logo-i">
          ı<span className="logo-sq" />
        </span>
        bess
      </span>
    </span>
  );
}
