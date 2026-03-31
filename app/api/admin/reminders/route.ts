import { NextRequest, NextResponse } from "next/server";
import { getBookingsDueReminder, markReminderSent } from "@/src/lib/bookings-store";
import { sendReminderEmail } from "@/src/lib/email";
import { isAuthorizedWithCron } from "@/src/lib/auth";

// Protegido por cookie de admin O por CRON_SECRET (para cron jobs externos del VPS)
export async function POST(request: NextRequest) {
  if (!(await isAuthorizedWithCron(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const bookingsDue = getBookingsDueReminder();
  const results: { id: string; email: string; success: boolean }[] = [];

  for (const booking of bookingsDue) {
    try {
      await sendReminderEmail({
        name: booking.name,
        email: booking.email,
        company: booking.company,
        message: booking.message,
        date: booking.date,
        time: booking.time,
        meetLink: booking.meetLink,
      });
      markReminderSent(booking.id);
      results.push({ id: booking.id, email: booking.email, success: true });
    } catch (err) {
      console.error(`[reminders] Error enviando recordatorio a ${booking.email}:`, err);
      results.push({ id: booking.id, email: booking.email, success: false });
    }
  }

  return NextResponse.json({
    sent: results.filter((r) => r.success).length,
    failed: results.filter((r) => !r.success).length,
    results,
  });
}
