// Google Calendar Integration
// Setup: See docs/BOOKING_SETUP.md for configuration

import { google } from "googleapis";
import { getAvailabilityConfig } from "./availability-config";

interface BookingDetails {
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  time: string;
}

function getOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return oauth2Client;
}

export async function createCalendarEvent(booking: BookingDetails): Promise<{
  eventId: string;
  meetLink: string;
}> {
  const auth = getOAuthClient();
  const calendar = google.calendar({ version: "v3", auth });

  // Construir fecha/hora de inicio y fin (1 hora de duración)
  const [year, month, day] = booking.date.split("-").map(Number);
  const [hour, minute] = booking.time.split(":").map(Number);

  const startDateTime = new Date(year, month - 1, day, hour, minute);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Reunión con ${booking.name}${booking.company ? ` - ${booking.company}` : ""}`,
      description: booking.message || "",
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Europe/Madrid",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Europe/Madrid",
      },
      attendees: [{ email: booking.email, displayName: booking.name }],
      conferenceData: {
        createRequest: {
          requestId: `lumicatech_${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    },
  });

  const eventId = event.data.id ?? "";
  const meetLink =
    event.data.conferenceData?.entryPoints?.find(
      (ep) => ep.entryPointType === "video"
    )?.uri ?? "";

  return { eventId, meetLink };
}

export async function getAvailableSlots(date: string): Promise<string[]> {
  const config = getAvailabilityConfig();

  // Los slots disponibles para este día los define el admin
  const configuredSlots = config.slots[date] ?? [];
  if (configuredSlots.length === 0) return [];

  try {
    // Consultar Google Calendar para filtrar las horas ya ocupadas
    const auth = getOAuthClient();
    const calendar = google.calendar({ version: "v3", auth });

    const [year, month, day] = date.split("-").map(Number);
    const dayStart = new Date(year, month - 1, day, 0, 0, 0).toISOString();
    const dayEnd = new Date(year, month - 1, day, 23, 59, 59).toISOString();

    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStart,
        timeMax: dayEnd,
        timeZone: "Europe/Madrid",
        items: [{ id: process.env.GOOGLE_CALENDAR_ID || "primary" }],
      },
    });

    const busyPeriods =
      freeBusy.data.calendars?.[process.env.GOOGLE_CALENDAR_ID || "primary"]
        ?.busy ?? [];

    return configuredSlots.filter((slot) => {
      const [h, m] = slot.split(":").map(Number);
      const slotStart = new Date(year, month - 1, day, h, m);
      const slotEnd = new Date(
        slotStart.getTime() + config.meetingDuration * 60 * 1000
      );

      return !busyPeriods.some((busy) => {
        const busyStart = new Date(busy.start!);
        const busyEnd = new Date(busy.end!);
        return slotStart < busyEnd && slotEnd > busyStart;
      });
    });
  } catch (err) {
    // Si falla la API de Google, devolver los slots configurados sin filtrar
    console.error("[getAvailableSlots] Error consultando Google Calendar:", err);
    return configuredSlots;
  }
}
