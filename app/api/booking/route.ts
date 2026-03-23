import { NextRequest, NextResponse } from "next/server";
import { createCalendarEvent, getAvailableSlots } from "@/src/lib/google-calendar";
import { sendBookingConfirmation, sendNotificationToOwner } from "@/src/lib/email";
import { saveBooking } from "@/src/lib/bookings-store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Se requiere el parámetro 'date' (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  try {
    const availableSlots = await getAvailableSlots(date);
    return NextResponse.json({ availableSlots });
  } catch (error) {
    console.error("[GET /api/booking] Error:", error);
    return NextResponse.json({ availableSlots: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, date, time, consentGiven } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    if (!consentGiven) {
      return NextResponse.json(
        { error: "Debes aceptar la política de privacidad para continuar" },
        { status: 400 }
      );
    }

    // 1. Intentar crear evento en Google Calendar (no bloquea si falla)
    let eventId = "";
    const meetLink = process.env.MEET_LINK || "";
    try {
      const result = await createCalendarEvent({ name, email, company, message, date, time });
      eventId = result.eventId;
    } catch (calendarError) {
      console.error("[POST /api/booking] Error creando evento en Google Calendar:", calendarError);
      // Continuar sin evento de calendar — los emails se envían igualmente
    }

    // 2. Enviar confirmación al cliente
    await sendBookingConfirmation({ name, email, company, message, date, time, meetLink });

    // 3. Notificar al propietario
    await sendNotificationToOwner({ name, email, company, message, date, time, meetLink });

    // 4. Guardar reserva en el registro local
    const stored = saveBooking({
      name, email, company, message, date, time, meetLink,
      consentGiven: true,
      consentAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      bookingId: stored.id,
      meetLink,
      message: "Reserva confirmada",
    });

  } catch (error) {
    console.error("[POST /api/booking] Error:", error);
    return NextResponse.json(
      { error: "Error al procesar la reserva" },
      { status: 500 }
    );
  }
}
