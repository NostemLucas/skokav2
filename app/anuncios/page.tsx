import type { Metadata } from "next"
import AnunciosClientPage from "./anuncios-client"

export const metadata: Metadata = {
  title: "Damas de compañía y escorts | Anuncios de servicios de sexo en Bolivia",
  description:
    "Explora anuncios de damas de compañía y escorts en Bolivia. Servicios de sexo discretos en La Paz, Santa Cruz, Cochabamba y más ciudades.",
  keywords: [
    "anuncios clasificados bolivia",
    "escorts bolivia",
    "damas de compañía bolivia",
    "acompañantes la paz",
    "sexo bolivia",
    "escorts cochabamba",
    "clasificados adultos",
    "encuentros discretos bolivia",
    "contacto whatsapp escorts",
  ],
  openGraph: {
    title: "Damas de compañía y escorts | Anuncios de servicios de sexo en Bolivia",
    description:
      "Explora anuncios de damas de compañía y escorts en Bolivia. Servicios de sexo discretos y verificados.",
    type: "website",
    locale: "es_BO",
    siteName: "Damas de Compañía Bolivia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Damas de compañía y escorts en Bolivia",
    description: "Anuncios de servicios de sexo discretos y verificados en Bolivia",
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
