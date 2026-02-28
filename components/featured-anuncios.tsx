"use client"

import { useState, useEffect } from "react"
import { Star, ArrowRight, Shuffle } from "lucide-react"
import Link from "next/link"
import { getRecentAnuncios, getRandomAnuncios } from "@/lib/anuncios-data"
import AnuncioCard from "@/components/anuncio-card"
import AnuncioDetailModal from "@/components/anuncio-detail-modal"
import type { Anuncio } from "@/lib/anuncios-data"

interface FeaturedAnunciosProps {
  mode?: "recent" | "random"
  title?: string
  subtitle?: string
  icon?: "star" | "shuffle"
}

export default function FeaturedAnuncios({
  mode = "recent",
  title,
  subtitle,
  icon = "star"
}: FeaturedAnunciosProps) {
  const [selectedAnuncio, setSelectedAnuncio] = useState<Anuncio | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [featuredAnuncios, setFeaturedAnuncios] = useState<Anuncio[]>([])

  // Solo renderizar aleatorios después de hidratar en el cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Get anuncios based on mode
  useEffect(() => {
    if (mode === "random" && !isClient) {
      // En servidor, usar anuncios recientes para evitar mismatch
      const anuncios = getRecentAnuncios()
        .filter(a => a.fotos.length > 0)
        .slice(0, 8)
      setFeaturedAnuncios(anuncios)
    } else if (mode === "random" && isClient) {
      // En cliente, generar aleatorios
      const anuncios = getRandomAnuncios()
        .filter(a => a.fotos.length > 0)
        .slice(0, 8)
      setFeaturedAnuncios(anuncios)
    } else {
      // Modo recent: siempre igual en servidor y cliente
      const anuncios = getRecentAnuncios()
        .filter(a => a.fotos.length > 0)
        .slice(0, 8)
      setFeaturedAnuncios(anuncios)
    }
  }, [mode, isClient])

  // Default titles based on mode
  const defaultTitle = mode === "random" ? "Descubre Anuncios" : "Anuncios Destacados"
  const defaultSubtitle = mode === "random"
    ? "Explora anuncios variados de toda Bolivia"
    : "Descubre los anuncios más recientes y verificados en toda Bolivia"

  const IconComponent = icon === "shuffle" ? Shuffle : Star

  const handleOpenAnuncio = (anuncio: Anuncio) => {
    setSelectedAnuncio(anuncio)
    setModalOpen(true)
  }

  return (
    <>
      <section className="relative py-20 sm:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-gradient-to-br from-primary to-secondary rounded-xl">
                  <IconComponent className="w-5 h-5 text-primary-foreground" fill={icon === "star" ? "currentColor" : "none"} />
                </div>
                <span className="text-sm font-bold text-primary uppercase tracking-wider">
                  {mode === "random" ? "Descubre" : "Destacados"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {mode === "random" ? (
                  <>
                    {(title || defaultTitle).split(' ')[0]}{' '}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {(title || defaultTitle).split(' ').slice(1).join(' ')}
                    </span>
                  </>
                ) : (
                  <>
                    Anuncios{' '}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Destacados
                    </span>
                  </>
                )}
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {subtitle || defaultSubtitle}
              </p>
            </div>
            <Link
              href="/anuncios"
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
            >
              Ver todos los anuncios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid de anuncios */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredAnuncios.map((anuncio) => (
              <AnuncioCard
                key={anuncio.id}
                anuncio={anuncio}
                onOpen={handleOpenAnuncio}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnuncioDetailModal
        anuncio={selectedAnuncio}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
