"use client"

import { useState } from "react"
import AnuncioCard from "./anuncio-card"
import AnuncioDetailModal from "./anuncio-detail-modal"
import { anunciosData, type Anuncio } from "@/lib/anuncios-data"

export default function AnunciosSection() {
  const [selectedAnuncio, setSelectedAnuncio] = useState<Anuncio | null>(null)

  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Anuncios Recientes</h2>
            <p className="text-muted-foreground">Explora nuestros anuncios más recientes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {anunciosData.slice(0, 6).map((anuncio) => (
              <AnuncioCard key={anuncio.id} anuncio={anuncio} onOpen={setSelectedAnuncio} />
            ))}
          </div>
        </div>
      </section>

      <AnuncioDetailModal
        anuncio={selectedAnuncio}
        open={!!selectedAnuncio}
        onOpenChange={(open) => {
          if (!open) setSelectedAnuncio(null)
        }}
      />
    </>
  )
}
