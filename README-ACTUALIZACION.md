# 📚 Sistema de Actualización de Anuncios

Sistema completo para actualizar anuncios desde servidor remoto con normalización automática de texto e imágenes.

## 🚀 Inicio Rápido

### Sincronizar desde el servidor (1 comando)

```bash
npm run sync
```

Esto hace TODO automáticamente:
- ✅ Descarga JSONs del servidor
- ✅ Normaliza ciudades y texto
- ✅ Descarga imágenes en lote
- ✅ Actualiza URLs de imágenes
- ✅ Actualiza anuncios por ID
- ✅ Reconstruye el sitio
- ✅ Actualiza sitemap.xml

## 📋 Comandos Disponibles

```bash
npm run sync              # ⭐ Sincronización completa (recomendado)
npm run fetch-server      # Solo descargar del servidor
npm run update-by-id      # Actualizar por ID (actualiza existentes)
npm run update-anuncios   # Solo agregar nuevos (no actualiza)
npm run rebuild           # Solo reconstruir sitio
```

## 📂 Estructura de Archivos

```
skokav2/
├── scripts/
│   ├── fetch-from-server.mjs    # ⭐ Script principal
│   ├── update-by-id.mjs         # Actualiza por ID
│   ├── update-anuncios.mjs      # Solo agrega nuevos
│   ├── rebuild-site.mjs         # Reconstruye sitio
│   ├── README.md                # Documentación de scripts
│   └── ejemplo-nuevos-anuncios.json
│
├── GUIA-SINCRONIZACION-SERVIDOR.md  # 📖 Guía completa
├── GUIA-ACTUALIZACION-DIARIA.md     # 📖 Guía manual
└── README-ACTUALIZACION.md          # 📖 Este archivo
```

## 🔄 Flujo de Trabajo Diario

### Opción 1: Sincronización Automática (Recomendado)

```bash
# Un solo comando
npm run sync

# Subir cambios
git add .
git commit -m "Sync $(date +%Y-%m-%d)"
git push
```

### Opción 2: Paso por Paso

```bash
# 1. Descargar del servidor
npm run fetch-server

# 2. Verificar cambios
cat scripts/anuncios-descargados.json | jq '.[0:3]'

# 3. Reconstruir
npm run rebuild

# 4. Subir
git add .
git commit -m "Sync $(date +%Y-%m-%d)"
git push
```

## 🛠️ Características Principales

### 1. Sincronización desde Servidor

**Servidor:** http://3.81.135.211/data/

Descarga automáticamente archivos JSON organizados por fecha:
```
/data/2026-02-28/anuncio_LaPaz_1.json
/data/2026-02-28/anuncio_SantaCruz_3.json
...
```

### 2. Normalización de Texto

**Antes:**
```
City: "LaPaz"
Title: "24 HORAS VIP OBRAJES TOTALMENTE BELLAS"
```

**Después:**
```
City: "La Paz"
Title: "24 Horas Vip Obrajes Totalmente Bellas"
```

**Mejoras aplicadas:**
- Normaliza nombres de ciudades
- Corrige TODO MAYÚSCULAS
- Elimina espacios múltiples
- Corrige puntuación
- Limita longitud de títulos

### 3. Descarga de Imágenes

**De:**
```
https://bo.skokka.com/image/post/da/ba/daba36931b0644d0aeb8c990adff2fab.jpg
```

**A:**
```
/public/images/anuncios/daba36931b0644d0aeb8c990adff2fab.jpg
```

**URLs actualizadas automáticamente en los anuncios.**

### 4. Actualización por ID

- Si el ID existe → **ACTUALIZA** el anuncio
- Si el ID no existe → **AGREGA** el anuncio nuevo
- **No crea duplicados**

### 5. Ordenamiento por Fecha

Los anuncios más recientes aparecen primero en:
- Homepage (Featured Anuncios)
- Página de anuncios
- Resultados de búsqueda

## 📊 Estadísticas

Después de ejecutar `npm run sync`:

```bash
# Ver total de anuncios
grep -c '"id":' lib/anuncios-data.ts

# Ver imágenes descargadas
ls -1 public/images/anuncios | wc -l

# Ver archivos recientes
ls -lht lib/anuncios-data.ts.backup.* | head -n 5
```

## 🕐 Automatización

### Cron Job - Sincronización Diaria

