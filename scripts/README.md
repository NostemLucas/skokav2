# Scripts de Actualización de Anuncios

Este directorio contiene scripts para automatizar la actualización de anuncios.

## 🚀 Comando Rápido (Recomendado)

```bash
npm run sync
```

Este comando sincroniza TODO desde el servidor automáticamente.

## 📋 Scripts Disponibles

### 1. `fetch-from-server.mjs` - Sincronización desde Servidor (⭐ Principal)

**El script más completo**. Descarga datos del servidor, normaliza texto, descarga imágenes y actualiza todo.

**Uso:**
```bash
# Sincronizar todo (todas las fechas)
npm run fetch-server

# Sincronizar solo una fecha
npm run fetch-server 2026-02-28

# Sincronizar y reconstruir (completo)
npm run sync
```

**Lo que hace:**
1. ✅ Descarga JSONs del servidor http://3.81.135.211/data/
2. ✅ Normaliza ciudades (LaPaz → La Paz)
3. ✅ Mejora redacción (corrige mayúsculas, espacios, puntuación)
4. ✅ Descarga imágenes en lote a `/public/images/anuncios`
5. ✅ Actualiza URLs de imágenes a rutas locales
6. ✅ Unifica todo en `scripts/anuncios-descargados.json`
7. ✅ Actualiza por ID (actualiza existentes, agrega nuevos)
8. ✅ Ordena por fecha (más recientes primero)

**Ejemplo de output:**
```
🔄 Conectando al servidor...
📅 Fechas encontradas: 2026-02-28, 2026-02-27...

📂 Procesando fecha: 2026-02-28
   Encontrados 98 archivos

✓ Total anuncios procesados: 543
✓ Imágenes para descargar: 1247

📥 Descargando imágenes...
   Descargadas: 1247, Fallidas: 3

✓ Archivo unificado guardado: scripts/anuncios-descargados.json

🔄 Actualizando anuncios-data.ts...
✓ 120 anuncios actualizados
✓ 423 anuncios nuevos agregados
✓ Total: 543
```

### 2. `update-by-id.mjs` - Actualizar por ID

Actualiza anuncios existentes por ID o agrega nuevos si no existen.

**Uso:**
```bash
npm run update-by-id <archivo-json>
```

**Diferencia con update-anuncios.mjs:**
- `update-anuncios.mjs`: Solo AGREGA nuevos (no actualiza existentes)
- `update-by-id.mjs`: ACTUALIZA existentes o AGREGA nuevos

### 3. `update-anuncios.mjs` - Solo Agregar Nuevos

Agrega solo anuncios nuevos, ignora duplicados.

**Uso:**
```bash
npm run update-anuncios <archivo-json>
```

### 4. `rebuild-site.mjs` - Reconstruir Sitio

Regenera todas las páginas estáticas y sitemap.

**Uso:**
```bash
npm run rebuild
```

## 🔄 Flujos de Trabajo

### Flujo 1: Sincronización desde Servidor (Recomendado)

```bash
# Todo en un comando
npm run sync

# O paso por paso
npm run fetch-server
npm run rebuild
git add .
git commit -m "Sync $(date +%Y-%m-%d)"
git push
```

### Flujo 2: Actualización Manual

```bash
# Crear JSON con nuevos anuncios
nano nuevos-hoy.json

# Actualizar
npm run update-anuncios nuevos-hoy.json
npm run rebuild

# Subir
git add .
git commit -m "Update $(date +%Y-%m-%d)"
git push
```

## 📝 Formato de JSON

### Formato Básico

```json
[
  {
    "date": "28-02-2026",
    "city": "La Paz",
    "title": "Título del anuncio",
    "anuncio": "Descripción completa",
    "whatsapp": "75912236",
    "fotos": ["url1.jpg", "url2.jpg"]
  }
]
```

### Campos Opcionales

```json
{
  "precio": 200,
  "edad": 25,
  "servicios": ["Masajes", "Eventos"],
  "ubicacion": "Zona Sur",
  "disponibilidad": "Lunes a Viernes",
  "verificado": true
}
```

## 🛠️ Normalización Automática

El script `fetch-from-server.mjs` mejora la redacción automáticamente:

**Antes:**
```json
{
  "city": "LaPaz",
  "title": "24 HORAS VIP OBRAJES TOTALMENTE BELLAS",
  "anuncio": "DIVAS TE OFRECE LA MÁS AGRADABLE COMPAÑÍA    FEMENINA"
}
```

**Después:**
```json
{
  "city": "La Paz",
  "title": "24 Horas Vip Obrajes Totalmente Bellas",
  "anuncio": "Divas te ofrece la más agradable compañía femenina"
}
```

## 📸 Gestión de Imágenes

### Descarga Automática

El script descarga imágenes de:
```
https://bo.skokka.com/image/post/.../imagen.jpg
```

A:
```
/public/images/anuncios/imagen.jpg
```

Y actualiza las URLs automáticamente en los anuncios.

### Evita Duplicados

No descarga imágenes que ya existen localmente.

## 🕐 Automatización con Cron

### Sincronización diaria a las 9 AM

```bash
crontab -e

# Agregar:
0 9 * * * cd /ruta/a/skokav2 && npm run sync && git add . && git commit -m "Daily sync $(date +\%Y-\%m-\%d)" && git push
```

### Sincronización cada 6 horas

```bash
0 */6 * * * cd /ruta/a/skokav2 && npm run sync && git add . && git commit -m "Sync $(date +\%Y-\%m-\%d-\%H)" && git push
```

## 🔍 Verificación

### Ver anuncios descargados

```bash
cat scripts/anuncios-descargados.json | jq '.[0:3]'
```

### Contar anuncios

```bash
grep -c '"id":' lib/anuncios-data.ts
```

### Ver imágenes descargadas

```bash
ls -lh public/images/anuncios | tail -n 20
```

### Ver backups

```bash
ls -la lib/anuncios-data.ts.backup.*
```

## 🆘 Solución de Problemas

### Error: Cannot connect to server

```bash
curl -I http://3.81.135.211/data/
```

### Restaurar desde backup

```bash
cp lib/anuncios-data.ts.backup.1709144400000 lib/anuncios-data.ts
```

### Build falla

```bash
rm -rf .next
npm run build
```

## 📊 Comandos NPM

```bash
npm run sync              # Sincronizar todo desde servidor
npm run fetch-server      # Solo descargar del servidor
npm run update-by-id      # Actualizar por ID
npm run update-anuncios   # Solo agregar nuevos
npm run rebuild           # Solo reconstruir sitio
```

## 📈 Beneficios SEO

- ✅ Contenido actualizado diariamente
- ✅ Redacción mejorada y profesional
- ✅ Imágenes locales (carga rápida)
- ✅ Sitemap con fechas recientes
- ✅ Anuncios ordenados por fecha

## 📚 Documentación Adicional

- `../GUIA-SINCRONIZACION-SERVIDOR.md` - Guía completa de sincronización
- `../GUIA-ACTUALIZACION-DIARIA.md` - Guía de actualización manual
- `ejemplo-nuevos-anuncios.json` - Template de ejemplo

---

**Última actualización**: Febrero 2026
