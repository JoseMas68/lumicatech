import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * Comparación segura contra timing attacks para contraseñas/tokens
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Verifica si la request está autenticada
 */
export async function isAuthorized(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const adminToken = process.env.ADMIN_TOKEN;

    if (!token || !adminToken) {
      return false;
    }

    return timingSafeEqual(token, adminToken);
  } catch {
    return false;
  }
}

/**
 * Verifica autorización y retorna respuesta de error si no está autorizado
 */
export async function requireAuth(): Promise<NextResponse | null> {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    );
  }
  return null;
}

/**
 * Verifica autorización para endpoints que aceptan cron secrets
 */
export async function isAuthorizedWithCron(request: NextRequest): Promise<boolean> {
  // Primero verificar cron secret (para VPS cron jobs)
  const cronSecret = request.headers.get("x-cron-secret");
  const envCronSecret = process.env.CRON_SECRET;

  if (cronSecret && envCronSecret && timingSafeEqual(cronSecret, envCronSecret)) {
    return true;
  }

  // Si no, verificar cookie de admin
  return isAuthorized();
}

/**
 * Rate limiting en memoria para prevención de fuerza bruta
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutos
): { allowed: boolean; remainingAttempts: number; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    // Crear nuevo registro o renovar si expiró
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remainingAttempts: maxAttempts - 1 };
  }

  if (record.count >= maxAttempts) {
    return {
      allowed: false,
      remainingAttempts: 0,
      resetTime: record.resetTime,
    };
  }

  record.count++;
  return { allowed: true, remainingAttempts: maxAttempts - record.count };
}

/**
 * Obtener IP del cliente (considerando proxies)
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";
  return ip;
}

/**
 * Limpiar registros de rate limit antiguos (llamar periódicamente)
 */
export function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}
