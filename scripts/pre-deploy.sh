#!/bin/bash
# Script que se ejecuta antes de cada deploy

echo "🚀 Pre-deploy: Backup de datos..."

# Ejecutar backup
bash scripts/backup-data.sh

# Opcional: Subir backup a almacenamiento cloud (S3, Google Drive, etc.)
# aws s3 sync backups/data/ s3://tu-bucket/backups/

echo "✅ Pre-deploy completado, es seguro hacer deploy"
