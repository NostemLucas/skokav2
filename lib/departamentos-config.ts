// Configuración de departamentos con estilos y contenido único
export interface DepartamentoConfig {
  slug: string
  nombre: string
  nombreCorto: string
  descripcion: string
  slogan: string
  heroSubtitle: string
  accent: {
    hue: string // Color base para acentos (todas en gama rosa-púrpura)
    gradient: string // Gradiente sutil
    light: string // Color más claro
    dark: string // Color más oscuro
  }
  // Imagen de fondo del hero
  heroImage: string
  // Stats locales
  stats: {
    anuncios: string
    verificados: string
    nuevosHoy: string
  }
  // Zonas/barrios populares
  zonas: string[]
  // Características destacadas de la ciudad
  destacados: string[]
  // Meta SEO
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export const departamentosConfig: Record<string, DepartamentoConfig> = {
  "la-paz": {
    slug: "la-paz",
    nombre: "La Paz",
    nombreCorto: "La Paz",
    descripcion:
      "La ciudad maravilla, donde el cielo se encuentra con el deseo. Escorts exclusivas en la ciudad más alta del mundo.",
    slogan: "Pasión a gran altura",
    heroSubtitle:
      "Descubre las escorts más exclusivas de La Paz. Compañía de alto nivel en la ciudad más alta del mundo.",
    accent: {
      hue: "#a855f7", // Purple 500
      gradient: "from-purple-500 via-violet-500 to-purple-600",
      light: "#c084fc", // Purple 400
      dark: "#7c3aed", // Violet 600
    },
    heroImage: "/la-paz-bolivia-cityscape-night-mountains.jpg",
    stats: {
      anuncios: "180+",
      verificados: "95%",
      nuevosHoy: "12",
    },
    zonas: ["Zona Sur", "Sopocachi", "San Miguel", "Calacoto", "Obrajes", "Miraflores"],
    destacados: ["Escorts VIP", "Masajes premium", "Acompañantes ejecutivas"],
    seo: {
      title: "Escorts en La Paz | Damas de Compañía La Paz Bolivia",
      description:
        "Encuentra las mejores escorts y damas de compañía en La Paz, Bolivia. Acompañantes verificadas en Zona Sur, Sopocachi, Calacoto. Contacto directo WhatsApp.",
      keywords: ["escorts la paz", "damas de compañía la paz", "acompañantes la paz bolivia", "escorts zona sur"],
    },
  },
  "santa-cruz": {
    slug: "santa-cruz",
    nombre: "Santa Cruz de la Sierra",
    nombreCorto: "Santa Cruz",
    descripcion: "La ciudad del calor y la sensualidad. Las escorts más ardientes del oriente boliviano te esperan.",
    slogan: "Donde el calor se siente",
    heroSubtitle: "Las escorts más sensuales de Santa Cruz. Belleza tropical y pasión del oriente boliviano.",
    accent: {
      hue: "#ec4899", // Pink 500
      gradient: "from-pink-500 via-rose-500 to-pink-600",
      light: "#f472b6", // Pink 400
      dark: "#db2777", // Pink 600
    },
    heroImage: "/santa-cruz-bolivia-tropical-city-night.jpg",
    stats: {
      anuncios: "220+",
      verificados: "98%",
      nuevosHoy: "18",
    },
    zonas: ["Equipetrol", "Urbarí", "Centro", "Plan 3000", "La Ramada", "Av. Monseñor"],
    destacados: ["Escorts latinas", "Shows privados", "Fiestas VIP"],
    seo: {
      title: "Escorts en Santa Cruz | Damas de Compañía Santa Cruz Bolivia",
      description:
        "Las mejores escorts y acompañantes en Santa Cruz de la Sierra. Mujeres hermosas y verificadas en Equipetrol, Urbarí. WhatsApp disponible.",
      keywords: [
        "escorts santa cruz",
        "damas de compañía santa cruz",
        "acompañantes equipetrol",
        "escorts bolivia oriente",
      ],
    },
  },
  cochabamba: {
    slug: "cochabamba",
    nombre: "Cochabamba",
    nombreCorto: "Cochabamba",
    descripcion: "La llajta del amor. Escorts cariñosas y apasionadas en el corazón de Bolivia.",
    slogan: "Amor en el valle",
    heroSubtitle: "Escorts encantadoras en la ciudad jardín. Calidez cochala y pasión sin límites.",
    accent: {
      hue: "#d946ef", // Fuchsia 500
      gradient: "from-fuchsia-500 via-pink-500 to-fuchsia-600",
      light: "#e879f9", // Fuchsia 400
      dark: "#c026d3", // Fuchsia 600
    },
    heroImage: "/cochabamba-bolivia-valley-city-sunset.jpg",
    stats: {
      anuncios: "150+",
      verificados: "92%",
      nuevosHoy: "8",
    },
    zonas: ["Zona Norte", "Centro", "Cala Cala", "Recoleta", "Queru Queru", "Sarco"],
    destacados: ["Escorts universitarias", "Masajes relajantes", "Cenas románticas"],
    seo: {
      title: "Escorts en Cochabamba | Damas de Compañía Cochabamba Bolivia",
      description:
        "Encuentra escorts y damas de compañía en Cochabamba. Acompañantes verificadas en Zona Norte, Cala Cala, Recoleta. Contacto WhatsApp.",
      keywords: ["escorts cochabamba", "damas de compañía cochabamba", "acompañantes llajta", "escorts cala cala"],
    },
  },
  "el-alto": {
    slug: "el-alto",
    nombre: "El Alto",
    nombreCorto: "El Alto",
    descripcion: "La ciudad que nunca duerme. Escorts accesibles y discretas las 24 horas.",
    slogan: "Pasión sin límites",
    heroSubtitle: "Escorts disponibles 24/7 en El Alto. Discreción total y precios accesibles.",
    accent: {
      hue: "#8b5cf6", // Violet 500
      gradient: "from-violet-500 via-purple-500 to-violet-600",
      light: "#a78bfa", // Violet 400
      dark: "#7c3aed", // Violet 600
    },
    heroImage: "/el-alto-bolivia-city-aerial-view.jpg",
    stats: {
      anuncios: "100+",
      verificados: "88%",
      nuevosHoy: "6",
    },
    zonas: ["Villa Adela", "16 de Julio", "Río Seco", "Ciudad Satélite", "Senkata"],
    destacados: ["Atención 24/7", "Precios económicos", "Discreción total"],
    seo: {
      title: "Escorts en El Alto | Damas de Compañía El Alto Bolivia",
      description:
        "Escorts y acompañantes en El Alto, Bolivia. Atención 24 horas, discreción garantizada. Precios accesibles. WhatsApp disponible.",
      keywords: ["escorts el alto", "damas de compañía el alto", "acompañantes el alto bolivia", "escorts 24 horas"],
    },
  },
  sucre: {
    slug: "sucre",
    nombre: "Sucre",
    nombreCorto: "Sucre",
    descripcion: "La ciudad blanca, donde la elegancia se encuentra con el placer. Escorts sofisticadas y discretas.",
    slogan: "Elegancia y placer",
    heroSubtitle: "Escorts distinguidas en la capital constitucional. Sofisticación y discreción en la ciudad blanca.",
    accent: {
      hue: "#f43f5e", // Rose 500
      gradient: "from-rose-500 via-pink-400 to-rose-600",
      light: "#fb7185", // Rose 400
      dark: "#e11d48", // Rose 600
    },
    heroImage: "/sucre-bolivia-white-city-colonial-architecture.jpg",
    stats: {
      anuncios: "60+",
      verificados: "96%",
      nuevosHoy: "4",
    },
    zonas: ["Centro Histórico", "Zona Norte", "La Recoleta", "San Roque", "Lajastambo"],
    destacados: ["Escorts elegantes", "Acompañantes cultas", "Experiencias premium"],
    seo: {
      title: "Escorts en Sucre | Damas de Compañía Sucre Bolivia",
      description:
        "Escorts elegantes y sofisticadas en Sucre, Bolivia. Acompañantes verificadas en el Centro Histórico. Experiencias premium. WhatsApp.",
      keywords: ["escorts sucre", "damas de compañía sucre", "acompañantes ciudad blanca", "escorts sucre bolivia"],
    },
  },
  oruro: {
    slug: "oruro",
    nombre: "Oruro",
    nombreCorto: "Oruro",
    descripcion: "La capital del folklore. Escorts con el ritmo y la pasión del carnaval.",
    slogan: "Ritmo y pasión",
    heroSubtitle: "Escorts apasionadas en la tierra del carnaval. El fuego orureño en cada encuentro.",
    accent: {
      hue: "#f472b6", // Pink 400
      gradient: "from-pink-400 via-rose-400 to-pink-500",
      light: "#f9a8d4", // Pink 300
      dark: "#ec4899", // Pink 500
    },
    heroImage: "/oruro-bolivia-carnival-colorful-festival.jpg",
    stats: {
      anuncios: "45+",
      verificados: "90%",
      nuevosHoy: "3",
    },
    zonas: ["Centro", "Zona Norte", "San José", "La Joya", "Ciudad Universitaria"],
    destacados: ["Escorts festivas", "Ambiente discreto", "Precios justos"],
    seo: {
      title: "Escorts en Oruro | Damas de Compañía Oruro Bolivia",
      description:
        "Encuentra escorts y acompañantes en Oruro, Bolivia. Mujeres verificadas con la pasión del carnaval. Contacto WhatsApp.",
      keywords: ["escorts oruro", "damas de compañía oruro", "acompañantes oruro bolivia", "escorts carnaval"],
    },
  },
  potosi: {
    slug: "potosi",
    nombre: "Potosí",
    nombreCorto: "Potosí",
    descripcion: "La villa imperial. Escorts con la riqueza y el encanto de la historia.",
    slogan: "Tesoros escondidos",
    heroSubtitle: "Descubre los tesoros más preciados de Potosí. Escorts únicas en la villa imperial.",
    accent: {
      hue: "#9333ea", // Purple 600
      gradient: "from-purple-600 via-violet-500 to-purple-700",
      light: "#a855f7", // Purple 500
      dark: "#7e22ce", // Purple 700
    },
    heroImage: "/potosi-bolivia-colonial-silver-city-mountain.jpg",
    stats: {
      anuncios: "35+",
      verificados: "85%",
      nuevosHoy: "2",
    },
    zonas: ["Centro Histórico", "San Benito", "San Roque", "La Florida"],
    destacados: ["Escorts exclusivas", "Discreción máxima", "Experiencias únicas"],
    seo: {
      title: "Escorts en Potosí | Damas de Compañía Potosí Bolivia",
      description:
        "Escorts y acompañantes en Potosí, Bolivia. Mujeres verificadas en la villa imperial. Discreción y calidad. WhatsApp.",
      keywords: ["escorts potosi", "damas de compañía potosi", "acompañantes potosi bolivia", "escorts villa imperial"],
    },
  },
}

// Helper para obtener todos los slugs
export function getAllDepartamentoSlugs(): string[] {
  return Object.keys(departamentosConfig)
}

// Helper para obtener config por slug
export function getDepartamentoConfig(slug: string): DepartamentoConfig | undefined {
  return departamentosConfig[slug]
}

// Helper para obtener config por nombre de ciudad
export function getDepartamentoConfigByCity(cityName: string): DepartamentoConfig | undefined {
  const slug = cityName.toLowerCase().replace(/ /g, "-").replace("de-la-sierra", "")
  return (
    departamentosConfig[slug] ||
    Object.values(departamentosConfig).find(
      (d) =>
        d.nombre.toLowerCase() === cityName.toLowerCase() || d.nombreCorto.toLowerCase() === cityName.toLowerCase(),
    )
  )
}
