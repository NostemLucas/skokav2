import type { Metadata } from "next"
import Link from "next/link"
import { getAnuncioBySlug, anunciosData } from "@/lib/anuncios-data"
import AnuncioDetailClient from "./anuncio-detail-client"
import { ChevronLeft } from "lucide-react"

// Generate static params for all anuncios
export async function generateStaticParams() {
  return anunciosData.map((anuncio) => ({
    slug: anuncio.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const anuncio = getAnuncioBySlug(slug)

  if (!anuncio) {
    return {
      title: "Anuncio no encontrado | Damas de Compañía Bolivia",
      description: "El anuncio que buscas no existe o ha sido eliminado.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const imageUrl = anuncio.fotos[0] || "/og-default.jpg"
  const description = anuncio.anuncio.length > 155
    ? anuncio.anuncio.substring(0, 155) + "..."
    : anuncio.anuncio

  // Build keywords array
  const keywords = [
    anuncio.title,
    `damas de compañía ${anuncio.city.toLowerCase()}`,
    `escorts ${anuncio.city.toLowerCase()}`,
    `acompañantes ${anuncio.city.toLowerCase()}`,
    `sexo ${anuncio.city.toLowerCase()}`,
    "servicios discretos",
    "contacto whatsapp",
    ...(anuncio.servicios || []),
  ]

  return {
    title: `${anuncio.title} | Damas de compañía y escorts en ${anuncio.city}`,
    description: `${description} Servicios de sexo discretos en ${anuncio.city}.`,
    keywords: keywords,
    authors: [{ name: "Damas de Compañía Bolivia" }],
    creator: "Damas de Compañía Bolivia",
    publisher: "Damas de Compañía Bolivia",
    openGraph: {
      title: `${anuncio.title} - ${anuncio.city}`,
      description: description,
      type: "article",
      url: `/anuncios/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: anuncio.title,
        },
      ],
      locale: "es_BO",
      siteName: "Clasificados Bolivia",
    },
    twitter: {
      card: "summary_large_image",
      title: anuncio.title,
      description: description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/anuncios/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  }
}

// Generate JSON-LD structured data
function generateJsonLd(anuncio: NonNullable<ReturnType<typeof getAnuncioBySlug>>) {
  const baseUrl = "https://damasdecompañia.com.bo"
  const adUrl = `${baseUrl}/anuncios/${anuncio.slug}`

  return {
    "@context": "https://schema.org",
    "@type": "ClassifiedAd",
    "@id": `${adUrl}/#ad`,
    "name": `${anuncio.title} - Dama de Compañía en ${anuncio.city}`,
    "description": anuncio.anuncio,
    "inLanguage": "es",
    "datePosted": anuncio.date,
    "url": adUrl,
    "image": anuncio.fotos.length > 0 ? anuncio.fotos : undefined,
    "itemOffered": {
      "@type": "Service",
      "name": `Servicio de acompañamiento en ${anuncio.city}`,
      "description": anuncio.anuncio,
      "serviceType": "Servicio de acompañamiento",
      "provider": {
        "@type": "Person",
        "name": anuncio.title
      },
      "areaServed": {
        "@type": "City",
        "name": anuncio.city,
        "containedInPlace": {
          "@type": "Country",
          "name": "Bolivia"
        }
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": `https://wa.me/591${anuncio.whatsapp}`,
        "servicePhone": `+591${anuncio.whatsapp}`
      }
    },
    "offers": anuncio.precio ? {
      "@type": "Offer",
      "price": anuncio.precio.toString(),
      "priceCurrency": "BOB",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
    } : undefined,
  }
}

export default async function AnuncioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const anuncio = getAnuncioBySlug(slug)

  if (!anuncio) {
    return (
      <main className="min-h-screen bg-background">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Anuncio no encontrado</h1>
            <p className="text-muted-foreground mb-6">El anuncio que buscas no existe o ha sido eliminado.</p>
            <Link
              href="/anuncios"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver a anuncios
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const baseUrl = "https://damasdecompañia.com.bo"
  const adUrl = `${baseUrl}/anuncios/${slug}`
  const jsonLd = generateJsonLd(anuncio)

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Anuncios",
        "item": `${baseUrl}/anuncios`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": anuncio.title,
        "item": adUrl
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AnuncioDetailClient anuncio={anuncio} />
    </>
  )
}
