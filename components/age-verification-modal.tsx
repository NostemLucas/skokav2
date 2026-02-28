"use client"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle } from "lucide-react"

export default function AgeVerificationModal() {
  const [showModal, setShowModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const hasVerified = localStorage.getItem("age-verified")
    if (!hasVerified) {
      setTimeout(() => {
        setShowModal(true)
        setTimeout(() => setIsLoaded(true), 50)
      }, 300)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("age-verified", "true")
    setShowModal(false)
  }

  const handleReject = () => {
    window.location.href = "https://www.google.com"
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop con animación */}
      <div
        className={`absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Decorative gradient orbs - más sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Modal Content con animación de entrada */}
      <div
        className={`relative w-full max-w-lg bg-card/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}
      >
        {/* Accent bar superior - más sutil */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        {/* Header minimalista */}
        <div className="relative pt-12 pb-8 px-8 text-center">
          {/* Icono con efecto glassmorphism */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {/* Glow animado */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              {/* Contenedor del icono */}
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">
                <Shield className="w-8 h-8 text-primary/90" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Título refinado */}
          <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
            Verificación de Edad
          </h2>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              Contenido +18
            </p>
          </div>
        </div>

        {/* Content refinado */}
        <div className="px-8 pb-10 space-y-8">
          {/* Warning elegante */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" strokeWidth={2} />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-foreground text-sm">Advertencia Legal</h3>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    Este sitio contiene contenido exclusivo para adultos mayores de 18 años.
                    Al continuar confirmas que cumples con este requisito legal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pregunta principal */}
          <div className="text-center py-3">
            <p className="text-xl font-bold text-foreground mb-2">
              ¿Eres mayor de 18 años?
            </p>
            <p className="text-sm text-muted-foreground">
              Confirma tu edad para acceder al contenido
            </p>
          </div>

          {/* Botones refinados */}
          <div className="space-y-3">
            <button
              onClick={handleAccept}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary to-secondary p-[1px] transition-all hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98]"
            >
              <div className="relative bg-gradient-to-r from-primary to-secondary rounded-2xl px-8 py-4 transition-all">
                <span className="relative z-10 text-white font-bold text-base">
                  Sí, tengo más de 18 años
                </span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors rounded-2xl" />
              </div>
            </button>

            <button
              onClick={handleReject}
              className="w-full px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm text-foreground/80 hover:text-foreground font-medium transition-all border border-white/10 hover:border-white/20 active:scale-[0.98]"
            >
              No, salir del sitio
            </button>
          </div>

          {/* Footer discreto */}
          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              Al continuar aceptas nuestros{" "}
              <a
                href="/terminos-y-condiciones"
                className="text-primary/80 hover:text-primary underline underline-offset-2 font-medium transition-colors"
              >
                Términos y Condiciones
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
