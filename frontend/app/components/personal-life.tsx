"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, HeartPulse } from "lucide-react";
import Image from "next/image";

interface ImageMeta {
  ratio: string;
  status: string;
  latency: string;
  focus: string;
}

interface PersonalImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  tag: string;
  description: string;
  meta: ImageMeta;
}

const IMAGES: PersonalImage[] = [
  {
    id: 1,
    src: "/personal-1.jpg",
    alt: "Fotografia da estrada e do pôr do sol refletido no retrovisor do carro",
    category: "PERSPECTIVE_CAPTURE",
    tag: "📸 FOCUS_PERSPECTIVE",
    description: "Fotografar me treina a capturar o ângulo perfeito e as nuances do momento. Este registro da estrada refletida no retrovisor durante o pôr do sol traduz minha paixão por capturar caminhos, horizontes e o valor dos pequenos detalhes que passam no fluxo diário.",
    meta: { ratio: "3:4", status: "CAPTURED", latency: "N/A", focus: "OBSERVABLE" }
  },
  {
    id: 2,
    src: "/personal-2.jpg",
    alt: "Minha filha sorrindo feliz sob bolhas de sabão",
    category: "FAMILY_JOY",
    tag: "👶 CORE_LEGACY",
    description: "A pureza e a alegria contagiante da minha filha em meio às bolhas de sabão ao ar livre. Ela é meu combustível diário, a base do meu equilíbrio emocional e quem me ensina a redescobrir o mundo com a curiosidade e o entusiasmo de uma criança.",
    meta: { ratio: "9:16", status: "ONLINE", latency: "0ms", focus: "UNCONDITIONAL" }
  },
  {
    id: 3,
    src: "/personal-3.jpg",
    alt: "Claudemir e sua parceira sorrindo juntos no campo ao entardecer",
    category: "PARTNER_ANCHOR",
    tag: "🏠 ROOT_STABILITY",
    description: "Ao lado da minha esposa e parceira de vida, renovando as energias na natureza. O companheirismo, o afeto e a estabilidade familiar são a base silenciosa e segura sobre a qual construo todos os meus passos profissionais.",
    meta: { ratio: "3:4", status: "STABLE", latency: "0ms", focus: "STEADY" }
  },
  {
    id: 4,
    src: "/personal-4.jpg",
    alt: "Culinária na brasa com fogo de chão ativo, representando a paixão por cozinhar em geral",
    category: "CULINARY_FLOW",
    tag: "🔥 HEAT_SANDBOX",
    description: "A arte da gastronomia, do fogo e da criação na cozinha. Explorar receitas, dominar a brasa e cozinhar em geral é o meu laboratório favorito de criatividade sensorial e descompressão. Para mim, preparar uma boa refeição é a melhor forma de reunir pessoas queridas e celebrar momentos offline reais.",
    meta: { ratio: "9:16", status: "ACTIVE", latency: "0ms", focus: "CRAFTING" }
  },
  {
    id: 5,
    src: "/personal-5.jpg",
    alt: "Claudemir posando em quadra de gramado sintético com bola de futebol sob o pé",
    category: "FOOTBALL_ENERGY",
    tag: "⚽ TACTICAL_MOTION",
    description: "O futebol de final de semana é minha válvula de escape físico e de foco tático. Além do exercício, jogar futebol me ensina sobre leitura de jogo, cooperação coletiva rápida, estratégia sob pressão e o ritmo necessário para resolver problemas em equipe.",
    meta: { ratio: "2:3", status: "RUNNING", latency: "MINIMAL", focus: "STRATEGIC" }
  },
  {
    id: 6,
    src: "/personal-6.jpg",
    alt: "Claudemir tocando violão de pernas cruzadas no tapete de brinquedo com sua filha pequena ao lado tocando um piano infantil",
    category: "ACOUSTIC_GENESIS",
    tag: "🎸 MUSIC_RESONANCE",
    description: "Dedilhar acordes no violão enquanto minha filha experimenta seus primeiros ritmos em seu tecladinho de brinquedo. A música é nossa linguagem de criatividade abstrata, permitindo acalmar a mente lógica e criar momentos de pura conexão e harmonia.",
    meta: { ratio: "3:4", status: "RESONATING", latency: "0ms", focus: "CREATIVE" }
  }
];

