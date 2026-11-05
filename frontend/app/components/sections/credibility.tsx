import CountUp from "../motion/count-up";
import DimensionLine from "../motion/dimension-line";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { credibilidade, INICIO_CARREIRA } from "@/lib/content";

export default function Credibility({ anos }: { anos: number }) {
  return (
    <section aria-label="Credibilidade em números" className="band-tinta relative border-y border-traco">
      <div className="container-site py-14 md:py-16">
        <RevealGroup className="grid gap-x-10 gap-y-12 md:grid-cols-12">
          <RevealItem className="md:col-span-12 lg:col-span-4">
            <p className="t-eyebrow text-planta">Experiência</p>
            <p className="mt-3 flex items-baseline gap-3">
              <CountUp value={anos} className="t-num text-[clamp(3.25rem,6vw,4.5rem)] text-claro" />
              <span className="text-lg text-claro-suave">anos construindo software</span>
            </p>
            <div className="mt-5 max-w-sm">
              <DimensionLine inicio={`${INICIO_CARREIRA} · Rtools`} fim="hoje · AMcom" />
            </div>
          </RevealItem>

          <RevealItem className="md:col-span-12 lg:col-span-8">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded border border-traco bg-traco">
              {credibilidade.destaques.map((d) => (
                <li key={d.rotulo} className="min-w-0 bg-tinta p-4 sm:p-5">
                  <p className="t-num text-[2rem] text-mel">
                    {typeof d.valor === "number" ? <CountUp value={d.valor} /> : d.valor}
                  </p>
                  <p className="mt-2 text-[15px] font-medium text-claro">{d.rotulo}</p>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-claro-suave">{d.detalhe}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-xs text-claro-suave">
              Onde atuei: <span className="text-claro">{credibilidade.ondeAtuei.join(" · ")}</span>
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
