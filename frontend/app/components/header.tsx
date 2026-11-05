"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./logo";
import { navegacao, contato } from "@/lib/content";
import { useTravaDeRolagem } from "@/lib/scroll-lock";
import { cn } from "@/lib/utils";

export default function Header() {
  const [rolou, setRolou] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [ativo, setAtivo] = useState<string | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const { scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useTravaDeRolagem(menuAberto);

  useEffect(() => {
    let ultimo = window.scrollY;
    const aoRolar = () => {
      const y = window.scrollY;
      setRolou(y > 24);
      if (Math.abs(y - ultimo) > 8) {
        setOculto(y > ultimo && y > 480);
        ultimo = y;
      }
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    const secoes = ["inicio", ...navegacao.map((n) => n.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtivo(e.target.id === "inicio" ? null : e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secoes.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menuAberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setMenuAberto(false);
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [menuAberto]);

  // No menu móvel: fecha o menu (o que destrava a rolagem) e só então rola até a seção.
  const irPara = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuAberto(false);
    window.setTimeout(() => {
      const alvo = document.querySelector<HTMLElement>(href);
      if (!alvo) return;
      if (window.__lenis) window.__lenis.scrollTo(alvo, { force: true });
      else alvo.scrollIntoView({ block: "start" });
      history.replaceState(null, "", href);
    }, 60);
  };

  // O menu fica fora do <header>: o desfoque e o translate do header criariam um contêiner para o "fixed".
  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-claro transition-[translate,background-color,border-color] duration-500 ease-saida",
          oculto && !menuAberto ? "-translate-y-full" : "translate-y-0",
          rolou || menuAberto ? "border-b border-traco bg-noite/90 backdrop-blur-md" : "border-b border-transparent",
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <div className="container-site flex h-[72px] items-center justify-between gap-6">
          <a href="#inicio" className="text-[22px] text-claro" aria-label="mibess, voltar ao início" onClick={() => setMenuAberto(false)}>
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navegacao.map((item) => {
                const atual = ativo === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={atual ? "location" : undefined}
                      className={cn(
                        "relative block px-3 py-2 text-[15px] transition-colors duration-300",
                        atual ? "text-claro" : "text-claro-suave hover:text-claro",
                      )}
                    >
                      {item.label}
                      {atual ? (
                        <motion.span
                          layoutId="nav-ativo"
                          className="absolute inset-x-3 -bottom-px h-px bg-mel"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contato" className="btn btn-mel hidden min-h-11 px-4 text-sm sm:inline-flex">
              Vamos conversar
            </a>
            <button
              type="button"
              className="inline-grid h-11 w-11 place-items-center rounded border border-traco text-claro md:hidden"
              aria-expanded={menuAberto}
              aria-controls="menu-movel"
              aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuAberto((v) => !v)}
            >
              {menuAberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-mel" style={{ scaleX: progresso }} />
      </header>

      <AnimatePresence>
        {menuAberto ? (
          <motion.nav
            id="menu-movel"
            aria-label="Menu"
            className="fixed inset-x-0 bottom-0 top-[calc(72px+env(safe-area-inset-top))] z-40 overflow-y-auto bg-noite text-claro md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container-site flex flex-col py-6">
              {navegacao.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-traco"
                >
                  <a
                    href={item.href}
                    onClick={(e) => irPara(e, item.href)}
                    className="flex items-center justify-between py-5 text-2xl font-semibold [font-stretch:112%]"
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 text-planta" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-site pb-10" style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}>
              <a href="#contato" onClick={(e) => irPara(e, "#contato")} className="btn btn-mel w-full">
                Vamos conversar
              </a>
              <p className="mt-4 font-mono text-xs text-claro-suave">{contato.email}</p>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
