"use client"

import { MapPin, ArrowRight, Plane } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { anunciosData } from "@/lib/anuncios-data"

interface CategoryFilterProps {
  category?: string
}

const cityConfig = [
  { name: "Santa Cruz", gradient: "from-rose-500 to-pink-600" },
  { name: "La Paz", gradient: "from-violet-500 to-purple-600" },
  { name: "Cochabamba", gradient: "from-amber-500 to-orange-600" },
  { name: "El Alto", gradient: "from-cyan-500 to-blue-600" },
  { name: "Sucre", gradient: "from-emerald-500 to-teal-600" },
]

export default function CategoryFilter({ category = "Viajeras" }: CategoryFilterProps) {
  // Generate city data with images from anunciosData
  const cities = useMemo(() => {
    return cityConfig.map((config, index) => {
      // Find anuncios from this city
      const cityAnuncios = anunciosData.filter(a => a.city === config.name)
      const count = cityAnuncios.length

      // Get a random image from the city's anuncios, or fallback to any anuncio
      let image = "/images/anuncios/placeholder.jpg"
      if (cityAnuncios.length > 0) {
        // Pick anuncio based on index to keep it stable
        const anuncio = cityAnuncios[index % cityAnuncios.length]
        if (anuncio.fotos.length > 0) {
          image = anuncio.fotos[0]
        }
      } else {
        // Fallback: use image from any anuncio
        const fallbackAnuncio = anunciosData[index % anunciosData.length]
        if (fallbackAnuncio?.fotos.length > 0) {
          image = fallbackAnuncio.fotos[0]
        }
      }

      return {
        id: config.name,
        label: config.name,
        count: count || Math.floor(Math.random() * 50) + 10,
        image,
        gradient: config.gradient
      }
    })
  }, [])

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with icon */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-gradient-to-br from-primary to-secondary rounded-xl">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Scorts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Explora por <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ciudad</span>
            </h2>
          </div>
          <Link
            href="/anuncios"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
          >
            Ver todas las ciudades
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* City cards with images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/anuncios?ciudad=${encodeURIComponent(city.label)}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={city.image}
                alt={city.label}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${city.gradient} opacity-60 mix-blend-multiply`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Hover effect */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                {/* Count badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                  <span className="text-[10px] font-bold text-white">{city.count}+</span>
                </div>

                {/* City icon */}
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                  <MapPin className="w-4 h-4 text-white" />
                </div>

                {/* City name */}
                <h3 className="text-lg font-bold text-white mb-0.5">
                  {city.label}
                </h3>
                <p className="text-xs text-white/70">
                  {city.count} anuncios
                </p>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom info */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            ¿No encuentras tu ciudad? Tenemos anuncios en todo Bolivia
          </p>
          <Link
            href="/anuncios"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border/50 hover:border-primary/50 rounded-xl text-sm font-semibold text-foreground hover:text-primary transition-all duration-200"
          >
            <MapPin className="w-4 h-4" />
            Ver todos los anuncios
          </Link>
        </div>
      </div>
    </section>
  )
}
