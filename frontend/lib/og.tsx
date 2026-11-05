import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { COR_MEL, LOGO_ALTURA, LOGO_LARGURA, LOGO_PATH, LOGO_PINGO, LOGO_VIEWBOX } from "./logo-path";

const ASSETS = join(process.cwd(), "assets");

async function carregarFontes() {
  const [semi, regular, mono, expandida] = await Promise.all([
    readFile(join(ASSETS, "fonts/Archivo-SemiExpandedSemiBold.ttf")),
    readFile(join(ASSETS, "fonts/Archivo-Regular.ttf")),
    readFile(join(ASSETS, "fonts/JetBrainsMono-Medium.ttf")),
    readFile(join(ASSETS, "fonts/Archivo-ExpandedBold.ttf")),
  ]);
  return [
    { name: "Archivo SemiExpanded", data: semi, weight: 600 as const, style: "normal" as const },
    { name: "Archivo", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: mono, weight: 500 as const, style: "normal" as const },
    { name: "Archivo Expanded", data: expandida, weight: 700 as const, style: "normal" as const },
  ];
}

/** Logo vetorial (o mesmo desenho do site). */
function Wordmark({ altura, cor }: { altura: number; cor: string }) {
  const largura = Math.round((altura * LOGO_LARGURA) / LOGO_ALTURA);
  return (
    <svg width={largura} height={altura} viewBox={LOGO_VIEWBOX}>
      <path fill={cor} d={LOGO_PATH} />
      <rect x={LOGO_PINGO.x} y={LOGO_PINGO.y} width={LOGO_PINGO.lado} height={LOGO_PINGO.lado} fill={COR_MEL} />
    </svg>
  );
}

/** Imagem de compartilhamento (1200×630): visual-chave ao fundo, texto na área escura da esquerda. */
export async function imagemDeCompartilhamento() {
  const fundo = await readFile(join(ASSETS, "og-fundo.jpg"));
  const fundoUrl = `data:image/jpeg;base64,${fundo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#07111C", color: "#E9EEF4" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fundoUrl} width={1200} height={630} alt="" style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 630 }} />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            backgroundImage: "linear-gradient(90deg, rgba(7,17,28,0.92) 0%, rgba(7,17,28,0.75) 45%, rgba(7,17,28,0) 75%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 80px", position: "relative" }}>
          <Wordmark altura={40} cor="#E9EEF4" />

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
            <div style={{ fontFamily: "JetBrains Mono", fontSize: 20, letterSpacing: 2, color: "#7FA6CC", textTransform: "uppercase" }}>
              Consultoria · Mentoria
            </div>
            <div style={{ fontFamily: "Archivo SemiExpanded", fontWeight: 600, fontSize: 76, letterSpacing: -2, lineHeight: 1.02, marginTop: 18 }}>
              Claudemir Custódio
            </div>
            <div style={{ fontFamily: "Archivo", fontSize: 30, lineHeight: 1.35, color: "#93A3B8", marginTop: 18 }}>
              Arquitetura Java, microsserviços e Cloud AWS para empresas, e mentoria técnica para times.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "JetBrains Mono", fontSize: 20, color: "#93A3B8", maxWidth: 720 }}>
            <span>mibess.com.br</span>
            <span style={{ color: "#F4A93C" }}>desde 2010</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await carregarFontes() },
  );
}

/** Ícone: "m" em Archivo expandida sobre tinta noturna, com o quadrado em mel. */
export async function icone(lado: number, raio: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-start", position: "relative", background: "#07111C", borderRadius: raio }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Archivo Expanded",
            fontWeight: 700,
            fontSize: lado * 0.78,
            lineHeight: 1,
            letterSpacing: -0.03 * lado,
            color: "#F3F5F7",
            position: "absolute",
            left: lado * 0.1,
            bottom: lado * 0.12,
          }}
        >
          m
        </div>
        <div style={{ position: "absolute", right: lado * 0.13, top: lado * 0.14, width: lado * 0.15, height: lado * 0.15, background: COR_MEL }} />
      </div>
    ),
    { width: lado, height: lado, fonts: await carregarFontes() },
  );
}
