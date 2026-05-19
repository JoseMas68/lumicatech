import pool from "./db";

export interface ServiceItem {
  id: string;
  name: string;
  description?: string;
  category?: string;
  base_price: number;
  active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface CreateServiceInput {
  name: string;
  description?: string;
  category?: string;
  basePrice: number;
  active?: boolean;
}

export interface UpdateServiceInput extends Partial<CreateServiceInput> {}

function mapService(row: ServiceItem) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    basePrice: Number(row.base_price),
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function makeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function getAllServices(): Promise<ReturnType<typeof mapService>[]> {
  const result = await pool.query("SELECT * FROM services ORDER BY created_at DESC");
  return result.rows.map((r) => mapService(r as ServiceItem));
}

export async function createService(input: CreateServiceInput): Promise<ReturnType<typeof mapService>> {
  const now = new Date().toISOString();
  const result = await pool.query(
    `
      INSERT INTO services (id, name, description, category, base_price, active, created_at, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
    `,
    [
      makeId("service"),
      input.name.trim(),
      input.description?.trim() || null,
      input.category?.trim() || null,
      Math.max(0, Number(input.basePrice || 0)),
      input.active !== false,
      now,
      null,
    ]
  );
  return mapService(result.rows[0] as ServiceItem);
}

export async function updateService(id: string, fields: UpdateServiceInput): Promise<ReturnType<typeof mapService> | null> {
  const current = await pool.query("SELECT * FROM services WHERE id = $1", [id]);
  if (current.rows.length === 0) return null;
  const row = current.rows[0] as ServiceItem;

  const result = await pool.query(
    `
      UPDATE services
      SET name = $1, description = $2, category = $3, base_price = $4, active = $5, updated_at = $6
      WHERE id = $7
      RETURNING *
    `,
    [
      fields.name !== undefined ? fields.name.trim() : row.name,
      fields.description !== undefined ? fields.description?.trim() || null : row.description || null,
      fields.category !== undefined ? fields.category?.trim() || null : row.category || null,
      fields.basePrice !== undefined ? Math.max(0, Number(fields.basePrice)) : Number(row.base_price),
      fields.active !== undefined ? !!fields.active : row.active,
      new Date().toISOString(),
      id,
    ]
  );

  return mapService(result.rows[0] as ServiceItem);
}

export async function deleteService(id: string): Promise<boolean> {
  const result = await pool.query("DELETE FROM services WHERE id = $1", [id]);
  return (result.rowCount || 0) > 0;
}
