import type { NextConfig } from "next";

const producao = process.env.NODE_ENV === "production";

/**
 * Política de conteúdo: tudo vem do próprio domínio (fontes, imagens, vídeos, PDFs e a API do chat).
 * 'unsafe-inline' é exigido pelos scripts de hidratação do Next em páginas estáticas; o ganho real está
 * em bloquear origens externas, frames e envio de dados para outros domínios.
 * Só vale em produção: o modo de desenvolvimento precisa de eval e WebSocket.
 */
const politicaDeConteudo = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const cabecalhosDeSeguranca = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Sem includeSubDomains: as demos em subdomínios (geradoruc, ead, citel...) têm hospedagem própria.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  ...(producao ? [{ key: "Content-Security-Policy", value: politicaDeConteudo }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [15, 75, 80, 90],
  },
  async headers() {
    return [{ source: "/:path*", headers: cabecalhosDeSeguranca }];
  },
};

export default nextConfig;
