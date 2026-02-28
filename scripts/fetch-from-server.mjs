#!/usr/bin/env node

/**
 * Script para descargar y procesar anuncios desde el servidor remoto
 *
 * Funcionalidades:
 * 1. Descarga todos los JSONs del servidor por fecha
 * 2. Unifica todos los JSONs en un solo archivo
 * 3. Descarga todas las imágenes en lote
 * 4. Normaliza/mejora la redacción de anuncios
 * 5. Actualiza URLs de imágenes a rutas locales
 * 6. Actualiza por ID (no duplica)
 *
 * Uso:
 *   node scripts/fetch-from-server.mjs [fecha]
 *   node scripts/fetch-from-server.mjs              # Procesa todas las fechas
 *   node scripts/fetch-from-server.mjs 2026-02-28   # Procesa solo una fecha
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'
import { promisify } from 'util'
import { exec } from 'child_process'

const execAsync = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SERVER_URL = 'http://3.81.135.211/data'
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'anuncios')

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true })
}

// Helper to generate slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100)
}

// Normalize city name
function normalizeCity(city) {
  const cityMap = {
    'LaPaz': 'La Paz',
    'SantaCruz': 'Santa Cruz',
    'ElAlto': 'El Alto',
    'Cochabamba': 'Cochabamba',
    'Oruro': 'Oruro',
    'Potosi': 'Potosí',
    'Sucre': 'Sucre',
    'Tarija': 'Tarija',
    'Beni': 'Beni',
    'Pando': 'Pando'
  }
  return cityMap[city] || city
}

// Improve/normalize anuncio text
function normalizeText(text) {
  if (!text) return ''

  // Convert to lowercase for processing
  let normalized = text.trim()

  // Remove excessive uppercase (keep if it's a proper name or intentional)
  if (normalized === normalized.toUpperCase() && normalized.length > 20) {
    // Convert all caps to sentence case, except first letter
    normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase()
  }

  // Fix common issues
  normalized = normalized
    // Fix multiple spaces
    .replace(/\s+/g, ' ')
    // Fix space before punctuation
    .replace(/\s+([.,!?;:])/g, '$1')
    // Add space after punctuation if missing
    .replace(/([.,!?;:])([a-zA-ZáéíóúÁÉÍÓÚñÑ])/g, '$1 $2')
    // Remove excessive punctuation
    .replace(/\.{4,}/g, '.')
    .replace(/!{2,}/g, '!')
    .replace(/\?{2,}/g, '?')

  return normalized.trim()
}

// Improve title specifically
function normalizeTitle(title) {
  if (!title) return ''

  let normalized = normalizeText(title)

  // Capitalize first letter of each word if all uppercase
  if (normalized === normalized.toUpperCase()) {
    normalized = normalized.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Limit length
  if (normalized.length > 120) {
    normalized = normalized.substring(0, 120).trim()
  }

  return normalized
}

// Download image from URL
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http

    const file = fs.createWriteStream(filepath)
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }

      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}) // Delete partial file
      reject(err)
    })
  })
}

// Fetch HTML and parse file links
async function fetchFileList(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let data = ''
      response.on('data', chunk => data += chunk)
      response.on('end', () => {
        // Parse HTML to extract file links
        const regex = /href="([^"]+\.json)"/g
        const files = []
        let match
        while ((match = regex.exec(data)) !== null) {
          files.push(match[1])
        }
        resolve(files)
      })
    }).on('error', reject)
  })
}

// Fetch JSON from URL
async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let data = ''
      response.on('data', chunk => data += chunk)
      response.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (err) {
          reject(err)
        }
      })
    }).on('error', reject)
  })
}

// Fetch available dates
async function fetchDates() {
  return new Promise((resolve, reject) => {
    http.get(SERVER_URL + '/', (response) => {
      let data = ''
      response.on('data', chunk => data += chunk)
      response.on('end', () => {
        const regex = /href="(\d{4}-\d{2}-\d{2})\/"/g
        const dates = []
        let match
        while ((match = regex.exec(data)) !== null) {
          dates.push(match[1])
        }
        resolve(dates.sort().reverse()) // Most recent first
      })
    }).on('error', reject)
  })
}

// Main processing function
async function processServer(specificDate = null) {
  try {
    console.log('🔄 Conectando al servidor...\n')

    // Get available dates
    const dates = specificDate ? [specificDate] : await fetchDates()
    console.log(`📅 Fechas encontradas: ${dates.join(', ')}\n`)

    const allAnuncios = []
    const imageDownloads = []

    for (const date of dates) {
      console.log(`📂 Procesando fecha: ${date}`)
      const dateUrl = `${SERVER_URL}/${date}/`

      try {
        const files = await fetchFileList(dateUrl)
        console.log(`   Encontrados ${files.length} archivos`)

        for (const file of files) {
          const fileUrl = `${dateUrl}${file}`

          try {
            const data = await fetchJSON(fileUrl)

            // Normalize city name
            data.city = normalizeCity(data.city)

            // Normalize text
            data.title = normalizeTitle(data.title)
            data.anuncio = normalizeText(data.anuncio)

            // Generate ID and slug
            const slug = generateSlug(data.title)
            const id = data.id || slug

            // Process images
            const localFotos = []
            if (data.fotos && Array.isArray(data.fotos)) {
              for (const fotoUrl of data.fotos) {
                if (!fotoUrl) continue

                // Extract filename from URL
                const urlParts = fotoUrl.split('/')
                const filename = urlParts[urlParts.length - 1]
                const localPath = `/images/anuncios/${filename}`
                const fullPath = path.join(IMAGES_DIR, filename)

                localFotos.push(localPath)

                // Queue download if not exists
                if (!fs.existsSync(fullPath)) {
                  imageDownloads.push({
                    url: fotoUrl,
                    path: fullPath,
                    filename
                  })
                }
              }
            }

            // Build anuncio object
            const anuncio = {
              id,
              slug,
              date: data.date,
              link: data.link,
              city: data.city,
              title: data.title,
              anuncio: data.anuncio,
              whatsapp: data.whatsapp || '',
              precio: data.precio || null,
              fotos: localFotos,
              ...(data.edad && { edad: data.edad }),
              ...(data.servicios && { servicios: data.servicios }),
              ...(data.ubicacion && { ubicacion: data.ubicacion }),
              ...(data.disponibilidad && { disponibilidad: data.disponibilidad }),
              ...(data.verificado !== undefined && { verificado: data.verificado }),
              ...(data.vistas && { vistas: data.vistas }),
            }

            allAnuncios.push(anuncio)

          } catch (err) {
            console.log(`   ⚠️  Error en ${file}: ${err.message}`)
          }
        }

      } catch (err) {
        console.log(`   ⚠️  Error procesando ${date}: ${err.message}`)
      }
    }

    console.log(`\n✓ Total anuncios procesados: ${allAnuncios.length}`)
    console.log(`✓ Imágenes para descargar: ${imageDownloads.length}\n`)

    // Download images
    if (imageDownloads.length > 0) {
      console.log('📥 Descargando imágenes...')
      let downloaded = 0
      let failed = 0

      for (const img of imageDownloads) {
        try {
          await downloadImage(img.url, img.path)
          downloaded++
          if (downloaded % 10 === 0) {
            console.log(`   Descargadas: ${downloaded}/${imageDownloads.length}`)
          }
        } catch (err) {
          failed++
          console.log(`   ⚠️  Error descargando ${img.filename}: ${err.message}`)
        }
      }

      console.log(`✓ Descargadas: ${downloaded}, Fallidas: ${failed}\n`)
    }

    // Save unified JSON
    const outputPath = path.join(__dirname, 'anuncios-descargados.json')
    fs.writeFileSync(outputPath, JSON.stringify(allAnuncios, null, 2))
    console.log(`✓ Archivo unificado guardado: ${outputPath}`)
    console.log(`✓ Total de anuncios: ${allAnuncios.length}\n`)

    // Now update the main anuncios-data.ts (usando update-by-id para actualizar existentes)
    console.log('\n🔄 Actualizando anuncios-data.ts...')
    await execAsync(`node scripts/update-by-id.mjs ${outputPath}`)

    console.log('\n✅ Proceso completado!')
    console.log('\n📋 Siguientes pasos:')
    console.log('   1. Ejecuta: npm run rebuild')
    console.log('   2. Sube cambios: git add . && git commit -m "Update" && git push')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// Main execution
const args = process.argv.slice(2)
const specificDate = args[0] || null

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Uso: node scripts/fetch-from-server.mjs [fecha]

Ejemplos:
  node scripts/fetch-from-server.mjs              # Procesa todas las fechas
  node scripts/fetch-from-server.mjs 2026-02-28   # Procesa solo una fecha

Este script:
  1. Descarga todos los JSONs del servidor
  2. Normaliza ciudad, título y descripción
  3. Descarga imágenes en lote a /public/images/anuncios
  4. Actualiza URLs a rutas locales
  5. Unifica todo en un JSON
  6. Actualiza anuncios-data.ts por ID (sin duplicar)
  `)
  process.exit(0)
}

processServer(specificDate)
