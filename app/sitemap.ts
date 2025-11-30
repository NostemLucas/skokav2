import type { MetadataRoute } from "next"
import { anunciosData } from "@/lib/anuncios-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://damasdecompañia.com"

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/anuncios`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
  ]

  // Dynamic announcement pages
  const anuncioPages: MetadataRoute.Sitemap = anunciosData.map((_, index) => ({
    url: `${baseUrl}/anuncios/${index}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }))

  return [...mainPages, ...anuncioPages]
}
