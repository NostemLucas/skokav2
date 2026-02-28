"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Phone, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Anuncio } from "@/lib/anuncios-data"

interface AnuncioDetailModalProps {
  anuncio: Anuncio | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AnuncioDetailModal({ anuncio, open, onOpenChange }: AnuncioDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!anuncio) return null

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % anuncio.fotos.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? anuncio.fotos.length - 1 : prev - 1))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-accent/20 bg-background/95 backdrop-blur-md">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground">{anuncio.title}</DialogTitle>
              <p className="mt-2 text-sm text-muted-foreground">{anuncio.anuncio}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Galería de imágenes */}
          {anuncio.fotos.length > 0 && (
            <div className="space-y-3">
              <div className="relative h-80 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={anuncio.fotos[currentImageIndex] || "/placeholder.svg"}
                  alt={`${anuncio.title} | Damas de compañía, escorts y sexo en ${anuncio.city}`}
                  fill
                  className="object-cover"
                />
                {anuncio.fotos.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
                      {currentImageIndex + 1} / {anuncio.fotos.length}
                    </div>
                  </>
                )}
              </div>

              {/* Miniaturas */}
              {anuncio.fotos.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {anuncio.fotos.map((foto, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        index === currentImageIndex ? "border-accent" : "border-transparent opacity-50 hover:opacity-75"
                      }`}
                      aria-label={`Ver imagen ${index + 1} de ${anuncio.fotos.length}`}
                    >
                      <Image
                        src={foto || "/placeholder.svg"}
                        alt={`${anuncio.title} | Damas de compañía, escorts y sexo en ${anuncio.city}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Información */}
          <div className="grid gap-4 rounded-xl bg-accent/5 p-4">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="text-foreground font-medium">{anuncio.city}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="text-foreground font-medium">{anuncio.date}</span>
            </div>
            {anuncio.precio && (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-accent font-bold">Precio:</span>
                <span className="text-foreground font-medium">${anuncio.precio}</span>
              </div>
            )}
          </div>

          {/* Botón WhatsApp */}
          <a
            href={`https://wa.me/591${anuncio.whatsapp}?text=Vi%20tu%20anuncio%20en%20https://damasdecompañia.com.bo/%20Me%20gustaria%20quedar%20contigo`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            aria-label={`Contactar a ${anuncio.title} por WhatsApp`}
          >
            <Button className="w-full rounded-xl bg-[#25D366] hover:bg-[#20BA58] text-white font-semibold py-6 text-base">
              <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
              Contactar por WhatsApp
            </Button>
          </a>

          {/* Enlace a página completa */}
          <Link
            href={`/anuncios/${anuncio.slug || anuncio.id}`}
            onClick={() => onOpenChange(false)}
            className="flex items-center justify-center gap-2 text-sm text-accent hover:text-accent/80 font-medium transition-colors py-2"
          >
            <ExternalLink className="w-4 h-4" />
            Ver detalles completos
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
