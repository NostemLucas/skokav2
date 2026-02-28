"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import {
  MapPin,
  CheckCircle2,
  Eye,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Filter,
  Share2,
  Info,
  Grid3x3
} from "lucide-react"
import { HeelIcon } from "@/components/icons/heel-icon"
import type { Anuncio } from "@/lib/anuncios-data"

interface AnunciosFeedMobileProps {
  anuncios: Anuncio[]
  selectedCity?: string
  onCityChange?: (city: string) => void
  onClose: () => void
}

export default function AnunciosFeedMobile({
  anuncios,
  selectedCity: externalSelectedCity = "",
  onCityChange,
  onClose
}: AnunciosFeedMobileProps) {
  const [currentAnuncioIndex, setCurrentAnuncioIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Vertical carousel for anuncios
  const [emblaRefVertical, emblaApiVertical] = useEmblaCarousel({
    axis: 'y',
    loop: false,
    skipSnaps: false,
    duration: 20
  })

  // Get unique cities from all anuncios
  const cities = Array.from(new Set(anuncios.map(a => a.city))).sort()

  // Filter anuncios by city (usa el filtro externo)
  const filteredAnuncios = externalSelectedCity
    ? anuncios.filter(a => a.city === externalSelectedCity)
    : anuncios

  const currentAnuncio = filteredAnuncios[currentAnuncioIndex]

  // Handler para cambiar ciudad
  const handleCityChange = (city: string) => {
    if (onCityChange) {
      onCityChange(city)
    }
    setCurrentAnuncioIndex(0) // Reset al primer anuncio cuando cambia filtro
    setShowFilters(false)
  }

  // Handle vertical scroll
  const onSelect = useCallback(() => {
    if (!emblaApiVertical) return
    setCurrentAnuncioIndex(emblaApiVertical.selectedScrollSnap())
    setShowInfo(false)
  }, [emblaApiVertical])

  useEffect(() => {
    if (!emblaApiVertical) return
    emblaApiVertical.on('select', onSelect)
    return () => {
      emblaApiVertical.off('select', onSelect)
    }
  }, [emblaApiVertical, onSelect])

  // Preload next/previous images
  useEffect(() => {
    const preloadImages = () => {
      const indicesToPreload = [
        currentAnuncioIndex - 1,
        currentAnuncioIndex + 1
      ].filter(i => i >= 0 && i < filteredAnuncios.length)

      indicesToPreload.forEach(index => {
        const anuncio = filteredAnuncios[index]
        if (anuncio.fotos.length > 0) {
          const img = new window.Image()
          img.src = anuncio.fotos[0]
        }
      })
    }
    preloadImages()
  }, [currentAnuncioIndex, filteredAnuncios])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  // Reset to first anuncio when filter changes
  useEffect(() => {
    if (emblaApiVertical) {
      emblaApiVertical.scrollTo(0)
      setCurrentAnuncioIndex(0)
    }
  }, [externalSelectedCity, emblaApiVertical])

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Right side action buttons - TikTok style */}
      <div className="absolute right-4 bottom-40 z-20 flex flex-col gap-3">
        {/* Filter button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex flex-col items-center gap-0.5 group"
        >
          <div className={`flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md transition-all ${
            externalSelectedCity || showFilters
              ? 'bg-primary shadow-md shadow-primary/30'
              : 'bg-black/40 hover:bg-black/60'
          }`}>
            <Filter className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-[9px] text-white font-medium">Filtrar</span>
        </button>

        {/* Info toggle */}
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex flex-col items-center gap-0.5 group"
        >
          <div className={`flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md transition-all ${
            showInfo
              ? 'bg-primary shadow-md shadow-primary/30'
              : 'bg-black/40 hover:bg-black/60'
          }`}>
            <Info className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-[9px] text-white font-medium">Info</span>
        </button>

        {/* Share */}
        <button
          onClick={() => {
            if (navigator.share && currentAnuncio) {
              navigator.share({
                title: currentAnuncio.title,
                text: currentAnuncio.anuncio,
                url: window.location.origin + `/anuncios/${currentAnuncio.slug}`
              }).catch(() => {})
            }
          }}
          className="flex flex-col items-center gap-0.5 group"
        >
          <div className="flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md bg-black/40 hover:bg-black/60 transition-all">
            <Share2 className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-[9px] text-white font-medium">Compartir</span>
        </button>
      </div>

      {/* Filter Panel - Drawer */}
      <div className={`absolute top-0 right-0 bottom-0 w-80 bg-gradient-to-b from-black via-black to-black/95 backdrop-blur-xl border-l border-white/10 z-30 transition-transform duration-300 ${
        showFilters ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header with logo */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between mb-5">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <HeelIcon className="w-5 h-5 text-white" fill />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Damas de Compañía
                  </span>
                  <span className="text-[9px] text-white/50 font-medium tracking-wider uppercase">Bolivia</span>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setShowFilters(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>
            </div>

            {/* Counter */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
              <span className="text-xs text-white/70">Viendo</span>
              <span className="text-sm text-white font-bold">
                {currentAnuncioIndex + 1} de {filteredAnuncios.length}
              </span>
            </div>
          </div>

          {/* Cities list */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3 px-2">
              <h4 className="text-xs text-white/60 uppercase tracking-wider font-semibold">
                Ciudad
              </h4>
              {externalSelectedCity && (
                <button
                  onClick={() => handleCityChange("")}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* All option */}
            <button
              onClick={() => handleCityChange("")}
              className={`w-full text-left px-4 py-3.5 rounded-xl mb-2 transition-all ${
                !externalSelectedCity
                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white shadow-lg shadow-primary/10'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Grid3x3 className="w-4 h-4 text-primary/80" />
                  <span className="font-semibold">Todas las ciudades</span>
                </div>
                <span className="text-xs px-2.5 py-1 bg-white/10 rounded-full font-medium">{anuncios.length}</span>
              </div>
            </button>

            {/* City options */}
            <div className="space-y-1.5">
              {cities.map((city) => {
                const count = anuncios.filter(a => a.city === city).length
                return (
                  <button
                    key={city}
                    onClick={() => handleCityChange(city)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      externalSelectedCity === city
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white shadow-lg shadow-primary/10'
                        : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-primary/80" />
                        <span className="font-medium">{city}</span>
                      </div>
                      <span className="text-xs px-2.5 py-1 bg-white/10 rounded-full font-medium">{count}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Footer info */}
          <div className="p-4 border-t border-white/10">
            <p className="text-center text-xs text-white/50">
              Desliza para navegar entre anuncios
            </p>
          </div>
        </div>
      </div>

      {/* Vertical carousel */}
      <div className="h-full" ref={emblaRefVertical}>
        <div className="h-full">
          {filteredAnuncios.map((anuncio, index) => (
            <div key={anuncio.id} className="relative h-full">
              <AnuncioSlide
                anuncio={anuncio}
                isActive={index === currentAnuncioIndex}
                showInfo={showInfo}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Active filter badge - top center */}
      {externalSelectedCity && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/15 shadow-md animate-in fade-in slide-in-from-top">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-white font-semibold">{externalSelectedCity}</span>
            <button
              onClick={() => setSelectedCity("")}
              className="ml-0.5 hover:bg-white/20 rounded-full p-0.5 transition-all"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface AnuncioSlideProps {
  anuncio: Anuncio
  isActive: boolean
  showInfo: boolean
}

function AnuncioSlide({ anuncio, isActive, showInfo }: AnuncioSlideProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Horizontal carousel for photos
  const [emblaRefHorizontal, emblaApiHorizontal] = useEmblaCarousel({
    loop: false,
    skipSnaps: false
  })

  const onSelectPhoto = useCallback(() => {
    if (!emblaApiHorizontal) return
    setCurrentPhotoIndex(emblaApiHorizontal.selectedScrollSnap())
  }, [emblaApiHorizontal])

  useEffect(() => {
    if (!emblaApiHorizontal) return
    emblaApiHorizontal.on('select', onSelectPhoto)
    return () => {
      emblaApiHorizontal.off('select', onSelectPhoto)
    }
  }, [emblaApiHorizontal, onSelectPhoto])

  const scrollPrev = useCallback(() => {
    if (emblaApiHorizontal) emblaApiHorizontal.scrollPrev()
  }, [emblaApiHorizontal])

  const scrollNext = useCallback(() => {
    if (emblaApiHorizontal) emblaApiHorizontal.scrollNext()
  }, [emblaApiHorizontal])

  // Reset photo index when anuncio changes
  useEffect(() => {
    if (isActive && emblaApiHorizontal) {
      emblaApiHorizontal.scrollTo(0)
    }
  }, [isActive, emblaApiHorizontal])

  const hasMultiplePhotos = anuncio.fotos.length > 1

  return (
    <div className="relative w-full h-full">
      {/* Photos carousel */}
      <div className="w-full h-full overflow-hidden" ref={emblaRefHorizontal}>
        <div className="flex h-full">
          {anuncio.fotos.map((foto, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              <Image
                src={foto}
                alt={`${anuncio.title} - Foto ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0 && isActive}
                quality={90}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Photo navigation - subtle */}
      {hasMultiplePhotos && (
        <>
          {currentPhotoIndex > 0 && (
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/3 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white/90" />
            </button>
          )}
          {currentPhotoIndex < anuncio.fotos.length - 1 && (
            <button
              onClick={scrollNext}
              className="absolute left-4 top-1/3 translate-y-8 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white/90" />
            </button>
          )}
        </>
      )}

      {/* Photo indicators - Story-style bars */}
      {hasMultiplePhotos && (
        <div className="absolute top-4 left-4 right-4 z-10 flex gap-1">
          {anuncio.fotos.map((_, index) => (
            <div
              key={index}
              className="h-1 rounded-full transition-all duration-300 flex-1 overflow-hidden bg-white/20 backdrop-blur-sm"
            >
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  index === currentPhotoIndex
                    ? 'w-full bg-white shadow-sm'
                    : index < currentPhotoIndex
                    ? 'w-full bg-white/60'
                    : 'w-0 bg-white/60'
                }`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Dark overlay for better visibility */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pb-6 pr-20">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-2.5">
          {anuncio.verificado && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/95 backdrop-blur-sm rounded-full shadow-md shadow-primary/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wide">Verificado</span>
            </div>
          )}
          {anuncio.vistas && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full">
              <Eye className="w-3.5 h-3.5 text-white/90" />
              <span className="text-[11px] font-medium text-white/90">{anuncio.vistas}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-2 leading-tight line-clamp-2 drop-shadow-md">
          {anuncio.title}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-3.5">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-white">{anuncio.city}</span>
          {anuncio.ubicacion && (
            <>
              <span className="text-white/50 text-xs">•</span>
              <span className="text-xs text-white/80 font-medium">{anuncio.ubicacion}</span>
            </>
          )}
        </div>

        {/* Expandable info */}
        {showInfo && (
          <div className="mb-3.5 p-4 bg-black/60 backdrop-blur-xl rounded-xl border border-white/15 animate-in slide-in-from-bottom duration-200">
            <p className="text-xs text-white/95 leading-relaxed mb-3">
              {anuncio.anuncio}
            </p>

            {anuncio.servicios && anuncio.servicios.length > 0 && (
              <div className="mb-3 pb-3 border-b border-white/15">
                <span className="text-[10px] text-white/70 uppercase tracking-wider mb-2 block font-bold">Servicios</span>
                <div className="flex flex-wrap gap-1.5">
                  {anuncio.servicios.map((servicio, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-primary/25 border border-primary/30 rounded-full text-[10px] text-white font-medium"
                    >
                      {servicio}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs">
              {anuncio.precio && (
                <div className="flex items-center gap-1.5">
                  <span className="text-white/70 font-medium">Precio:</span>
                  <span className="font-bold text-primary">Bs. {anuncio.precio}</span>
                </div>
              )}
              {anuncio.edad && (
                <div className="flex items-center gap-1.5">
                  <span className="text-white/70 font-medium">Edad:</span>
                  <span className="font-bold text-white">{anuncio.edad} años</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/591${anuncio.whatsapp}?text=Vi%20tu%20anuncio%20en%20https://damasdecompañia.com.bo/%20Me%20gustaria%20quedar%20contigo`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-green-600/90 hover:bg-green-600 rounded-lg font-medium text-white text-sm transition-all backdrop-blur-sm active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Contactar por WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