export default function PersonalLife() {
  const [selectedImage, setSelectedImage] = useState<PersonalImage | null>(null);

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = IMAGES.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
    setSelectedImage(IMAGES[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = IMAGES.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % IMAGES.length;
    setSelectedImage(IMAGES[nextIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    if (!selectedImage) return;

    const currentLocks = parseInt(document.body.getAttribute("data-scroll-locks") || "0", 10);
    document.body.setAttribute("data-scroll-locks", String(currentLocks + 1));
    document.body.classList.add("overflow-hidden");

    return () => {
      const locks = parseInt(document.body.getAttribute("data-scroll-locks") || "0", 10);
      const newLocks = Math.max(0, locks - 1);
      if (newLocks === 0) {
        document.body.removeAttribute("data-scroll-locks");
        document.body.classList.remove("overflow-hidden");
      } else {
        document.body.setAttribute("data-scroll-locks", String(newLocks));
      }
    };
  }, [selectedImage]);

  return (
    <section className="py-20 max-w-6xl mx-auto px-4 relative">
      {/* Decorative grid pattern backgrounds */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Manifesto & System Info */}
        <div className="lg:col-span-5 flex flex-col text-left space-y-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan">
            <span className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
            <span>STATUS: OFFLINE // BALANCING</span>
          </div>

          <div className="flex items-center space-x-3">
            <HeartPulse className="w-8 h-8 md:w-10 md:h-10 text-neon-purple drop-shadow-[0_0_8px_rgba(188,19,254,0.5)] animate-pulse" style={{ animationDuration: "2s" }} />
            <h3 className="text-4xl md:text-5xl font-display font-bold text-gray-100 tracking-tighter leading-[1.1]">
              HUMAN.<span className="text-neon-cyan">core()</span>
            </h3>
          </div>

          <div className="font-mono text-xs text-neon-purple font-bold tracking-wider uppercase">
            // O algoritmo por trás da lógica
          </div>

          <div className="glass-panel p-6 rounded-3xl relative border-l-4 border-neon-cyan/50 font-mono text-sm leading-relaxed text-gray-300">
            <span className="absolute top-3 right-3 text-[10px] text-white/20 select-none">v1.0.4</span>
            <p className="mb-4">
              <span className="text-neon-cyan mr-1.5">&gt;</span> Acredito que a excelência técnica é sustentada por quem somos fora do terminal. Minha rotina vai muito além de compilar em Java e desenhar microsserviços.
            </p>
            <p>
              <span className="text-neon-cyan mr-1.5">&gt;</span> É no som de um acorde, na estratégia de um passe no gramado e na presença com a minha família que eu recarrego minha criatividade e renovo minha perspectiva para solucionar problemas complexos.
            </p>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-[10px] font-mono text-gray-500">
            <span>[SYS_INTERESTS: 6_NODES_ACTIVE]</span>
            <span>•</span>
            <span>[CLICK_NODE_TO_INSPECT]</span>
          </div>
        </div>

        {/* Right Column: Interactive Bento Grid */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {IMAGES.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group relative aspect-[3/4] cursor-pointer rounded-2xl overflow-hidden glass-panel border border-white/5 hover:border-neon-cyan/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-neon-blue"
              >
                {/* Image and dynamic desaturation filters */}
                <div className="absolute inset-0 z-0 bg-cyber-black overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={80}
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover opacity-75 group-hover:opacity-100 grayscale-[40%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-cyber-black via-transparent to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
                </div>

                {/* Corner Decorative Borders */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay details */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end text-left">
                  <span className="font-mono text-[10px] md:text-xs text-neon-cyan font-bold tracking-wider mb-0.5 truncate drop-shadow-md">
                    {img.tag}
                  </span>
                  <span className="font-mono text-[8px] md:text-[9px] text-gray-400 uppercase tracking-widest truncate">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Retro-Tech Modal Inspection Screen */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full glass-panel rounded-3xl border border-neon-cyan/30 overflow-hidden flex flex-col md:flex-row h-auto md:h-[550px] max-h-[95vh] shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Cyber Bar for Mobile */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-cyber-black/80">
              <div className="flex items-center space-x-2 font-mono text-xs text-neon-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />
                <span>INSPECT: {selectedImage.category}</span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Premium Photo Viewport with Blurred Backdrop reflection */}
            <div className="relative flex-1 bg-[#0a0a0c] flex items-center justify-center min-h-[320px] md:h-full overflow-hidden select-none">
              {/* Blurred background image reflection to prevent solid black bars */}
              <Image
                src={selectedImage.src}
                alt=""
                fill
                quality={15}
                priority
                className="object-cover filter blur-3xl opacity-25 pointer-events-none"
              />
              
              {/* Left Arrow Controller */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 z-20 p-2 md:p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white/75 hover:text-neon-cyan hover:border-neon-cyan/50 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Crisp foreground image */}
              <div className="relative w-full h-full p-4 md:p-8 flex items-center justify-center z-10">
                <div className="relative w-full h-full aspect-[3/4]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>

              {/* Right Arrow Controller */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 z-20 p-2 md:p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white/75 hover:text-neon-cyan hover:border-neon-cyan/50 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              
              {/* Ambient overlay lines & grid glow */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0)_85%,rgba(0,243,255,0.04))] pointer-events-none" />
            </div>

            {/* Technical description sidebar */}
            <div className="w-full md:w-[380px] md:h-full bg-cyber-dark/95 border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col justify-between font-mono text-left select-none overflow-y-auto max-h-[45vh] md:max-h-full">
              
              {/* Close Button for desktop */}
              <div className="hidden md:flex justify-end mb-4">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-neon-cyan transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2 cursor-pointer border border-white/10"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Header Info */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center space-x-2 text-[10px] text-neon-cyan mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-purple animate-pulse" />
                  <span>IMAGE_INSPECT_SYSTEM v1.0.4</span>
                </div>

                <h4 className="text-lg md:text-xl font-display font-bold text-gray-100 uppercase tracking-tight mb-1">
                  {selectedImage.tag}
                </h4>
                <span className="text-[10px] text-gray-500 tracking-wider">
                  CATEGORY: {selectedImage.category}
                </span>

                <div className="border-t border-dashed border-white/10 my-4" />

                {/* Emotional/Human Copywriting adapted to image analysis */}
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-mono mb-6">
                  {selectedImage.description}
                </p>
              </div>

              {/* Retro Metadata dashboard */}
              <div className="bg-cyber-black/50 p-4 rounded-xl border border-white/5 space-y-2 mt-4">
                <div className="text-[10px] text-neon-purple font-bold">// SYSTEM_METADATA</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-gray-400">
                  <div>STATUS: <span className="text-neon-cyan">{selectedImage.meta.status}</span></div>
                  <div>LATENCY: <span className="text-neon-cyan">{selectedImage.meta.latency}</span></div>
                  <div>RATIO: <span className="text-neon-cyan">{selectedImage.meta.ratio}</span></div>
                  <div>FOCUS: <span className="text-neon-purple">{selectedImage.meta.focus}</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
