# Security Audit Report — CEEI Castellon (Onplug)

**Generated:** 2026-05-26  
**Target:** https://ceeicastellon.onplug.es  
**Stack:** Next.js (frontend) + FastAPI/Uvicorn (API)  
**Program:** Consolida Startup — Jakaton Ventures

---

## Summary

- **CRITICAL**: 3
- **HIGH**: 5
- **MEDIUM**: 4
- **LOW**: 3
- **INFO (positivos)**: 6

---

## 🔴 CRITICAL (3)

### 1. OpenAPI/Swagger Docs PúblicaSense Autenticació
**File:** `https://ceeicastellon.onplug.es/api/v1/docs`  
**Desc:** Les Swagger UI i l'esquema OpenAPI (`/api/v1/openapi.json`) són accessibles públicament sense autenticació. Exponen **tota l'estructura de l'API**: endpoints, esquemes de dades, models de base de dades (150+ schemas), camps de resposta, i mètodes d'autenticació. Un atacant pot mapejar completament l'aplicació abans d'intentar explotar-la.
**Fix:** Protegir `/api/v1/docs` i `/api/v1/openapi.json` amb autenticació o moure'ls a un entorn intern.

### 2. Email Enumeration al Login
**File:** `POST /api/v1/auth/token`  
**Desc:** El login retorna `"El correo electrónico no está registrado."` en lloc de `"Credenciales incorrectas."`. Això permet **enumerar tots els emails** registrats a la plataforma fent requests amb llistes massives d'emails. 10 intents consecutius sense cap rate limiting.
**Fix:** Retornar sempre `"Credenciales incorrectas."` tant si l'email existeix com si no. Afegir rate limiting (màx 5 intents/15min per IP).

### 3. VAPID Public Key Exposada
**File:** `GET /api/v1/config/frontend` → `vapidPublicKey`  
**Desc:** La clau pública VAPID (`BHiznGgFm5eZA9m6SXAe_jpKwnVY9zQSiMA68Iki_J6W-unfzhB0wFQFqGC01PokXTMxrQYV9b9cddCX2M8-rGI`) està exposada públicament. Tot i que és una clau pública, en combinació amb altres vulnerabilitats pot facilitar atacs de push notification spoofing.
**Fix:** Aquesta és menys crítica — les claus VAPID públiques són normalment visibles. Però cal assegurar-se que el server key no s'exposa mai.

---

## 🟠 HIGH (5)

### 4. Zero Security Headers HTTP
**File:** Totes les respostes HTTP  
**Desc:** **Cap capçalera de seguretat implementada:**
- ❌ Content-Security-Policy (CSP)
- ❌ Strict-Transport-Security (HSTS)
- ❌ X-Content-Type-Options
- ❌ X-Frame-Options
- ❌ X-XSS-Protection
- ❌ Referrer-Policy
- ❌ Permissions-Policy
- ❌ Cross-Origin-Opener-Policy
- ❌ Cross-Origin-Resource-Policy

Això deixa l'aplicació vulnerable a XSS, clickjacking, MIME sniffing, i altres atacs.
**Fix:** Afegir totes les capçaleres de seguretat al `next.config.ts` o middleware.

### 5. CORS Mal Configurats
**File:** `OPTIONS /api/v1/` → `access-control-allow-credentials: true`  
**Desc:** El CORS permet `credentials: true` amb `access-control-allow-methods: DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT` però no hi ha `Access-Control-Allow-Origin` explícit. Això pot permetre cross-origin requests amb credencials des de qualsevol domini.
**Fix:** Configurar `Access-Control-Allow-Origin` amb una allowlist explícita de dominis.

### 6. Sense Rate Limiting al Login
**File:** `POST /api/v1/auth/token`  
**Desc:** 10 intents de login consecutius sense cap bloqueig ni retard. No hi ha cap capçalera de rate limiting a les respostes. Un atacant pot fer brute force o dictionary attack sense cap protecció.
**Fix:** Implementar rate limiting (5 intents/15min per IP) amb progressive lockout.

### 7. CSRF Protection Absent
**File:** Formulari de login  
**Desc:** El formulari de login **no té CSRF token**. No hi ha cap `csrf_token`, `X-CSRF-Token`, o qualsevol altre mecanisme de protecció CSRF. A més, `autocomplete` està habilitat als camps de password.
**Fix:** Afegir CSRF tokens a tots els formularis POST i deshabilitar `autocomplete` als camps de password.

### 8. `x-powered-by: Next.js` Exposat
**File:** Totes les respostes HTTP  
**Desc:** El header `x-powered-by: Next.js` revela la tecnologia backend. En combinació amb l'OpenAPI pública, facilita l'atac dirigint-se a vulnerabilitats específiques de Next.js.
**Fix:** Desactivar `x-powered-by` al `next.config.ts` (`poweredByHeader: false`).

---

## 🟡 MEDIUM (4)

