import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/60 dark:border-amber-900/30 bg-gradient-to-r from-amber-50/95 via-white/95 to-amber-100/80 dark:from-slate-950/90 dark:via-slate-900/90 dark:to-slate-950/90 backdrop-blur shadow-sm transition-all duration-300">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Ir para a página inicial">
          <Image
            src="/logo.png"
            alt="Logo Mibess"
            width={1000}
            height={1000}
            className="h-8 w-auto transition-opacity duration-300 sm:hidden"
            priority
          />
          <Image
            src="/logos/5 - horizontal.png"
            alt="Logo Mibess em modo claro"
            width={1000}
            height={1000}
            className="hidden h-8 w-auto transition-opacity duration-300 sm:block dark:sm:hidden"
            priority
          />
          <Image
            src="/logos/6 - horizontal.png"
            alt="Logo Mibess em modo escuro"
            width={1000}
            height={1000}
            className="hidden h-8 w-auto transition-opacity duration-300 dark:sm:block"
            priority
          />
        </Link>
        <div className="flex items-center space-x-4 md:space-x-6">
          <a
            href="#sobre"
            className="text-sm font-medium text-amber-900 transition-colors hover:text-amber-600 dark:text-amber-100 dark:hover:text-amber-300"
          >
            Sobre
          </a>
          <a
            href="#projetos"
            className="text-sm font-medium text-amber-900 transition-colors hover:text-amber-600 dark:text-amber-100 dark:hover:text-amber-300"
          >
            Projetos
          </a>
          <a
            href="#contato"
            className="text-sm font-medium text-amber-900 transition-colors hover:text-amber-600 dark:text-amber-100 dark:hover:text-amber-300"
          >
            Contato
          </a>

          <div className="hidden h-6 w-px bg-amber-200 dark:bg-amber-900/50 md:block" />

          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-amber-200 bg-amber-50/60 text-amber-900 hover:bg-amber-100 dark:border-amber-900/40 dark:bg-slate-950/40 dark:text-amber-100 dark:hover:bg-slate-900/60"
          >
            <a
              href="/Profile.pdf"
              download
              aria-label="Baixar currículo em PDF"
              className="flex items-center gap-2"
            >
              <Download className="size-4" aria-hidden="true" />
              <span>Currículo</span>
            </a>
          </Button>

          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
