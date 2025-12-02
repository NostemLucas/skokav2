# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application for a classified ads platform focused on adult services in Bolivia. The app uses React 19, TypeScript, and Tailwind CSS v4 with shadcn/ui components.

## Development Commands

### Running the App
```bash
npm run dev        # Start development server (default: http://localhost:3000)
npm run build      # Production build
npm start          # Start production server
npm run lint       # Run ESLint
```

### Important Notes
- TypeScript build errors are ignored in production (`ignoreBuildErrors: true` in next.config.mjs)
- The project uses Tailwind CSS v4 with the new `@tailwindcss/postcss` plugin
- Package manager: npm (package-lock.json is committed)

## Architecture & Structure

### App Router Structure
This app uses Next.js App Router with the following key routes:

- `/` - Home page with hero, category cards, and departamentos grid
- `/anuncios` - Client-side filtered listing of all ads
- `/anuncios/[id]` - Individual ad detail pages with dynamic metadata and JSON-LD
- `/departamento/[slug]` - Department-specific landing pages with static generation

### Data Layer
All data is **statically defined** in TypeScript files (no database):

- `lib/anuncios-data.ts` - Large array of ad objects (`Anuncio[]`) with ~150KB of data
- `lib/departamentos-config.ts` - Department configurations with SEO, colors, zones, and stats

**Data Interface (Anuncio):**
```typescript
{
  id: string
  date: string
  city: string
  title: string
  anuncio: string
  whatsapp: string
  precio: number | null
  fotos: string[]
  verificado?: boolean
  servicios?: string[]
  ubicacion?: string
  // ... other optional fields
}
```

### Client/Server Pattern
The app follows a consistent pattern for dynamic pages:

1. **Server Component** (`page.tsx`): Handles metadata generation, data fetching, and JSON-LD
2. **Client Component** (`*-client.tsx`): Handles interactivity, filtering, and UI state

Examples:
- `app/anuncios/[id]/page.tsx` + `anuncio-detail-client.tsx`
- `app/departamento/[slug]/page.tsx` + `departamento-landing.tsx`

### Component Organization

**Top-level Components** (`components/`):
- `header.tsx` - Navigation with search and theme toggle
- `hero.tsx` - Landing page hero section
- `category-cards.tsx` - Category browsing cards
- `departamentos-grid.tsx` - Department selection grid
- `category-filter.tsx` - Filterable ad listings by category
- `anuncio-card.tsx` - Reusable ad card component
- `footer.tsx` - Site footer with links

**UI Components** (`components/ui/`):
- shadcn/ui components (accordion, alert-dialog, avatar, badge, button, card, carousel, chart, etc.)
- Configured with "new-york" style
- Using Lucide icons
- Custom CSS variables for theming in `app/globals.css`

### Styling System

**Tailwind CSS v4:**
- Uses new `@tailwindcss/postcss` plugin
- Configuration in `postcss.config.mjs`
- Custom variants defined in `globals.css` (e.g., `@custom-variant dark`)

**Theme:**
- CSS variables-based theming (light/dark modes)
- Custom pink/purple color palette for adult content branding
- Variables defined in `:root` and `.dark` selectors
- Theme provider from `next-themes` in root layout

**Color Scheme:**
- Primary: Pink (#db2777 light, #f472b6 dark)
- Secondary: Purple (#9333ea light, #c084fc dark)
- Warm backgrounds with subtle pink tones

### Image Handling

Images are configured for two remote patterns:
- `bo.skokka.com` - External ad images
- `images.unsplash.com` - Stock images

Optimizations:
- AVIF and WebP format support
- Custom device sizes: [640, 750, 828, 1080, 1200]
- Image sizes: [16, 32, 48, 64, 96, 128, 256]

### SEO & Metadata

The app is heavily optimized for SEO:

1. **Dynamic Metadata**: Each route generates comprehensive metadata with OpenGraph, Twitter cards, and keywords
2. **JSON-LD Structured Data**: Product schema on ad detail pages
3. **Static Generation**: Department pages use `generateStaticParams()`
4. **Sitemaps & Robots**: Configured in `app/sitemap.ts` and `app/robots.ts`
5. **Canonical URLs**: Set for all pages with alternates

### Path Aliases

Configured in `tsconfig.json`:
```typescript
"@/*" => "./*"
```

This means `@/components` = root `components/`, `@/lib` = root `lib/`, etc.

### Performance Features

- `compress: true` - Gzip compression enabled
- `poweredByHeader: false` - X-Powered-By header removed
- Vercel Analytics integrated
- Font optimization with Geist font from `next/font/google`

## Key Technical Decisions

1. **No Backend Database**: All data is static TypeScript arrays. To add/update ads, edit `lib/anuncios-data.ts` directly.

2. **Static Site Generation**: Department pages are fully static at build time using `generateStaticParams()`.

3. **Client-Side Filtering**: Ad filtering happens in browser (see `anuncios-client.tsx`, `category-filter.tsx`) rather than API routes.

4. **Metadata Functions**: Every dynamic route implements `generateMetadata()` for SEO optimization.

5. **TypeScript Strict Mode**: Enabled but build errors are ignored in production to allow deployment.

## Common Development Patterns

### Adding a New Ad
Edit `lib/anuncios-data.ts` and add to the `anunciosData` array following the `Anuncio` interface.

### Adding a New Department
Edit `lib/departamentos-config.ts` and add a new key to `departamentosConfig` with all required fields (slug, nombre, SEO, accent colors, zones, stats, etc.).

### Creating a New Page with Dynamic Metadata
```typescript
// page.tsx - Server Component
export async function generateMetadata({ params }): Promise<Metadata> {
  // Generate dynamic metadata
}

export default async function Page({ params }) {
  // Fetch data, return client component
  return <ClientComponent data={data} />
}
```

### Using Utilities
- `cn()` from `@/lib/utils` - Merge Tailwind classes with clsx and tailwind-merge
- `formatNumber()` / `formatCurrency()` - Consistent Bolivian locale formatting (es-BO, BOB currency)

## Dependencies Notes

- **React 19.2.0** with React Compiler support
- **Radix UI** components via shadcn/ui (latest versions)
- **Form Handling**: react-hook-form + zod + @hookform/resolvers
- **Date Handling**: date-fns 4.1.0
- **Charts**: recharts
- **Carousels**: embla-carousel-react
- **Toast Notifications**: sonner
- **Drawer**: vaul

## Locale & Localization

- Default locale: `es_BO` (Spanish - Bolivia)
- Currency: BOB (Bolivianos)
- Number formatting uses `Intl.NumberFormat('es-BO')`
- HTML lang attribute: `es`
