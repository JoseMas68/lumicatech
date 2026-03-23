import { NextRequest, NextResponse } from "next/server";
import {
  sendBookingConfirmation,
  sendNotificationToOwner,
} from "@/src/lib/email";

export async function POST(request: NextRequest) {
  const { name, email, date, time, type } = await request.json();

  const booking = {
    name: name || "Usuario de Prueba",
    email: email || process.env.OWNER_EMAIL || "",
    company: "Empresa de Prueba S.L.",
    message: "Este es un email de prueba enviado desde el panel de administración.",
    date: date || new Date().toISOString().split("T")[0],
    time: time || "10:00",
    meetLink: "https://meet.google.com/abc-defg-hij",
  };

  let success = false;

  if (type === "client") {
    success = await sendBookingConfirmation(booking);
  } else if (type === "owner") {
    success = await sendNotificationToOwner(booking);
  } else {
    const [clientOk, ownerOk] = await Promise.all([
      sendBookingConfirmation(booking),
      sendNotificationToOwner(booking),
    ]);
    success = clientOk && ownerOk;
  }

  return NextResponse.json({ success });
}
