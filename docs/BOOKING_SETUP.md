# Booking System Setup Guide

Guía de configuración del sistema de reservas con Google Calendar, Google Meet y envío de emails.

## 📋 Requisitos previos

- Cuenta de Google (para Google Calendar API)
- Cuenta en [Resend](https://resend.com) (para emails)

---

## 🔧 Paso 1: Google Cloud Setup

### 1.1 Crear proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Anota el **Project ID**

### 1.2 Habilitar APIs

En la consola de Google Cloud, habilita:

- **Google Calendar API**
- **Google Meet API** (si está disponible)

### 1.3 Configurar OAuth 2.0

1. Ve a **APIs & Services** → **Credentials**
2. Click en **Create Credentials** → **OAuth client ID**
3. Selecciona **Web application**
4. Añade las URLs autorizadas
5. Anota el **Client ID** y **Client Secret**

### 1.4 Obtener Refresh Token

1. Ve a [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
2. Configura tus credenciales OAuth
3. Autoriza los scopes de Calendar
4. Obtén el **Refresh Token**

---

## 📧 Paso 2: Resend Setup

1. Crea cuenta en [resend.com](https://resend.com)
2. Obtén tu API Key
3. Verifica tu dominio (opcional)

---

## 🔐 Paso 3: Variables de entorno

Crea `.env.local`:

```env
# Google Calendar
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_CALENDAR_ID=primary

# Resend
RESEND_API_KEY=re_xxxxxxxx

# App URL
NEXT_PUBLIC_APP_URL=https://lumicatech.com
```

---

## 📦 Paso 4: Instalar dependencias

```bash
npm install googleapis resend
```

---

## 🧪 Paso 5: Probar

1. Ejecuta `npm run dev`
2. Ve a `/booking`
3. Selecciona día y hora
4. Rellena el formulario
5. Verifica el funcionamiento

---

## 📁 Estructura de archivos

```
app/
├── booking/
│   ├── page.tsx
│   └── components/
│       ├── BookingHero.tsx
│       ├── AvailabilityCalendar.tsx
│       ├── BookingForm.tsx
│       └── SocialLinks.tsx
└── api/
    └── booking/
        └── route.ts

src/lib/
├── google-calendar.ts
└── email.ts
```

---

*Última actualización: Marzo 2026*
