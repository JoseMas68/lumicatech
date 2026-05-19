import { NextResponse } from "next/server";
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { requireAuth } from "@/src/lib/auth";
import { getTemplateTheme, DEFAULT_BUDGET_FOOTER } from "@/src/lib/budget-branding";
import { getBudgetById } from "@/src/lib/budgets-db";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await context.params;
  const budget = await getBudgetById(id);

  if (!budget) {
    return NextResponse.json({ error: "Presupuesto no encontrado" }, { status: 404 });
  }

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const width = page.getWidth();
  const height = page.getHeight();

  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const theme = getTemplateTheme(budget.template);
  const footer = (budget.brandFooter || DEFAULT_BUDGET_FOOTER).split("\n").filter(Boolean);

  page.drawRectangle({
    x: 0,
    y: height - 145,
    width,
    height: 145,
    color: rgb(0.07, 0.1, 0.18),
  });

  page.drawRectangle({
    x: 0,
    y: height - 150,
    width,
    height: 5,
    color: hexToRgb(theme.accent),
  });

  page.drawText("LUMICATECH", {
    x: 40,
    y: height - 48,
    size: 11,
    font: fontBold,
    color: rgb(0.67, 0.91, 0.98),
  });

  page.drawText(budget.title, {
    x: 40,
    y: height - 78,
    size: 20,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText(`Cliente: ${budget.clientName}`, {
    x: 40,
    y: height - 102,
    size: 10,
    font: fontRegular,
    color: rgb(0.88, 0.91, 0.96),
  });

  page.drawText(`Email: ${budget.clientEmail}`, {
    x: 40,
    y: height - 118,
    size: 10,
    font: fontRegular,
    color: rgb(0.88, 0.91, 0.96),
  });

  let cursorY = height - 185;

  page.drawText("Detalle de servicios", {
    x: 40,
    y: cursorY,
    size: 12,
    font: fontBold,
    color: rgb(0.16, 0.2, 0.3),
  });

  cursorY -= 26;

  page.drawRectangle({ x: 40, y: cursorY - 2, width: width - 80, height: 20, color: rgb(0.95, 0.97, 0.99) });
  page.drawText("Concepto", { x: 45, y: cursorY + 4, size: 9, font: fontBold, color: rgb(0.23, 0.29, 0.36) });
  page.drawText("Cant.", { x: 335, y: cursorY + 4, size: 9, font: fontBold, color: rgb(0.23, 0.29, 0.36) });
  page.drawText("Precio", { x: 400, y: cursorY + 4, size: 9, font: fontBold, color: rgb(0.23, 0.29, 0.36) });
  page.drawText("Total", { x: 486, y: cursorY + 4, size: 9, font: fontBold, color: rgb(0.23, 0.29, 0.36) });

  cursorY -= 22;

  for (const item of budget.items) {
    if (cursorY < 140) break;

    page.drawText(item.concept.slice(0, 48), {
      x: 45,
      y: cursorY,
      size: 9,
      font: fontRegular,
      color: rgb(0.15, 0.2, 0.27),
    });
    page.drawText(String(item.quantity), { x: 338, y: cursorY, size: 9, font: fontRegular, color: rgb(0.15, 0.2, 0.27) });
    page.drawText(`${item.unitPrice.toFixed(2)} ${budget.currency}`, { x: 398, y: cursorY, size: 9, font: fontRegular, color: rgb(0.15, 0.2, 0.27) });
    page.drawText(`${item.total.toFixed(2)} ${budget.currency}`, { x: 480, y: cursorY, size: 9, font: fontBold, color: rgb(0.1, 0.14, 0.2) });

    cursorY -= 18;
  }

  const totalsX = 360;
  cursorY -= 12;

  drawSummaryLine(page, fontRegular, "Subtotal", `${budget.subtotal.toFixed(2)} ${budget.currency}`, totalsX, cursorY);
  cursorY -= 15;
  drawSummaryLine(page, fontRegular, `Impuestos (${budget.taxPercent}%)`, `${budget.taxAmount.toFixed(2)} ${budget.currency}`, totalsX, cursorY);
  cursorY -= 15;
  drawSummaryLine(page, fontRegular, "Descuento", `${budget.discount.toFixed(2)} ${budget.currency}`, totalsX, cursorY);
  cursorY -= 18;
  drawSummaryLine(page, fontBold, "Total final", `${budget.finalTotal.toFixed(2)} ${budget.currency}`, totalsX, cursorY, true);

  if (budget.notes) {
    const notesY = Math.max(cursorY - 52, 145);
    page.drawText("Notas del proyecto", { x: 40, y: notesY + 24, size: 10, font: fontBold, color: rgb(0.16, 0.2, 0.3) });
    page.drawText(budget.notes.slice(0, 300), { x: 40, y: notesY + 8, size: 9, font: fontRegular, color: rgb(0.28, 0.34, 0.4), maxWidth: 300 });
  }

  let footerY = 75;
  page.drawLine({ start: { x: 40, y: footerY + 28 }, end: { x: width - 40, y: footerY + 28 }, thickness: 1, color: rgb(0.86, 0.9, 0.94) });

  for (const line of footer) {
    page.drawText(line, {
      x: 40,
      y: footerY,
      size: 8.2,
      font: fontRegular,
      color: rgb(0.39, 0.45, 0.53),
    });
    footerY -= 12;
  }

  const pdfBytes = await pdf.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="presupuesto-${id}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}

function drawSummaryLine(
  page: PDFPage,
  font: PDFFont,
  label: string,
  value: string,
  x: number,
  y: number,
  strong = false
) {
  page.drawText(label, {
    x,
    y,
    size: strong ? 10 : 9,
    font,
    color: rgb(0.21, 0.27, 0.35),
  });
  page.drawText(value, {
    x: x + 110,
    y,
    size: strong ? 10 : 9,
    font,
    color: rgb(0.09, 0.12, 0.18),
  });
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = Number.parseInt(clean, 16);
  return rgb(((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255);
}
