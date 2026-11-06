"use client";

import { useEffect, useState } from "react";
import { getImageProps } from "next/image";

const comum = { alt: "", sizes: "100vw", quality: 75, loading: "eager" as const, fetchPriority: "high" as const };
const { props: desktop } = getImageProps({ ...comum, src: "/images/visual-chave-desktop.jpg", width: 1672, height: 941 });
const { props: celular } = getImageProps({ ...comum, src: "/images/visual-chave-mobile.jpg", width: 941, height: 1672 });

const VIDEO_CELULAR = "/videos/visual-chave-loop.mp4";
const VIDEO_DESKTOP = "/videos/visual-chave-loop-desktop.mp4";

/**
 * Fundo do hero com o visual-chave "Arquitetura em Movimento".
 * Cada aparelho mostra primeiro a sua imagem (16:9 no desktop, 9:16 no celular) e, por cima, o vídeo em loop
 * no mesmo formato, que aparece com um fade quando começa a tocar. O <picture> faz cada aparelho baixar só a
 * sua imagem. O vídeo não carrega com movimento reduzido ou economia de dados; aí fica a imagem com deriva lenta.
 */
export default function HeroBackdrop() {
  const [video, setVideo] = useState<string | null>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const celularMq = window.matchMedia("(max-width: 767px)");
    const reduzidoMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const atualizar = () => {
      setTocando(false);
      setVideo(reduzidoMq.matches || economia ? null : celularMq.matches ? VIDEO_CELULAR : VIDEO_DESKTOP);
    };
    atualizar();
    celularMq.addEventListener("change", atualizar);
    reduzidoMq.addEventListener("change", atualizar);
    return () => {
      celularMq.removeEventListener("change", atualizar);
      reduzidoMq.removeEventListener("change", atualizar);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[100svh] max-h-[860px] md:h-full md:max-h-none">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
          <source media="(max-width: 767px)" srcSet={celular.srcSet} sizes="100vw" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...celular}
            alt=""
            className="hero-deriva absolute inset-0 h-full w-full object-cover object-bottom md:object-right"
          />
        </picture>
        {video ? (
          <video
            key={video}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setTocando(true)}
            className={`absolute inset-0 h-full w-full object-cover object-bottom transition-opacity duration-700 md:object-right ${tocando ? "opacity-100" : "opacity-0"}`}
          />
        ) : null}
        <div className="absolute inset-0 bg-noite/35 md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-noite md:hidden" />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-noite/90 via-noite/45 to-transparent" />
    </div>
  );
}
