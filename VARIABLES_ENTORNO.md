# 🔐 Variables de Entorno Requeridas

## ⚠️ ACCIÓN REQUERIDA - Agregar esta variable

Debes agregar **UNA NUEVA VARIABLE** a tu archivo `.env.local`:

### CRON_SECRET
```bash
CRON_SECRET=tu_valor_aqui
```

### ¿Cómo generar el valor?

#### Opción 1: OpenSSL (Recomendado)
Abre tu terminal y ejecuta:
```bash
openssl rand -hex 32
```
Esto generará algo como: `a1b2c3d4e5f6...` (64 caracteres hexadecimales)

#### Opción 2: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Opción 3: Online
Visita: https://www.uuidgenerator.net/api/guid

---

## 📝 Archivo .env.local Completo

Tu archivo `.env.local` debería quedar así:

```bash
# ============================================
# GOOGLE CALENDAR
# Sigue la guía en docs/BOOKING_SETUP.md
# ============================================
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_CALENDAR_ID=primary

# ============================================
# RESEND (envío de emails)
# ============================================
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
OWNER_EMAIL=tu@email.com

# ============================================
# ADMIN PANEL
# ============================================
ADMIN_PASSWORD=tu_contraseña_segura
ADMIN_TOKEN=genera-un-string-aleatorio-aqui-de-32-caracteres

# ============================================
# ⚠️ NUEVO - CRON SECRET
# ============================================
# Genera con: openssl rand -hex 32
CRON_SECRET=pegar_aqui_el_valor_generado

# ============================================
# APP
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## ✅ Pasos a Seguir

1. **Generar el CRON_SECRET:**
   ```bash
   openssl rand -hex 32
   ```

2. **Editar `.env.local`:**
   - Abre el archivo `.env.local` en la raíz del proyecto
   - Agrega la línea: `CRON_SECRET=valor_generado`

3. **Reiniciar el servidor:**
   ```bash
   npm run dev
   ```

4. **Verificar:**
   - Prueba el login en `/admin`
   - Prueba el sistema de booking
   - Verifica que no hay errores en la consola

---

## ❓ ¿Para qué sirve CRON_SECRET?

Esta variable se usa para proteger los endpoints que son llamados por **cron jobs externos** (tareas programadas en tu VPS/servidor).

- **Antes:** Cualquiera podía llamar a los endpoints de cron
- **Ahora:** Solo requests con el header `x-cron-secret: valor_correcto` pueden acceder

Esto previene abusos de los endpoints de:
- `/api/admin/reminders` - Envío de recordatorios
- Cualquier futuro endpoint de cron

---

## 🔒 Seguridad de las Variables

- **ADMIN_TOKEN:** Debe ser mínimo 32 caracteres aleatorios
- **CRON_SECRET:** Debe ser 64 caracteres hexadecimales (openssl rand -hex 32)
- **ADMIN_PASSWORD:** Usa una contraseña fuerte (mínimo 12 caracteres, mayúsculas, minúsculas, números, símbolos)

**NO** compartas estas variables. **NO** las subas a Git.

---

## 📚 Documentación Adicional

- Informe completo: [`INFORME_SEGURIDAD.md`](./INFORME_SEGURIDAD.md)
- Guía de booking: `docs/BOOKING_SETUP.md`
- Configuración de Next.js: [`next.config.ts`](./next.config.ts)
