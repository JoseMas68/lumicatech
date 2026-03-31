#!/bin/bash
# Script de despliegue para VPS

echo "🚀 Desplegando LumicaTech..."

# 1. Ir al directorio del proyecto
cd /ruta/a/tu/proyecto/lumicatech

# 2. Pull de últimos cambios
git pull origin master

# 3. Instalar dependencias
npm install

# 4. Build
npm run build

# 5. Detener contenedor anterior (si existe)
docker stop lumicatech 2>/dev/null
docker rm lumicatech 2>/dev/null

# 6. Construir imagen
docker build -t lumicatech .

# 7. Ejecutar contenedor
docker run -d \
  --name lumicatech \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env.local \
  -v $(pwd)/data:/app/data \
  lumicatech

echo "✅ Despliegue completado!"
echo "🌐 Sitio disponible en: http://localhost:3000"
