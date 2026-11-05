import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/site-metadata";
import { contato } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: siteMetadata.siteUrl, lastModified: agora, priority: 1 },
    { url: `${siteMetadata.siteUrl}/privacidade`, lastModified: agora, priority: 0.3 },
    { url: `${siteMetadata.siteUrl}${contato.curriculo}`, lastModified: agora, priority: 0.6 },
    { url: `${siteMetadata.siteUrl}${contato.curriculoEn}`, lastModified: agora, priority: 0.6 },
  ];
}
