"use client";

import { contato } from "@/lib/content";

/**
 * Último recurso, quando o próprio layout falha. Usa estilos em linha para funcionar
 * mesmo sem o CSS e as fontes do site.
 */
export default function ErroGlobal({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          background: "#07111c",
          color: "#e9eef4",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <main style={{ maxWidth: 560 }}>
          <p style={{ fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7fa6cc" }}>
            Algo deu errado
          </p>
          <h1 style={{ fontSize: "2rem", lineHeight: 1.1, margin: "1rem 0" }}>O site não carregou como deveria</h1>
          <p style={{ color: "#93a3b8", lineHeight: 1.6 }}>
            Tente de novo em instantes. Se o problema continuar, escreva para{" "}
            <a href={`mailto:${contato.email}`} style={{ color: "#f4a93c" }}>
              {contato.email}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: "1.5rem", minHeight: 44, padding: "0 1.25rem", border: 0, borderRadius: 4, background: "#f4a93c", color: "#0c1a29", fontWeight: 600, cursor: "pointer" }}
          >
            Tentar de novo
          </button>
        </main>
      </body>
    </html>
  );
}
