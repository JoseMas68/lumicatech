---
title: "Migracion de cotizaciones: JSON a PostgreSQL"
description: "Plan breve para mover persistencia de cotizaciones de JSON a PostgreSQL en Next.js."
status: pending
priority: P1
effort: 6h
branch: master
tags: [nextjs, postgres, api, typescript, migracion]
created: 2026-05-19
---

## Objetivo
- Sustituir almacenamiento JSON del modulo de cotizaciones por PostgreSQL sin romper contratos actuales de API.

## Alcance minimo (MVP)
1. Esquema SQL
- Crear tabla `budgets` (id UUID PK, payload JSONB o columnas normalizadas minimas, created_at, updated_at).
- Definir indices minimos: `created_at`, y el campo de busqueda principal (ej. email o estado).
- Añadir migracion versionada en `src/lib/migrations/`.

2. Capa de acceso a datos
- Implementar `src/lib/budgets-db.ts` con operaciones CRUD usadas por rutas (`create`, `list`, `getById`, `updateStatus` si aplica).
- Mantener interfaz estable para evitar cambios amplios en handlers.
- Incluir manejo de errores de DB (timeouts, conflictos, not found) con errores tipados.

3. Actualizacion de rutas API
- Reemplazar llamadas al store JSON en rutas bajo `app/api/admin/budgets/` y `app/api/public/...` donde aplique.
- Conservar request/response actual (backward compatibility).
- Añadir feature flag opcional (`USE_POSTGRES_BUDGETS=true`) para rollback rapido.

4. Validacion TypeScript
- Reforzar tipos compartidos (`Budget`, `CreateBudgetInput`, `BudgetStatus`) en un modulo unico.
- Validar entrada/salida con esquemas existentes (o Zod si ya esta en proyecto) antes de persistir.
- Ejecutar `pnpm exec tsc --noEmit` y corregir incompatibilidades.

5. Riesgos y mitigacion
- Riesgo: deriva de esquema (JSON vs SQL). Mitigacion: mappeo explicito + pruebas de serializacion.
- Riesgo: regresion de API. Mitigacion: pruebas de contrato en rutas criticas.
- Riesgo: datos legacy incompletos. Mitigacion: script de migracion con logs y modo dry-run.
- Riesgo: caida en despliegue. Mitigacion: migracion reversible + feature flag.

## Secuencia recomendada
1. Diseñar esquema + migracion SQL.
2. Implementar `budgets-db` con tipos compartidos.
3. Cambiar rutas API a nueva capa.
4. Ejecutar TypeScript + smoke tests de endpoints.
5. Activar flag en staging, luego produccion.

## Criterios de terminado
- Lectura/escritura de cotizaciones funcionando en PostgreSQL.
- Sin errores TypeScript en build (`tsc --noEmit`).
- Contratos API existentes preservados.
- Rollback posible via flag/config.

## Preguntas abiertas
- Confirmar campos minimos de `budgets` para normalizar (vs guardar payload completo en JSONB).
- Confirmar si existe script estandar de migraciones en CI/CD para este repo.
