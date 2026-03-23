import { NextRequest, NextResponse } from "next/server";
import { getBookingsDueReminder, markReminderSent } from "@/src/lib/bookings-store";
import { sendReminderEmail } from "@/src/lib/email";
import { cookies } from "next/headers";

// Protegido por cookie de admin O por CRON_SECRET (para cron jobs externos del VPS)
async function isAuthorized(request: NextRequest): Promise<boolean> {
  const cronSecret = request.headers.get("x-cron-secret");
  if (cronSecret && cronSecret === process.env.CRON_SECRET) return true;

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === process.env.ADMIN_TOKEN;
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) {
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
