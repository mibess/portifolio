import SectionHeader from "../ui/section-header";
import FlowDiagram, { type FlowLink, type FlowNode } from "../motion/flow-diagram";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { cases, type DiagramaId } from "@/lib/content";

const bancos = ["Itaú", "Banco do Brasil", "Santander", "Bradesco", "Caixa", "PIX"];

const diagramas: Record<DiagramaId, { largura: number; altura: number; nos: FlowNode[]; ligacoes: FlowLink[]; rotulo: string }> = {
  bancos: {
    largura: 400,
    altura: 252,
    rotulo: "Plataforma de cobrança conectada a Itaú, Banco do Brasil, Santander, Bradesco, Caixa e PIX, com remessa e retorno",
    nos: [
      { x: 8, y: 96, w: 150, h: 70, titulo: "Plataforma", sub: "boletos · remessa", destaque: true },
      ...bancos.map((b, i) => ({ x: 250, y: 6 + i * 42, w: 142, h: 30, titulo: b, destaque: b === "PIX" })),
    ],
    ligacoes: bancos.map((_, i) => {
      const y = 6 + i * 42 + 15;
      return { d: `M158 131 C204 131 214 ${y} 250 ${y}`, volta: true };
    }),
  },
  nuvem: {
    largura: 400,
    altura: 220,
    rotulo: "Monolito local empacotado com Docker e publicado na AWS (EC2, S3, ECS), com testes e pipelines de CI/CD",
    nos: [
      { x: 8, y: 20, w: 112, h: 56, titulo: "Monolito", sub: "on-premise" },
      { x: 144, y: 20, w: 112, h: 56, titulo: "Docker", sub: "imagens" },
      { x: 272, y: 20, w: 124, h: 56, titulo: "AWS", sub: "EC2 · S3 · ECS", destaque: true },
      { x: 8, y: 150, w: 112, h: 56, titulo: "Testes", sub: "JUnit" },
      { x: 144, y: 150, w: 112, h: 56, titulo: "CI/CD", sub: "pipelines" },
    ],
    ligacoes: [
      { d: "M120 48 H144" },
      { d: "M256 48 H272" },
      { d: "M120 178 H144" },
      { d: "M200 150 V76" },
      { d: "M256 178 C304 178 334 140 334 76" },
    ],
  },
  "tempo-real": {
    largura: 400,
    altura: 220,
    rotulo: "Catracas com cartão e biometria enviando acessos para uma API REST em Spring Boot, exibidos em tempo real em monitores e celulares",
    nos: [
      { x: 4, y: 82, w: 150, h: 56, titulo: "Catracas", sub: "cartão · biometria" },
      { x: 172, y: 82, w: 100, h: 56, titulo: "API REST", sub: "Spring Boot", destaque: true },
      { x: 300, y: 30, w: 92, h: 52, titulo: "Monitores", sub: "React" },
      { x: 300, y: 138, w: 92, h: 52, titulo: "Mobile", sub: "React" },
    ],
    ligacoes: [
      { d: "M154 110 H172" },
      { d: "M272 110 C288 110 286 56 300 56" },
      { d: "M272 110 C288 110 286 164 300 164" },
    ],
  },
  "setor-eletrico": {
    largura: 400,
    altura: 160,
    rotulo: "Interfaces Angular consumindo microsserviços Java e Spring Boot com banco Oracle, seguindo as rotinas regulatórias da CCEE",
    nos: [
      { x: 128, y: 8, w: 164, h: 52, titulo: "CCEE", sub: "rotinas regulatórias" },
      { x: 8, y: 90, w: 104, h: 56, titulo: "Angular", sub: "interfaces" },
      { x: 136, y: 90, w: 148, h: 56, titulo: "Microsserviços", sub: "Java · Spring Boot", destaque: true },
      { x: 308, y: 90, w: 84, h: 56, titulo: "Oracle", sub: "dados" },
    ],
    ligacoes: [
      { d: "M210 60 V90" },
      { d: "M112 118 H136", volta: true },
      { d: "M284 118 H308", volta: true },
    ],
  },
};

export default function Cases() {
  return (
    <section id="cases" aria-labelledby="cases-titulo" className="band-papel section-y border-t border-linha">
      <div className="container-site">
        <SectionHeader
          numero="02"
          rotulo="Cases"
          tituloId="cases-titulo"
          titulo="Sistemas críticos, entregues em produção"
          lede="Entregas da minha trajetória em bancos, controle de acesso e setor elétrico, com a arquitetura que as sustenta."
        />

        <RevealGroup as="ul" className="mt-14 grid gap-5 lg:grid-cols-2">
          {cases.map((c) => {
            const d = diagramas[c.id];
            return (
              <RevealItem as="li" key={c.id} className="flex min-w-0 flex-col rounded border border-linha bg-branco">
                <article className="flex h-full flex-col">
                  <div className="p-6 md:p-7">
                    <p className="t-eyebrow text-planta-forte">
                      {c.empresa} <span className="text-ardosia">· {c.periodo}</span>
                    </p>
                    <h3 className="t-card mt-4 text-[1.375rem]">{c.titulo}</h3>
                    <p className="mt-3 text-ardosia">{c.texto}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {c.stack.map((s) => (
                        <li key={s} className="tag">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid-planta-claro mt-auto overflow-x-auto border-t border-linha bg-papel/60 px-4 py-5 md:px-6">
                    <FlowDiagram largura={d.largura} altura={d.altura} nos={d.nos} ligacoes={d.ligacoes} rotulo={d.rotulo} />
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
