import { ArrowUpRight, Plus } from "lucide-react";
import SectionHeader from "../ui/section-header";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { perguntasFrequentes } from "@/lib/content";

/**
 * Perguntas frequentes com <details>: abrem e fecham sem JavaScript, são acessíveis por teclado
 * e o conteúdo fica no HTML para buscadores.
 */
export default function Faq() {
  return (
    <section id="perguntas" aria-labelledby="perguntas-titulo" className="band-papel section-y">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <SectionHeader
          className="lg:col-span-5"
          numero="08"
          rotulo="Perguntas frequentes"
          tituloId="perguntas-titulo"
          titulo={perguntasFrequentes.titulo}
          lede={perguntasFrequentes.lede}
        />

        <RevealGroup as="ul" className="divide-y divide-linha self-start border-y border-linha lg:col-span-7">
          {perguntasFrequentes.itens.map((item) => {
            const pdf = item.link?.href.endsWith(".pdf");
            return (
              <RevealItem as="li" key={item.pergunta}>
                <details className="group">
                  <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-semibold leading-snug transition-colors duration-200 hover:text-planta-forte [&::-webkit-details-marker]:hidden">
                    <span>{item.pergunta}</span>
                    <Plus
                      className="mt-0.5 h-5 w-5 flex-none text-planta-forte transition-transform duration-300 ease-saida group-open:rotate-45"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="max-w-[62ch] pb-6 pr-8 text-ardosia">
                    <p>{item.resposta}</p>
                    {item.link ? (
                      <a
                        href={item.link.href}
                        download={pdf || undefined}
                        hrefLang={pdf ? "en" : undefined}
                        className="link-sublinhado mt-3 inline-flex items-center gap-1 font-medium text-planta-forte"
                      >
                        {item.link.label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </details>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
