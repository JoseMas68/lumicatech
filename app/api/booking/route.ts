import { NextRequest, NextResponse } from "next/server";
import { createCalendarEvent, getAvailableSlots } from "@/src/lib/google-calendar";
import { sendBookingConfirmation, sendNotificationToOwner } from "@/src/lib/email";
import { saveBooking } from "@/src/lib/bookings-store";
import { validateBookingData, isValidDate } from "@/src/lib/validation";
import { checkRateLimit, getClientIp } from "@/src/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Se requiere el parámetro 'date' (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  // Validar formato de fecha
  if (!isValidDate(date)) {
    return NextResponse.json(
      { error: "Formato de fecha inválido" },
      { status: 400 }
    );
  }

  try {
    const availableSlots = await getAvailableSlots(date);
    return NextResponse.json({ availableSlots });
  } catch (error) {
    // No exponer detalles del error al cliente
    return NextResponse.json(
      { error: "Error al obtener disponibilidad" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting por IP para prevenir abuso
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`booking:${clientIp}`, 10, 60 * 60 * 1000); // 10 intentos por hora

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Demasiados intentos. Por favor espera 1 hora.",
          resetTime: rateLimit.resetTime,
        },
        { status: 429 }
      );
    }

    // Validar tamaño del request
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) { // 10KB max
      return NextResponse.json(
        { error: "Request demasiado grande" },
        { status: 413 }
      );
    }

    const body = await request.json();

    // Validar y sanitizar datos de entrada
    const validation = validateBookingData(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: "Datos inválidos", details: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, company, message, date, time } = validation.sanitized!;

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
