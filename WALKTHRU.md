# WALKTHRU — LumicaTech

## Fase: Blog con MDX

### Qué se hizo

Se implementó el sistema de blog completo usando **Next.js + MDX** (no WordPress). Los artículos se escriben en Markdown/MDX y se publican automáticamente.

**Arquitectura:**
- Artículos en `src/content/blog/*.mdx` — Markdown con frontmatter YAML
- Página de lista en `/blog` — Muestra todos los artículos agrupados por categoría
- Página de artículo en `/blog/[slug]` — Renderiza el MDX con componentes personalizados
- Componentes MDX: syntax highlighting, tablas, callouts, imágenes, enlaces
- SEO automático: Open Graph, Twitter Cards, Schema Article, metadata dinámica
- Navegación: enlace "Blog" añadido al header (desktop + mobile)
- Artículos relacionados al final de cada artículo

**Archivos creados:**
- `src/types/blog.ts` — Interfaces TypeScript para posts y metadata
- `src/lib/blog.ts` — Utilidades: `getBlogPostMetadata()`, `getBlogPostBySlug()`, `getCategories()`, `parseFrontmatter()`
- `src/components/blog/BlogCard.tsx` — Tarjeta de artículo con imagen, categoría, fecha, read time
- `src/components/blog/BlogPostContent.tsx` — Renderer MDX con rehype/remark plugins
- `app/blog/page.tsx` — Página principal del blog con filtros por categoría
- `app/blog/[slug]/page.tsx` — Página de artículo individual con hero, contenido, compartir, relacionados
- `next.config.ts` — Integración con @next/mdx y plugins de markdown
- `src/content/blog/que-es-perforacion-horizontal-dirigida.mdx` — Primer artículo publicado
- `app/components/Header.tsx` — Añadido enlace "Blog" a la navegación

**Flujo de trabajo:**
1. Escribir artículo en MDX → `src/content/blog/titulo-articulo.mdx`
2. Commit + push a GitHub
3. Vercel detecta el cambio → deploy automático (1-2 min)
4. Artículo publicado en `/blog/titulo-articulo`

### Primer artículo

- **Título:** "Qué es la Perforación Horizontal Dirigida y Cómo Funciona"
- **Categoría:** perforacion
- **Slug:** que-es-perforacion-horizontal-dirigida
- **URL:** `/blog/que-es-perforacion-horizontal-dirigida`
- **Contenido:** Explicación completa del proceso HDD, ventajas vs excavación, aplicaciones

## Fase: Budget PDF Professional Redesign (v2 - May 2026)

### Qué se hizo

Rediseño completo del sistema de generación de PDFs para presupuestos con enfoque en profesionalidad, alineación perfecta y 4 plantillas distintivas.

**Cambios principales:**

1. **Logo dinámico** - Ahora carga el logo desde `process.cwd()` en lugar de ruta hardcoded
2. **Layout profesional mejorado:**
   - Barra de acento superior (6px de alto)
   - Header alineado con logo + info del documento a la derecha
   - Sección de cliente con mejor jerarquía visual
   - Tabla de items con columnas perfectamente alineadas
   - Sección de totales con diseño enfatizado
   - Footer profesional con numeración de página

3. **4 Plantillas profesionales:**
   - **Lumica Brand** (Principal) - Cyan profesional #0891b2
   - **Corporate** (Empresarial) - Azul corporativo #1e40af
   - **Minimal** (Sobrio) - Monocromático #18181b
   - **Elegant** (Premium) - Verde esmeralda #059669

**Archivos modificados:**
- `app/api/admin/budgets/[id]/pdf/route.ts` - Reescrito completamente (~500 líneas)
- `src/lib/budget-branding.ts` - 4 plantillas con colores pre-computados
- `app/presupuesto/[token]/page.tsx` - Corregido para usar clases CSS válidas

### Mejoras técnicas

- Logo carga dinámicamente: `join(process.cwd(), "public", "logo.png")`
- Columnas de tabla alineadas con precisión
- Text wrapping para títulos largos
- Números alineados a la derecha correctamente
- Footer con número de página y referencia del documento
- Page 2 con términos, condiciones y sección de firma

### Compilación

- `tsc --noEmit` → 0 errores
- Todas las plantillas funcionan correctamente

### Notas

- PDF generation usa `pdf-lib` con logo embebido
- Coordenadas optimizadas para A4 (595.28 x 841.89)
- Márgenes: 55px laterales, 50px superior/inferior
- Fondo blanco para máximo contraste profesional

---

## Fase: Budget PDF Redesign (From Scratch) - Original

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
