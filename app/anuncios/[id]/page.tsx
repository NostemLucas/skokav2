import type { Metadata } from "next"
import Link from "next/link"
import { getAnuncioById } from "@/lib/anuncios-data"
import AnuncioDetailClient from "./anuncio-detail-client"
import { ChevronLeft } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const anuncio = getAnuncioById(id)

  if (!anuncio) {
    return {
      title: "Anuncio no encontrado | Clasificados Bolivia",
      description: "El anuncio que buscas no existe o ha sido eliminado.",
    }
  }

  const imageUrl = anuncio.fotos[0] || "/og-default.jpg"
  const description = anuncio.anuncio.substring(0, 155) + "..."

  return {
    title: `${anuncio.title} en ${anuncio.city} | Clasificados Bolivia`,
    description: description,
    keywords: [
      anuncio.title,
      anuncio.city,
      "escorts " + anuncio.city.toLowerCase(),
      "acompañantes " + anuncio.city.toLowerCase(),
      "clasificados bolivia",
      "contacto whatsapp",
      ...(anuncio.servicios || []),
    ].join(", "),
    openGraph: {
      title: `${anuncio.title} - ${anuncio.city}`,
      description: description,
      type: "article",
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
      canonical: `/anuncios/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// Generate JSON-LD structured data
function generateJsonLd(anuncio: NonNullable<ReturnType<typeof getAnuncioById>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: anuncio.title,
    description: anuncio.anuncio,
    image: anuncio.fotos,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BOB",
      price: anuncio.precio || "0",
    },
    aggregateRating: anuncio.verificado
      ? {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "1",
        }
      : undefined,
    brand: {
      "@type": "Brand",
      name: "Clasificados Bolivia",
    },
  }
}

export default async function AnuncioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const anuncio = getAnuncioById(id)

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

  const jsonLd = generateJsonLd(anuncio)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">
        {anuncio.title} - Escort en {anuncio.city}, Bolivia | Contacto WhatsApp
      </h1>
      <AnuncioDetailClient anuncio={anuncio} />
    </>
  )
}
