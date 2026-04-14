#!/bin/bash
# Script de restore de datos desde backup

BACKUP_DIR="backups/data"
DATA_DIR="data"

echo "🔄 Buscando backups disponibles..."

# Listar backups disponibles
if [ ! -d "$BACKUP_DIR" ]; then
  echo "❌ No existe el directorio de backups"
  exit 1
fi

echo "📋 Backups disponibles:"
ls -lht "$BACKUP_DIR"/bookings_*.json | head -10

# Pedir al usuario que seleccione un backup
echo ""
read -p "Ingresa el nombre del archivo backup a restaurar (ej: bookings_20231215_143022.json): " BACKUP_FILE

if [ ! -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
  echo "❌ El archivo $BACKUP_FILE no existe"
  exit 1
fi

# Crear directorio data si no existe
mkdir -p "$DATA_DIR"

# Restaurar bookings
cp "$BACKUP_DIR/$BACKUP_FILE" "$DATA_DIR/bookings.json"
echo "✅ Bookings restaurados desde $BACKUP_FILE"

# Restaurar availability-config si existe
CONFIG_FILE="${BACKUP_FILE/bookings_/availability-config_}"
if [ -f "$BACKUP_DIR/$CONFIG_FILE" ]; then
  cp "$BACKUP_DIR/$CONFIG_FILE" "$DATA_DIR/availability-config.json"
  echo "✅ Availability config restaurado"
fi

echo "🎉 Restauración completada"
