# Usar imagen oficial de Node.js
FROM node:20-alpine AS base

# Instalar dependencias adicionales
RUN apk add --no-cache libc6-compat postgresql-client

WORKDIR /app

# Instalar dependencias solo si es necesario
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Deshabilitar telemetría durante build
ENV NEXT_TELEMETRY_DISABLED 1

# Build de la aplicación
RUN npm run build

# Runner de producción
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV SKIP_MIGRATIONS=false

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/src ./src

# Crear directorio de data con permisos
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Script de inicio con migraciones automáticas
CMD ["node", "-e", "require('./scripts/start-with-migrations.ts').catch(err => { console.error(err); process.exit(1); })"]
