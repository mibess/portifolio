import Link from "next/link";
import Logo from "./logo";
import { contato, navegacao, perfil } from "@/lib/content";

/**
 * Rodapé do site. Em páginas fora da inicial, `base="/"` faz os links de seção apontarem para a home
 * (por exemplo, /#cases em vez de #cases).
 */
export default function Footer({ base = "" }: { base?: string }) {
  const ano = new Date().getFullYear();
  const carimbo = [
    { k: "Projeto", v: "mibess.com.br" },
    { k: "Autor", v: perfil.nome },
    { k: "Revisão", v: "3.1" },
    { k: "Escala", v: "1:1" },
    { k: "Escopo", v: "Arquitetura · Cloud · Mentoria" },
    { k: "Local", v: "Ribeirão Preto/SP" },
    { k: "Ano", v: String(ano) },
    { k: "Fim", v: "System.exit(0);", destaque: true },
  ];
  const secoes = [...navegacao, { href: "#perguntas", label: "Perguntas" }, { href: "#contato", label: "Contato" }];
  const link = "link-sublinhado justify-self-start text-claro-suave hover:text-claro";

  return (
    <footer className="band-noite border-t border-traco">
      <div className="container-site py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href={`${base}#inicio`} className="text-[26px] text-claro" aria-label="mibess, voltar ao início">
              <Logo />
            </a>
            <p className="mt-4 max-w-xs text-[15px] text-claro-suave">{perfil.papel}</p>
          </div>
          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-12 gap-y-3 text-[15px] sm:grid-cols-3">
            {secoes.map((n) => (
              <a key={n.href} href={`${base}${n.href}`} className={link}>
                {n.label}
              </a>
            ))}
            <a href={contato.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
              LinkedIn
            </a>
            <a href={contato.github} target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
            <a href={contato.curriculoEn} download hrefLang="en" lang="en" className={link}>
              English CV
            </a>
          </nav>
        </div>

        <dl
          className="mt-12 grid grid-cols-2 gap-px border border-planta/60 bg-planta/30 font-mono text-[13px] md:grid-cols-4"
          aria-label="Carimbo técnico do projeto"
        >
          {carimbo.map((c) => (
            <div key={c.k} className="min-w-0 bg-noite px-3 py-2.5">
              <dt className="text-[12px] uppercase tracking-[0.08em] text-claro-suave">{c.k}</dt>
              <dd className={c.destaque ? "whitespace-nowrap text-mel" : "truncate text-claro"}>{c.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-col gap-2 text-sm text-claro-suave sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {perfil.nome} ·{" "}
            <a href={`mailto:${contato.email}`} className="link-sublinhado hover:text-claro">
              {contato.email}
            </a>
          </p>
          <Link href="/privacidade" className="link-sublinhado self-start hover:text-claro sm:self-auto">
            Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
