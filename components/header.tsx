"use client"
import { User, Plus, Sparkles } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { HeelIcon } from "./icons/heel-icon"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/30">
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Ir al inicio - Damas de Compañía Bolivia">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <HeelIcon className="w-5 h-5 text-primary-foreground" fill aria-hidden="true" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Damas de Compañía
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Bolivia</span>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <button
              className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200"
              aria-label="Perfil de usuario"
            >
              <User className="w-5 h-5" aria-hidden="true" />
            </button>
            <Link
              href="#"
              className="relative group bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Sparkles className="w-4 h-4 relative" aria-hidden="true" />
              <span className="hidden sm:inline relative">Publicar</span>
              <Plus className="w-4 h-4 sm:hidden relative" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
