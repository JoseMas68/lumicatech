import { NextRequest, NextResponse } from "next/server";
import {
  BudgetStatus,
  createBudget,
  deleteBudget,
  duplicateBudget,
  getAllBudgets,
  setBudgetStatus,
  updateBudget,
} from "@/src/lib/budgets-db";
import { requireAuth } from "@/src/lib/auth";
import { BUDGET_TEMPLATES, DEFAULT_BUDGET_FOOTER, DEFAULT_BUDGET_TEMPLATE, type BudgetTemplateId } from "@/src/lib/budget-branding";
import { isValidDate, isValidEmail, sanitizeString } from "@/src/lib/validation";

const ALLOWED_STATUSES: BudgetStatus[] = ["borrador", "enviado", "aceptado", "rechazado", "vencido"];
const ALLOWED_CURRENCIES = ["EUR", "USD", "GBP", "CHF"];
const ALLOWED_TEMPLATES = BUDGET_TEMPLATES.map((item) => item.id);

function normalizeBrandFooter(value: unknown): string {
  if (typeof value !== "string") return DEFAULT_BUDGET_FOOTER;
  return value.replace(/\0/g, "").trim().slice(0, 1000) || DEFAULT_BUDGET_FOOTER;
}

function parseStatus(value: string | null): BudgetStatus | null {
  if (!value) return null;
  return ALLOWED_STATUSES.includes(value as BudgetStatus) ? (value as BudgetStatus) : null;
}

function validateCreatePayload(body: any): string[] {
  const errors: string[] = [];
  if (!body?.clientName || String(body.clientName).trim().length < 2) {
    errors.push("clientName es obligatorio");
  }
  if (!body?.clientEmail || !isValidEmail(String(body.clientEmail))) {
    errors.push("clientEmail invalido");
  }
  if (!body?.title || String(body.title).trim().length < 3) {
    errors.push("title es obligatorio");
  }
  if (!Array.isArray(body?.items) || body.items.length === 0) {
    errors.push("items debe contener al menos un concepto");
  }
  if (body?.currency && !ALLOWED_CURRENCIES.includes(String(body.currency).toUpperCase())) {
    errors.push(`currency debe ser una de: ${ALLOWED_CURRENCIES.join(", ")}`);
  }
  if (body?.validUntil && !isValidDate(String(body.validUntil))) {
    errors.push("validUntil debe ser una fecha futura valida (YYYY-MM-DD)");
  }
  if (body?.template && !ALLOWED_TEMPLATES.includes(String(body.template) as BudgetTemplateId)) {
    errors.push(`template debe ser una de: ${ALLOWED_TEMPLATES.join(", ")}`);
  }
  return errors;
}

