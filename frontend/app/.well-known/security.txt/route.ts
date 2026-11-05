import { siteMetadata } from "@/lib/site-metadata";
import { contato } from "@/lib/content";

/**
 * security.txt (RFC 9116): diz a equipes de segurança como reportar uma falha.
 * A data de validade é recalculada a cada 30 dias, então o arquivo nunca expira.
 */
export const dynamic = "force-static";
export const revalidate = 2_592_000;

export function GET() {
  const expira = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  const corpo = [
    `Contact: mailto:${contato.email}`,
    `Expires: ${expira}`,
    "Preferred-Languages: pt, en",
    `Canonical: ${siteMetadata.siteUrl}/.well-known/security.txt`,
    "",
  ].join("\n");
  return new Response(corpo, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
