import { NextRequest, NextResponse } from "next/server";
import { getAllBookings, deleteBooking, updateBooking } from "@/src/lib/bookings-store";
import { requireAuth } from "@/src/lib/auth";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  const bookings = getAllBookings();
  // Ordenar por fecha descendente (más recientes primero)
  bookings.sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1));
  return NextResponse.json({ bookings });
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

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
  const authError = await requireAuth();
  if (authError) return authError;

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
