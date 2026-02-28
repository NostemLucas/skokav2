# 📋 Guía Rápida: Actualización Diaria de Anuncios

Esta guía te muestra cómo actualizar los anuncios diariamente para mantener el SEO óptimo.

## 🎯 Por qué actualizar diariamente

- **SEO Mejorado**: Google prioriza sitios con contenido fresco
- **Ranking Superior**: Sitios actualizados frecuentemente rankean mejor
- **Indexación Rápida**: Google crawlea más seguido sitios activos
- **Sitemap Actualizado**: Las fechas se actualizan automáticamente
- **Anuncios Recientes**: Los más nuevos aparecen primero

## ⚡ Método Rápido (3 pasos)

### 1️⃣ Crear archivo con nuevos anuncios

Crea un archivo `nuevos-hoy.json`:

```json
[
  {
    "date": "28-02-2026",
    "city": "La Paz",
    "title": "Título del anuncio",
    "anuncio": "Descripción completa aquí",
    "whatsapp": "75912236",
    "fotos": [
      "https://ejemplo.com/foto1.jpg",
      "https://ejemplo.com/foto2.jpg"
    ],
    "precio": 200,
    "edad": 25,
    "servicios": ["Masajes", "Eventos"]
  }
]
```

### 2️⃣ Actualizar y reconstruir

```bash
# Método 1: Comando único (más rápido)
npm run update-anuncios nuevos-hoy.json && npm run rebuild

# Método 2: Paso por paso
npm run update-anuncios nuevos-hoy.json
npm run rebuild
```

### 3️⃣ Subir cambios

```bash
git add .
git commit -m "Actualizar anuncios $(date +%d-%m-%Y)"
git push
```

¡Listo! Vercel hace deploy automáticamente.

## 📝 Campos del JSON

### Campos Requeridos ✅

```json
{
  "date": "DD-MM-YYYY",      // Fecha del anuncio
  "city": "Ciudad",          // La Paz, Santa Cruz, etc.
  "title": "Título",         // Título atractivo
  "anuncio": "Descripción",  // Descripción completa
  "whatsapp": "75912236",    // Número sin prefijo +591
  "fotos": ["url1", "url2"]  // Array de URLs de fotos
}
```

### Campos Opcionales ⭐

```json
{
  "precio": 200,                        // Precio en BOB (o null)
  "edad": 25,                           // Edad
  "servicios": ["Masajes", "Eventos"],  // Array de servicios
  "ubicacion": "Zona Sur",              // Ubicación específica
  "disponibilidad": "Lunes a Viernes",  // Horarios
  "verificado": true                     // Marcar como verificado
}
```

## 🤖 Qué hace el script automáticamente

1. ✅ Genera `id` y `slug` desde el título
2. ✅ Verifica duplicados (no agrega si ya existe)
3. ✅ Crea backup del archivo actual
4. ✅ Ordena todos los anuncios por fecha (más recientes primero)
5. ✅ Actualiza el archivo de datos
6. ✅ Regenera sitemap.xml con fechas actuales
7. ✅ Reconstruye las 289 páginas estáticas

## 📊 Ver resultados

```bash
# Ver anuncios agregados
cat lib/anuncios-data.ts | grep '"date"' | head -n 10

# Ver total de anuncios
grep -c '"id":' lib/anuncios-data.ts

# Ver backups disponibles
ls -la lib/anuncios-data.ts.backup.*
```

## 🔄 Ejemplo Completo

```bash
# 1. Crear archivo con anuncios del día
cat > anuncios-$(date +%d-%m-%Y).json << 'EOF'
[
  {
    "date": "28-02-2026",
    "city": "La Paz",
    "title": "Masajista profesional disponible",
    "anuncio": "Masajes relajantes y terapéuticos. Atención profesional.",
    "whatsapp": "75912236",
    "fotos": [
      "https://ejemplo.com/foto1.jpg"
    ],
    "precio": 150,
    "edad": 28,
    "servicios": ["Masajes"],
    "ubicacion": "Zona Sur",
    "disponibilidad": "9 AM - 6 PM"
  }
]
EOF

# 2. Actualizar
npm run update-anuncios anuncios-$(date +%d-%m-%Y).json

# 3. Reconstruir
npm run rebuild

# 4. Subir
git add .
git commit -m "Anuncios del $(date +%d-%m-%Y)"
git push
```

## 🚨 Solución de Problemas

### Error: "No se pudo encontrar el array"

```bash
# Restaurar desde backup
cp lib/anuncios-data.ts.backup.XXXXX lib/anuncios-data.ts
```

### Error: "JSON inválido"

Verifica que tu JSON sea válido:
```bash
cat nuevos-hoy.json | jq .
```

### Build falla

```bash
# Limpiar y reconstruir
rm -rf .next
npm run build
```

## 💡 Tips Pro

### 1. Template reutilizable

Crea un template base:

```bash
cp scripts/ejemplo-nuevos-anuncios.json template.json
# Edita template.json cada día y guarda como nuevo archivo
```

### 2. Verificar antes de subir

```bash
# Ver cambios
git diff lib/anuncios-data.ts

# Ver nuevos anuncios agregados (primeros 20 lines del diff)
git diff lib/anuncios-data.ts | head -n 20
```

### 3. Programar actualizaciones diarias

Crea un script bash `actualizar-diario.sh`:

```bash
#!/bin/bash
FECHA=$(date +%d-%m-%Y)
ARCHIVO="anuncios-${FECHA}.json"

if [ -f "$ARCHIVO" ]; then
  echo "Actualizando anuncios del $FECHA"
  npm run update-anuncios "$ARCHIVO"
  npm run rebuild
  git add .
  git commit -m "Anuncios del $FECHA"
  git push
  echo "✅ Actualización completada"
else
  echo "❌ No existe archivo $ARCHIVO"
fi
```

Hazlo ejecutable y úsalo:
```bash
chmod +x actualizar-diario.sh
./actualizar-diario.sh
```

## 📈 Monitoreo SEO

Después de subir cambios:

1. **Google Search Console**: Verifica indexación
   - URL: https://search.google.com/search-console

2. **Sitemap Status**: Verifica que Google detecte cambios
   - Busca: `site:damasdecompañia.com.bo`

3. **Páginas indexadas**: Debe crecer con el tiempo
   - En Search Console: Coverage → Valid

## ⏰ Frecuencia Recomendada

- **Óptimo**: Actualizar diariamente
- **Mínimo**: 2-3 veces por semana
- **Mejor hora**: Entre 8-10 AM (cuando Google crawlea más)

## 📞 Soporte

Para más detalles, consulta:
- `scripts/README.md` - Documentación completa de scripts
- `scripts/ejemplo-nuevos-anuncios.json` - Ejemplo de formato

---

**Última actualización**: Febrero 2026