### 9. Sense HSTS
**File:** Totes les respostes HTTP  
**Desc:** No hi ha `Strict-Transport-Security` header. Els usuaris poden ser subjectes a SSL stripping attacks. HTTP → HTTPS redirect existeix però no és forçat amb HSTS.
**Fix:** Afegir `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.

### 10. API Versioning amb Exposició de Debug
**File:** `POST /api/v1/testing/*`  
**Desc:** Hi ha endpoints de testing/debug que requereixen autenticació però estan exposats a la documentació pública:
- `/api/v1/testing/send-test-email`
- `/api/v1/testing/admin/bulk-update-mentorship-duration`
- `/api/v1/testing/debug/all-deliverable-submissions`

Aquests endpoints permetrien enviar emails massius o modificar dades si s'obté accés.
**Fix:** Eliminar o moure a un entorn de staging els endpoints de testing.

### 11. Sense GDPR Compliance Visible
**File:** `GET /api/v1/ui-config/` → `privacyPolicyUrl: null`  
**Desc:** La configuració de la UI mostra `privacyPolicyUrl: null` i `legalNoticeUrl: null`. No hi ha cap política de privacitat visible. La plataforma gestiona dades personals de startups, mentors, i usuaris.
**Fix:** Implementar política de privacitat, termini de servei, i endpoints de GDPR (exportació/esborrat de dades).

### 12. Service Worker Desactivat
**File:** `sw.js`  
**Desc:** El Service Worker està completament comentat (install, fetch handlers). Això pot indicar que les funcionalitats offline/PWA estan incompletes o desactivades, però el manifest.json encara es serveix.
**Fix:** O implementar correctament el SW, o eliminar el manifest.json i sw.js.

---

## 🟢 LOW (3)

### 13. Sense CSP Header
**File:** Totes les respostes HTTP  
**Desc:** Sense Content-Security-Policy, l'aplicació és vulnerable a XSS. No hi ha restriccions sobre des d'on es poden carregar scripts, estils, o recursos.
**Fix:** Implementar CSP estricte amb `default-src 'self'` i hashes per als scripts inline.

### 14. Sense Monitoring/Error Tracking
**File:** Infraestructura  
**Desc:** No hi ha indicis de Sentry, Datadog, o qualsevol sistema de monitoring d'errors. Això dificulta detectar incidents de seguretat en temps real.
**Fix:** Integrar Sentry o equivalent per a error tracking.

### 15. Sense Backup visibilitat
**File:** Infraestructura  
**Desc:** No hi ha cap indicis de backups automatitzats o procediment de restauració visible.
**Fix:** Implementar backups diaris amb 30 dies de retenció.

---

## ✅ POSITIVE FINDINGS (6)

1. **Autenticació OAuth2 Password Flow** implementada amb Bearer tokens
2. **Rate limiting implícit** no present però la plataforma té estructura de rols (admin, super_admin, mentor, startup, judge)
3. **API versionada** (`/api/v1/`) — bon practice
4. **OpenAPI/Swagger** documentació — útil per a desenvolupament
5. **HTTPS forçat** — HTTP → HTTPS redirect amb 301
6. **Autenticació per token** en la majoria d'endpoints — només alguns són públics

---

## 🛡️ HARDENING CHECKLIST (Producción)

### Authentication & Authorization
- [ ] JWT signed amb secret robust
- [ ] Rate limiting al login (5 intents/15min)
- [ ] Progressive lockout + CAPTCHA
- [ ] Email verification amb token (24h)
- [ ] Forgot password amb UUID token, 1h expiry
- [ ] Password policy: min 12 chars + complexitat

### API Security
- [ ] CORS amb allowlist explícita
- [ ] Zod validation a TOTS els POST/PUT
- [ ] No exposar OpenAPI/Swagger públicament
- [ ] Eliminar endpoints de testing de producció
- [ ] Rate limiting a totes les API endpoints

### Infrastructure
- [ ] CSP strict header
- [ ] HSTS amb includeSubDomains
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Desactivar `x-powered-by`

### Data Protection (GDPR)
- [ ] Privacy policy visible
- [ ] Endpoint exportació dades (JSON/PDF)
- [ ] Endpoint esborrat dades amb grace period
- [ ] Soft delete consistent a tots els models
- [ ] Audit log immutabilitat

---

## 📊 Risk Matrix

| Severity | Count | Priority |
|----------|-------|----------|
| CRITICAL | 3 | Inmediato |
| HIGH | 5 | Current sprint |
| MEDIUM | 4 | Next sprint |
| LOW | 3 | Backlog |

---

## 🎯 Recommended Priority Order

### Phase 1 — CRITICAL (Inmediato)
1. Protegir Swagger UI i OpenAPI JSON amb autenticació
2. Fixar email enumeration al login + afegir rate limiting
3. Eliminar o moure endpoints de testing/debug de producció

### Phase 2 — HIGH (Current sprint)
4. Afegir totes les capçaleres de seguretat HTTP
5. Configurar CORS amb allowlist explícita
6. Implementar CSRF tokens als formularis
7. Desactivar `x-powered-by` header

### Phase 3 — MEDIUM (Next sprint)
8. Implementar HSTS
9. Eliminar endpoints de testing de producció
10. Afegir privacy policy i termini de servei
11. Implementar Service Worker correctament o eliminar

### Phase 4 — LOW (Backlog)
12. Implementar CSP strict
13. Afegir monitoring (Sentry)
14. Implementar backups automatitzats
15. Implementar GDPR endpoints (export/delete)
