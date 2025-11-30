import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/anuncios"],
      disallow: ["/admin", "/api"],
    },
    sitemap: "https://skokka.com/sitemap.xml",
  }
}
