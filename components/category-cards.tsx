"use client"

import Image from "next/image"
import { Heart, Users, Sparkles, User, ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Mujeres",
    slug: "mujeres",
    description: "Encuentra en Bolivia a las mejores escorts que te ofrecen gran variedad de servicios eróticos.",
    image: "https://bo.skokka.com/static/assets/womenseekmen_repr.09bc5c7b4ed7201892f6.jpg",
    icon: Heart,
    stats: "500+",
    gradient: "from-pink-500 to-rose-500",
    locations: [
      { city: "La Paz", count: 180 },
      { city: "Cochabamba", count: 150 },
      { city: "Santa Cruz", count: 170 },
    ],
  },
  {
    id: 2,
    name: "Trans",
    slug: "trans",
    description: "Atrévete a probar todas las aristas del placer con las más sexys trans y travestis de Bolivia",
    image: "/images/category-trans.jpg",
    icon: Sparkles,
    stats: "150+",
    gradient: "from-purple-500 to-violet-500",
    locations: [
      { city: "Santa Cruz", count: 65 },
      { city: "La Paz", count: 45 },
      { city: "Cochabamba", count: 40 },
    ],
  },
  {
    id: 3,
    name: "Hombres",
    slug: "hombres",
    description: "Encuentra escorts y acompañantes masculinos en Bolivia. Disfruta de encuentros con hombres.",
    image: "/images/category-hombres.jpg",
    icon: User,
    stats: "80+",
    gradient: "from-blue-500 to-indigo-500",
    locations: [
      { city: "La Paz", count: 35 },
      { city: "Santa Cruz", count: 28 },
      { city: "El Alto", count: 17 },
    ],
  },
  {
    id: 4,
    name: "Parejas",
    slug: "parejas",
    description: "Encontrar citas y encuentros eróticos con quienes descubrir tu lado más ardiente.",
    image: "/images/category-parejas.jpg",
    icon: Users,
    stats: "60+",
    gradient: "from-amber-500 to-orange-500",
    locations: [
      { city: "Santa Cruz", count: 25 },
      { city: "Cochabamba", count: 20 },
      { city: "La Paz", count: 15 },
    ],
  },
]

export default function CategoryCards() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Encuentros calientes en tu 

            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Ciudad</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          ¡Selecciona la ciudad o categoría que más te guste!
          </p>
        </div>

        {/* Cards Grid - Image focused */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                href={`/anuncios?categoria=${category.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
              >
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
                  <span className="text-xs font-bold text-white">{category.stats}</span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/70 mb-3 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Cities */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {category.locations.slice(0, 3).map((loc, idx) => (
                      <span key={idx} className="text-[10px] font-medium text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
                        {loc.city}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Ver anuncios</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/anuncios"
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border/50 hover:border-primary/50 rounded-xl font-semibold text-foreground hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Ver todos los anuncios</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
