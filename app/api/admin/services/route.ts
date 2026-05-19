import { NextRequest, NextResponse } from "next/server";
import { createService, deleteService, getAllServices, updateService } from "@/src/lib/services-db";
import { requireAuth } from "@/src/lib/auth";
import { sanitizeString } from "@/src/lib/validation";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  const services = await getAllServices();
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  if (!body?.name || String(body.name).trim().length < 2) {
    return NextResponse.json({ error: "name es obligatorio" }, { status: 400 });
  }

  const service = await createService({
    name: sanitizeString(String(body.name), 120),
    description: body.description ? sanitizeString(String(body.description), 1000) : undefined,
    category: body.category ? sanitizeString(String(body.category), 80) : undefined,
    basePrice: Number(body.basePrice || 0),
    active: body.active !== false,
  });

  return NextResponse.json({ service }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const id = body?.id ? String(body.id) : "";
  if (!id) return NextResponse.json({ error: "id es obligatorio" }, { status: 400 });

  const service = await updateService(id, {
    name: body.name !== undefined ? sanitizeString(String(body.name), 120) : undefined,
    description: body.description !== undefined ? sanitizeString(String(body.description), 1000) : undefined,
    category: body.category !== undefined ? sanitizeString(String(body.category), 80) : undefined,
    basePrice: body.basePrice !== undefined ? Number(body.basePrice) : undefined,
    active: body.active !== undefined ? !!body.active : undefined,
  });

  if (!service) return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
  return NextResponse.json({ service });
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const id = body?.id ? String(body.id) : "";
  if (!id) return NextResponse.json({ error: "id es obligatorio" }, { status: 400 });

  const deleted = await deleteService(id);
  if (!deleted) return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
  return NextResponse.json({ success: true });
}
