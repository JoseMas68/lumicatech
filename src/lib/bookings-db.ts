import pool from './db';

export type LeadStatus =
  | "nuevo"
  | "contactado"
  | "propuesta"
  | "cliente"
  | "descartado";

export interface Booking {
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  time: string;
  meet_link?: string;
  consent_given: boolean;
  consent_at: string;
  reminder_sent: boolean;
  status: LeadStatus;
  notes: string;
  created_at: string;
  updated_at?: string;
}

/**
 * Crear un nuevo booking
 */
export async function createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'reminder_sent' | 'status' | 'notes' | 'updated_at'>): Promise<Booking> {
  const id = `booking_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  const query = `
    INSERT INTO bookings (
      id, name, email, company, message, date, time,
      meet_link, consent_given, consent_at, reminder_sent,
      status, notes, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *
  `;

  const values = [
    id,
    booking.name,
    booking.email,
    booking.company || null,
    booking.message || null,
    booking.date,
    booking.time,
    booking.meet_link || null,
    booking.consent_given,
    booking.consent_at,
    false,
    'nuevo',
    '',
    createdAt,
    null
  ];

  const result = await pool.query(query, values);
  return result.rows[0] as Booking;
}

/**
 * Obtener todos los bookings
 */
export async function getAllBookings(): Promise<Booking[]> {
  const query = 'SELECT * FROM bookings ORDER BY created_at DESC';
  const result = await pool.query(query);
  return result.rows as Booking[];
}

/**
 * Obtener bookings que necesitan recordatorio
 */
export async function getBookingsDueReminder(): Promise<Booking[]> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const query = `
    SELECT * FROM bookings
    WHERE date = $1 AND reminder_sent = false
    ORDER BY time ASC
  `;

  const result = await pool.query(query, [tomorrowStr]);
  return result.rows as Booking[];
}

/**
 * Marcar recordatorio como enviado
 */
export async function markReminderSent(id: string): Promise<boolean> {
  const query = 'UPDATE bookings SET reminder_sent = true WHERE id = $1';
  const result = await pool.query(query, [id]);
  return (result.rowCount || 0) > 0;
}

/**
 * Eliminar un booking
 */
export async function deleteBooking(id: string): Promise<boolean> {
  const query = 'DELETE FROM bookings WHERE id = $1';
  const result = await pool.query(query, [id]);
  return (result.rowCount || 0) > 0;
}

/**
 * Actualizar un booking
 */
export async function updateBooking(
  id: string,
  fields: Partial<Pick<Booking, 'status' | 'notes'>>
): Promise<Booking | null> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (fields.status !== undefined) {
    updates.push(`status = $${paramIndex++}`);
    values.push(fields.status);
  }

  if (fields.notes !== undefined) {
    updates.push(`notes = $${paramIndex++}`);
    values.push(fields.notes);
  }

  updates.push(`updated_at = $${paramIndex++}`);
  values.push(new Date().toISOString());

  values.push(id);

  const query = `
    UPDATE bookings
    SET ${updates.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

/**
 * Obtener un booking por ID
 */
export async function getBookingById(id: string): Promise<Booking | null> {
  const query = 'SELECT * FROM bookings WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

/**
 * Obtener bookings por email
 */
export async function getBookingsByEmail(email: string): Promise<Booking[]> {
  const query = 'SELECT * FROM bookings WHERE email = $1 ORDER BY created_at DESC';
  const result = await pool.query(query, [email]);
  return result.rows as Booking[];
}

/**
 * Obtener bookings por fecha
 */
export async function getBookingsByDate(date: string): Promise<Booking[]> {
  const query = 'SELECT * FROM bookings WHERE date = $1 ORDER BY time ASC';
  const result = await pool.query(query, [date]);
  return result.rows as Booking[];
}

/**
 * Obtener estadísticas de bookings
 */
export async function getBookingStats(): Promise<{
  total: number;
  byStatus: Record<string, number>;
  thisMonth: number;
  thisWeek: number;
}> {
  const totalQuery = 'SELECT COUNT(*) as count FROM bookings';
  const totalResult = await pool.query(totalQuery);
  const total = parseInt(totalResult.rows[0].count);

  const statusQuery = `
    SELECT status, COUNT(*) as count
    FROM bookings
    GROUP BY status
  `;
  const statusResult = await pool.query(statusQuery);
  const byStatus: Record<string, number> = {};
  statusResult.rows.forEach(row => {
    byStatus[row.status] = parseInt(row.count);
  });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).toISOString();

  const monthQuery = 'SELECT COUNT(*) as count FROM bookings WHERE created_at >= $1';
  const monthResult = await pool.query(monthQuery, [startOfMonth]);
  const thisMonth = parseInt(monthResult.rows[0].count);

  const weekQuery = 'SELECT COUNT(*) as count FROM bookings WHERE created_at >= $1';
  const weekResult = await pool.query(weekQuery, [startOfWeek]);
  const thisWeek = parseInt(weekResult.rows[0].count);

  return {
    total,
    byStatus,
    thisMonth,
    thisWeek
  };
}
