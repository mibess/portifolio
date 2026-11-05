"use client";

import { useEffect } from "react";
import { Mail, RotateCcw } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { contato } from "@/lib/content";

/** Se alguma parte da página falhar no navegador, o visitante vê uma saída clara em vez de uma tela em branco. */
export default function Erro({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="conteudo" className="band-noite relative isolate grid min-h-dvh place-items-center overflow-hidden">
      <div className="grid-planta pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-site py-20">
        <p className="t-eyebrow text-planta">Algo deu errado</p>
        <h1 className="t-section mt-5 max-w-[20ch] text-claro">Esta página não carregou como deveria</h1>
        <p className="t-lede mt-5 max-w-[52ch] text-claro-suave">
          Tente de novo. Se o problema continuar, fale direto comigo por e-mail ou WhatsApp.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button type="button" onClick={reset} className="btn btn-mel">
            <RotateCcw aria-hidden="true" />
            Tentar de novo
          </button>
          <a href={contato.emailAgendar} className="btn btn-linha-escuro">
            <Mail aria-hidden="true" />
            E-mail
          </a>
          <a href={contato.whatsappAgendar} target="_blank" rel="noopener noreferrer" className="btn btn-linha-escuro">
            <SiWhatsapp aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
