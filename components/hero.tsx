"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Sparkles, Shield, Star, Users } from "lucide-react"
import SearchModal from "@/components/search-modal"

export default function Hero() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <section className="relative overflow-hidden h-[calc(100vh-4rem)] min-h-[550px] flex items-center" aria-label="Sección principal">
      {/* Background Image - Full width banner */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Damas de compañía, escorts y sexo en Bolivia"
          fill
          className="object-cover object-right-top"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30" />
        {/* Color tint */}
        <div className="absolute inset-0 bg-primary/5" />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60" aria-hidden="true" />

      {/* Content */}
      <div className="relative w-full px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-primary/30 mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-primary">Plataforma Verificada</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              Encuentra{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Compañía
              </span>
              <br />
              en Bolivia
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Conecta de forma segura y celebra el deseo, sin limites y con total discreción. 
            </p>

            {/* Search Button */}
            <div className="max-w-lg mb-8">
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Abrir búsqueda avanzada"
                className="w-full px-5 py-4 bg-card/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 hover:border-primary/50 hover:shadow-primary/20 transition-all duration-300 flex items-center gap-4 group"
              >
                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
                  <Search className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
                </div>
                <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors text-left flex-1">
                  Buscar por ciudad, nombre...
                </span>
                <kbd className="hidden sm:inline-flex px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 rounded-lg border border-primary/20" aria-hidden="true">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 px-3 py-2 bg-card/60 backdrop-blur-sm rounded-xl border border-white/10">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">100% Discreto</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-card/60 backdrop-blur-sm rounded-xl border border-white/10">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Verificados</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-card/60 backdrop-blur-sm rounded-xl border border-white/10">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">+500 Anuncios</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </section>
  )
}
