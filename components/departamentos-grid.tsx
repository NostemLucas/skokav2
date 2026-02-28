"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin, ArrowRight, Users, Mountain, Palmtree, Sun, Building2, Church, Drum, Gem } from "lucide-react"
import { departamentosConfig } from "@/lib/departamentos-config"
import { anunciosData } from "@/lib/anuncios-data"
import { useMemo, useState, useEffect } from "react"

const departmentIcons: Record<string, React.ElementType> = {
  "la-paz": Mountain,
  "santa-cruz": Palmtree,
  cochabamba: Sun,
  "el-alto": Building2,
  sucre: Church,
  oruro: Drum,
  potosi: Gem,
}

export default function DepartamentosGrid() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // Solo renderizar aleatorios después de hidratar en el cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handler para click en tarjetas de departamento
  const handleDepartmentClick = (e: React.MouseEvent, deptSlug: string, deptNombreCorto: string) => {
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      e.preventDefault()
      // En mobile, ir a vista TikTok filtrada por ciudad
      router.push(`/anuncios?ciudad=${encodeURIComponent(deptNombreCorto)}`)
    }
    // En desktop, deja que el Link funcione normalmente (va a /departamento/[slug])
  }

  // Calcular conteo real de anuncios por departamento
  const departamentosWithCounts = useMemo(() => {
    const allDepartments = Object.values(departamentosConfig).map((dept) => {
      const count = anunciosData.filter(
        (a) =>
          a.city.toLowerCase() === dept.nombre.toLowerCase() || a.city.toLowerCase() === dept.nombreCorto.toLowerCase(),
      ).length

      // Obtener todos los anuncios de la ciudad con fotos
      const cityAnuncios = anunciosData.filter(
        (a) =>
          (a.city.toLowerCase() === dept.nombre.toLowerCase() ||
            a.city.toLowerCase() === dept.nombreCorto.toLowerCase()) &&
          a.fotos.length > 0,
      )

      // Seleccionar un anuncio ALEATORIO de la ciudad (solo en cliente)
      let previewImage = dept.heroImage
      if (isClient && cityAnuncios.length > 0) {
        const randomIndex = Math.floor(Math.random() * cityAnuncios.length)
        previewImage = cityAnuncios[randomIndex].fotos[0]
      } else if (!isClient && cityAnuncios.length > 0) {
        // En el servidor, usar el primero para evitar mismatch
        previewImage = cityAnuncios[0].fotos[0]
      }

      return {
        ...dept,
        realCount: count || Number.parseInt(dept.stats.anuncios) || 0,
        previewImage,
      }
    })

    // Ordenar por cantidad de anuncios (descendente) y tomar solo los 4 primeros
    return allDepartments
      .sort((a, b) => b.realCount - a.realCount)
      .slice(0, 4)
  }, [isClient])

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explora por{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Departamento
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Las ciudades con más actividad. Descubre las mejores escorts de Bolivia.
          </p>
        </div>

        {/* Grid de departamentos - Solo top 4 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {departamentosWithCounts.map((dept) => {
            const Icon = departmentIcons[dept.slug] || MapPin

            return (
              <Link
                key={dept.slug}
                href={`/departamento/${dept.slug}`}
                onClick={(e) => handleDepartmentClick(e, dept.slug, dept.nombreCorto)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                {/* Background Image */}
                <Image
                  src={dept.previewImage || "/placeholder.svg"}
                  alt={`Damas de compañía, escorts y sexo en ${dept.nombreCorto}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-secondary/20 to-transparent opacity-60 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: `${dept.accent.hue}15` }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-sm"
                      style={{ backgroundColor: `${dept.accent.hue}30` }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                      <span className="text-[10px] font-bold text-white">{dept.realCount}+</span>
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                      {dept.nombreCorto}
                    </h3>
                    <p className="text-xs text-white/70 mb-2 line-clamp-1">{dept.slogan}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-2 text-[10px] text-white/60">
                      <Users className="w-3 h-3" />
                      <span>{dept.stats.verificados} verificados</span>
                    </div>

                    <div
                      className="mt-3 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                      style={{ color: dept.accent.light }}
                    >
                      <span>Explorar</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(to right, ${dept.accent.hue}, ${dept.accent.dark})` }}
                />
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/anuncios"
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border/50 hover:border-primary/50 rounded-xl font-semibold text-foreground hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MapPin className="w-4 h-4" />
            Ver todos los anuncios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
