# CLAUDE.md - Lumicatech Project

Este archivo configura Claude Code para trabajar en el proyecto Lumicatech.

## Project Overview

**Lumica Tech** - Landing page con Next.js 16, React 19, Tailwind CSS v4 y TypeScript.

## Stack Tecnológico

- **Framework**: Next.js 16.2.0 (App Router + Turbopack)
- **React**: 19.2.4
- **Estilos**: Tailwind CSS v4.2.2 con @theme
- **Tipado**: TypeScript 5
- **Fuentes**: Inter (Google Fonts)
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion

## Estructura del Proyecto

```
lumicatech/
├── app/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx       # Navegación principal
│   │   ├── HeroSection.tsx  # Hero con CTA
│   │   ├── CaseStudies.tsx  # Casos de éxito
│   │   ├── ServicesSection.tsx
│   │   ├── ApproachSection.tsx
│   │   └── Footer.tsx
│   ├── globals.css          # Estilos globales con Tailwind v4
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Landing page
├── public/                  # Assets estáticos
├── postcss.config.js        # Configuración PostCSS para Tailwind v4
└── next.config.ts           # Configuración Next.js
```

## Comandos Importantes

```bash
# Desarrollo
npm run dev                 # Inicia servidor en http://localhost:3000

# Producción
npm run build              # Build para producción
npm start                  # Inicia servidor de producción

# Código
npm run lint               # Linting
```

## Reglas de Desarrollo

1. **Componentes**: Usar 'use client' solo cuando sea necesario (event handlers, useState, useEffect)
2. **Estilos**: Tailwind CSS v4 con @theme en globals.css
3. **Tipado**: TypeScript strict mode
4. **Fuentes**: Usar Inter font variable
5. **Colores**:
   - Primary: #135bec (azul)
   - Secondary: #00bcd4 (turquoise)
   - Dark: #0f172a
   - Background: #ffffff

## Agents & Skills Disponibles

### Agents (.claude/agents/)
- **debugger**: Investiga issues y diagnosticas problemas
- **fullstack-developer**: Implementa features
- **ui-ux-designer**: Diseña UI/UX

### Skills (.claude/skills/)
- **ck:fix**: Arregla bugs y errores
- **ck:debug**: Debug y diagnóstico
- **frontend-development**: Desarrollo frontend
- **ui-styling**: Estilos CSS y Tailwind

## Problema Actual

**Issue**: Tailwind CSS v4 no está cargando los estilos correctamente - parece HTML puro.

**Configuración actual**:
- ✅ Tailwind CSS v4.2.2 instalado
- ✅ @tailwindcss/postcss instalado
- ✅ postcss.config.js creado
- ✅ @import "tailwindcss" en globals.css
- ✅ @theme configurado en globals.css

**Siguiente paso**: Usar agent `debugger` con skill `ck:debug` para diagnosticar el problema.
