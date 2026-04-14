# 🗄️ Configuración de Base de Datos PostgreSQL

## 🌐 **Producción (Dokply)**

### **Connection String:**
```
postgresql://Jose:xPR1wjfW31hFs6OdbaYm@161.97.125.245:5432/lumicatechdb
```

### **Variables de Entorno:**
```bash
PG_HOST=161.97.125.245
PG_PORT=5432
PG_DATABASE=lumicatechdb
PG_USER=Jose
PG_PASSWORD=xPR1wjfW31hFs6OdbaYm
```

## 📋 **Configurar en Dokply:**

1. **Ve a tu aplicación en Dokply**
2. **Environment Variables**
3. **Agrega o actualiza estas variables:**

```bash
PG_HOST=161.97.125.245
PG_PORT=5432
PG_DATABASE=lumicatechdb
PG_USER=Jose
PG_PASSWORD=xPR1wjfW31hFs6OdbaYm
SKIP_MIGRATIONS=false
```

4. **Guarda y Redeploy**

## ⚠️ **IMPORTANTE:**

### **Primer Deploy:**
```bash
SKIP_MIGRATIONS=false  # Crear tablas
```

### **Siguientes Deploys:**
```bash
SKIP_MIGRATIONS=true  # NO crear tablas de nuevo
```

## 🔒 **Seguridad:**

- ✅ La base de datos está en un host externo (161.97.125.245)
- ✅ Contraseña segura configurada
- ⚠️ Asegúrate de que el firewall de tu VPS permita conexiones desde Dokply
- ⚠️ Considera configurar restricciones de IP para mayor seguridad

## 🧪 **Probar Conexión:**

```bash
# Desde tu máquina local
psql -h 161.97.125.245 -p 5432 -U Jose -d lumicatechdb
# Contraseña: xPR1wjfW31hFs6OdbaYm
```

## 🚀 **Siguiente Deploy:**

1. Configura las variables en Dokploy
2. Haz Redeploy
3. Las migraciones se ejecutarán automáticamente
4. ¡La web debería funcionar!

## 📞 **¿Necesitas ayuda?**

Si hay error de conexión, verifica:
- Firewall del VPS permite puerto 5432
- Las credenciales son correctas
- El host 161.97.125.245 es accesible desde Dokply
