#!/usr/bin/env node

/**
 * Script para optimizar imágenes localmente con sharp
 * Solo ejecutar UNA VEZ o cuando se agreguen nuevas imágenes
 *
 * Instalación previa:
 * npm install --save-dev sharp
 *
 * Uso:
 * node scripts/optimize-images.mjs
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const INPUT_DIR = path.join(__dirname, '../public/images/anuncios')
const OUTPUT_DIR = path.join(__dirname, '../public/images/anuncios-optimized')

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85 })
      .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp'))

    console.log(`✅ Optimizado: ${path.basename(inputPath)}`)
  } catch (error) {
    console.error(`❌ Error en ${path.basename(inputPath)}:`, error.message)
  }
}

async function processDirectory() {
  console.log('🚀 Iniciando optimización de imágenes...\n')

  const files = fs.readdirSync(INPUT_DIR)
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  console.log(`📁 Encontradas ${imageFiles.length} imágenes para optimizar\n`)

  let processed = 0

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file)
    const outputPath = path.join(OUTPUT_DIR, file)

    await optimizeImage(inputPath, outputPath)
    processed++

    if (processed % 100 === 0) {
      console.log(`\n📊 Progreso: ${processed}/${imageFiles.length}\n`)
    }
  }

  console.log(`\n✅ ¡Completado! ${processed} imágenes optimizadas`)
  console.log(`📂 Resultados en: ${OUTPUT_DIR}`)
}

processDirectory().catch(console.error)
