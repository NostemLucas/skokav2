# 🔄 Guía de Sincronización con Servidor Remoto

Esta guía te muestra cómo sincronizar automáticamente los anuncios desde tu servidor remoto.

## 🎯 ¿Qué hace la sincronización?

El script `fetch-from-server.mjs` automatiza TODO el proceso:

1. ✅ **Descarga JSONs** del servidor por fecha
2. ✅ **Normaliza ciudades** (LaPaz → La Paz, SantaCruz → Santa Cruz)
3. ✅ **Mejora redacción** (corrige mayúsculas, espacios, puntuación)
4. ✅ **Descarga imágenes** en lote a `/public/images/anuncios`
5. ✅ **Actualiza URLs** de imágenes a rutas locales
6. ✅ **Unifica todo** en un solo JSON
7. ✅ **Actualiza por ID** (actualiza existentes, agrega nuevos)
8. ✅ **Ordena por fecha** (más recientes primero)

## ⚡ Comando Rápido (1 solo paso)

```bash
npm run sync
```

Este comando hace TODO automáticamente:
- Descarga datos del servidor
- Procesa y normaliza
- Descarga imágenes
- Actualiza anuncios-data.ts
- Reconstruye el sitio
- Actualiza sitemap.xml

**¡Listo para subir a producción!**

## 📋 Comandos Disponibles

### 1. Sincronización completa (recomendado)

```bash
npm run sync
```

Descarga TODO y reconstruye el sitio.

### 2. Solo descargar del servidor

```bash
# Descargar todas las fechas
npm run fetch-server

# Descargar solo una fecha específica
npm run fetch-server 2026-02-28
```

### 3. Solo actualizar datos locales

```bash
# Actualizar desde archivo JSON (actualiza por ID)
npm run update-by-id anuncios-descargados.json
```

### 4. Solo reconstruir sitio

```bash
npm run rebuild
```

## 🔍 Proceso Detallado

### Paso 1: Descargar del servidor

```bash
npm run fetch-server
```

**Lo que hace:**
```
🔄 Conectando al servidor...
📅 Fechas encontradas: 2026-02-28, 2026-02-27, 2026-02-26...

📂 Procesando fecha: 2026-02-28
   Encontrados 98 archivos

📂 Procesando fecha: 2026-02-27
   Encontrados 95 archivos

✓ Total anuncios procesados: 543
✓ Imágenes para descargar: 1247

📥 Descargando imágenes...
   Descargadas: 10/1247
   Descargadas: 20/1247
   ...
✓ Descargadas: 1247, Fallidas: 3

✓ Archivo unificado guardado: scripts/anuncios-descargados.json
✓ Total de anuncios: 543

🔄 Actualizando anuncios-data.ts...
✓ Backup creado: anuncios-data.ts.backup.1709144400000
✓ 120 anuncios actualizados
✓ 423 anuncios nuevos agregados
✓ Total de anuncios: 543
```

### Paso 2: Verificar cambios

```bash
# Ver anuncios agregados
git diff lib/anuncios-data.ts | head -n 50

# Ver imágenes descargadas
ls -lh public/images/anuncios | tail -n 20
```

### Paso 3: Reconstruir y subir

```bash
npm run rebuild
git add .
git commit -m "Sync anuncios $(date +%d-%m-%Y)"
git push
```

## 🛠️ Normalización de Texto

El script mejora automáticamente la redacción:

### Antes:
```json
{
  "city": "LaPaz",
  "title": "24 HORAS VIP OBRAJES TOTALMENTE BELLAS AV 14 DE SEPTIEMBRE",
  "anuncio": "DIVAS TE OFRECE LA MÁS AGRADABLE COMPAÑÍA    FEMENINA LAS 24 HORAS    LOS SIETE DÍAS"
}
```

### Después:
```json
{
  "city": "La Paz",
  "title": "24 Horas Vip Obrajes Totalmente Bellas Av 14 De Septiembre",
  "anuncio": "Divas te ofrece la más agradable compañía femenina las 24 horas los siete días"
}
```

**Mejoras aplicadas:**
- ✅ Normaliza ciudades (LaPaz → La Paz)
- ✅ Corrige TODO MAYÚSCULAS → Título Capitalizado
- ✅ Elimina espacios múltiples
- ✅ Corrige puntuación
- ✅ Limita longitud de títulos

## 📸 Gestión de Imágenes

### Descarga automática

Las imágenes se descargan de:
```
https://bo.skokka.com/image/post/da/ba/daba36931b0644d0aeb8c990adff2fab.jpg
```

Y se guardan en:
```
/public/images/anuncios/daba36931b0644d0aeb8c990adff2fab.jpg
```

Las URLs en los anuncios se actualizan automáticamente:
```json
{
  "fotos": [
    "/images/anuncios/daba36931b0644d0aeb8c990adff2fab.jpg",
    "/images/anuncios/cec2b5814ccf4dbaad78cb7749976b5a.jpg"
  ]
}
```

### Evita duplicados

El script **NO descarga** imágenes que ya existen localmente.

## 🔄 Actualización por ID

A diferencia del script básico que solo agrega nuevos, este **actualiza por ID**:

