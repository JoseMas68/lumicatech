import { NextRequest, NextResponse } from "next/server";
import {
  getAvailabilityConfig,
  saveAvailabilityConfig,
} from "@/src/lib/availability-config";
import { cookies } from "next/headers";

// Middleware de autenticación
async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === process.env.ADMIN_TOKEN;
}

export async function GET() {
  // Verificar autenticación
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const config = await getAvailabilityConfig();
  return NextResponse.json(config);
}

export async function POST(request: NextRequest) {
  // Verificar autenticación
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Limitar el tamaño del payload
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 10240) { // 10KB max
    return NextResponse.json({ error: "Payload demasiado grande" }, { status: 413 });
  }

  try {
    const config = await request.json();

    // Validar que el config tenga la estructura esperada
    if (!config || typeof config !== 'object') {
      return NextResponse.json({ error: "Formato de configuración inválido" }, { status: 400 });
    }

    await saveAvailabilityConfig(config);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[CONFIG] Error saving availability:', error);
    return NextResponse.json(
      { error: "Error al guardar configuración", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
