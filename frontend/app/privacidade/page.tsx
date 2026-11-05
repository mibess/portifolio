import type { Metadata } from "next";
import PaginaSimples from "../components/pagina-simples";
import { contato, perfil } from "@/lib/content";

const ATUALIZADA_EM = "5 de novembro de 2026";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Como o site mibess.com.br trata dados de visitantes, do assistente Mibee e dos canais de contato.",
  alternates: { canonical: "/privacidade" },
};

const secoes: { titulo: string; paragrafos: React.ReactNode[] }[] = [
  {
    titulo: "Quem é o responsável",
    paragrafos: [
      <>
        Este site é mantido por {perfil.nome} (mibess). Para qualquer assunto sobre privacidade, escreva para{" "}
        <a href={`mailto:${contato.email}`} className="link-sublinhado font-medium text-planta-forte">
          {contato.email}
        </a>
        .
      </>,
    ],
  },
  {
    titulo: "O que este site coleta",
    paragrafos: [
      "O site não tem formulário de cadastro, não usa cookies de rastreamento e não carrega ferramentas de análise, publicidade ou redes sociais de terceiros. Fontes, imagens, vídeos e currículos são servidos pelo próprio domínio.",
      "Como qualquer site, ele é entregue por um provedor de hospedagem, a Vercel, que registra dados técnicos de acesso (como endereço IP, navegador e páginas pedidas) para operar e proteger o serviço.",
    ],
  },
  {
    titulo: "Assistente Mibee",
    paragrafos: [
      "As perguntas digitadas no assistente, junto com o histórico da conversa aberta, são enviadas à API do Google Gemini para gerar a resposta. Este site não grava as conversas: ao recarregar ou sair da página, o histórico é descartado.",
      <>
        O tratamento feito pelo Google segue os{" "}
        <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className="link-sublinhado font-medium text-planta-forte">
          termos da API Gemini
        </a>
        . Por isso, não digite no chat dados pessoais sensíveis nem informações confidenciais da sua empresa; para esses assuntos, use o e-mail.
      </>,
      "As respostas são geradas por IA a partir das informações deste site e podem conter imprecisões. Compromissos como escopo, prazo e valores são tratados só diretamente com o Claudemir.",
    ],
  },
  {
    titulo: "Contato por WhatsApp, e-mail e LinkedIn",
    paragrafos: [
      "Quando você escreve por um desses canais, as mensagens ficam no respectivo serviço e são usadas para responder e conduzir a conversa.",
    ],
  },
  {
    titulo: "Seus direitos",
    paragrafos: [
      <>
        Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir a confirmação de que existe tratamento dos seus dados, o acesso, a
        correção ou a exclusão deles, escrevendo para{" "}
        <a href={`mailto:${contato.email}`} className="link-sublinhado font-medium text-planta-forte">
          {contato.email}
        </a>
        .
      </>,
    ],
  },
  {
    titulo: "Mudanças nesta página",
    paragrafos: ["Esta página pode ser atualizada. A data no topo indica a versão em vigor."],
  },
];

export default function Privacidade() {
  return (
    <PaginaSimples>
      <section aria-labelledby="privacidade-titulo" className="band-noite relative isolate overflow-hidden">
        <div className="grid-planta pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-site py-[clamp(3.5rem,8vw,6rem)]">
          <p className="t-eyebrow text-planta">Privacidade</p>
          <h1 id="privacidade-titulo" className="t-section mt-5 max-w-[22ch] text-claro">
            Como este site trata os seus dados
          </h1>
          <p className="mt-5 font-mono text-[13px] text-claro-suave">Atualizada em {ATUALIZADA_EM}</p>
        </div>
      </section>

      <div className="band-papel section-y">
        <div className="container-site">
          <div className="max-w-[70ch] space-y-12">
            {secoes.map((s, i) => (
              <section key={s.titulo} aria-labelledby={`privacidade-${i}`}>
                <h2 id={`privacidade-${i}`} className="t-card text-[1.5rem]">
                  {s.titulo}
                </h2>
                <div className="mt-4 space-y-4 text-ardosia">
                  {s.paragrafos.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </PaginaSimples>
  );
}
