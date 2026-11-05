import Image from "next/image";
import SectionHeader from "../ui/section-header";
import Spotlight from "../motion/spotlight";
import { Reveal, RevealGroup, RevealItem } from "../motion/reveal";
import { atuacao, perfil } from "@/lib/content";

const imagens: Record<string, { src: string; alt: string }> = {
  arquitetura: {
    src: "/images/atuacao-arquitetura.jpg",
    alt: "Estrutura de células hexagonais de vidro com um núcleo iluminado em âmbar",
  },
  transformacao: {
    src: "/images/atuacao-transformacao.jpg",
    alt: "Bloco monolítico se dividindo em módulos de vidro conectados por linhas de luz",
  },
  mentoria: {
    src: "/images/atuacao-mentoria.jpg",
    alt: "Degraus de vidro com uma linha de luz âmbar guiando do primeiro ao último degrau",
  },
};

export default function Services() {
  return (
    <section id="atuacao" aria-labelledby="atuacao-titulo" className="band-papel section-y">
      <div className="container-site">
        <SectionHeader
          numero="01"
          rotulo="Atuação"
          tituloId="atuacao-titulo"
          titulo={atuacao.titulo}
          lede={`${perfil.apresentacao} ${perfil.crenca}`}
        />

        <RevealGroup as="ul" className="mt-14 grid gap-5 md:grid-cols-3">
          {atuacao.frentes.map((f) => {
            const img = imagens[f.id];
            return (
              <RevealItem as="li" key={f.id} className="h-full">
                <Spotlight className="group flex h-full flex-col overflow-hidden rounded border border-linha bg-branco transition-colors duration-300 hover:border-tinta/30">
                  <div className="relative aspect-[4/3] overflow-hidden bg-tinta">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      quality={80}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-saida group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="t-card text-[1.375rem]">{f.titulo}</h3>
                    <p className="mt-3 text-ardosia">{f.texto}</p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                      {f.itens.map((i) => (
                        <li key={i} className="tag">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Spotlight>
              </RevealItem>
            );
          })}
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