export async function GET(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const status = parseStatus(searchParams.get("status"));
  const q = (searchParams.get("q") || "").toLowerCase().trim();

  let budgets = await getAllBudgets();
  if (status) budgets = budgets.filter((budget) => budget.status === status);
  if (q) {
    budgets = budgets.filter((budget) => {
      const haystack = [budget.clientName, budget.clientEmail, budget.company || "", budget.title]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  budgets.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json({ budgets });
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const errors = validateCreatePayload(body);
  if (errors.length > 0) {
    return NextResponse.json({ error: "Datos invalidos", details: errors }, { status: 400 });
  }

  try {
    const budget = await createBudget({
      bookingId: body.bookingId ? sanitizeString(String(body.bookingId), 60) : undefined,
      clientName: sanitizeString(String(body.clientName), 120),
      clientEmail: String(body.clientEmail).trim().toLowerCase(),
      company: body.company ? sanitizeString(String(body.company), 120) : undefined,
      title: sanitizeString(String(body.title), 200),
      notes: body.notes ? sanitizeString(String(body.notes), 4000) : undefined,
      currency: body.currency ? String(body.currency).toUpperCase() : "EUR",
      taxPercent: Number(body.taxPercent || 0),
      discount: Number(body.discount || 0),
      items: body.items,
      validUntil: body.validUntil ? String(body.validUntil) : undefined,
      template: body.template && ALLOWED_TEMPLATES.includes(String(body.template) as BudgetTemplateId)
        ? (String(body.template) as BudgetTemplateId)
        : DEFAULT_BUDGET_TEMPLATE,
      brandFooter: normalizeBrandFooter(body.brandFooter),
    });

    return NextResponse.json({ budget }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error creando presupuesto" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const id = body?.id ? String(body.id) : "";
  if (!id) {
    return NextResponse.json({ error: "id es obligatorio" }, { status: 400 });
  }

  if (body.clientEmail !== undefined && !isValidEmail(String(body.clientEmail))) {
    return NextResponse.json({ error: "clientEmail invalido" }, { status: 400 });
  }
  if (body.currency !== undefined && !ALLOWED_CURRENCIES.includes(String(body.currency).toUpperCase())) {
    return NextResponse.json({ error: `currency debe ser una de: ${ALLOWED_CURRENCIES.join(", ")}` }, { status: 400 });
  }
  if (body.validUntil !== undefined && body.validUntil !== null && body.validUntil !== "" && !isValidDate(String(body.validUntil))) {
    return NextResponse.json({ error: "validUntil debe ser una fecha futura valida (YYYY-MM-DD)" }, { status: 400 });
  }
  if (body.template !== undefined && !ALLOWED_TEMPLATES.includes(String(body.template) as BudgetTemplateId)) {
    return NextResponse.json({ error: `template debe ser una de: ${ALLOWED_TEMPLATES.join(", ")}` }, { status: 400 });
  }

  if (body.action === "duplicate") {
    const duplicated = await duplicateBudget(id);
    if (!duplicated) return NextResponse.json({ error: "Presupuesto no encontrado" }, { status: 404 });
    return NextResponse.json({ budget: duplicated });
  }

  if (body.action === "status") {
    const status = parseStatus(body.status ? String(body.status) : null);
    if (!status) return NextResponse.json({ error: "status invalido" }, { status: 400 });
    const budget = await setBudgetStatus(id, status);
    if (!budget) return NextResponse.json({ error: "Presupuesto no encontrado" }, { status: 404 });
    return NextResponse.json({ budget });
  }

  try {
    const budget = await updateBudget(id, {
      clientName: body.clientName !== undefined ? sanitizeString(String(body.clientName), 120) : undefined,
      clientEmail: body.clientEmail !== undefined ? String(body.clientEmail).trim().toLowerCase() : undefined,
      company: body.company !== undefined ? sanitizeString(String(body.company), 120) : undefined,
      title: body.title !== undefined ? sanitizeString(String(body.title), 200) : undefined,
      notes: body.notes !== undefined ? sanitizeString(String(body.notes), 4000) : undefined,
      currency: body.currency !== undefined ? String(body.currency).toUpperCase() : undefined,
      taxPercent: body.taxPercent !== undefined ? Number(body.taxPercent) : undefined,
      discount: body.discount !== undefined ? Number(body.discount) : undefined,
      items: Array.isArray(body.items) ? body.items : undefined,
      validUntil: body.validUntil !== undefined ? String(body.validUntil) : undefined,
      template: body.template !== undefined ? (String(body.template) as BudgetTemplateId) : undefined,
      brandFooter: body.brandFooter !== undefined ? normalizeBrandFooter(body.brandFooter) : undefined,
    });

    if (!budget) return NextResponse.json({ error: "Presupuesto no encontrado" }, { status: 404 });
    return NextResponse.json({ budget });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error actualizando presupuesto" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const id = body?.id ? String(body.id) : "";
  if (!id) {
    return NextResponse.json({ error: "id es obligatorio" }, { status: 400 });
  }

  const deleted = await deleteBudget(id);
  if (!deleted) return NextResponse.json({ error: "Presupuesto no encontrado" }, { status: 404 });
  return NextResponse.json({ success: true });
}
