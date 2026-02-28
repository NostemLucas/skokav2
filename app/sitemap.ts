import type { MetadataRoute } from "next"
import { anunciosData } from "@/lib/anuncios-data"
import { getAllDepartamentoSlugs } from "@/lib/departamentos-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://damasdecompañia.com.bo"
  const currentDate = new Date()

  // Main page
  const mainPage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ]

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ]

  // Category pages
  const categories = ["mujeres", "trans", "hombres", "parejas"]
  const categoryPages: MetadataRoute.Sitemap = categories.map((categoria) => ({
    url: `${baseUrl}/anuncios?categoria=${categoria}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }))

  // Anuncios page
  const anunciosPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/anuncios`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 0.9,
    },
  ]

  // Department pages (high priority for SEO)
  const departmentSlugs = getAllDepartamentoSlugs()
  const departmentPages: MetadataRoute.Sitemap = departmentSlugs.map((slug) => ({
    url: `${baseUrl}/departamento/${slug}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }))

  // Individual announcement pages
  const anuncioPages: MetadataRoute.Sitemap = anunciosData.map((anuncio) => {
    // Use individual anuncio dates if available and valid, fallback to current date
    let anuncioDate = currentDate
    if (anuncio.date) {
      const parsedDate = new Date(anuncio.date)
      // Check if date is valid
      if (!isNaN(parsedDate.getTime())) {
        anuncioDate = parsedDate
      }
    }

    return {
      url: `${baseUrl}/anuncios/${anuncio.slug}`,
      lastModified: anuncioDate,
      changeFrequency: "weekly" as const,
      priority: anuncio.verificado ? 0.8 : 0.6,
    }
  })

  return [
    ...mainPage,
    ...staticPages,
    ...anunciosPage,
    ...departmentPages,
    ...categoryPages,
    ...anuncioPages,
  ]
}
