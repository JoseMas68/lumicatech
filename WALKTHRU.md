# WALKTHRU — LumicaTech Admin

## Fase: Budget PDF Redesign (From Scratch)

### Qué se hizo

Se reescribieron TODAS las plantillas de presupuestos PDF desde cero. El sistema anterior tenía campos descentrados y diseño inconsistente.

**Nueva estructura del PDF:**
- **Línea de acento** en la parte superior (color según plantilla)
- **Header:** Logo arriba a la izquierda + "PRESUPUESTO" arriba a la derecha
- **Datos del cliente:** Alineados a la izquierda, label "CLIENTE" en uppercase
- **Título del proyecto:** Debajo de los datos del cliente
- **Tabla de items:** Header bar oscuro, columnas alineadas (Concepto | Descripción | Cant. | P.Unit | Total), filas alternadas
- **Totales:** Cuadro a la derecha con Subtotal, Descuento (si aplica), IVA, Total (barra de acento)
- **Notas:** Sección opcional debajo
- **Footer:** Línea divisoria + info de contacto centrada
- **Página 2 (si no aceptado):** Términos del presupuesto, forma de pago, sección de aceptación con firma

**3 plantillas nuevas:**
1. **Lumica Brand** — Acento cyan (#06b6d4), dark header, identidad propia
2. **Corporate** — Acento azul (#2563eb), formal y empresarial
3. **Minimal** — Acento negro (#111827), sobrio y limpio

**Archivos modificados:**
- `src/lib/budget-branding.ts` — Sistema de temas con colores pre-computados (RGB 0-1 para pdf-lib)
- `app/api/admin/budgets/[id]/pdf/route.ts` — Generación PDF desde cero con pdf-lib
- `app/admin/dashboard/components/BudgetsPanel.tsx` — Preview actualizada + selector de plantillas con color swatches

### Mejoras respecto al anterior

- Logo siempre arriba izquierda (antes podía no aparecer)
- Campos alineados correctamente (antes descentrados)
- Tabla de items con estructura clara y columnas definidas
- Página de términos y aceptación (nueva)
- 3 plantillas con identidades visuales distintas
- Preview del PDF en el panel admin coincide con el resultado real
- `app/admin/dashboard/components/BookingsList.tsx`
- `app/admin/dashboard/components/FollowUpTracker.tsx`
- `app/admin/dashboard/components/EmailPreview.tsx`
- `app/admin/dashboard/components/TestEmailForm.tsx`
- `app/admin/dashboard/components/ServicesPanel.tsx`
- `app/admin/dashboard/components/ScheduleConfig.tsx`
- `app/api/admin/budgets/[id]/pdf/route.ts` — PDF profesional con logo embebido

### Compilación

- `tsc --noEmit` → 0 errores en source code
- Solo errores preexistentes en `node_modules/@types/*` (ignorados)

### Notas

- PDF generation usa `pdf-lib` con logo.png embebido
- JWT secret centralizado en `src/lib/auth/jwt.ts` (sin fallbacks inseguros)
- Todos los componentes siguen el mismo patrón de diseño
