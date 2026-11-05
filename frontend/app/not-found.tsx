import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import PaginaSimples from "./components/pagina-simples";
import { contato } from "@/lib/content";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

/** 404 na identidade do site, em português, com caminhos de volta e de contato. */
export default function NaoEncontrada() {
  return (
    <PaginaSimples>
      <section aria-labelledby="erro-titulo" className="band-noite relative isolate overflow-hidden">
        <div className="grid-planta pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-site py-[clamp(5rem,12vw,9rem)]">
          <p className="t-eyebrow text-planta">Erro 404</p>
          <h1 id="erro-titulo" className="t-section mt-5 max-w-[18ch] text-claro">
            Esta página não existe
          </h1>
          <p className="t-lede mt-5 max-w-[52ch] text-claro-suave">
            O endereço pode ter mudado ou sido digitado com algum erro. Siga pela página inicial ou fale direto comigo.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/" className="btn btn-mel">
              Ir para a página inicial
              <ArrowRight aria-hidden="true" />
            </Link>
            <a href={contato.whatsappAgendar} target="_blank" rel="noopener noreferrer" className="btn btn-linha-escuro">
              <SiWhatsapp aria-hidden="true" />
              WhatsApp
            </a>
            <a href={contato.emailAgendar} className="btn btn-linha-escuro">
              <Mail aria-hidden="true" />
              E-mail
            </a>
          </div>
        </div>
      </section>
    </PaginaSimples>
  );
}
