import { NextRequest, NextResponse } from "next/server";
import { getAllBookings, deleteBooking, updateBooking } from "@/src/lib/bookings-store";
import { cookies } from "next/headers";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === process.env.ADMIN_TOKEN;
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const bookings = getAllBookings();
  // Ordenar por fecha descendente (más recientes primero)
  bookings.sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1));
  return NextResponse.json({ bookings });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Se requiere el campo 'id'" }, { status: 400 });
  }
  const deleted = deleteBooking(id);
  if (!deleted) {
    return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id, status, notes } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Se requiere el campo 'id'" }, { status: 400 });
  }
  const updated = updateBooking(id, { status, notes });
  if (!updated) {
    return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
  }
  return NextResponse.json({ booking: updated });
}
