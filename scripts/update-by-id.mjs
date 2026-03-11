#!/usr/bin/env node

/**
 * Script para actualizar anuncios por ID (actualiza existentes o agrega nuevos)
 *
 * A diferencia de update-anuncios.mjs que solo agrega nuevos,
 * este script ACTUALIZA anuncios existentes basándose en el ID.
 *
 * Uso:
 *   node scripts/update-by-id.mjs <archivo-json>
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

// Parse date DD-MM-YYYY to Date object
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

async function updateById(inputFile) {
  try {
    // Read new anuncios from input file
    const newAnunciosRaw = JSON.parse(fs.readFileSync(inputFile, 'utf-8'))

    if (!Array.isArray(newAnunciosRaw)) {
      throw new Error('El archivo JSON debe contener un array de anuncios')
    }

    console.log(`📥 Leyendo ${newAnunciosRaw.length} anuncios del archivo...\n`)

    // Process new anuncios
    const newAnuncios = newAnunciosRaw.map((anuncio) => {
      const slug = anuncio.slug || generateSlug(anuncio.title)
      const id = anuncio.id || slug

      return {
        id,
        slug,
        date: anuncio.date || new Date().toLocaleDateString('es-BO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).split('/').join('-'),
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

    // Extract existing anuncios array using a more precise approach
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
    // Parse JavaScript array (not strict JSON) using Function constructor
    const existingAnuncios = new Function('return ' + arrayString)()

    // Create map by ID for quick lookup
    const existingById = new Map(existingAnuncios.map(a => [a.id, a]))

    let updated = 0
    let added = 0

    // Update or add anuncios
    const resultAnuncios = [...existingAnuncios]

    for (const newAnuncio of newAnuncios) {
      const existingIndex = resultAnuncios.findIndex(a => a.id === newAnuncio.id)

      if (existingIndex >= 0) {
        // Update existing
        resultAnuncios[existingIndex] = newAnuncio
        updated++
      } else {
        // Add new
        resultAnuncios.push(newAnuncio)
        added++
      }
    }

    if (updated === 0 && added === 0) {
      console.log('✓ No hay cambios para aplicar')
      return
    }

    // Sort by date (newest first)
    resultAnuncios.sort((a, b) => {
      const dateA = parseDate(a.date)
      const dateB = parseDate(b.date)
      return dateB.getTime() - dateA.getTime()
    })

    // Generate new TypeScript file content
    const header = existingContent.substring(0, startIndex)
    const footer = existingContent.substring(arrayEnd)
    const newContent = `${header}export const anunciosData: Anuncio[] = ${JSON.stringify(resultAnuncios, null, 2)}${footer}`

    // Backup old file
    const backupPath = `${dataFilePath}.backup.${Date.now()}`
    fs.copyFileSync(dataFilePath, backupPath)
    console.log(`✓ Backup creado: ${path.basename(backupPath)}`)

    // Write new file
    fs.writeFileSync(dataFilePath, newContent, 'utf-8')
    console.log(`✓ ${updated} anuncios actualizados`)
    console.log(`✓ ${added} anuncios nuevos agregados`)
    console.log(`✓ Total de anuncios: ${resultAnuncios.length}\n`)

    // List changes
    if (updated > 0) {
      console.log('Anuncios actualizados:')
      for (const newAnuncio of newAnuncios) {
        if (existingById.has(newAnuncio.id)) {
          console.log(`  ↻ ${newAnuncio.title} (${newAnuncio.city})`)
        }
      }
      console.log('')
    }

    if (added > 0) {
      console.log('Anuncios nuevos:')
      for (const newAnuncio of newAnuncios) {
        if (!existingById.has(newAnuncio.id)) {
          console.log(`  + ${newAnuncio.title} (${newAnuncio.city})`)
        }
      }
    }

  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

// Main execution
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log(`
Uso: node scripts/update-by-id.mjs <archivo-json>

Este script ACTUALIZA anuncios existentes por ID.
Si el ID existe, actualiza el anuncio.
Si el ID no existe, agrega el anuncio nuevo.

Ejemplo:
  node scripts/update-by-id.mjs anuncios-descargados.json
  `)
  process.exit(1)
}

const inputFile = path.resolve(args[0])

if (!fs.existsSync(inputFile)) {
  console.error(`Error: El archivo ${inputFile} no existe`)
  process.exit(1)
}

updateById(inputFile)
