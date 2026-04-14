# 📦 Guía de Persistencia de Datos - LumicaTech

## Problema Actual
Los datos de las reservas (`data/bookings.json`) se pierden al hacer deploy porque están dentro del contenedor Docker.

---

## 🚀 Soluciones Disponibles

### Opción 1: **Volúmenes Persistentes** (Recomendado para Dockerply)

#### En Dockerply:
1. Ve a la configuración de tu servicio
2. Busca la sección "Volumes" o "Storage"
3. Agrega un volumen persistente:
   ```
   Source: lumicatech_data
   Target: /app/data
   Type: Volume
   ```

#### En docker-compose.yml (ya configurado):
```yaml
volumes:
  - ./data:/app/data  # Monta directorio local al contenedor
```

#### Verificar que funciona:
```bash
# En el VPS o servidor
docker exec -it lumicatech ls -la /app/data
```

---

### Opción 2: **Script de Backup Automático** (Ya incluido)

#### Usar antes de cada deploy:
```bash
bash scripts/pre-deploy.sh
```

#### Scripts disponibles:
- **`scripts/backup-data.sh`** - Crea backup de datos
- **`scripts/restore-data.sh`** - Restaura desde backup
- **`scripts/pre-deploy.sh`** - Backup automático antes de deploy

#### Ejemplo de uso:
```bash
# Antes de hacer deploy
npm run pre-deploy

# O manualmente
bash scripts/backup-data.sh
```

---

### Opción 3: **Base de Datos Real** (Recomendado a largo plazo)

#### Opciones gratuitas:
1. **Supabase** (PostgreSQL + API gratis)
2. **PlanetScale** (MySQL compatible)
3. **Neon** (PostgreSQL serverless)
4. **Turso** (SQLite edge)

#### Ventajas:
- ✅ Verdadera persistencia
- ✅ Backup automático
- ✅ Escalabilidad
- ✅ Multi-usuario seguro
- ✅ Consultas complejas

---

## 🔄 Configurar Volúmenes en Dockerply

### Paso 1: En Dockerply Dashboard
1. Ve a tu proyecto
2. Settings → Volumes
3. Agrega nuevo volumen:
   - **Name:** `lumicatech_data`
   - **Mount Path:** `/app/data`

### Paso 2: Re-deploy
1. Haz deploy de la aplicación
2. Los datos persistirán entre deploys

---

## 📋 Usar Scripts de Backup

### Backup manual:
```bash
bash scripts/backup-data.sh
```

### Restore desde backup:
```bash
bash scripts/restore-data.sh
```

### Automatizar antes de deploy:
Agrega a tu `package.json`:
```json
{
  "scripts": {
    "pre-deploy": "bash scripts/pre-deploy.sh",
    "backup": "bash scripts/backup-data.sh",
    "restore": "bash scripts/restore-data.sh"
  }
}
```

---

## 🗂️ Estructura de Backups

```
backups/data/
├── bookings_20231215_143022.json
├── bookings_20231215_150033.json
├── availability-config_20231215_143022.json
└── availability-config_20231215_150033.json
```

Los backups se limpian automáticamente (solo mantiene los últimos 10).

---

## 🔧 Migración a Base de Datos (Futuro)

### Pasos para migrar a Supabase (ejemplo):

1. **Crear cuenta en Supabase** (gratis)
2. **Crear tabla `bookings`:**
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
  created_at TEXT DEFAULT NOW(),
  updated_at TEXT
);
```

3. **Actualizar código** para usar Supabase en lugar de JSON

---

## ✅ Recomendación

### Para ahora (rápido):
- Configurar volúmenes persistenes en Dockerply
- Usar scripts de backup como seguridad adicional

### Para futuro (robusto):
- Migrar a Supabase o base de datos real
- Mantener los JSON como backup local

---

## 📞 Soporte

Si necesitas ayuda para configurar volúmenes en Dockerply o migrar a base de datos, avísame.
