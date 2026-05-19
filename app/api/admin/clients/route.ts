import { NextRequest, NextResponse } from "next/server";
import { createClient, deleteClient, getAllClients, updateClient } from "@/src/lib/clients-db";
import { requireAuth } from "@/src/lib/auth";
import { isValidEmail, sanitizeString } from "@/src/lib/validation";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  const clients = await getAllClients();
  return NextResponse.json({ clients });
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  if (!body?.name || String(body.name).trim().length < 2) {
    return NextResponse.json({ error: "name es obligatorio" }, { status: 400 });
  }
  if (!body?.email || !isValidEmail(String(body.email))) {
    return NextResponse.json({ error: "email invalido" }, { status: 400 });
  }

  const client = await createClient({
    name: sanitizeString(String(body.name), 120),
    email: String(body.email).trim().toLowerCase(),
    company: body.company ? sanitizeString(String(body.company), 120) : undefined,
    phone: body.phone ? sanitizeString(String(body.phone), 40) : undefined,
    taxId: body.taxId ? sanitizeString(String(body.taxId), 40) : undefined,
    address: body.address ? sanitizeString(String(body.address), 300) : undefined,
    notes: body.notes ? sanitizeString(String(body.notes), 2000) : undefined,
  });

  return NextResponse.json({ client }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const id = body?.id ? String(body.id) : "";
  if (!id) return NextResponse.json({ error: "id es obligatorio" }, { status: 400 });

  if (body.email !== undefined && !isValidEmail(String(body.email))) {
    return NextResponse.json({ error: "email invalido" }, { status: 400 });
  }

  const client = await updateClient(id, {
    name: body.name !== undefined ? sanitizeString(String(body.name), 120) : undefined,
    email: body.email !== undefined ? String(body.email).trim().toLowerCase() : undefined,
    company: body.company !== undefined ? sanitizeString(String(body.company), 120) : undefined,
    phone: body.phone !== undefined ? sanitizeString(String(body.phone), 40) : undefined,
    taxId: body.taxId !== undefined ? sanitizeString(String(body.taxId), 40) : undefined,
    address: body.address !== undefined ? sanitizeString(String(body.address), 300) : undefined,
    notes: body.notes !== undefined ? sanitizeString(String(body.notes), 2000) : undefined,
  });

  if (!client) return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
  return NextResponse.json({ client });
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const id = body?.id ? String(body.id) : "";
  if (!id) return NextResponse.json({ error: "id es obligatorio" }, { status: 400 });

  const deleted = await deleteClient(id);
  if (!deleted) return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
  return NextResponse.json({ success: true });
}
