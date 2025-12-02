import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { generateSlug, generateUniqueSlug } from '../lib/slug-utils'

interface AnuncioData {
  id: string
  title: string
  [key: string]: any
}

async function addSlugsToAnuncios() {
  const filePath = join(process.cwd(), 'lib', 'anuncios-data.ts')

  console.log('📖 Leyendo archivo de anuncios...')
  const fileContent = readFileSync(filePath, 'utf-8')

  // Extraer el contenido del array anunciosData
  const arrayMatch = fileContent.match(/export const anunciosData: Anuncio\[\] = (\[[\s\S]*?\n\])/)

  if (!arrayMatch) {
    console.error('❌ No se pudo encontrar el array anunciosData')
    process.exit(1)
  }

  console.log('🔍 Parseando datos...')
  const anunciosArray = JSON.parse(arrayMatch[1]) as AnuncioData[]

  console.log(`📊 Total de anuncios encontrados: ${anunciosArray.length}`)

  // Generar slugs únicos para cada anuncio
  const existingSlugs = new Set<string>()
  let updated = 0

  console.log('🏷️  Generando slugs...')

  anunciosArray.forEach((anuncio, index) => {
    // Si ya tiene slug, saltar
    if ('slug' in anuncio) {
      existingSlugs.add(anuncio.slug as string)
      return
    }

    const baseSlug = generateSlug(anuncio.title)
    const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs)

    anuncio.slug = uniqueSlug
    updated++

    if ((index + 1) % 100 === 0) {
      console.log(`   Procesados: ${index + 1}/${anunciosArray.length}`)
    }
  })

  console.log(`✅ Slugs generados: ${updated}`)

  // Actualizar la interfaz Anuncio
  const interfaceMatch = fileContent.match(/(export interface Anuncio \{[\s\S]*?\n\})/)

  if (!interfaceMatch) {
    console.error('❌ No se pudo encontrar la interfaz Anuncio')
    process.exit(1)
  }

  let updatedInterface = interfaceMatch[1]

  // Agregar campo slug si no existe
  if (!updatedInterface.includes('slug:')) {
    updatedInterface = updatedInterface.replace(
      /(\s+id: string)/,
      '$1\n  slug: string'
    )
    console.log('✅ Campo slug agregado a la interfaz')
  }

  // Construir el nuevo contenido del archivo
  const newAnunciosJson = JSON.stringify(anunciosArray, null, 2)

  let newFileContent = fileContent
    .replace(interfaceMatch[1], updatedInterface)
    .replace(arrayMatch[1], newAnunciosJson)

  console.log('💾 Guardando cambios...')
  writeFileSync(filePath, newFileContent, 'utf-8')

  console.log('🎉 ¡Proceso completado exitosamente!')
  console.log(`   Total de anuncios actualizados: ${updated}`)
  console.log(`   Archivo actualizado: ${filePath}`)
}

addSlugsToAnuncios().catch(error => {
  console.error('❌ Error:', error)
  process.exit(1)
})
