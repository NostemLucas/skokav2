"use client"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle, Lock, CheckCircle } from "lucide-react"

export default function AgeVerificationModal() {
  const [showModal, setShowModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const hasVerified = localStorage.getItem("age-verified")
    if (!hasVerified) {
      setTimeout(() => {
        setShowModal(true)
        setIsLoaded(true)
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
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-white/20 shadow-2xl overflow-hidden backdrop-blur-sm">

        {/* Accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

        {/* Header */}
        <div className="relative pt-10 pb-8 px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-xl opacity-40" />
              {/* Icon container */}
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            Verificación de Edad
          </h2>
          <p className="text-sm text-muted-foreground">
            Acceso Restringido +18
          </p>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 space-y-6">
          {/* Warning */}
          <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground text-sm">Advertencia Legal</h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  Este sitio contiene contenido exclusivo para adultos.
                  El acceso está legalmente restringido a personas mayores de 18 años.
                </p>
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-center">
              <Lock className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xs font-medium text-foreground">Privado</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Seguro</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3 text-center">
              <CheckCircle className="w-5 h-5 text-secondary mx-auto mb-2" />
              <p className="text-xs font-medium text-foreground">Legal</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Verificado</p>
            </div>
          </div>

          {/* Question */}
          <div className="text-center py-2">
            <p className="text-base font-semibold text-foreground mb-1.5">
              ¿Eres mayor de 18 años?
            </p>
            <p className="text-sm text-muted-foreground">
              Confirma tu edad para continuar
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAccept}
              className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98]"
            >
              Sí, confirmo - Tengo +18 años
            </button>
            <button
              onClick={handleReject}
              className="w-full px-6 py-3.5 rounded-xl bg-card hover:bg-muted text-foreground font-medium transition-all border border-white/10 hover:border-white/20 active:scale-[0.98]"
            >
              No, salir del sitio
            </button>
          </div>

          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Al continuar aceptas nuestros{" "}
              <a href="/terminos-y-condiciones" className="text-primary hover:underline font-medium">
                Términos y Condiciones
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
