#!/bin/bash
# Script de inicio que ejecuta migraciones antes de arrancar la app

echo "🚀 Iniciando LumicaTech con migraciones automáticas..."

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a PostgreSQL..."
until pg_isready -h $PG_HOST -p $PG_PORT -U $PG_USER; do
  echo "⏳ PostgreSQL no está listo aún, esperando..."
  sleep 2
done

echo "✅ PostgreSQL está listo"

# Ejecutar migraciones
echo "🔄 Ejecutando migraciones..."
npm run db:migrate

if [ $? -eq 0 ]; then
  echo "✅ Migraciones completadas exitosamente"
else
  echo "❌ Error en las migraciones, pero iniciando la app de todas formas..."
fi

# Iniciar la aplicación
echo "🚀 Iniciando aplicación..."
npm start
