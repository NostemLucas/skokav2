import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { departamentosConfig, getAllDepartamentoSlugs } from "@/lib/departamentos-config"
import DepartamentoLanding from "./departamento-landing"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generar rutas estáticas para todos los departamentos
export function generateStaticParams() {
  return getAllDepartamentoSlugs().map((slug) => ({ slug }))
}

// Generar metadata dinámica por departamento con SEO avanzado
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const config = departamentosConfig[slug]

  if (!config) {
    return {
      title: "Departamento no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const baseUrl = "https://damasdecompañia.com.bo" 
  const canonicalUrl = `${baseUrl}/departamento/${slug}`
  const imageUrl = config.heroImage.startsWith('http') 
    ? config.heroImage 
    : `${baseUrl}${config.heroImage}`

  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords.join(", "),
    
    // Robots avanzado
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Open Graph mejorado
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      url: canonicalUrl,
      siteName: "Damas de Compañía Bolivia",
      type: "website",
      locale: "es_BO",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Escorts en ${config.nombre} - ${config.slogan}`,
        },
      ],
    },

    // Twitter Card mejorado
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
      images: [imageUrl],
 //     creator: "@tuhandle", // Cambia esto
   //   site: "@tuhandle", // Cambia esto
    },

    // URLs canónicas y alternativas
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "es-BO": canonicalUrl,
        "es": canonicalUrl,
      },
    },

    // Información adicional
    category: "Adult Services",
    
    // Metadata adicional para rich snippets
    other: {
      "geo.region": "BO",
      "geo.placename": config.nombre,
      "og:locality": config.nombre,
      "og:country-name": "Bolivia",
    },
  }
}

export default async function DepartamentoPage({ params }: PageProps) {
  const { slug } = await params
  const config = departamentosConfig[slug]

  if (!config) {
    notFound()
  }

  return (
  <>
   <h1 className="sr-only">Damas de compañía y escorts en {config.nombre}</h1>
   <DepartamentoLanding config={config} />
  </>
  )
 
}