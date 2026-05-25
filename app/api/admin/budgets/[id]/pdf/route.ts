import { NextResponse } from "next/server";
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb, PDFImage } from "pdf-lib";
import { readFileSync } from "fs";
import { requireAuth } from "@/src/lib/auth";
import { getTemplateTheme, DEFAULT_BUDGET_FOOTER } from "@/src/lib/budget-branding";
import { getBudgetById } from "@/src/lib/budgets-db";

const PAGE_W = 595.28;
const PAGE_H = 841.89;

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await context.params;
  const budget = await getBudgetById(id);

  if (!budget) {
    return NextResponse.json({ error: "Presupuesto no encontrado" }, { status: 404 });
  }

  const pdf = await PDFDocument.create();
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const theme = getTemplateTheme(budget.template);
  const accentRgb = hexToRgb(theme.accent);
  const footer = (budget.brandFooter || DEFAULT_BUDGET_FOOTER).split("\n").filter(Boolean);

  // Load logo
  let logo: PDFImage | undefined;
  try {
    const logoBytes = readFileSync("/opt/hermes/projects/lumicatech/public/logo.png");
    logo = await pdf.embedPng(logoBytes);
  } catch {
    // No logo — continue without it
  }

  // ============================================
  // Page 1 — Cover / Header
  // ============================================
  const page1 = pdf.addPage([PAGE_W, PAGE_H]);
  const W = PAGE_W;
  const H = PAGE_H;

  // Background
  page1.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(0.98, 0.985, 0.995) });

  // Top dark bar
  page1.drawRectangle({ x: 0, y: H - 180, width: W, height: 180, color: rgb(0.06, 0.08, 0.14) });
  page1.drawRectangle({ x: 0, y: H - 180, width: W, height: 4, color: accentRgb });

  // Logo
  const logoW = 50;
  const logoH = 50;
  const logoX = 50;
  const logoY = H - 155;
  if (logo) {
    page1.drawImage(logo, { x: logoX, y: logoY, width: logoW, height: logoH });
  }

  // Company name
  page1.drawText("LUMICATECH", {
    x: logoW + 60, y: H - 110,
    size: 18, font: fontBold, color: rgb(1, 1, 1),
  });
  page1.drawText("Industrial Systems", {
    x: logoW + 60, y: H - 130,
    size: 10, font: fontRegular, color: rgb(0.7, 0.75, 0.82),
  });

  // Document title
  page1.drawText("PRESUPUESTO", {
    x: W - 200, y: H - 140,
    size: 28, font: fontBold, color: accentRgb,
  });
  page1.drawText(`#${id.slice(0, 8).toUpperCase()}`, {
    x: W - 200, y: H - 165,
    size: 11, font: fontRegular, color: rgb(0.6, 0.65, 0.72),
  });
  page1.drawText(
    `Fecha: ${new Date(budget.createdAt).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}`,
    { x: W - 200, y: H - 175, size: 9, font: fontRegular, color: rgb(0.5, 0.55, 0.62) }
  );

  if (budget.validUntil) {
    page1.drawText(
      `Válido hasta: ${new Date(budget.validUntil).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}`,
      { x: W - 200, y: H - 190, size: 9, font: fontRegular, color: rgb(0.5, 0.55, 0.62) }
    );
  }

  // Client info box
  const clientBoxY = H - 230;
  page1.drawRectangle({ x: 50, y: clientBoxY - 60, width: 230, height: 70, color: rgb(0.95, 0.96, 0.98), borderColor: rgb(0.88, 0.9, 0.94), borderWidth: 1, borderOpacity: 0.5 });

  page1.drawText("DATOS DEL CLIENTE", { x: 60, y: clientBoxY - 10, size: 8, font: fontBold, color: rgb(0.4, 0.45, 0.52) });
  page1.drawText(budget.clientName, { x: 60, y: clientBoxY - 28, size: 12, font: fontBold, color: rgb(0.1, 0.14, 0.2) });
  if (budget.company) {
    page1.drawText(budget.company, { x: 60, y: clientBoxY - 42, size: 10, font: fontRegular, color: rgb(0.35, 0.4, 0.46) });
  }
  page1.drawText(budget.clientEmail, { x: 60, y: clientBoxY - 54, size: 9, font: fontRegular, color: rgb(0.4, 0.45, 0.52) });

  // Project title
  page1.drawText(budget.title, { x: 50, y: clientBoxY - 95, size: 16, font: fontBold, color: rgb(0.1, 0.14, 0.2) });

  // ============================================
  // Page 2 — Items table + totals
  // ============================================
  const page2 = pdf.addPage([PAGE_W, PAGE_H]);
  page2.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(0.98, 0.985, 0.995) });

  // Top accent bar
  page2.drawRectangle({ x: 0, y: H - 40, width: W, height: 4, color: accentRgb });
  page2.drawRectangle({ x: 0, y: H - 45, width: W, height: 40, color: rgb(0.06, 0.08, 0.14) });
  if (logo) {
    page2.drawImage(logo, { x: 50, y: H - 35, width: 20, height: 20 });
  }
  page2.drawText("LUMICATECH", { x: 78, y: H - 33, size: 11, font: fontBold, color: rgb(1, 1, 1) });

  // Table header
  let y = H - 85;

  page2.drawText("DETALLE DE SERVICIOS", { x: 50, y: y + 10, size: 10, font: fontBold, color: rgb(0.16, 0.2, 0.3) });
  y -= 18;

  // Header bar
  page2.drawRectangle({ x: 50, y: y - 2, width: W - 100, height: 22, color: rgb(0.06, 0.08, 0.14) });

  const colConcept = 55;
  const colDesc = 200;
  const colQty = 340;
  const colPrice = 400;
  const colTotal = 485;

  page2.drawText("CONCEPTO", { x: colConcept, y: y + 3, size: 8, font: fontBold, color: rgb(0.85, 0.9, 0.95) });
  page2.drawText("DESCR.", { x: colDesc, y: y + 3, size: 8, font: fontBold, color: rgb(0.85, 0.9, 0.95) });
  page2.drawText("CANT.", { x: colQty, y: y + 3, size: 8, font: fontBold, color: rgb(0.85, 0.9, 0.95) });
  page2.drawText("P. UNIT.", { x: colPrice, y: y + 3, size: 8, font: fontBold, color: rgb(0.85, 0.9, 0.95) });
  page2.drawText("TOTAL", { x: colTotal, y: y + 3, size: 8, font: fontBold, color: rgb(0.85, 0.9, 0.95) });

  y -= 26;

  // Items
  const items = budget.items || [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const isEven = i % 2 === 0;

    if (isEven) {
      page2.drawRectangle({ x: 50, y: y - 14, width: W - 100, height: 18, color: rgb(0.97, 0.975, 0.985) });
    }

    if (y < 160) {
      // New page for items
      const newPage = pdf.addPage([PAGE_W, PAGE_H]);
      newPage.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(0.98, 0.985, 0.995) });
      newPage.drawRectangle({ x: 0, y: H - 40, width: W, height: 4, color: accentRgb });
      newPage.drawRectangle({ x: 0, y: H - 45, width: W, height: 40, color: rgb(0.06, 0.08, 0.14) });
      if (logo) {
        newPage.drawImage(logo, { x: 50, y: H - 35, width: 20, height: 20 });
      }
      newPage.drawText("LUMICATECH", { x: 78, y: H - 33, size: 11, font: fontBold, color: rgb(1, 1, 1) });
      y = H - 85;
    }

    const conceptText = item.concept.length > 35 ? item.concept.slice(0, 35) + "…" : item.concept;
    page2.drawText(conceptText, { x: colConcept, y, size: 9, font: fontBold, color: rgb(0.15, 0.2, 0.27) });

    if (item.description) {
      page2.drawText(item.description.slice(0, 25), { x: colDesc, y, size: 8, font: fontRegular, color: rgb(0.4, 0.45, 0.52) });
    }

    page2.drawText(String(item.quantity), { x: colQty, y, size: 9, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    page2.drawText(`${item.unitPrice.toFixed(2)}`, { x: colPrice, y, size: 9, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    page2.drawText(`${item.total.toFixed(2)} ${budget.currency}`, { x: colTotal, y, size: 9, font: fontBold, color: rgb(0.1, 0.14, 0.2) });

    y -= 18;
  }

  // Totals box
  y -= 10;
  const totalsBoxX = 340;
  const totalsBoxW = 205;

  page2.drawRectangle({ x: totalsBoxX - 10, y: y - 80, width: totalsBoxW, height: 85, color: rgb(0.95, 0.96, 0.98) });

  drawTotalsRow(page2, fontRegular, "Subtotal", `${budget.subtotal.toFixed(2)} ${budget.currency}`, totalsBoxX, y, false);
  y -= 16;
  drawTotalsRow(page2, fontRegular, `IVA (${budget.taxPercent}%)`, `${budget.taxAmount.toFixed(2)} ${budget.currency}`, totalsBoxX, y, false);
  y -= 16;

  if (budget.discount > 0) {
    drawTotalsRow(page2, fontRegular, "Descuento", `-${budget.discount.toFixed(2)} ${budget.currency}`, totalsBoxX, y, false);
    y -= 16;
  }

  // Final total
  page2.drawRectangle({ x: totalsBoxX - 10, y: y - 2, width: totalsBoxW, height: 24, color: accentRgb });
  page2.drawText("TOTAL", { x: totalsBoxX, y: y + 4, size: 10, font: fontBold, color: rgb(1, 1, 1) });
  page2.drawText(`${budget.finalTotal.toFixed(2)} ${budget.currency}`, { x: totalsBoxX + 110, y: y + 4, size: 12, font: fontBold, color: rgb(1, 1, 1) });

  // Notes
  if (budget.notes) {
    y = H - 130;
    page2.drawRectangle({ x: 50, y: y - 55, width: W - 100, height: 60, color: rgb(0.97, 0.98, 0.99), borderColor: rgb(0.88, 0.9, 0.94), borderWidth: 1, borderOpacity: 1 });

    page2.drawText("NOTAS", { x: 60, y: y - 10, size: 8, font: fontBold, color: rgb(0.4, 0.45, 0.52) });
    const notesText = budget.notes.length > 250 ? budget.notes.slice(0, 250) + "…" : budget.notes;
    page2.drawText(notesText, { x: 60, y: y - 26, size: 9, font: fontRegular, color: rgb(0.3, 0.35, 0.42), maxWidth: W - 120 });
  }

  drawFooter(page2, fontRegular, footer, H, W);

  // ============================================
  // Page 3 — Acceptance / Signature (if not accepted)
  // ============================================
  if (budget.status !== "aceptado") {
    const page3 = pdf.addPage([PAGE_W, PAGE_H]);
    page3.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(0.98, 0.985, 0.995) });

    page3.drawRectangle({ x: 0, y: H - 180, width: W, height: 180, color: rgb(0.06, 0.08, 0.14) });
    page3.drawRectangle({ x: 0, y: H - 180, width: W, height: 4, color: accentRgb });

    if (logo) {
      page3.drawImage(logo, { x: 50, y: H - 150, width: 50, height: 50 });
    }
    page3.drawText("LUMICATECH", { x: 115, y: H - 110, size: 18, font: fontBold, color: rgb(1, 1, 1) });
    page3.drawText("Industrial Systems", { x: 115, y: H - 130, size: 10, font: fontRegular, color: rgb(0.7, 0.75, 0.82) });

    page3.drawText("ACEPTACIÓN", { x: W - 200, y: H - 140, size: 28, font: fontBold, color: accentRgb });

    const acceptY = H - 240;
    page3.drawText("El abajo firmante acepta los términos y condiciones del presente presupuesto.", {
      x: 50, y: acceptY, size: 11, font: fontRegular, color: rgb(0.25, 0.3, 0.36), maxWidth: W - 100,
    });
    page3.drawText(`Presupuesto #${id.slice(0, 8).toUpperCase()}`, { x: 50, y: acceptY - 20, size: 10, font: fontRegular, color: rgb(0.35, 0.4, 0.46) });
    page3.drawText(`Importe total: ${budget.finalTotal.toFixed(2)} ${budget.currency}`, { x: 50, y: acceptY - 38, size: 10, font: fontBold, color: rgb(0.1, 0.14, 0.2) });

    const sigY = H - 420;
    page3.drawLine({ start: { x: 50, y: sigY }, end: { x: 250, y: sigY }, thickness: 1, color: rgb(0.7, 0.75, 0.82) });
    page3.drawText("Firma del cliente", { x: 50, y: sigY - 16, size: 9, font: fontRegular, color: rgb(0.4, 0.45, 0.52) });
    page3.drawText("Nombre:", { x: 50, y: sigY - 32, size: 9, font: fontRegular, color: rgb(0.4, 0.45, 0.52) });

    page3.drawLine({ start: { x: 320, y: sigY }, end: { x: 545, y: sigY }, thickness: 1, color: rgb(0.7, 0.75, 0.82) });
    page3.drawText("Fecha y sello", { x: 320, y: sigY - 16, size: 9, font: fontRegular, color: rgb(0.4, 0.45, 0.52) });

    drawFooter(page3, fontRegular, footer, H, W);
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

function drawTotalsRow(page: PDFPage, font: PDFFont, label: string, value: string, x: number, y: number, _bold = false) {
  page.drawText(label, { x, y, size: 9, font, color: rgb(0.35, 0.4, 0.46) });
  page.drawText(value, { x: x + 110, y, size: 9, font, color: rgb(0.1, 0.14, 0.2) });
}

function drawFooter(page: PDFPage, font: PDFFont, footerLines: string[], H: number, W: number) {
  let footerY = 65;
  page.drawLine({ start: { x: 50, y: footerY + 20 }, end: { x: W - 50, y: footerY + 20 }, thickness: 0.5, color: rgb(0.86, 0.9, 0.94) });

  for (const line of footerLines) {
    page.drawText(line, { x: 50, y: footerY, size: 7.5, font, color: rgb(0.45, 0.5, 0.56) });
    footerY -= 11;
  }

  page.drawText("LumicaTech Industrial Systems", { x: W / 2 - 60, y: 30, size: 7, font, color: rgb(0.55, 0.6, 0.66) });
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = Number.parseInt(clean, 16);
  return rgb(((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255);
}
