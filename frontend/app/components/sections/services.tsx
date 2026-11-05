import SectionHeader from "../ui/section-header";
import Spotlight from "../motion/spotlight";
import { Reveal, RevealGroup, RevealItem } from "../motion/reveal";
import { atuacao } from "@/lib/content";

export default function Services() {
  return (
    <section id="atuacao" aria-labelledby="atuacao-titulo" className="band-papel section-y">
      <div className="container-site">
        <SectionHeader
          numero="01"
          rotulo="Atuação"
          tituloId="atuacao-titulo"
          titulo={atuacao.titulo}
        />

        <RevealGroup as="ul" className="mt-14 grid gap-5 md:grid-cols-3">
          {atuacao.frentes.map((f) => (
            <RevealItem as="li" key={f.id} className="h-full">
              <Spotlight className="flex h-full flex-col rounded border border-linha bg-branco p-6 transition-colors duration-300 hover:border-tinta/30 md:p-7">
                <Ilustracao id={f.id} />
                <h3 className="t-card mt-8 text-[1.375rem]">{f.titulo}</h3>
                <p className="mt-3 text-ardosia">{f.texto}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {f.itens.map((i) => (
                    <li key={i} className="tag">
                      {i}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-6 grid gap-px overflow-hidden rounded border border-linha bg-linha md:grid-cols-2">
          {[atuacao.agora, atuacao.foco].map((b) => (
            <div key={b.rotulo} className="bg-papel p-6 md:p-7">
              <p className="t-eyebrow flex items-center gap-2 text-planta-forte">
                <span className={b.rotulo === "Agora" ? "h-1.5 w-1.5 rounded-full bg-mel" : "h-1.5 w-1.5 bg-planta-forte"} aria-hidden="true" />
                {b.rotulo}
              </p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed">{b.texto}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** Ilustrações em linha de planta, desenhadas em código (podem ser trocadas pelas imagens da série "Atuação"). */
function Ilustracao({ id }: { id: string }) {
  const comum = "h-28 w-full text-planta-forte";
  if (id === "arquitetura") {
    const hex = (cx: number, cy: number, r = 18) =>
      Array.from({ length: 6 }, (_, j) => {
        const a = ((-90 + 60 * j) * Math.PI) / 180;
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
      }).join(" ");
    const s = 18 * Math.sqrt(3);
    const centros: [number, number, boolean][] = [
      [120, 40, false],
      [120 + s, 40, false],
      [120 + s / 2, 67, true],
      [120 - s / 2, 67, false],
      [120 + s * 1.5, 67, false],
      [120 + s / 2, 13, false],
    ];
    return (
      <svg viewBox="0 0 280 112" className={comum} aria-hidden="true">
        {centros.map(([cx, cy, mel], i) => (
          <polygon key={i} points={hex(cx, cy)} className={mel ? "fill-mel stroke-mel" : "fill-none stroke-current"} strokeWidth="1.25" />
        ))}
        <line x1="88" y1="100" x2="190" y2="100" className="stroke-current" strokeOpacity=".4" />
        <line x1="88" y1="95" x2="88" y2="105" className="stroke-current" strokeOpacity=".4" />
        <line x1="190" y1="95" x2="190" y2="105" className="stroke-current" strokeOpacity=".4" />
      </svg>
    );
  }
  if (id === "transformacao") {
    return (
      <svg viewBox="0 0 280 112" className={comum} aria-hidden="true">
        <rect x="20" y="22" width="66" height="66" rx="3" className="fill-none stroke-current" strokeWidth="1.25" />
        <line x1="20" y1="44" x2="86" y2="44" className="stroke-current" strokeOpacity=".35" />
        <line x1="20" y1="66" x2="86" y2="66" className="stroke-current" strokeOpacity=".35" />
        <path d="M92 55 H128" className="stroke-current" strokeWidth="1.25" strokeDasharray="3 4" />
        <path d="M124 50 L130 55 L124 60" className="fill-none stroke-current" strokeWidth="1.25" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={150 + c * 36}
              y={14 + r * 32}
              width="24"
              height="20"
              rx="2"
              className={r === 1 && c === 1 ? "fill-mel stroke-mel" : "fill-none stroke-current"}
              strokeWidth="1.25"
            />
          )),
        )}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 280 112" className={comum} aria-hidden="true">
      <path d="M24 96 H84 V74 H144 V52 H204 V30 H256" className="fill-none stroke-current" strokeWidth="1.25" />
      <path d="M40 86 C 90 86, 110 64, 150 62 S 220 40, 246 22" className="fill-none stroke-mel" strokeWidth="1.5" strokeDasharray="2 5" strokeLinecap="round" />
      <circle cx="40" cy="86" r="5" className="fill-mel" />
      <circle cx="246" cy="22" r="7" className="fill-none stroke-current" strokeWidth="1.25" />
    </svg>
  );
}
