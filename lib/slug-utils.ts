/**
 * Genera un slug URL-friendly desde un título
 * @param text - El texto a convertir en slug
 * @returns Un slug normalizado para URLs
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Reemplazar caracteres especiales españoles
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ü/g, 'u')
    // Eliminar caracteres no alfanuméricos excepto espacios y guiones
    .replace(/[^a-z0-9\s-]/g, '')
    // Reemplazar espacios múltiples con uno solo
    .replace(/\s+/g, ' ')
    // Reemplazar espacios con guiones
    .replace(/\s/g, '-')
    // Reemplazar múltiples guiones con uno solo
    .replace(/-+/g, '-')
    // Eliminar guiones al inicio y final
    .replace(/^-+|-+$/g, '')
    // Limitar longitud máxima a 100 caracteres
    .substring(0, 100)
    .replace(/-+$/g, '') // Eliminar guión final si se cortó
}

/**
 * Genera un slug único añadiendo un sufijo numérico si es necesario
 * @param baseSlug - El slug base a verificar
 * @param existingSlugs - Set de slugs ya existentes
 * @returns Un slug único
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: Set<string>): string {
  let slug = baseSlug
  let counter = 1

  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  existingSlugs.add(slug)
  return slug
}
