import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/src/lib/auth";
import { respondBudgetByToken } from "@/src/lib/budgets-db";
import { sanitizeString } from "@/src/lib/validation";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`budget_response:${clientIp}:${token}`, 15, 60 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Demasiados intentos. Vuelve a intentarlo mas tarde.",
        resetTime: rateLimit.resetTime,
      },
      { status: 429 }
    );
  }

  const body = await request.json();
  const decision = body?.decision;
  if (decision !== "aceptado" && decision !== "rechazado") {
    return NextResponse.json({ error: "decision invalida" }, { status: 400 });
  }

  const notes = body?.notes ? sanitizeString(String(body.notes), 1500) : undefined;
  try {
    const budget = await respondBudgetByToken(token, decision, notes);

    if (!budget) {
      return NextResponse.json({ error: "Presupuesto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      budget: {
        id: budget.id,
        status: budget.status,
        respondedAt: budget.respondedAt,
        responseNotes: budget.responseNotes,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo responder el presupuesto" },
      { status: 409 }
    );
  }
}
