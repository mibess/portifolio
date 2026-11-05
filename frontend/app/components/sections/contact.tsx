import { ArrowRight, ArrowUpRight, Download, Linkedin, Mail, MessageCircle } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import SectionHeader from "../ui/section-header";
import Magnetic from "../motion/magnetic";
import { Reveal, RevealGroup, RevealItem } from "../motion/reveal";
import { contato, contatoSecao, perfil } from "@/lib/content";

const icones: Record<string, React.ReactNode> = {
  email: <Mail className="h-5 w-5" aria-hidden="true" />,
  whatsapp: <MessageCircle className="h-5 w-5" aria-hidden="true" />,
  linkedin: <Linkedin className="h-5 w-5" aria-hidden="true" />,
  github: <SiGithub className="h-5 w-5" aria-hidden="true" />,
};

const assunto = encodeURIComponent("Conversa sobre consultoria/mentoria");

export default function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="band-noite section-y relative isolate overflow-hidden">
      <div className="grid-planta pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-mel/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeader numero="08" rotulo="Contato" tituloId="contato-titulo" titulo={contatoSecao.titulo} lede={contatoSecao.texto} tom="escuro" />
          <Reveal delay={0.1} className="mt-8">
            <p className="flex items-center gap-2 font-mono text-sm text-mel">
              <span className="h-1.5 w-1.5 animate-[pulso_2.4s_ease-in-out_infinite] rounded-full bg-mel" aria-hidden="true" />
              {perfil.disponibilidade}
            </p>
            <p className="mt-4 max-w-[52ch] text-claro-suave">{contatoSecao.resposta}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={`mailto:${contato.email}?subject=${assunto}`} className="btn btn-mel">
                  Iniciar conversa
                  <ArrowRight aria-hidden="true" />
                </a>
              </Magnetic>
              <a href={contato.curriculo} download className="btn btn-linha-escuro">
                Baixar currículo
                <Download aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="divide-y divide-traco self-end border-y border-traco lg:col-span-6">
          {contatoSecao.canais.map((c) => {
            const externo = c.href.startsWith("http");
            return (
              <RevealItem as="li" key={c.id}>
                <a
                  href={c.href}
                  target={externo ? "_blank" : undefined}
                  rel={externo ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 py-5 transition-colors duration-300 hover:bg-tinta/60 sm:px-3"
                >
                  <span className="grid h-11 w-11 place-items-center rounded border border-traco text-planta transition-colors duration-300 group-hover:border-mel group-hover:text-mel">
                    {icones[c.id]}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-[17px] font-semibold text-claro">{c.label}</span>
                      <span className="truncate font-mono text-xs text-claro-suave">{c.valor}</span>
                    </span>
                    <span className="mt-1 block text-[15px] text-claro-suave">{c.descricao}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-claro-suave transition-transform duration-300 ease-saida group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mel"
                    aria-hidden="true"
                  />
                </a>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
