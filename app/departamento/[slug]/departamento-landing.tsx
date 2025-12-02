"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SearchModal from "@/components/search-modal"
import { anunciosData } from "@/lib/anuncios-data"
import type { DepartamentoConfig } from "@/lib/departamentos-config"
import {
  Search,
  MapPin,
  Sparkles,
  Shield,
  Star,
  Users,
  ArrowRight,
  CheckCircle2,
  Camera,
  TrendingUp,
  ChevronRight,
  Flame,
  Crown,
  Gem,
  Heart,
} from "lucide-react"

interface DepartamentoLandingProps {
  config: DepartamentoConfig
}

export default function DepartamentoLanding({ config }: DepartamentoLandingProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Filtrar anuncios por ciudad
  const cityAnuncios = useMemo(() => {
    return anunciosData.filter(
      (a) =>
        a.city.toLowerCase() === config.nombre.toLowerCase() ||
        a.city.toLowerCase() === config.nombreCorto.toLowerCase(),
    )
  }, [config.nombre, config.nombreCorto])

  // Obtener los últimos 6 anuncios para mostrar
  const featuredAnuncios = cityAnuncios.slice(0, 6)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background con imagen */}
        <div className="absolute inset-0">
          <Image
            src={config.heroImage || "/placeholder.svg"}
            alt={`Fotografía de damas de compañía y escorts en ${config.nombre}`}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/40" />
          {/* Capa extra para modo claro */}
          <div className="absolute inset-0 bg-background/30 dark:bg-transparent" />
        </div>

        <div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 dark:opacity-20"
          style={{ backgroundColor: config.accent.hue }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30 dark:opacity-15"
          style={{ backgroundColor: config.accent.light }}
        />

        <div
          className="absolute left-8 top-32 bottom-32 w-0.5 opacity-50 dark:opacity-30 hidden lg:block"
          style={{ background: `linear-gradient(to bottom, transparent, ${config.accent.hue}, transparent)` }}
        />

        {/* Content */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text */}
              <div className="space-y-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm">
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Inicio
                  </Link>
             
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold" style={{ color: config.accent.hue }}>
                    {config.nombreCorto}
                  </span>
                </nav>

                <div
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border shadow-sm"
                  style={{
                    backgroundColor: `${config.accent.hue}20`,
                    borderColor: `${config.accent.hue}50`,
                  }}
                >
                  <Flame className="w-4 h-4" style={{ color: config.accent.hue }} />
                  <span className="text-sm font-semibold" style={{ color: config.accent.dark }}>
                    {config.slogan}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight">
                    Damas de compañía y escorts en{" "}
                    <span className="relative inline-block">
                      <span className={`bg-gradient-to-r ${config.accent.gradient} bg-clip-text text-transparent`}>
                        {config.nombreCorto}
                      </span>
                      <span
                        className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${config.accent.hue}, ${config.accent.light}50)`,
                        }}
                      />
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                    {config.heroSubtitle}
                  </p>
                </div>

                {/* Search Button */}
                <div className="max-w-lg">
                  <button onClick={() => setIsSearchOpen(true)} className="w-full group relative">
                    <div
                      className="absolute -inset-1 rounded-2xl opacity-60 dark:opacity-50 blur-md group-hover:opacity-80 transition-opacity"
                      style={{ background: `linear-gradient(to right, ${config.accent.hue}, ${config.accent.dark})` }}
                    />
                    <div className="relative px-5 py-4 bg-card rounded-2xl border border-border shadow-lg flex items-center gap-4">
                      <div
                        className="p-3 rounded-xl shadow-md"
                        style={{ background: `linear-gradient(135deg, ${config.accent.hue}, ${config.accent.dark})` }}
                      >
                        <Search className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors text-left flex-1">
                        Buscar en {config.nombreCorto}...
                      </span>
                      <kbd
                        className="hidden sm:inline-flex px-3 py-1.5 text-xs font-bold rounded-lg border shadow-sm"
                        style={{
                          color: config.accent.dark,
                          backgroundColor: `${config.accent.hue}25`,
                          borderColor: `${config.accent.hue}50`,
                        }}
                      >
                        Ctrl+K
                      </kbd>
                    </div>
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Users, label: config.stats.anuncios, desc: "Anuncios" },
                    { icon: Shield, label: config.stats.verificados, desc: "Verificados" },
                    { icon: TrendingUp, label: `+${config.stats.nuevosHoy}`, desc: "Hoy" },
                  ].map((stat) => (
                    <div
                      key={stat.desc}
                      className="flex items-center gap-3 px-4 py-2.5 bg-card backdrop-blur-sm rounded-xl border shadow-sm"
                      style={{ borderColor: `${config.accent.hue}40` }}
                    >
                      <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${config.accent.hue}20` }}>
                        <stat.icon className="w-4 h-4" style={{ color: config.accent.hue }} />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-foreground">{stat.label}</span>
                        <span className="text-xs text-muted-foreground">{stat.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Preview Card */}
              <div className="hidden lg:block">
                <div
                  className="relative p-1 rounded-3xl shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${config.accent.hue}60, ${config.accent.light}40, ${config.accent.dark}60)`,
                  }}
                >
                  <div className="bg-card rounded-[22px] p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className="w-5 h-5" style={{ color: config.accent.hue }} />
                        <span className="font-semibold text-foreground">Destacadas en {config.nombreCorto}</span>
                      </div>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full shadow-sm"
                        style={{
                          backgroundColor: `${config.accent.hue}25`,
                          color: config.accent.dark,
                          border: `1px solid ${config.accent.hue}40`,
                        }}
                      >
                        VIP
                      </span>
                    </div>

                    {/* Mini preview de anuncios */}
                    <div className="space-y-3">
                      {featuredAnuncios.slice(0, 3).map((anuncio) => (
                        <Link
                          key={anuncio.id}
                          href={`/anuncios/${anuncio.id}`}
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group border border-transparent hover:border-border"
                        >
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-border">
                            {anuncio.fotos[0] ? (
                              <Image
                                src={anuncio.fotos[0] || "/placeholder.svg"}
                                alt={anuncio.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <Camera className="w-5 h-5 text-muted-foreground" />
                              </div>
                            )}
                            {anuncio.verificado && (
                              <div
                                className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                                style={{ backgroundColor: config.accent.hue }}
                              >
                                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                              {anuncio.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{anuncio.city}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`/anuncios?ciudad=${encodeURIComponent(config.nombreCorto)}`}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 shadow-md"
                      style={{ background: `linear-gradient(135deg, ${config.accent.hue}, ${config.accent.dark})` }}
                    >
                      Ver todas
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Descubre más</span>
          <div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5 shadow-sm"
            style={{ borderColor: `${config.accent.hue}70` }}
          >
            <div
              className="w-1.5 h-2.5 rounded-full animate-bounce shadow-sm"
              style={{ backgroundColor: config.accent.hue }}
            />
          </div>
        </div>
      </section>

      {/* ===== ZONAS SECTION ===== */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(to right, transparent, ${config.accent.hue}50, transparent)` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <div
                className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
                style={{ backgroundColor: `${config.accent.hue}15` }}
              >
                <MapPin className="w-4 h-4" style={{ color: config.accent.hue }} />
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: config.accent.dark }}>
                  Ubicaciones
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Zonas populares</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Encuentra escorts en las mejores zonas de {config.nombreCorto}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {config.zonas.map((zona, idx) => (
              <Link
                key={zona}
                href={`/anuncios?ciudad=${encodeURIComponent(config.nombreCorto)}&q=${encodeURIComponent(zona)}`}
                className="group relative"
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{ backgroundColor: `${config.accent.hue}30` }}
                />
                <div
                  className="relative p-4 bg-card rounded-xl border transition-all duration-300 group-hover:border-transparent group-hover:shadow-lg shadow-sm"
                  style={{
                    borderColor: idx === 0 ? `${config.accent.hue}60` : "var(--border)",
                    boxShadow: idx === 0 ? `0 0 0 1px ${config.accent.hue}30` : undefined,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full shadow-sm"
                      style={{
                        backgroundColor: config.accent.hue,
                        boxShadow: `0 0 6px ${config.accent.hue}50`,
                      }}
                    />
                    <span className="text-xs text-muted-foreground font-medium">Zona</span>
                  </div>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors block truncate">
                    {zona}
                  </span>
                  {/* Línea de acento en hover */}
                  <div
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: config.accent.hue }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICIOS DESTACADOS ===== */}
      <section className="py-20 bg-muted/50 dark:bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
              style={{ backgroundColor: `${config.accent.hue}15` }}
            >
              <Gem className="w-4 h-4" style={{ color: config.accent.hue }} />
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: config.accent.dark }}>
                Lo mejor de {config.nombreCorto}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Servicios destacados</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.destacados.map((destacado, index) => {
              const icons = [Sparkles, Star, Heart]
              const Icon = icons[index % icons.length]
              return (
                <div key={destacado} className="group relative">
                  <div
                    className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${config.accent.hue}70, ${config.accent.dark}70)` }}
                  />
                  <div className="relative p-6 bg-card rounded-2xl border border-border h-full shadow-sm">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{
                          backgroundColor: `${config.accent.hue}20`,
                          border: `1px solid ${config.accent.hue}30`,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: config.accent.hue }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{destacado}</h3>
                        <p className="text-sm text-muted-foreground">
                          Las mejores opciones de {destacado.toLowerCase()} en {config.nombreCorto}
                        </p>
                      </div>
                    </div>
                    {/* Línea de acento */}
                    <div
                      className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: config.accent.hue }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== ANUNCIOS RECIENTES ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div
                className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
                style={{ backgroundColor: `${config.accent.hue}15` }}
              >
                <Sparkles className="w-4 h-4" style={{ color: config.accent.hue }} />
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: config.accent.dark }}>
                  Anuncios recientes
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Escorts en {config.nombreCorto}</h2>
            </div>
            <Link
              href={`/anuncios?ciudad=${encodeURIComponent(config.nombreCorto)}`}
              className="hidden sm:flex items-center gap-2 font-semibold transition-colors group px-4 py-2 rounded-lg"
              style={{
                color: config.accent.dark,
                backgroundColor: `${config.accent.hue}15`,
              }}
            >
              Ver todos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featuredAnuncios.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAnuncios.map((anuncio) => (
                <Link key={anuncio.id} href={`/anuncios/${anuncio.id}`} className="group block">
                  <article
                    className="bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl shadow-sm"
                    style={{ "--hover-border": `${config.accent.hue}50` } as React.CSSProperties}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {anuncio.fotos.length > 0 ? (
                        <Image
                          src={anuncio.fotos[0] || "/placeholder.svg"}
                          alt={anuncio.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Camera className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        {anuncio.verificado && (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white rounded-full shadow-md"
                            style={{ backgroundColor: config.accent.hue }}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            Verificada
                          </span>
                        )}
                      </div>
                      {/* City tag */}
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full">
                          <MapPin className="w-3 h-3" />
                          {anuncio.city}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {anuncio.title}
                      </h3>
                     
                      {/* Línea de acento <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{anuncio.description}</p> */}
                      <div
                        className="mt-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: config.accent.hue }}
                      />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-border shadow-sm">
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No hay anuncios en {config.nombreCorto} aún
              </h3>
              <p className="text-muted-foreground mb-6">Sé el primero en publicar un anuncio en esta ciudad</p>
              <Link
                href="/publicar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 shadow-md"
                style={{ background: `linear-gradient(135deg, ${config.accent.hue}, ${config.accent.dark})` }}
              >
                Publicar anuncio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Mobile CTA */}
          <div className="sm:hidden mt-8">
            <Link
              href={`/anuncios?ciudad=${encodeURIComponent(config.nombreCorto)}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 shadow-md"
              style={{ background: `linear-gradient(135deg, ${config.accent.hue}, ${config.accent.dark})` }}
            >
              Ver todos los anuncios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            background: `linear-gradient(135deg, ${config.accent.hue}20, transparent, ${config.accent.dark}20)`,
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${config.accent.hue}50, transparent)` }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full shadow-sm"
            style={{
              backgroundColor: `${config.accent.hue}20`,
              border: `1px solid ${config.accent.hue}40`,
            }}
          >
            <Star className="w-4 h-4" style={{ color: config.accent.hue }} />
            <span className="text-sm font-semibold" style={{ color: config.accent.dark }}>
              Publica tu anuncio
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¿Quieres destacar en{" "}
            <span className={`bg-gradient-to-r ${config.accent.gradient} bg-clip-text text-transparent`}>
              {config.nombreCorto}
            </span>
            ?
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma y llega a miles de usuarios en {config.nombre}. Publicación rápida, segura y con
            máxima visibilidad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/publicar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:scale-105 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${config.accent.hue}, ${config.accent.dark})` }}
            >
              Publicar ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/como-funciona"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground bg-card border border-border transition-all hover:bg-muted shadow-sm"
            >
              Cómo funciona
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
