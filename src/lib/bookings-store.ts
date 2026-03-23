import fs from "fs";
import path from "path";

export type LeadStatus =
  | "nuevo"
  | "contactado"
  | "propuesta"
  | "cliente"
  | "descartado";

export interface StoredBooking {
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  time: string;
  meetLink?: string;
  consentGiven: boolean;
  consentAt: string;
  reminderSent: boolean;
  createdAt: string;
  // Seguimiento CRM
  status: LeadStatus;
  notes: string;
  updatedAt?: string;
}

interface BookingsData {
  bookings: StoredBooking[];
}

const BOOKINGS_PATH = path.join(process.cwd(), "data", "bookings.json");

function readBookings(): BookingsData {
  try {
    if (fs.existsSync(BOOKINGS_PATH)) {
      const raw = fs.readFileSync(BOOKINGS_PATH, "utf-8");
      return JSON.parse(raw) as BookingsData;
    }
  } catch {
    // devolver vacío si falla la lectura
  }
  return { bookings: [] };
}

function writeBookings(data: BookingsData): void {
  const dir = path.dirname(BOOKINGS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(BOOKINGS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function saveBooking(booking: Omit<StoredBooking, "id" | "createdAt" | "reminderSent" | "status" | "notes" | "updatedAt">): StoredBooking {
  const data = readBookings();
  const newBooking: StoredBooking = {
    ...booking,
    id: `booking_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    reminderSent: false,
    status: "nuevo",
    notes: "",
    createdAt: new Date().toISOString(),
  };
  data.bookings.push(newBooking);
  writeBookings(data);
  return newBooking;
}

export function getAllBookings(): StoredBooking[] {
  return readBookings().bookings;
}

export function getBookingsDueReminder(): StoredBooking[] {
  const data = readBookings();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  return data.bookings.filter(
    (b) => b.date === tomorrowStr && !b.reminderSent
  );
}

export function markReminderSent(id: string): void {
  const data = readBookings();
  const booking = data.bookings.find((b) => b.id === id);
  if (booking) {
    booking.reminderSent = true;
    writeBookings(data);
  }
}

export function deleteBooking(id: string): boolean {
  const data = readBookings();
  const before = data.bookings.length;
  data.bookings = data.bookings.filter((b) => b.id !== id);
  if (data.bookings.length < before) {
    writeBookings(data);
    return true;
  }
  return false;
}

export function updateBooking(
  id: string,
  fields: Partial<Pick<StoredBooking, "status" | "notes">>
): StoredBooking | null {
  const data = readBookings();
  const booking = data.bookings.find((b) => b.id === id);
  if (!booking) return null;
  if (fields.status !== undefined) booking.status = fields.status;
  if (fields.notes  !== undefined) booking.notes  = fields.notes;
  booking.updatedAt = new Date().toISOString();
  writeBookings(data);
  return booking;
}