```bash
crontab -e

# Agregar (ejecuta a las 9 AM diariamente)
0 9 * * * cd /ruta/a/skokav2 && npm run sync && git add . && git commit -m "Daily sync $(date +\%Y-\%m-\%d)" && git push
```

### Cron Job - Cada 6 horas

```bash
0 */6 * * * cd /ruta/a/skokav2 && npm run sync && git add . && git commit -m "Sync $(date +\%Y-\%m-\%d-\%H)" && git push
```

## 🔍 Verificación

### Después de sincronizar

```bash
# Ver anuncios descargados
cat scripts/anuncios-descargados.json | jq '.[0:3]' | less

# Ver cambios en anuncios-data.ts
git diff lib/anuncios-data.ts | head -n 50

# Ver últimas imágenes descargadas
ls -lht public/images/anuncios | head -n 10

# Ver backups creados
ls -la lib/anuncios-data.ts.backup.*
```

## 📈 Beneficios SEO

1. **Contenido Fresco**: Actualización diaria/frecuente
2. **Redacción Mejorada**: Texto normalizado y profesional
3. **Imágenes Optimizadas**: Carga más rápida con imágenes locales
4. **Sitemap Actualizado**: Fechas recientes en cada sync
5. **Ordenamiento**: Anuncios más recientes primero
6. **Indexación Rápida**: Google detecta cambios automáticamente

## 🆘 Solución de Problemas

### Error: Cannot connect to server

```bash
# Verificar conectividad
curl -I http://3.81.135.211/data/
```

### Error durante descarga de imágenes

Algunas imágenes pueden fallar. El script continúa con las demás.

### Build falla

```bash
rm -rf .next
npm run build
```

### Restaurar desde backup

```bash
# Ver backups
ls -la lib/anuncios-data.ts.backup.*

# Restaurar
cp lib/anuncios-data.ts.backup.1709144400000 lib/anuncios-data.ts
```

## 📚 Documentación Completa

### Guías Disponibles

1. **GUIA-SINCRONIZACION-SERVIDOR.md** - Guía completa de sincronización
2. **GUIA-ACTUALIZACION-DIARIA.md** - Guía de actualización manual
3. **scripts/README.md** - Documentación técnica de scripts

### Archivos de Ejemplo

- `scripts/ejemplo-nuevos-anuncios.json` - Template de JSON

## 🎯 Ejemplo Completo

```bash
# 1. Sincronizar (descarga, normaliza, descarga imágenes, actualiza)
npm run sync

# Output:
# 🔄 Conectando al servidor...
# 📅 Fechas: 2026-02-28, 2026-02-27, 2026-02-26
# 📂 Procesando: 2026-02-28 (98 archivos)
# ✓ Anuncios procesados: 543
# ✓ Imágenes para descargar: 1247
# 📥 Descargando imágenes...
# ✓ Descargadas: 1247, Fallidas: 3
# 🔄 Actualizando anuncios-data.ts...
# ✓ 120 actualizados, 423 nuevos
# ✓ Total: 543
# 📦 Ejecutando build...
# ✓ Build completado (289 páginas)

# 2. Verificar
cat scripts/anuncios-descargados.json | jq length
# 543

# 3. Ver cambios
git status

# 4. Subir
git add .
git commit -m "Daily sync 2026-02-28"
git push

# 5. Vercel hace deploy automático
```

## 💡 Tips Pro

### Ver solo nuevos anuncios agregados

```bash
npm run fetch-server 2>&1 | grep "Anuncios nuevos:"
```

### Contar imágenes únicas

```bash
find public/images/anuncios -type f | wc -l
```

### Ver anuncios más recientes (primeros 5)

```bash
head -n 200 lib/anuncios-data.ts | grep '"title"' | head -n 5
```

### Comparar antes/después

```bash
# Antes de sync
grep -c '"id":' lib/anuncios-data.ts

# Después de sync
grep -c '"id":' lib/anuncios-data.ts
```

## 🚀 Próximos Pasos

1. **Probar sincronización**
   ```bash
   npm run sync
   ```

2. **Configurar cron job** para automatización diaria

3. **Monitorear** Google Search Console para indexación

4. **Mantener backups** semanales manuales

---

**Sistema creado**: Febrero 2026
**Última actualización**: Febrero 2026

Para más detalles, consulta:
- `GUIA-SINCRONIZACION-SERVIDOR.md`
- `GUIA-ACTUALIZACION-DIARIA.md`
- `scripts/README.md`
