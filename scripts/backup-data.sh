#!/bin/bash
# Script de backup automático de datos antes de deploy

BACKUP_DIR="backups/data"
DATA_DIR="data"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🔄 Iniciando backup de datos..."

# Crear directorio de backups si no existe
mkdir -p "$BACKUP_DIR"

# Backup de bookings.json
if [ -f "$DATA_DIR/bookings.json" ]; then
  cp "$DATA_DIR/bookings.json" "$BACKUP_DIR/bookings_$TIMESTAMP.json"
  echo "✅ Backup de bookings creado: bookings_$TIMESTAMP.json"
else
  echo "⚠️  No se encontró bookings.json"
fi

# Backup de availability-config.json
if [ -f "$DATA_DIR/availability-config.json" ]; then
  cp "$DATA_DIR/availability-config.json" "$BACKUP_DIR/availability-config_$TIMESTAMP.json"
  echo "✅ Backup de availability-config creado"
fi

# Mantener solo los últimos 10 backups
cd "$BACKUP_DIR"
ls -t bookings_*.json | tail -n +11 | xargs -r rm --
echo "🧹 Limpieza de backups antiguos completada"

echo "📦 Backup completado en $BACKUP_DIR/"
