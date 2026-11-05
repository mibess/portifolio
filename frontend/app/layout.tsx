import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { siteMetadata } from "@/lib/site-metadata";
import { contato, perfil } from "@/lib/content";
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: perfil.nome,
  jobTitle: "Consultor em Arquitetura de Software e Mentor Técnico",
  url: siteMetadata.siteUrl,
  email: `mailto:${contato.email}`,
  image: `${siteMetadata.siteUrl}/opengraph-image`,
  address: { "@type": "PostalAddress", addressLocality: "Ribeirão Preto", addressRegion: "SP", addressCountry: "BR" },
  knowsAbout: ["Arquitetura de software", "Java", "Spring Boot", "Microsserviços", "AWS", "Angular", "Mentoria técnica"],
  sameAs: [contato.linkedin, contato.github, contato.whatsappUrl],
  description: siteMetadata.description,
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
    <html lang="pt-BR" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
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
