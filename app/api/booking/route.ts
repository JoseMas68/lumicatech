import { NextRequest, NextResponse } from "next/server";

// Mock booking storage
const bookings: Array<{
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  time: string;
  createdAt: Date;
}> = [];

export async function GET() {
  // Return available slots (mock data)
  return NextResponse.json({
    availableSlots: bookings.length > 0 ? bookings : [],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, date, time } = body;

    // Validate required fields
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Create booking
    const booking = {
      id: `booking_${Date.now()}`,
      name,
      email,
      company,
      message,
      date,
      time,
      createdAt: new Date(),
    };

    bookings.push(booking);

    // TODO: In production, you would:
    // 1. Create Google Calendar event with Meet link
    // 2. Send confirmation email via Resend
    // 3. Store booking in database
    
    console.log("Booking created:", booking);
    
    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      message: "Reserva confirmada",
    });
    
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Error al procesar la reserva" },
      { status: 500 }
    );
  }
}
