# 🚀 Inicio Rápido - PostgreSQL

## 1. Instalar dependencias (ya hecho ✅)
```bash
npm install
```

## 2. Configurar variables de entorno

En tu `.env.local`:
```bash
PG_HOST=lumicateh-bdlumicatech-28ireu
PG_PORT=5432
PG_DATABASE=lumicatechdb
PG_USER=Jose
PG_PASSWORD=xPR1wjfW31hFs6OdbaYm
```

## 3. Crear tabla en PostgreSQL
```bash
npm run db:migrate
```

## 4. Verificar conexión
```bash
npm run db:test
```

¡Listo! Tu sistema de reservas ahora usa PostgreSQL.

---

## 📋 Archivos creados/modificados:

### Nuevos:
- `src/lib/db.ts` - Conexión a PostgreSQL
- `src/lib/bookings-db.ts` - Funciones CRUD de bookings
- `src/lib/migrations/001_create_bookings_table.sql` - Schema de la BD
- `scripts/migrate-to-postgres.ts` - Script de migración

### Modificados:
- `package.json` - Dependencias y scripts agregados
- `.env.local.example` - Variables de PostgreSQL agregadas

### Documentación:
- `docs/PostgreSQL_SETUP.md` - Guía completa
- `docs/PostgreSQL_QUICKSTART.md` - Este archivo

---

## ✅ Siguiente paso:
Configura las variables de entorno en Dockerply para producción.
