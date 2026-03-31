import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual, checkRateLimit, getClientIp } from "@/src/lib/auth";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Validar que se proporcionó password
    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Contraseña requerida" },
        { status: 400 }
      );
    }

    // Validar longitud máxima para prevenir DoS
    if (password.length > 1000) {
      return NextResponse.json(
        { error: "Contraseña inválida" },
        { status: 400 }
      );
    }

    // Rate limiting por IP
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`login:${clientIp}`, 5, 15 * 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Demasiados intentos. Por favor espera 15 minutos.",
          resetTime: rateLimit.resetTime,
        },
        { status: 429 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminToken = process.env.ADMIN_TOKEN;

    if (!adminPassword || !adminToken) {
      console.error("[LOGIN] Admin no configurado en variables de entorno");
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    // Usar timing-safe comparison para prevenir timing attacks
    const passwordMatch = timingSafeEqual(password, adminPassword);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          error: "Contraseña incorrecta",
          remainingAttempts: rateLimit.remainingAttempts - 1,
        },
        { status: 401 }
      );
    }

    // Generar token de sesión único (además del admin_token estático)
    const sessionToken = crypto.randomBytes(32).toString("hex");

    const response = NextResponse.json({
      success: true,
      remainingAttempts: rateLimit.remainingAttempts - 1,
    });

    // Configurar cookie con flags de seguridad
    const isProduction = process.env.NODE_ENV === "production";
    response.cookies.set("admin_token", adminToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    // Cookie adicional con token de sesión único
    response.cookies.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[LOGIN] Error procesando request:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
