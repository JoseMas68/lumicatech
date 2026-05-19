import pool from "./db";
import { DEFAULT_BUDGET_FOOTER, DEFAULT_BUDGET_TEMPLATE, type BudgetTemplateId } from "./budget-branding";

export type BudgetStatus = "borrador" | "enviado" | "aceptado" | "rechazado" | "vencido";

export interface BudgetItem {
  id: string;
  concept: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Budget {
  id: string;
  token: string;
  booking_id?: string;
  client_name: string;
  client_email: string;
  company?: string;
  title: string;
  notes?: string;
  currency: string;
  tax_percent: number;
  discount: number;
  subtotal: number;
  tax_amount: number;
  final_total: number;
  items: BudgetItem[];
  status: BudgetStatus;
  valid_until?: string;
  created_at: string;
  updated_at?: string;
  last_sent_at?: string;
  responded_at?: string;
  response_notes?: string;
  template: BudgetTemplateId;
  brand_footer?: string;
}

export interface CreateBudgetInput {
  bookingId?: string;
  clientName: string;
  clientEmail: string;
  company?: string;
  title: string;
  notes?: string;
  currency: string;
  taxPercent: number;
  discount: number;
  items: Array<Partial<BudgetItem>>;
  validUntil?: string;
  template?: BudgetTemplateId;
  brandFooter?: string;
}

export interface UpdateBudgetInput {
  clientName?: string;
  clientEmail?: string;
  company?: string;
  title?: string;
  notes?: string;
  currency?: string;
  taxPercent?: number;
  discount?: number;
  items?: Array<Partial<BudgetItem>>;
  validUntil?: string;
  template?: BudgetTemplateId;
  brandFooter?: string;
}

const ALLOWED_CURRENCIES = ["EUR", "USD", "GBP", "CHF"];

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function toMoney(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function normalizeCurrency(currency?: string): string {
  const value = String(currency || "EUR").toUpperCase();
  return ALLOWED_CURRENCIES.includes(value) ? value : "EUR";
}

function normalizeItems(items: Array<Partial<BudgetItem>>): BudgetItem[] {
  return items
    .filter((item) => !!item.concept)
    .map((item) => {
      const quantity = Math.max(0, Number(item.quantity || 0));
      const unitPrice = Math.max(0, Number(item.unitPrice || 0));
      return {
        id: item.id || generateId("item"),
        concept: String(item.concept).trim(),
        description: item.description?.trim() || undefined,
        quantity,
        unitPrice,
        total: toMoney(quantity * unitPrice),
      };
    });
}

function calculateTotals(items: BudgetItem[], taxPercent: number, discount: number) {
  const subtotal = toMoney(items.reduce((acc, item) => acc + item.total, 0));
  const safeDiscount = Math.min(Math.max(0, discount), subtotal);
  const base = Math.max(0, subtotal - safeDiscount);
  const taxAmount = toMoney(base * Math.max(0, taxPercent) / 100);
  const finalTotal = toMoney(base + taxAmount);
  return { subtotal, taxAmount, finalTotal, discount: safeDiscount };
}

function rowToApi(budget: Budget) {
  return {
    id: budget.id,
    token: budget.token,
    bookingId: budget.booking_id,
    clientName: budget.client_name,
    clientEmail: budget.client_email,
    company: budget.company,
    title: budget.title,
    notes: budget.notes,
    currency: budget.currency,
    taxPercent: Number(budget.tax_percent),
    discount: Number(budget.discount),
    subtotal: Number(budget.subtotal),
    taxAmount: Number(budget.tax_amount),
    finalTotal: Number(budget.final_total),
    items: budget.items,
    status: budget.status,
    validUntil: budget.valid_until,
    createdAt: budget.created_at,
    updatedAt: budget.updated_at,
    lastSentAt: budget.last_sent_at,
    respondedAt: budget.responded_at,
    responseNotes: budget.response_notes,
    template: budget.template || DEFAULT_BUDGET_TEMPLATE,
    brandFooter: budget.brand_footer || DEFAULT_BUDGET_FOOTER,
  };
}

export async function getAllBudgets(): Promise<ReturnType<typeof rowToApi>[]> {
  const result = await pool.query("SELECT * FROM budgets ORDER BY created_at DESC");
  return result.rows.map((row) => rowToApi(row as Budget));
}

export async function getBudgetById(id: string): Promise<ReturnType<typeof rowToApi> | null> {
  const result = await pool.query("SELECT * FROM budgets WHERE id = $1", [id]);
  if (result.rows.length === 0) return null;
  return rowToApi(result.rows[0] as Budget);
}

export async function getBudgetByToken(token: string): Promise<ReturnType<typeof rowToApi> | null> {
  const result = await pool.query("SELECT * FROM budgets WHERE token = $1", [token]);
  if (result.rows.length === 0) return null;
  return rowToApi(result.rows[0] as Budget);
}

export async function createBudget(input: CreateBudgetInput): Promise<ReturnType<typeof rowToApi>> {
  const items = normalizeItems(input.items);
  if (items.length === 0) {
    throw new Error("El presupuesto debe contener al menos un item valido");
  }

  const taxPercent = Math.max(0, Number(input.taxPercent || 0));
  const discount = Math.max(0, Number(input.discount || 0));
  const totals = calculateTotals(items, taxPercent, discount);
  const id = generateId("budget");
  const token = generateId("budgettok");
  const now = new Date().toISOString();

  const result = await pool.query(
    `
      INSERT INTO budgets (
        id, token, booking_id, client_name, client_email, company, title, notes,
        currency, tax_percent, discount, subtotal, tax_amount, final_total,
        items, status, valid_until, template, brand_footer, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14,
        $15::jsonb, $16, $17, $18, $19, $20, $21
      )
      RETURNING *
    `,
    [
      id,
      token,
      input.bookingId || null,
      input.clientName.trim(),
      input.clientEmail.trim().toLowerCase(),
      input.company?.trim() || null,
      input.title.trim(),
      input.notes?.trim() || null,
      normalizeCurrency(input.currency),
      taxPercent,
      totals.discount,
      totals.subtotal,
      totals.taxAmount,
      totals.finalTotal,
      JSON.stringify(items),
      "borrador",
      input.validUntil || null,
      input.template || DEFAULT_BUDGET_TEMPLATE,
      input.brandFooter?.trim() || DEFAULT_BUDGET_FOOTER,
      now,
      null,
    ]
  );

  return rowToApi(result.rows[0] as Budget);
}

export async function updateBudget(id: string, fields: UpdateBudgetInput): Promise<ReturnType<typeof rowToApi> | null> {
  const currentResult = await pool.query("SELECT * FROM budgets WHERE id = $1", [id]);
  if (currentResult.rows.length === 0) return null;

  const current = rowToApi(currentResult.rows[0] as Budget);
  const mergedItems = fields.items ? normalizeItems(fields.items) : current.items;
  if (mergedItems.length === 0) {
    throw new Error("El presupuesto debe contener al menos un item valido");
  }

  const taxPercent = fields.taxPercent !== undefined ? Math.max(0, Number(fields.taxPercent)) : current.taxPercent;
  const discount = fields.discount !== undefined ? Math.max(0, Number(fields.discount)) : current.discount;
  const totals = calculateTotals(mergedItems, taxPercent, discount);

  const result = await pool.query(
    `
      UPDATE budgets
      SET
        client_name = $1,
        client_email = $2,
        company = $3,
        title = $4,
        notes = $5,
        currency = $6,
        tax_percent = $7,
        discount = $8,
        subtotal = $9,
        tax_amount = $10,
        final_total = $11,
        items = $12::jsonb,
        valid_until = $13,
        template = $14,
        brand_footer = $15,
        updated_at = $16
      WHERE id = $17
      RETURNING *
    `,
    [
      fields.clientName !== undefined ? fields.clientName.trim() : current.clientName,
      fields.clientEmail !== undefined ? fields.clientEmail.trim().toLowerCase() : current.clientEmail,
      fields.company !== undefined ? fields.company?.trim() || null : current.company || null,
      fields.title !== undefined ? fields.title.trim() : current.title,
      fields.notes !== undefined ? fields.notes?.trim() || null : current.notes || null,
      normalizeCurrency(fields.currency !== undefined ? fields.currency : current.currency),
      taxPercent,
      totals.discount,
      totals.subtotal,
      totals.taxAmount,
      totals.finalTotal,
      JSON.stringify(mergedItems),
      fields.validUntil !== undefined ? fields.validUntil || null : current.validUntil || null,
      fields.template !== undefined ? fields.template : current.template,
      fields.brandFooter !== undefined ? fields.brandFooter?.trim() || DEFAULT_BUDGET_FOOTER : current.brandFooter || DEFAULT_BUDGET_FOOTER,
      new Date().toISOString(),
      id,
    ]
  );

  return rowToApi(result.rows[0] as Budget);
}

export async function setBudgetStatus(id: string, status: BudgetStatus): Promise<ReturnType<typeof rowToApi> | null> {
  const now = new Date().toISOString();
  const result = await pool.query(
    `
      UPDATE budgets
      SET
        status = $1,
        last_sent_at = CASE WHEN $1 = 'enviado' THEN $2 ELSE last_sent_at END,
        updated_at = $2
      WHERE id = $3
      RETURNING *
    `,
    [status, now, id]
  );

  if (result.rows.length === 0) return null;
  return rowToApi(result.rows[0] as Budget);
}

export async function deleteBudget(id: string): Promise<boolean> {
  const result = await pool.query("DELETE FROM budgets WHERE id = $1", [id]);
  return (result.rowCount || 0) > 0;
}

export async function duplicateBudget(id: string): Promise<ReturnType<typeof rowToApi> | null> {
  const source = await getBudgetById(id);
  if (!source) return null;

  return createBudget({
    bookingId: source.bookingId,
    clientName: source.clientName,
    clientEmail: source.clientEmail,
    company: source.company,
    title: `${source.title} (copia)`,
    notes: source.notes,
    currency: source.currency,
    taxPercent: source.taxPercent,
    discount: source.discount,
    items: source.items,
    validUntil: source.validUntil,
    template: source.template,
    brandFooter: source.brandFooter,
  });
}

export async function respondBudgetByToken(
  token: string,
  decision: "aceptado" | "rechazado",
  notes?: string
): Promise<ReturnType<typeof rowToApi> | null> {
  const current = await getBudgetByToken(token);
  if (!current) return null;
  if (current.respondedAt) throw new Error("Presupuesto ya respondido");
  if (current.status !== "enviado") throw new Error("El presupuesto no esta pendiente de respuesta");
  if (current.validUntil && new Date(current.validUntil).getTime() < Date.now()) {
    throw new Error("El presupuesto ha vencido");
  }

  const now = new Date().toISOString();
  const result = await pool.query(
    `
      UPDATE budgets
      SET status = $1, responded_at = $2, response_notes = $3, updated_at = $2
      WHERE token = $4
      RETURNING *
    `,
    [decision, now, notes?.trim() || null, token]
  );

  if (result.rows.length === 0) return null;
  return rowToApi(result.rows[0] as Budget);
}
