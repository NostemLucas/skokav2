#!/usr/bin/env node

/**
 * Script para actualizar anuncios automáticamente
 *
 * Uso:
 *   node scripts/update-anuncios.mjs <archivo-json>
 *
 * El archivo JSON debe tener el formato:
 * [
 *   {
 *     "date": "DD-MM-YYYY",
 *     "city": "Ciudad",
 *     "title": "Título del anuncio",
 *     "anuncio": "Descripción completa",
 *     "whatsapp": "75912236",
 *     "precio": 200,
 *     "fotos": ["url1", "url2"],
 *     "edad": 25,
 *     "servicios": ["Servicio 1", "Servicio 2"]
 *   }
 * ]
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Helper to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens
    .substring(0, 100) // Limit length
}

// Parse date DD-MM-YYYY to Date object
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Format date back to DD-MM-YYYY
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

async function updateAnuncios(inputFile) {
  try {
    // Read new anuncios from input file
    const newAnunciosRaw = JSON.parse(fs.readFileSync(inputFile, 'utf-8'))

    if (!Array.isArray(newAnunciosRaw)) {
      throw new Error('El archivo JSON debe contener un array de anuncios')
    }

    // Process new anuncios
    const newAnuncios = newAnunciosRaw.map((anuncio) => {
      const slug = generateSlug(anuncio.title)
      const id = anuncio.id || slug

      return {
        id,
        slug,
        date: anuncio.date || formatDate(new Date()),
        link: anuncio.link || `https://bo.skokka.com/anuncio/${slug}/`,
        city: anuncio.city,
        title: anuncio.title,
        anuncio: anuncio.anuncio || anuncio.description || '',
        whatsapp: anuncio.whatsapp,
        precio: anuncio.precio || null,
        fotos: anuncio.fotos || [],
        ...(anuncio.email && { email: anuncio.email }),
        ...(anuncio.telefono && { telefono: anuncio.telefono }),
        ...(anuncio.edad && { edad: anuncio.edad }),
        ...(anuncio.servicios && { servicios: anuncio.servicios }),
        ...(anuncio.ubicacion && { ubicacion: anuncio.ubicacion }),
        ...(anuncio.disponibilidad && { disponibilidad: anuncio.disponibilidad }),
        ...(anuncio.verificado !== undefined && { verificado: anuncio.verificado }),
        ...(anuncio.vistas && { vistas: anuncio.vistas }),
      }
    })

    // Read existing anuncios-data.ts
    const dataFilePath = path.join(__dirname, '..', 'lib', 'anuncios-data.ts')
    const existingContent = fs.readFileSync(dataFilePath, 'utf-8')

    // Extract existing anuncios array using bracket counting
    const startMarker = 'export const anunciosData: Anuncio[] = '
    const startIndex = existingContent.indexOf(startMarker)
    if (startIndex === -1) {
      throw new Error('No se pudo encontrar el array de anuncios en anuncios-data.ts')
    }

    // Find the matching closing bracket
    let bracketCount = 0
    let arrayStart = startIndex + startMarker.length
    let arrayEnd = -1

    for (let i = arrayStart; i < existingContent.length; i++) {
      if (existingContent[i] === '[') {
        bracketCount++
      } else if (existingContent[i] === ']') {
        bracketCount--
        if (bracketCount === 0) {
          arrayEnd = i + 1
          break
        }
      }
    }

    if (arrayEnd === -1) {
      throw new Error('No se pudo encontrar el cierre del array de anuncios')
    }

    const arrayString = existingContent.substring(arrayStart, arrayEnd)
    const existingAnuncios = JSON.parse(arrayString)

    // Merge: add new anuncios that don't exist (by slug)
    const existingSlugs = new Set(existingAnuncios.map(a => a.slug))
    const toAdd = newAnuncios.filter(a => !existingSlugs.has(a.slug))

    if (toAdd.length === 0) {
      console.log('✓ No hay nuevos anuncios para agregar')
      return
    }

    // Combine and sort by date (newest first)
    const allAnuncios = [...toAdd, ...existingAnuncios]
    allAnuncios.sort((a, b) => {
      const dateA = parseDate(a.date)
      const dateB = parseDate(b.date)
      return dateB.getTime() - dateA.getTime()
    })

    // Generate new TypeScript file content
    const header = existingContent.substring(0, startIndex)
    const footer = existingContent.substring(arrayEnd)
    const newContent = `${header}export const anunciosData: Anuncio[] = ${JSON.stringify(allAnuncios, null, 2)}${footer}`

    // Backup old file
    const backupPath = `${dataFilePath}.backup.${Date.now()}`
    fs.copyFileSync(dataFilePath, backupPath)
    console.log(`✓ Backup creado: ${backupPath}`)

    // Write new file
    fs.writeFileSync(dataFilePath, newContent, 'utf-8')
    console.log(`✓ ${toAdd.length} nuevos anuncios agregados`)
    console.log(`✓ Total de anuncios: ${allAnuncios.length}`)

    // List new anuncios
    console.log('\nNuevos anuncios agregados:')
    toAdd.forEach(a => {
      console.log(`  - ${a.title} (${a.city}) - ${a.date}`)
    })

  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

// Main execution
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log(`
Uso: node scripts/update-anuncios.mjs <archivo-json>

Ejemplo:
  node scripts/update-anuncios.mjs nuevos-anuncios.json

El archivo JSON debe contener un array de objetos con:
  - date (DD-MM-YYYY)
  - city (string)
  - title (string)
  - anuncio (string)
  - whatsapp (string)
  - fotos (array de URLs)
  - precio (número, opcional)
  - edad (número, opcional)
  - servicios (array, opcional)
  `)
  process.exit(1)
}

const inputFile = path.resolve(args[0])

if (!fs.existsSync(inputFile)) {
  console.error(`Error: El archivo ${inputFile} no existe`)
  process.exit(1)
}

updateAnuncios(inputFile)
