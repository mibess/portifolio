// components/LoadingScreen.tsx
import React from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const logoSrc = "/logo.png";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
      {/* Logo */}
      <div className="mb-4">
         {/* Certifique-se que a logo existe em public/ */}
        <Image
          src={logoSrc}
          alt="Logo"
          width={150} // Ajuste o tamanho conforme necessário
          height={150}
          className="animate-pulse" // Animação simples de pulso
          priority // Carregar logo com prioridade
        />
      </div>
    </div>
  );
}