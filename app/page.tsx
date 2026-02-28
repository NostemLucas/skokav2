"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header";
import Hero from "@/components/hero";
import CategoryCards from "@/components/category-cards";
import Footer from "@/components/footer";
import DepartamentosGrid from "@/components/departamentos-grid";
import FeaturedAnuncios from "@/components/featured-anuncios";

export default function Home() {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Detectar si es mobile (pantalla pequeña)
    const isMobile = window.innerWidth < 768 // 768px = breakpoint md de Tailwind

    if (isMobile) {
      // En mobile, redirigir a /anuncios
      setIsRedirecting(true)
      router.push("/anuncios")
    }
  }, [router])

  // Si está redirigiendo en mobile, no renderizar nada
  if (isRedirecting) {
    return null
  }
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://damasdecompañia.com.bo/#website",
    name: "Damas de Compañia Bolivia",
    url: "https://damasdecompañia.com.bo/",
    description:
      "Portal de anuncios clasificados de damas de compañia en Bolivia organizados por departamento.",
    inLanguage: "es",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://damasdecompañia.com.bo/anuncios?ciudad={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <CategoryCards />
        <DepartamentosGrid />

        {/* Sección 1: Anuncios más recientes */}
        <FeaturedAnuncios mode="recent" icon="star" />

        {/* Sección 2: Anuncios aleatorios para descubrir */}
        <FeaturedAnuncios
          mode="random"
          icon="shuffle"
          title="Descubre Más"
          subtitle="Explora anuncios variados de todas las ciudades de Bolivia"
        />

        <Footer />
      </main>
    </>
  );
}
