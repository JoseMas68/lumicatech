# 🔄 Guía de Migraciones Automáticas

## 🎯 Control de Migraciones con Variable de Entorno

### **SKIP_MIGRATIONS** - Controla cuándo se crean las tablas

```bash
# Para crear/recrear tablas (primera vez o quieres resetear)
SKIP_MIGRATIONS=false

# Para NO crear tablas (la base de datos ya existe)
SKIP_MIGRATIONS=true
```

---

## 📋 Escenarios de Uso:

### **1️⃣ Primera vez o Base de Datos Nueva**
```bash
SKIP_MIGRATIONS=false
```
- ✅ Creará las tablas automáticamente
- ✅ Creará los índices
- ✅ Insertará configuración inicial

### **2️⃣ Base de Datos Ya Existe**
```bash
SKIP_MIGRATIONS=true
```
- ⏭️  NO creará tablas
- ✅ Usará las tablas existentes
- ✅ Más rápido al iniciar

### **3️⃣ Recrear Base de Datos**
```bash
# Paso 1: Elimina las tablas manualmente en PostgreSQL
DROP TABLE bookings, availability_config, schema_migrations CASCADE;

# Paso 2: Pon SKIP_MIGRATIONS=false
SKIP_MIGRATIONS=false

# Paso 3: Reinicia la aplicación
# Las tablas se crearán automáticamente
```

---

## 🚀 En Producción (Dockerply):

### **Primera vez:**
Configura en Dockerply:
```bash
SKIP_MIGRATIONS=false
```

### **Siguientes deploys:**
Cambia a:
```bash
SKIP_MIGRATIONS=true
```

---

## 🧪 En Desarrollo:

### **Crear tablas por primera vez:**
```bash
# En .env.local
SKIP_MIGRATIONS=false

# Iniciar app
npm run dev
```

### **Usar tablas existentes:**
```bash
# En .env.local
SKIP_MIGRATIONS=true

# Iniciar app
npm run dev
```

---

## 🔍 Verificar Estado de Migraciones:

### **Ver si las tablas existen:**
```bash
npm run db:test
```

### **Ver migraciones ejecutadas:**
```sql
-- En PostgreSQL
SELECT * FROM schema_migrations;
```

---

## ⚠️ IMPORTANTE:

- **Nunca** pongas `SKIP_MIGRATIONS=false` si la base de datos ya tiene datos importantes
- **Siempre** haz backup antes de recrear tablas
- **Solo** pon `false` cuando quieras crear nuevas tablas o resetear la base de datos

---

## 💡 Flujo Recomendado:

### **Primera vez:**
1. Base de datos vacía
2. `SKIP_MIGRATIONS=false`
3. Deploy → Se crean tablas automáticamente ✅
4. Siguientes deploys: `SKIP_MIGRATIONS=true`

### **Si necesitas resetear:**
1. Backup de datos (si es necesario)
2. Eliminar tablas manualmente
3. `SKIP_MIGRATIONS=false`
4. Deploy → Se recrean tablas ✅
5. Volver a poner `SKIP_MIGRATIONS=true`

---

## 📞 ¿Dudas?

- ¿Primera vez? → `SKIP_MIGRATIONS=false`
- ¿DB ya existe? → `SKIP_MIGRATIONS=true`
- ¿Quieres resetear? → Elimina tablas + `SKIP_MIGRATIONS=false`
