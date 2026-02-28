import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, FileText, Shield, AlertTriangle, Users, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Damas de Compañía Bolivia",
  description: "Términos y condiciones de uso del portal de anuncios clasificados de damas de compañía en Bolivia.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/terminos-y-condiciones",
  },
}

export default function TerminosYCondicionesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Header Section */}
      <div className="relative py-12 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Términos y Condiciones
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Última actualización: Febrero 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">

          {/* 1. Aceptación */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">1. Aceptación de los Términos</h2>
            </div>
            <div className="pl-8 space-y-3 text-foreground/80 text-sm leading-relaxed">
              <p>
                Al acceder y utilizar DamasDeCompañia.com.bo (en adelante, "el Sitio"), usted acepta estar sujeto a estos Términos y Condiciones.
                Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
              </p>
              <p>
                El Sitio es una plataforma de anuncios clasificados que permite a usuarios adultos publicar y consultar anuncios de servicios de acompañamiento
                en Bolivia. No somos una agencia de escorts ni prestamos servicios de acompañamiento directamente.
              </p>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* 2. Contenido para Adultos */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">2. Contenido para Adultos (+18)</h2>
            </div>
            <div className="pl-8 space-y-3 text-foreground/80 text-sm leading-relaxed">
              <p>
                Este sitio contiene contenido exclusivo para adultos mayores de 18 años. Al acceder al Sitio, usted declara y garantiza que:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Es mayor de 18 años de edad</li>
                <li>Tiene capacidad legal para aceptar estos términos</li>
                <li>No se encuentra en una jurisdicción donde este tipo de contenido sea ilegal</li>
                <li>Accede al contenido de forma voluntaria y por iniciativa propia</li>
              </ul>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* 3. Uso del Sitio */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">3. Uso Permitido del Sitio</h2>
            </div>
            <div className="pl-8 space-y-4 text-foreground/80 text-sm leading-relaxed">
              <div>
                <p className="mb-2">El Sitio puede utilizarse únicamente para:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Publicar anuncios legítimos de servicios de acompañamiento</li>
                  <li>Consultar anuncios de servicios disponibles</li>
                  <li>Contactar directamente con los anunciantes a través de WhatsApp</li>
                </ul>
              </div>

              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                <p className="font-semibold mb-2">Está estrictamente prohibido:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>Publicar contenido ilegal, ofensivo o que promueva actividades ilegales</li>
                  <li>Publicar anuncios de menores de edad o que involucren tráfico de personas</li>
                  <li>Utilizar el sitio para actividades fraudulentas o engañosas</li>
                  <li>Acosar, amenazar o dañar a otros usuarios</li>
                  <li>Intentar acceder de forma no autorizada a sistemas o datos del Sitio</li>
                  <li>Utilizar bots, scrapers o herramientas automatizadas sin autorización</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* 4. Anuncios */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">4. Publicación de Anuncios</h2>
            </div>
            <div className="pl-8 space-y-3 text-foreground/80 text-sm leading-relaxed">
              <p>
                Los anunciantes son los únicos responsables del contenido que publican. Al publicar un anuncio, el usuario garantiza que:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>El contenido es veraz y no infringe derechos de terceros</li>
                <li>Cuenta con los derechos y permisos necesarios sobre las imágenes publicadas</li>
                <li>Los servicios ofrecidos son legales en Bolivia</li>
                <li>Toda persona que aparezca en las fotografías es mayor de edad y ha consentido su publicación</li>
              </ul>
              <p className="text-xs italic">
                Nos reservamos el derecho de eliminar cualquier anuncio que consideremos inapropiado, ilegal o que viole estos términos,
                sin previo aviso y sin obligación de justificación.
              </p>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* 5. Responsabilidades */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">5. Limitación de Responsabilidad</h2>
            </div>
            <div className="pl-8 space-y-3 text-foreground/80 text-sm leading-relaxed">
              <p>
                DamasDeCompañia.com.bo actúa únicamente como plataforma intermediaria de anuncios clasificados. No nos hacemos responsables de:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>La veracidad, calidad o legalidad de los servicios anunciados</li>
                <li>Las transacciones o acuerdos realizados entre usuarios y anunciantes</li>
                <li>Los daños, perjuicios o pérdidas derivadas del uso de los servicios anunciados</li>
                <li>El contenido de sitios web de terceros enlazados desde nuestro Sitio</li>
                <li>La disponibilidad continua e ininterrumpida del Sitio</li>
              </ul>
              <p className="text-xs italic">
                El Sitio se proporciona "tal cual" y "según disponibilidad" sin garantías de ningún tipo, expresas o implícitas.
              </p>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* 6. Privacidad */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">6. Privacidad y Datos Personales</h2>
            </div>
            <div className="pl-8 space-y-3 text-foreground/80 text-sm leading-relaxed">
              <p>
                El uso del Sitio está sujeto a nuestra Política de Privacidad. No recopilamos ni almacenamos datos personales de los visitantes
                más allá de los necesarios para el funcionamiento básico del sitio (cookies, análisis de tráfico).
              </p>
              <p>
                Los números de WhatsApp y datos de contacto publicados en los anuncios son de responsabilidad exclusiva de los anunciantes.
                Recomendamos a los usuarios proteger su privacidad y utilizar precauciones al compartir información personal.
              </p>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* 7. Propiedad Intelectual */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">7. Propiedad Intelectual</h2>
            </div>
            <div className="pl-8 space-y-3 text-foreground/80 text-sm leading-relaxed">
              <p>
                Todo el contenido del Sitio, incluyendo diseño, logotipos, texto, gráficos y código, está protegido por derechos de autor
                y es propiedad de DamasDeCompañia.com.bo o sus licenciantes.
              </p>
              <p>
                Los anunciantes retienen todos los derechos sobre el contenido que publican, pero otorgan al Sitio una licencia no exclusiva
                para mostrar, reproducir y distribuir dicho contenido en el contexto de la prestación del servicio.
              </p>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* 8. Modificaciones */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">8. Modificaciones de los Términos</h2>
            </div>
            <div className="pl-8 text-foreground/80 text-sm leading-relaxed">
              <p>
                Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios serán efectivos
                inmediatamente después de su publicación en el Sitio. El uso continuado del Sitio después de cualquier modificación
                constituye la aceptación de los nuevos términos.
              </p>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* 9. Ley Aplicable */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">9. Legislación Aplicable</h2>
            </div>
            <div className="pl-8 text-foreground/80 text-sm leading-relaxed">
              <p>
                Estos Términos y Condiciones se rigen por las leyes de Bolivia. Cualquier disputa relacionada con el uso del Sitio
                será sometida a la jurisdicción exclusiva de los tribunales competentes de Bolivia.
              </p>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* 10. Contacto */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">10. Contacto</h2>
            </div>
            <div className="pl-8 text-foreground/80 text-sm leading-relaxed">
              <p>
                Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos a través de:
              </p>
              <p className="font-semibold">
                Sitio web: https://damasdecompañia.com.bo
              </p>
            </div>
          </section>

          {/* Disclaimer Final */}
          <div className="mt-8 bg-red-500/5 border border-red-500/20 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">Aviso Importante</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  DamasDeCompañia.com.bo no tolera ni apoya ninguna forma de explotación, tráfico de personas o actividades ilegales.
                  Todos los anuncios deben cumplir estrictamente con las leyes bolivianas. Si detecta contenido ilegal o sospechoso,
                  por favor repórtelo a las autoridades competentes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
