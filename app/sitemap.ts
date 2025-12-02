import type { MetadataRoute } from "next"
import { anunciosData } from "@/lib/anuncios-data"
import { getAllDepartamentoSlugs } from "@/lib/departamentos-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.damasdecompañia.com.bo"
  const lastModified = new Date("2025-12-02T12:59:08+00:00")

  // Main page
  const mainPage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ]

  // Category pages
  const categories = ["mujeres", "trans", "hombres", "parejas"]
  const categoryPages: MetadataRoute.Sitemap = categories.map((categoria) => ({
    url: `${baseUrl}/anuncios?categoria=${categoria}`,
    lastModified: lastModified,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  // Anuncios page
  const anunciosPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/anuncios`,
      lastModified: lastModified,
      changeFrequency: "hourly",
      priority: 0.8,
    },
  ]

  // Department pages
  const departmentSlugs = getAllDepartamentoSlugs()
  const departmentPages: MetadataRoute.Sitemap = departmentSlugs.map((slug) => ({
    url: `${baseUrl}/departamento/${slug}`,
    lastModified: lastModified,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  // Individual announcement pages
  const anuncioPages: MetadataRoute.Sitemap = anunciosData.map((anuncio) => ({
    url: `${baseUrl}/anuncios/${anuncio.slug}`,
    lastModified: lastModified,
    changeFrequency: "daily" as const,
    priority: 0.64,
  }))

  return [
    ...mainPage,
    ...categoryPages,
    ...anunciosPage,
    ...departmentPages,
    ...anuncioPages,
  ]
}
