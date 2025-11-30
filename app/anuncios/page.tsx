import type { Metadata } from "next"
import AnunciosClientPage from "./anuncios-client"

export const metadata: Metadata = {
  title: "Anuncios Clasificados Bolivia | Escorts, Masajes y Acompañantes",
  description:
    "Encuentra anuncios clasificados para adultos en Bolivia. Escorts verificadas, masajes, acompañantes en La Paz, Santa Cruz, Cochabamba. Contacto directo por WhatsApp.",
  keywords: [
    "anuncios clasificados bolivia",
    "escorts bolivia",
    "acompañantes la paz",
    "masajes santa cruz",
    "escorts cochabamba",
    "clasificados adultos",
    "encuentros discretos bolivia",
    "contacto whatsapp escorts",
  ].join(", "),
  openGraph: {
    title: "Anuncios Clasificados Bolivia | Escorts y Acompañantes",
    description:
      "Explora anuncios verificados de escorts y acompañantes en Bolivia. La Paz, Santa Cruz, Cochabamba y más ciudades.",
    type: "website",
    locale: "es_BO",
    siteName: "Clasificados Bolivia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuncios Clasificados Bolivia",
    description: "Encuentra escorts y acompañantes verificadas en Bolivia",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/anuncios",
  },
}

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Anuncios Clasificados Bolivia",
  description: "Listado de anuncios clasificados para adultos en Bolivia",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: "500+",
}

export default function AnunciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnunciosClientPage />
    </>
  )
}