```javascript
// Si el ID existe → ACTUALIZA el anuncio
// Si el ID no existe → AGREGA el anuncio nuevo
```

**Ventajas:**
- Mantiene anuncios actualizados
- No crea duplicados
- Preserva IDs existentes
- Actualiza fotos, precios, descripciones

## 📊 Estructura del Servidor

```
http://3.81.135.211/data/
├── 2026-02-23/
│   ├── anuncio_LaPaz_1.json
│   ├── anuncio_LaPaz_2.json
│   └── ...
├── 2026-02-24/
│   ├── anuncio_Cochabamba_1.json
│   └── ...
├── 2026-02-28/
    ├── anuncio_LaPaz_1.json
    ├── anuncio_SantaCruz_3.json
    ├── anuncio_Cochabamba_1.json
    └── ...
```

Cada JSON tiene este formato:
```json
{
  "date": "28-02-2026",
  "link": "https://bo.skokka.com/anuncio/...",
  "city": "LaPaz",
  "title": "Título del anuncio",
  "anuncio": "Descripción completa",
  "whatsapp": "75912236",
  "precio": null,
  "fotos": [
    "https://bo.skokka.com/image/post/.../imagen1.jpg",
    "https://bo.skokka.com/image/post/.../imagen2.jpg"
  ]
}
```

## 🕐 Frecuencia Recomendada

### Para SEO Óptimo:

```bash
# Diario a las 9 AM
0 9 * * * cd /ruta/a/skokav2 && npm run sync && git add . && git commit -m "Daily sync $(date +\%Y-\%m-\%d)" && git push
```

### Para actualizaciones frecuentes:

```bash
# Cada 6 horas
0 */6 * * * cd /ruta/a/skokav2 && npm run sync && git add . && git commit -m "Sync $(date +\%Y-\%m-\%d-\%H)" && git push
```

## 🔍 Verificación Post-Sincronización

### 1. Verificar anuncios descargados

```bash
# Ver archivo unificado
cat scripts/anuncios-descargados.json | jq '.[0:3]'
```

### 2. Verificar imágenes

```bash
# Contar imágenes descargadas
ls -1 public/images/anuncios | wc -l

# Ver últimas imágenes
ls -lht public/images/anuncios | head -n 10
```

### 3. Verificar anuncios-data.ts

```bash
# Contar anuncios
grep -c '"id":' lib/anuncios-data.ts

# Ver los más recientes (primeros 5)
head -n 150 lib/anuncios-data.ts | grep '"title"'
```

## 🆘 Solución de Problemas

### Error: "Cannot connect to server"

Verifica que el servidor esté accesible:
```bash
curl -I http://3.81.135.211/data/
```

### Error: "Image download failed"

Algunas imágenes pueden fallar. El script continúa con las demás.
Revisa el log para ver cuáles fallaron.

### Build falla después de sync

```bash
# Limpiar y reconstruir
rm -rf .next
npm run build
```

### Restaurar desde backup

```bash
# Ver backups disponibles
ls -la lib/anuncios-data.ts.backup.*

# Restaurar
cp lib/anuncios-data.ts.backup.1709144400000 lib/anuncios-data.ts
```

## 📈 Beneficios SEO

Al sincronizar desde el servidor:

1. ✅ **Contenido Actualizado**: Google prioriza sitios con contenido fresco
2. ✅ **Redacción Mejorada**: Texto normalizado es más profesional
3. ✅ **Imágenes Locales**: Carga más rápida = mejor ranking
4. ✅ **URLs Limpias**: Rutas locales optimizadas
5. ✅ **Sitemap Actualizado**: Fechas recientes en cada sync

## 🎯 Flujo Completo Recomendado

```bash
# Una vez al día (automatizado)
npm run sync

# Esto ejecuta automáticamente:
# 1. fetch-from-server.mjs
#    - Descarga JSONs
#    - Normaliza texto
#    - Descarga imágenes
#    - Actualiza URLs
#    - Unifica JSON
#    - Actualiza anuncios-data.ts
# 2. rebuild-site.mjs
#    - Reconstruye sitio
#    - Actualiza sitemap.xml

# Luego subir cambios
git add .
git commit -m "Daily sync $(date +%Y-%m-%d)"
git push

# Vercel hace deploy automático
```

## 📝 Archivo generado: anuncios-descargados.json

Después de `npm run fetch-server`, tendrás:

```
scripts/anuncios-descargados.json
```

Este archivo contiene TODOS los anuncios unificados, normalizados y listos para usar.

Puedes revisarlo antes de aplicar:
```bash
cat scripts/anuncios-descargados.json | jq '.[0:3]' | less
```

## 🚀 Próximos Pasos

1. **Prueba la sincronización**:
   ```bash
   npm run sync
   ```

2. **Verifica los resultados**:
   ```bash
   ls -lh public/images/anuncios
   grep -c '"id":' lib/anuncios-data.ts
   ```

3. **Sube los cambios**:
   ```bash
   git add .
   git commit -m "Initial sync from server"
   git push
   ```

4. **Automatiza** (cron job para sincronización diaria)

---

**Última actualización**: Febrero 2026
