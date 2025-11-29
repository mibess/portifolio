import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider/theme-provider";
import { siteMetadata } from "@/lib/site-metadata";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Claudemir Custódio",
  jobTitle: "Full Stack Java Developer",
  url: siteMetadata.siteUrl,
  email: "mailto:c.silverio@live.com",
  image: `${siteMetadata.siteUrl}/profile.png`,
  sameAs: [
    "https://www.linkedin.com/in/claudemircustodio",
    "https://github.com/mibess",
    "https://wa.me/5516997200212",
  ],
  description: siteMetadata.description,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.shortTitle}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.shortTitle, url: "https://www.linkedin.com/in/claudemircustodio" }],
  creator: siteMetadata.shortTitle,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.shortTitle,
    locale: siteMetadata.locale,
    type: "website",
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "Claudemir Custódio - Full Stack Java Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
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

import Chat from "@/app/components/chat";



export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {

  return (

    <html lang="pt-BR" className={`${jetbrainsMono.variable} ${orbitron.variable} scroll-smooth`} suppressHydrationWarning>

      <body className="bg-cyber-black text-slate-200 font-mono antialiased overflow-x-hidden selection:bg-neon-cyan selection:text-black">

        <Script

          id="claudemir-custodio-ld-json"

          type="application/ld+json"

          strategy="beforeInteractive"

          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}

        />

        <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>

          <div className="scanline"></div>

          {children}

          <Chat />

        </ThemeProvider>

      </body>

    </html>

  );

}

// <html lang="pt-BR" suppressHydrationWarning>
//     <body className={`flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 min-h-screen transition-all duration-300`}>
//       <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
//           <Header />
//           <main>
//             {children}
//           </main>
//           <Footer />
//       </ThemeProvider>
//     </body>
// </html>
