import pool from "./db";

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  tax_id?: string;
  address?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateClientInput {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  taxId?: string;
  address?: string;
  notes?: string;
}

export interface UpdateClientInput extends Partial<CreateClientInput> {}

function mapClient(row: Client) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    phone: row.phone,
    taxId: row.tax_id,
    address: row.address,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function makeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function getAllClients(): Promise<ReturnType<typeof mapClient>[]> {
  const result = await pool.query("SELECT * FROM clients ORDER BY created_at DESC");
  return result.rows.map((r) => mapClient(r as Client));
}

export async function createClient(input: CreateClientInput): Promise<ReturnType<typeof mapClient>> {
  const now = new Date().toISOString();
  const result = await pool.query(
    `
      INSERT INTO clients (id, name, email, company, phone, tax_id, address, notes, created_at, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `,
    [
      makeId("client"),
      input.name.trim(),
      input.email.trim().toLowerCase(),
      input.company?.trim() || null,
      input.phone?.trim() || null,
      input.taxId?.trim() || null,
      input.address?.trim() || null,
      input.notes?.trim() || null,
      now,
      null,
    ]
  );
  return mapClient(result.rows[0] as Client);
}

export async function updateClient(id: string, fields: UpdateClientInput): Promise<ReturnType<typeof mapClient> | null> {
  const current = await pool.query("SELECT * FROM clients WHERE id = $1", [id]);
  if (current.rows.length === 0) return null;
  const row = current.rows[0] as Client;

  const result = await pool.query(
    `
      UPDATE clients
      SET name = $1, email = $2, company = $3, phone = $4, tax_id = $5, address = $6, notes = $7, updated_at = $8
      WHERE id = $9
      RETURNING *
    `,
    [
      fields.name !== undefined ? fields.name.trim() : row.name,
      fields.email !== undefined ? fields.email.trim().toLowerCase() : row.email,
      fields.company !== undefined ? fields.company?.trim() || null : row.company || null,
      fields.phone !== undefined ? fields.phone?.trim() || null : row.phone || null,
      fields.taxId !== undefined ? fields.taxId?.trim() || null : row.tax_id || null,
      fields.address !== undefined ? fields.address?.trim() || null : row.address || null,
      fields.notes !== undefined ? fields.notes?.trim() || null : row.notes || null,
      new Date().toISOString(),
      id,
    ]
  );

  return mapClient(result.rows[0] as Client);
}

export async function deleteClient(id: string): Promise<boolean> {
  const result = await pool.query("DELETE FROM clients WHERE id = $1", [id]);
  return (result.rowCount || 0) > 0;
}
