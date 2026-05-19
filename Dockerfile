# Usar imagen oficial de Node.js
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Instalar dependencias adicionales
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Instalar dependencias solo si es necesario
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml* ./
# Crear pnpm-workspace.yaml con build scripts aprobados antes de instalar
RUN echo 'allowBuilds:' > pnpm-workspace.yaml && \
    echo '  sharp: true' >> pnpm-workspace.yaml && \
    echo '  unrs-resolver: true' >> pnpm-workspace.yaml
RUN pnpm install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Crear directorio data para build time
RUN mkdir -p /app/data

# Deshabilitar telemetria durante build
ENV NEXT_TELEMETRY_DISABLED=1

# Build de la aplicacion
RUN pnpm run build

# Runner de produccion
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Crear directorio de data con permisos
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Crear archivos de configuracion con permisos si no existen
RUN touch /app/data/seo-config.json /app/data/availability.json && chown nextjs:nodejs /app/data/*.json

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

