import { NextRequest, NextResponse } from "next/server";
import { getBudgetByToken } from "@/src/lib/budgets-db";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;
  const budget = await getBudgetByToken(token);

  if (!budget) {
    return NextResponse.json({ error: "Presupuesto no encontrado" }, { status: 404 });
  }

  return NextResponse.json({
    budget: {
      id: budget.id,
      token: budget.token,
      clientName: budget.clientName,
      clientEmail: budget.clientEmail,
      company: budget.company,
      title: budget.title,
      notes: budget.notes,
      currency: budget.currency,
      taxPercent: budget.taxPercent,
      discount: budget.discount,
      subtotal: budget.subtotal,
      taxAmount: budget.taxAmount,
      finalTotal: budget.finalTotal,
      items: budget.items,
      status: budget.status,
      validUntil: budget.validUntil,
      createdAt: budget.createdAt,
      respondedAt: budget.respondedAt,
      responseNotes: budget.responseNotes,
    },
  });
}
