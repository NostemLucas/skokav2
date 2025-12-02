import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: {
    default: "Escorts y Damas de Compañía en Bolivia | Acompañantes Verificadas",
    template: "%s | Damas de Compañía Bolivia",
  },
  description:
    "Encuentra escorts, damas de compañía y acompañantes verificadas en Bolivia. Servicios de sexo seguro, discreto y verificado. Contacto directo por WhatsApp.",
  keywords: [
    "damas de compañía bolivia",
    "escorts bolivia",
    "acompañantes la paz",
    "escorts santa cruz",
    "escorts cochabamba",
    "acompañantes verificadas",
    "encuentros discretos",
    "contacto whatsapp",
    "sexo bolivia",
    "servicios de acompañantes",
    "escorts profesionales",
    "acompañantes de lujo",
    "servicios íntimos bolivia",
    "agencias de escorts",
    "chicas de compañía",
    "servicios para adultos",
    "encuentros casuales",
    "damas de compañía en línea",
  ],
  authors: [{ name: "Damas de Compañía Bolivia" }],
  creator: "Damas de Compañía Bolivia",
  publisher: "Damas de Compañía Bolivia",
  openGraph: {
    title: "Damas de Compañía Bolivia | Escorts y Acompañantes",
    description:
      "Encuentra damas de compañía y escorts verificadas en Bolivia. Contacto directo y seguro.",
    type: "website",
    locale: "es_BO",
    siteName: "Damas de Compañía Bolivia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Damas de Compañía Bolivia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Damas de Compañía Bolivia",
    description: "Escorts y acompañantes verificadas en Bolivia. Contacto directo por WhatsApp.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  metadataBase: new URL("https://damasdecompania.bo"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1A2332" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F8F7F4" media="(prefers-color-scheme: light)" />
      </head>
      <body className={`${geist.variable} font-sans antialiased`}>
        <h1 className="sr-only">
        Escorts, Damas de Compañía y Acompañantes en Bolivia — Servicio de sexo seguro y verificado
        </h1>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
