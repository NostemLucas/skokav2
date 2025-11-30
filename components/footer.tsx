"use client"

import Link from "next/link"
import { Mail, Phone, Shield, Sparkles, ArrowUp } from "lucide-react"
import { HeelIcon } from "./icons/heel-icon"

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/50">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <HeelIcon className="w-5 h-5 text-primary-foreground" fill />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Damas de Compañía
                </span>
                <span className="block text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Bolivia</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
            
Damas de compañia es la mayor plataforma de anuncios para escorts independientes en toda Bolivia. Navega entre miles de nuevos anuncios de escorts calientes a nivel nacional. Disponible en los 9 departamentos.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">Seguro</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 rounded-lg border border-secondary/20">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span className="text-xs font-semibold text-secondary">Verificado</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-sm">Explorar</h3>
              <ul className="space-y-2.5">
                <li><Link href="/anuncios" className="text-sm text-muted-foreground hover:text-primary transition-colors">Anuncios</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ciudades</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Categorías</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-sm">Legal</h3>
              <ul className="space-y-2.5">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Términos</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacidad</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-sm">Soporte</h3>
              <ul className="space-y-2.5">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ayuda</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contacto</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Reportar</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-foreground mb-4 text-sm">Métodos de Contacto</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Email</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Teléfono</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-sm text-foreground">WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2025 Damas de Compañía Bolivia
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 hover:bg-primary/10 rounded-lg"
            >
              <ArrowUp className="w-3 h-3" />
              Volver arriba
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
