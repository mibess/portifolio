import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { siteMetadata } from "@/lib/site-metadata";
import { scriptRevelacao } from "@/lib/revelacao";
import { RETRATO, contato, perfil } from "@/lib/content";
import Providers from "./components/providers";
import Chat from "./components/chat";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const pessoaId = `${siteMetadata.siteUrl}/#claudemir`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": pessoaId,
      name: perfil.nome,
      jobTitle: "Consultor em Arquitetura de Software e Mentor Técnico",
      url: siteMetadata.siteUrl,
      email: contato.email,
      telephone: contato.telefoneInternacional,
      image: `${siteMetadata.siteUrl}${RETRATO ?? "/opengraph-image"}`,
      address: { "@type": "PostalAddress", addressLocality: "Ribeirão Preto", addressRegion: "SP", addressCountry: "BR" },
      knowsAbout: ["Arquitetura de software", "Java", "Spring Boot", "Microsserviços", "AWS", "Angular", "Mentoria técnica"],
      knowsLanguage: ["pt-BR", "en"],
      sameAs: [contato.linkedin, contato.github],
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Consultoria em arquitetura Java & Cloud", areaServed: "BR" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mentoria técnica", areaServed: "BR" } },
      ],
      description: siteMetadata.description,
    },
    {
      "@type": "WebSite",
      "@id": `${siteMetadata.siteUrl}/#site`,
      url: siteMetadata.siteUrl,
      name: "mibess",
      inLanguage: "pt-BR",
      publisher: { "@id": pessoaId },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#07111c",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.shortTitle}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.shortTitle, url: contato.linkedin }],
  creator: siteMetadata.shortTitle,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: "mibess",
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Revelações ao rolar: script inline, independente da hidratação do React (ver lib/revelacao.ts). */}
        <script dangerouslySetInnerHTML={{ __html: scriptRevelacao }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <Providers>
          {children}
          <Chat />
        </Providers>
      </body>
    </html>
  );
}
