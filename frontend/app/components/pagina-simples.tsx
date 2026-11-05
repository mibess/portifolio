import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "./logo";
import Footer from "./footer";

/** Moldura das páginas de apoio (privacidade, 404): cabeçalho enxuto com volta para a home e o mesmo rodapé. */
export default function PaginaSimples({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className="band-noite border-b border-traco">
        <div className="container-site flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="text-[22px] text-claro" aria-label="mibess, ir para a página inicial">
            <Logo />
          </Link>
          <Link href="/" className="link-sublinhado inline-flex min-h-11 items-center gap-2 font-mono text-[13px] text-claro-suave hover:text-claro">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao site
          </Link>
        </div>
      </header>
      <main id="conteudo">{children}</main>
      <Footer base="/" />
    </>
  );
}
