"use client"

import Image from "next/image"
import { MapPin, Eye, CheckCircle2, Sparkles } from "lucide-react"
import type { Anuncio } from "@/lib/anuncios-data"

interface AnuncioCardProps {
  anuncio: Anuncio
  onOpen: (anuncio: Anuncio) => void
}

export default function AnuncioCard({ anuncio, onOpen }: AnuncioCardProps) {
  return (
    <div
      onClick={() => onOpen(anuncio)}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-card border border-border/40 hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
    >
      {/* Imagen - más prominente */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {anuncio.fotos.length > 0 ? (
          <>
            <Image
              src={anuncio.fotos[0] || "/placeholder.svg"}
              alt={anuncio.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Badge verificado */}
            {anuncio.verificado && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                <span className="text-[10px] font-bold text-primary-foreground uppercase tracking-wide">Verificado</span>
              </div>
            )}

            {/* Vistas badge */}
            {anuncio.vistas && (
              <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg flex items-center gap-1">
                <Eye className="w-3 h-3 text-white/80" />
                <span className="text-[10px] font-medium text-white/80">{anuncio.vistas}</span>
              </div>
            )}

            {/* Contenido sobre imagen */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Ciudad */}
              <div className="flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-white/90">{anuncio.city}</span>
              </div>

              {/* Título */}
              <h3 className="text-base font-bold text-white leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {anuncio.title}
              </h3>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <Sparkles className="w-8 h-8 text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Footer minimalista */}
      <div className="p-3 bg-card border-t border-border/30">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {anuncio.anuncio}
        </p>

        {/* Precio si existe */}
        {anuncio.precio && (
          <div className="mt-2 pt-2 border-t border-border/30 flex items-center justify-between">
            <span className="text-sm font-bold text-primary">Bs. {anuncio.precio}</span>
            <span className="text-[10px] text-muted-foreground">{anuncio.date}</span>
          </div>
        )}
      </div>
    </div>
  )
}
