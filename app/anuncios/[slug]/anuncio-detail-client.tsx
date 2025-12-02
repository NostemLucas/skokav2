"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  AlertCircle,
  Eye,
  MapPin,
  Calendar,
  X,
  ZoomIn,
  MessageCircle,
  Mail,
  Share2,
  CheckCircle2,
  Clock,
  Camera,
  Phone,
} from "lucide-react"

import type { Anuncio } from "@/lib/anuncios-data"
import { formatNumber, formatCurrency } from "@/lib/utils"

export default function AnuncioDetailClient({ anuncio }: { anuncio: Anuncio }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % anuncio.fotos.length)
  }, [anuncio.fotos.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + anuncio.fotos.length) % anuncio.fotos.length)
  }, [anuncio.fotos.length])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      if (e.key === "Escape") setIsLightboxOpen(false)
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, nextImage, prevImage])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isLightboxOpen])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl">
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all group"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-white font-medium">
              {currentImageIndex + 1} / {anuncio.fotos.length}
            </span>
          </div>

          {/* Main image */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-16">
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
              <Image
                src={anuncio.fotos[currentImageIndex] || "/placeholder.svg"}
                alt={`${anuncio.title} | Damas de compañía, escorts y sexo en ${anuncio.city}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Navigation buttons */}
          {anuncio.fotos.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all group"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all group"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}

          {/* Thumbnails */}
          {anuncio.fotos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 backdrop-blur-sm rounded-xl max-w-[90vw] overflow-x-auto">
              {anuncio.fotos.map((foto, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    idx === currentImageIndex
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-black"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={foto || "/placeholder.svg"}
                    alt={`${anuncio.title} | Damas de compañía, escorts y sexo en ${anuncio.city}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          href="/anuncios"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver a anuncios</span>
        </Link>

   <h1 className="sr-only">
        {anuncio.title} | Damas de compañía y escorts en {anuncio.city}
      </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Gallery - Left column (3/5) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main image */}
            <div
              onClick={() => openLightbox(currentImageIndex)}
              className="relative aspect-[4/3] bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden cursor-zoom-in group border border-white/10"
            >
              {anuncio.fotos.length > 0 ? (
                <Image
                  src={anuncio.fotos[currentImageIndex] || "/placeholder.svg"}
                  alt={`${anuncio.title} | Damas de compañía, escorts y sexo en ${anuncio.city}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-primary/5">
                  <Camera className="w-16 h-16 text-muted-foreground/50" />
                </div>
              )}

              {/* Zoom indicator */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Navigation buttons */}
              {anuncio.fotos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full transition-all border border-white/10"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full transition-all border border-white/10"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-lg border border-white/10">
                <span className="text-sm font-semibold text-foreground">
                  {currentImageIndex + 1} / {anuncio.fotos.length}
                </span>
              </div>

              {/* Verified badge */}
              {anuncio.verificado && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                  <span className="text-sm font-semibold text-primary-foreground">Verificado</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {anuncio.fotos.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {anuncio.fotos.slice(0, 6).map((foto, idx) => (
                  <button
                    key={idx}
                    onClick={() => openLightbox(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden transition-all border-2 ${
                      idx === currentImageIndex
                        ? "border-primary shadow-lg shadow-primary/20"
                        : "border-white/10 hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={foto || "/placeholder.svg"}
                      alt={`${anuncio.title} | Damas de compañía, escorts y sexo en ${anuncio.city}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                    {idx === 5 && anuncio.fotos.length > 6 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold">+{anuncio.fotos.length - 6}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Description card */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-lg font-bold text-foreground mb-4">Descripción</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{anuncio.anuncio}</p>
            </div>

            {/* Info cards */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-lg font-bold text-foreground mb-4">Información</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {anuncio.edad && (
                  <div className="p-4 bg-background/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Edad</p>
                    <p className="font-bold text-foreground">{anuncio.edad} años</p>
                  </div>
                )}
                {anuncio.ubicacion && (
                  <div className="p-4 bg-background/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Zona</p>
                    <p className="font-bold text-foreground">{anuncio.ubicacion}</p>
                  </div>
                )}
                {anuncio.vistas && (
                  <div className="p-4 bg-background/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Vistas</p>
                    <p className="font-bold text-foreground">{formatNumber(anuncio.vistas)}</p>
                  </div>
                )}
                <div className="p-4 bg-background/50 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Fotos</p>
                  <p className="font-bold text-foreground">{anuncio.fotos.length}</p>
                </div>
              </div>

              {anuncio.servicios && anuncio.servicios.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">Servicios</p>
                  <div className="flex flex-wrap gap-2">
                    {anuncio.servicios.map((servicio, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20"
                      >
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Safety tips */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <h3 className="text-lg font-bold text-foreground">Consejos de seguridad</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground/70 ml-8">
                <li className="list-disc">Realiza encuentros en lugares seguros y públicos</li>
                <li className="list-disc">Verifica la identidad antes de proceder</li>
                <li className="list-disc">Nunca adelantes dinero sin confirmación</li>
                <li className="list-disc">Informa a alguien de confianza sobre tu ubicación</li>
              </ul>
            </div>
          </div>

          {/* Sidebar - Right column (2/5) */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              {/* Title card */}
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold text-foreground mb-4">{anuncio.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
                    <MapPin className="w-4 h-4" />
                    {anuncio.city}
                  </span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {anuncio.date}
                  </span>
                  {anuncio.vistas && (
                    <>
                      <span className="text-muted-foreground/50">•</span>
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {anuncio.vistas}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Price card */}
              {anuncio.precio && (
                <div className="bg-primary/10 backdrop-blur-sm rounded-2xl p-6 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Precio</p>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(anuncio.precio)}</p>
                </div>
              )}

              {/* Availability */}
              {anuncio.disponibilidad && (
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Disponibilidad</p>
                      <p className="font-semibold text-foreground">{anuncio.disponibilidad}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact card */}
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-4">
                <h2 className="text-lg font-bold text-foreground">Contacto</h2>

                {/* WhatsApp */}
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Phone className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">WhatsApp</p>
                      <p className="font-semibold text-foreground">{anuncio.whatsapp}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(anuncio.whatsapp, "whatsapp")}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Copiar WhatsApp"
                  >
                    {copied === "whatsapp" ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Email */}
                {anuncio.email && (
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground text-sm truncate">{anuncio.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(anuncio.email || "", "email")}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                      aria-label="Copiar email"
                    >
                      {copied === "email" ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${anuncio.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:shadow-xl hover:shadow-green-500/30"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contactar por WhatsApp
                </a>

                {anuncio.email && (
                  <a
                    href={`mailto:${anuncio.email}`}
                    className="w-full flex items-center justify-center gap-2 bg-card/80 hover:bg-card text-foreground font-semibold py-4 px-6 rounded-xl transition-all border border-white/10 hover:border-primary/30"
                  >
                    <Mail className="w-5 h-5" />
                    Enviar Email
                  </a>
                )}
              </div>

              {/* Share */}
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">Compartir</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(anuncio.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-background/50 hover:bg-background text-foreground py-2.5 px-4 rounded-xl transition-colors text-center text-sm font-semibold border border-white/10"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(anuncio.title + " " + (typeof window !== "undefined" ? window.location.href : ""))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary py-2.5 px-4 rounded-xl transition-colors text-center text-sm font-semibold"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
