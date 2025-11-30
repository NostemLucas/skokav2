"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SearchModal from "@/components/search-modal"
import { anunciosData } from "@/lib/anuncios-data"
import { Search, MapPin, Filter, ChevronDown, Sparkles, CheckCircle2, Camera, MessageCircle, Eye, ChevronLeft, ChevronRight, X } from "lucide-react"

const ITEMS_PER_PAGE = 10

export default function AnunciosClientPage() {
  const searchParams = useSearchParams()
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Read URL params on mount and when they change
  useEffect(() => {
    const ciudad = searchParams.get("ciudad")
    const q = searchParams.get("q")

    if (ciudad) setSelectedCity(ciudad)
    if (q) setSearchQuery(q)
  }, [searchParams])

  const cities = Array.from(new Set(anunciosData.map((a) => a.city)))

  const filteredAnuncios = useMemo(() => {
    return anunciosData.filter((anuncio) => {
      const matchesCity = !selectedCity || anuncio.city === selectedCity

      // Search in title, description, city
      const matchesSearch = !searchQuery ||
        anuncio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anuncio.anuncio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anuncio.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (anuncio.servicios && anuncio.servicios.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())))

      return matchesCity && matchesSearch
    })
  }, [selectedCity, searchQuery])

  const clearSearch = () => {
    setSearchQuery("")
    // Update URL without the q param
    const url = new URL(window.location.href)
    url.searchParams.delete("q")
    window.history.replaceState({}, "", url.toString())
  }

  const clearAllFilters = () => {
    setSelectedCity("")
    setSearchQuery("")
    window.history.replaceState({}, "", "/anuncios")
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredAnuncios.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedAnuncios = filteredAnuncios.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Reset to page 1 when filter changes
  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    setCurrentPage(1)
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push("...")
        pages.push(totalPages)
      }
    }
    return pages
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />

      {/* Hero section */}
      <section className="relative py-12 sm:py-16 overflow-hidden bg-primary/5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Anuncios verificados</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
                Anuncios en{" "}
                <span className="text-primary">Bolivia</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {filteredAnuncios.length} anuncio{filteredAnuncios.length !== 1 ? "s" : ""} disponible{filteredAnuncios.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 px-4 py-3 bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl hover:border-primary/30 transition-all"
            >
              <Filter size={18} className="text-primary" />
              <span className="text-sm font-semibold">Filtros</span>
            </button>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? "block" : "hidden"} sm:block space-y-4`}>
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card/60 backdrop-blur-xl rounded-2xl border border-white/10">
              {/* Search */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="flex-1 flex items-center gap-3 px-4 py-3.5 bg-background/50 border border-white/10 rounded-xl hover:border-primary/30 transition-all group"
              >
                <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Búsqueda avanzada...
                </span>
                <kbd className="hidden sm:inline-flex ml-auto px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted/50 rounded border border-white/10">
                  ⌘K
                </kbd>
              </button>

              {/* City Select */}
              <div className="relative sm:w-64">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 bg-background/50 border border-white/10 rounded-xl text-foreground appearance-none cursor-pointer hover:border-primary/30 focus:border-primary/50 focus:outline-none transition-colors font-medium"
                >
                  <option value="">Todas las ciudades</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Active filters */}
            {(searchQuery || selectedCity) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Filtros activos:</span>
                {searchQuery && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium text-primary">
                    <Search className="w-3 h-3" />
                    "{searchQuery}"
                    <button onClick={clearSearch} className="hover:text-primary/70 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {selectedCity && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium text-primary">
                    <MapPin className="w-3 h-3" />
                    {selectedCity}
                    <button onClick={() => handleCityChange("")} className="hover:text-primary/70 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors px-2"
                >
                  Limpiar todo
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Anuncios List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        {/* Results info */}
        {filteredAnuncios.length > 0 && (
          <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
            <span>
              Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredAnuncios.length)} de {filteredAnuncios.length}
            </span>
            <span>Página {currentPage} de {totalPages}</span>
          </div>
        )}

        {paginatedAnuncios.length > 0 ? (
          <div className="space-y-4">
            {paginatedAnuncios.map((anuncio) => (
              <Link
                key={anuncio.id}
                href={`/anuncios/${anuncio.id}`}
                className="group block"
              >
                <article className="flex gap-4 sm:gap-6 p-4 sm:p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                  {/* Image */}
                  <div className="relative flex-shrink-0 w-28 h-28 sm:w-40 sm:h-40 overflow-hidden rounded-xl bg-muted">
                    {anuncio.fotos.length > 0 ? (
                      <Image
                        src={anuncio.fotos[0]}
                        alt={anuncio.title}
                        fill
                        sizes="160px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-primary/5">
                        <Camera className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                    )}

                    {/* Photo count badge */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md">
                      <Camera className="w-3 h-3 text-foreground" />
                      <span className="text-xs font-semibold text-foreground">{anuncio.fotos.length}</span>
                    </div>

                    {/* Verified badge */}
                    {anuncio.verificado && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-primary/90 backdrop-blur-sm rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h2 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {anuncio.title}
                        </h2>
                        <span className="hidden sm:inline-flex flex-shrink-0 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                          {anuncio.date}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                        {anuncio.anuncio}
                      </p>

                      {/* Meta tags */}
                      <div className="flex items-center gap-3 text-sm flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                          <MapPin className="w-4 h-4" />
                          {anuncio.city}
                        </span>
                        {anuncio.vistas && (
                          <>
                            <span className="text-muted-foreground/50">•</span>
                            <span className="inline-flex items-center gap-1 text-muted-foreground">
                              <Eye className="w-4 h-4" />
                              {anuncio.vistas} vistas
                            </span>
                          </>
                        )}
                        <span className="sm:hidden text-muted-foreground/50">•</span>
                        <span className="sm:hidden text-xs text-muted-foreground">{anuncio.date}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MessageCircle className="w-4 h-4 text-primary" />
                        <span className="font-medium">WhatsApp disponible</span>
                      </div>
                      <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Ver detalle
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">No se encontraron anuncios</h3>
            <p className="text-muted-foreground mb-6">Intenta ajustar tus filtros de búsqueda</p>
            <button
              onClick={() => handleCityChange("")}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              Ver todos los anuncios
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {/* Previous button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2.5 bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary/30 hover:text-primary"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`dots-${idx}`} className="px-3 py-2 text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`min-w-[44px] px-3 py-2.5 rounded-xl font-semibold transition-all ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-card/80 backdrop-blur-sm border border-white/10 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* Next button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2.5 bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary/30 hover:text-primary"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
