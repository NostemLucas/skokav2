#!/usr/bin/env node

/**
 * Script para reconstruir el sitio después de actualizar anuncios
 *
 * Este script:
 * 1. Ejecuta npm run build para regenerar las páginas estáticas
 * 2. Actualiza el sitemap.xml automáticamente
 *
 * Uso:
 *   node scripts/rebuild-site.mjs
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function rebuildSite() {
  try {
    console.log('🔄 Reconstruyendo el sitio...\n')

    // Run build
    console.log('📦 Ejecutando build...')
    const { stdout, stderr } = await execAsync('npm run build', {
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    })

    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)

    console.log('\n✅ Sitio reconstruido exitosamente!')
    console.log('\n📋 Siguientes pasos:')
    console.log('   1. Verifica que el build fue exitoso')
    console.log('   2. El sitemap.xml se actualizó automáticamente')
    console.log('   3. Sube los cambios a tu repositorio (git add, commit, push)')
    console.log('   4. Si usas Vercel, el deploy será automático')

  } catch (error) {
    console.error('❌ Error durante el build:', error.message)
    process.exit(1)
  }
}

rebuildSite()
