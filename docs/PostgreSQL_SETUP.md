# 🗄️ Guía de Migración a PostgreSQL

## ✅ Base de Datos Configurada

Tu base de datos PostgreSQL está lista en Dockerply:
- **Host:** lumicateh-bdlumicatech-28ireu
- **Puerto:** 5432
- **Database:** lumicatechdb
- **Usuario:** Jose
- **Contraseña:** [la que configuraste]

---

## 📋 Pasos para Completar la Migración:

### 1. **Instalar dependencia de PostgreSQL**
```bash
npm install pg @types/pg
```

### 2. **Configurar variables de entorno**

En tu `.env.local` (desarrollo):
```bash
PG_HOST=lumicateh-bdlumicatech-28ireu
PG_PORT=5432
PG_DATABASE=lumicatechdb
PG_USER=Jose
PG_PASSWORD=xPR1wjfW31hFs6OdbaYm
```

En Dockerply (producción), configura estas mismas variables en el panel de configuración.

### 3. **Ejecutar migración de la base de datos**
```bash
# Crear tabla en PostgreSQL
npx ts-node scripts/migrate-to-postgres.ts
```

Esto creará la tabla `bookings` con todos los campos necesarios.

### 4. **Migrar datos existentes (si tienes algunos)**

Si tienes reservas en `data/bookings.json`, el script de migración las pasará a PostgreSQL automáticamente.

### 5. **Actualizar endpoints de la API**

Los endpoints ya están actualizados para usar PostgreSQL:
- ✅ `app/api/booking/route.ts` - Crear reservas
- ✅ `app/api/admin/bookings/route.ts` - Gestión de reservas
- ✅ `app/api/admin/reminders/route.ts` - Recordatorios

---

## 🚀 Comandos Disponibles

### Instalar dependencias:
```bash
npm install pg @types/pg
```

### Ejecutar migración:
```bash
npx ts-node scripts/migrate-to-postgres.ts
```

### Verificar conexión:
```bash
npx ts-node -e "import('./src/lib/db').then(m => m.testConnection())"
```

---

## 📊 Estructura de la Base de Datos

### Tabla `bookings`:
```sql
CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  meet_link TEXT,
  consent_given BOOLEAN DEFAULT true,
  consent_at TEXT,
  reminder_sent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'nuevo',
  notes TEXT DEFAULT '',
  created_at TEXT,
  updated_at TEXT
);
```

### Índices creados:
- `idx_bookings_date` - Consultas por fecha
- `idx_bookings_status` - Consultas por estado
- `idx_bookings_email` - Consultas por email
- `idx_bookings_created_at` - Consultas por fecha de creación

---

## 🧪 Testing

### Crear una reserva de prueba:
```bash
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "date": "2024-01-15",
    "time": "10:00",
    "consentGiven": true
  }'
```

### Verificar en la base de datos:
```bash
npx ts-node -e "
import('./src/lib/bookings-db').then(m => {
  m.getAllBookings().then(console.log);
})
"
```

---

## ✅ Ventajas de PostgreSQL vs JSON

- ✅ **Persistencia real** - No se pierden datos en deploys
- ✅ **Concurrencia** - Múltiples usuarios simultáneos
- ✅ **Queries complejas** - Búsquedas avanzadas
- ✅ **Backup automático** - Dockerply hace backups
- ✅ **Escalabilidad** - Crece sin límites
- ✅ **Integridad** - Transacciones y validaciones

---

## 🔧 Troubleshooting

### Error de conexión:
```bash
# Verificar que las variables de entorno están correctas
echo $PG_HOST
echo $PG_DATABASE
echo $PG_USER
```

### Error: "relation bookings does not exist":
```bash
# Ejecutar migración para crear la tabla
npx ts-node scripts/migrate-to-postgres.ts
```

### Error: "password authentication failed":
```bash
# Verificar la contraseña en .env.local
# Debe ser la misma que configuraste en Dockerply
```

---

## 📞 ¿Necesitas ayuda?

Si tienes algún problema durante la migración, avísame y te ayudo a solucionarlo.
