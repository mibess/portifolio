"use client";

import { useState } from "react";
import { X, HeartPulse } from "lucide-react";
import Image from "next/image";

const IMAGES = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `/personal-${i + 1}.jpg`,
  alt: `Imagem pessoal ${i + 1}`,
}));

export default function PersonalLife() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="flex items-center space-x-3 mb-4">
          <HeartPulse className="w-8 h-8 text-pink-500" />
          <h3 className="text-3xl font-display font-bold text-gray-100">
            Não é somente programação
          </h3>
        </div>
        <p className="flex flex-col items-start text-gray-200 font-mono text-sm leading-relaxed space-y-2">
          <span>Acredito que um bom desenvolvedor não é formado apenas por código.</span>
          <span>Fora das telas eu jogo futebol, toco violão, estudo coisas novas e passo tempo com minha família.</span>
          <span>Esses momentos me ajudam a manter a mente leve, criativa e curiosa.</span>

          <span>Programar exige foco e lógica — mas criar soluções exige energia, repertório e equilíbrio.</span>
          <span>É no movimento, na música e nas conversas que muitas das minhas melhores ideias começam.</span>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {IMAGES.map((img) => (
          <div
            key={img.id}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:scale-105 duration-300"
            onClick={() => setSelectedImage(img.src)}
          >
            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-200 relative">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                quality={75}
                sizes="(max-width: 768px) 96px, 128px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full h-[80vh] flex items-center justify-center animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2 cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Imagem Ampliada"
                fill
                quality={80}
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
