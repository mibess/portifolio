import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const FONTES = join(process.cwd(), "assets/fonts");

async function carregarFontes() {
  const [expandida, semi, regular, mono] = await Promise.all([
    readFile(join(FONTES, "Archivo-ExpandedBold.ttf")),
    readFile(join(FONTES, "Archivo-SemiExpandedSemiBold.ttf")),
    readFile(join(FONTES, "Archivo-Regular.ttf")),
    readFile(join(FONTES, "JetBrainsMono-Medium.ttf")),
  ]);
  return [
    { name: "Archivo Expanded", data: expandida, weight: 700 as const, style: "normal" as const },
    { name: "Archivo SemiExpanded", data: semi, weight: 600 as const, style: "normal" as const },
    { name: "Archivo", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

function hexagono(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, j) => {
    const a = ((-90 + 60 * j) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

/** Wordmark "mibess" com o pingo do i em mel (direção D). */
function Wordmark({ tamanho, cor }: { tamanho: number; cor: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", fontFamily: "Archivo Expanded", fontWeight: 700, fontSize: tamanho, color: cor, letterSpacing: -0.035 * tamanho, lineHeight: 1 }}>
      <span>m</span>
      <div style={{ display: "flex", position: "relative" }}>
        <span>ı</span>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0.075 * tamanho,
            width: 0.135 * tamanho,
            height: 0.135 * tamanho,
            marginLeft: -0.0675 * tamanho,
            background: "#F4A93C",
          }}
        />
      </div>
      <span>bess</span>
    </div>
  );
}

export async function imagemDeCompartilhamento() {
  const s3 = Math.sqrt(3);
  const r = 46;
  const cx = 930;
  const cy = 300;
  const celulas = [[0, 0], [1, 0], [0.5, 1], [-0.5, 1], [0.5, -1], [1.5, -1], [1.5, 1], [2, 0]];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#07111C", color: "#E9EEF4" }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          {Array.from({ length: 31 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="630" stroke="#7FA6CC" strokeOpacity={i % 5 === 0 ? 0.08 : 0.035} />
          ))}
          {Array.from({ length: 16 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="1200" y2={i * 40} stroke="#7FA6CC" strokeOpacity={i % 5 === 0 ? 0.08 : 0.035} />
          ))}
          {celulas.map(([a, b], i) => (
            <polygon key={`c${i}`} points={hexagono(cx + a * s3 * r, cy + b * 1.5 * r, r)} fill="none" stroke="#7FA6CC" strokeOpacity="0.4" strokeWidth="1.5" />
          ))}
          <polygon points={hexagono(cx + 0.5 * s3 * r, cy + 1.5 * r, r)} fill="#F4A93C" fillOpacity="0.9" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 80px", position: "relative" }}>
          <Wordmark tamanho={54} cor="#E9EEF4" />

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "JetBrains Mono", fontSize: 20, color: "#93A3B8" }}>
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
        <div style={{ position: "absolute", right: lado * 0.13, top: lado * 0.14, width: lado * 0.15, height: lado * 0.15, background: "#F4A93C" }} />
      </div>
    ),
    { width: lado, height: lado, fonts: await carregarFontes() },
  );
}
