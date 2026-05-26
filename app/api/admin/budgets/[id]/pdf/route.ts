import { NextResponse } from "next/server";
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb, PDFImage } from "pdf-lib";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { requireAuth } from "@/src/lib/auth";
import { getTemplateTheme, DEFAULT_BUDGET_FOOTER, type BudgetTemplateTheme } from "@/src/lib/budget-branding";
import { getBudgetById } from "@/src/lib/budgets-db";

// Page dimensions (A4)
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 55;
const MARGIN_Y = 50;
const CONTENT_W = PAGE_W - MARGIN_X * 2; // 485.28

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
  const footer = (budget.brandFooter || DEFAULT_BUDGET_FOOTER).split("\n").filter(Boolean);

  // Load logo - dynamic path
  let logo: PDFImage | undefined;
  try {
    const logoPath = join(process.cwd(), "public", "logo.png");
    if (existsSync(logoPath)) {
      const logoBytes = readFileSync(logoPath);
      logo = await pdf.embedPng(logoBytes);
    }
  } catch {
    // No logo — continue without it
  }

  const currencySymbol = budget.currency === "EUR" ? "€" : budget.currency === "USD" ? "$" : budget.currency === "GBP" ? "£" : budget.currency;
  const docDate = new Date(budget.createdAt).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
  const docId = id.slice(0, 8).toUpperCase();

  // ================================================================
  // PAGE 1 — Main budget page
  // ================================================================
  const page1 = pdf.addPage([PAGE_W, PAGE_H]);

  // White background
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_W,
    height: PAGE_H,
    color: rgb(1, 1, 1),
  });

  // --- TOP ACCENT BAR ---
  page1.drawRectangle({
    x: 0,
    y: PAGE_H - 6,
    width: PAGE_W,
    height: 6,
    color: rgb(...theme.primaryRgb),
  });

  // --- HEADER SECTION ---
  let currentY = PAGE_H - MARGIN_Y - 10;

  // Logo and company info
  const logoSize = 42;
  if (logo) {
    page1.drawImage(logo, {
      x: MARGIN_X,
      y: currentY - logoSize + 4,
      width: logoSize,
      height: logoSize,
    });
  }

  // Company name
  page1.drawText("LUMICATECH", {
    x: logo ? MARGIN_X + logoSize + 12 : MARGIN_X,
    y: currentY - 8,
    size: 18,
    font: fontBold,
    color: rgb(...theme.textRgb),
  });

  page1.drawText("Industrial Systems", {
    x: logo ? MARGIN_X + logoSize + 12 : MARGIN_X,
    y: currentY - 24,
    size: 10,
    font: fontRegular,
    color: rgb(...theme.mutedRgb),
  });

  // Document info top-right
  const rightX = PAGE_W - MARGIN_X;
  page1.drawText("PRESUPUESTO", {
    x: rightX - 80,
    y: currentY - 6,
    size: 14,
    font: fontBold,
    color: rgb(...theme.primaryRgb),
  });
  page1.drawText(`#${docId}`, {
    x: rightX - 80,
    y: currentY - 22,
    size: 9,
    font: fontRegular,
    color: rgb(...theme.mutedRgb),
  });
  page1.drawText(docDate, {
    x: rightX - 80,
    y: currentY - 34,
    size: 8,
    font: fontRegular,
    color: rgb(...theme.mutedRgb),
  });

  currentY -= 60;

  // --- SECTION DIVIDER ---
  page1.drawLine({
    start: { x: MARGIN_X, y: currentY },
    end: { x: PAGE_W - MARGIN_X, y: currentY },
    thickness: 1,
    color: rgb(...theme.borderRgb),
  });
  currentY -= 25;

  // --- CLIENT INFO SECTION ---
  page1.drawText("DATOS DEL CLIENTE", {
    x: MARGIN_X,
    y: currentY,
    size: 9,
    font: fontBold,
    color: rgb(...theme.mutedRgb),
  });
  currentY -= 15;

  // Client details with better spacing
  page1.drawText(budget.clientName, {
    x: MARGIN_X,
    y: currentY,
    size: 14,
    font: fontBold,
    color: rgb(...theme.textRgb),
  });
  currentY -= 18;

  if (budget.company) {
    page1.drawText(budget.company, {
      x: MARGIN_X,
      y: currentY,
      size: 10,
      font: fontRegular,
      color: rgb(...theme.mutedRgb),
    });
    currentY -= 14;
  }

  page1.drawText(budget.clientEmail, {
    x: MARGIN_X,
    y: currentY,
    size: 9,
    font: fontRegular,
    color: rgb(...theme.mutedRgb),
  });
  currentY -= 25;

  // --- PROJECT TITLE ---
  page1.drawText("CONCEPTO", {
    x: MARGIN_X,
    y: currentY,
    size: 9,
    font: fontBold,
    color: rgb(...theme.mutedRgb),
  });
  currentY -= 15;

  // Wrap long titles
  const maxTitleWidth = CONTENT_W - 80;
  const titleLines = wrapText(budget.title, fontBold, 14, maxTitleWidth, page1);
  titleLines.forEach((line, i) => {
    page1.drawText(line, {
      x: MARGIN_X,
      y: currentY - i * 18,
      size: 14,
      font: fontBold,
      color: rgb(...theme.textRgb),
    });
  });
  currentY -= titleLines.length * 18 + 10;

  // Validity date
  if (budget.validUntil) {
    const validDate = new Date(budget.validUntil).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
    page1.drawText(`Válido hasta: ${validDate}`, {
      x: MARGIN_X,
      y: currentY,
      size: 9,
      font: fontRegular,
      color: rgb(...theme.mutedRgb),
    });
    currentY -= 20;
  } else {
    currentY -= 10;
  }

  // --- ITEMS TABLE ---
  currentY -= 10;
  const items = budget.items || [];

  // Table header background
  page1.drawRectangle({
    x: MARGIN_X,
    y: currentY - 24,
    width: CONTENT_W,
    height: 24,
    color: rgb(...theme.darkRgb),
  });

  // Table header text
  const headerRowY = currentY - 8;
  const colX: Record<string, number> = {
    concept: MARGIN_X + 8,
    desc: MARGIN_X + 200,
    qty: MARGIN_X + 380,
    price: MARGIN_X + 430,
    total: MARGIN_X + 490,
  };

  page1.drawText("CONCEPTO", { x: colX.concept, y: headerRowY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  page1.drawText("DESCRIPCIÓN", { x: colX.desc, y: headerRowY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  page1.drawText("CANT.", { x: colX.qty, y: headerRowY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  page1.drawText("P. UNIT.", { x: colX.price, y: headerRowY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  page1.drawText("TOTAL", { x: colX.total - 30, y: headerRowY, size: 8, font: fontBold, color: rgb(1, 1, 1) });

  currentY -= 24;

  // Table items
  const rowHeight = 20;
  const footerReserved = 80;

  for (let i = 0; i < items.length; i++) {
    if (currentY - rowHeight < footerReserved + rowHeight) {
      // Need new page
      break;
    }

    const item = items[i];

    // Alternating row background
    if (i % 2 === 0) {
      page1.drawRectangle({
        x: MARGIN_X,
        y: currentY - rowHeight,
        width: CONTENT_W,
        height: rowHeight,
        color: rgb(...theme.surfaceRgb),
      });
    }

    // Left accent bar
    page1.drawRectangle({
      x: MARGIN_X,
      y: currentY - rowHeight,
      width: 3,
      height: rowHeight,
      color: rgb(...theme.primaryRgb),
    });

    const rowY = currentY - 6;

    // Concept
    page1.drawText(truncateText(item.concept, 28), {
      x: colX.concept,
      y: rowY,
      size: 9,
      font: fontBold,
      color: rgb(...theme.textRgb),
    });

    // Description
    if (item.description) {
      page1.drawText(truncateText(item.description, 22), {
        x: colX.desc,
        y: rowY,
        size: 8,
        font: fontRegular,
        color: rgb(...theme.mutedRgb),
      });
    }

    // Quantity
    const qtyText = String(item.quantity);
    page1.drawText(qtyText, {
      x: colX.qty + 25 - (qtyText.length * 3),
      y: rowY,
      size: 9,
      font: fontRegular,
      color: rgb(...theme.textRgb),
    });

    // Unit price
    const priceText = `${item.unitPrice.toFixed(2)}`;
    page1.drawText(priceText, {
      x: colX.price + 30 - (priceText.length * 3),
      y: rowY,
      size: 9,
      font: fontRegular,
      color: rgb(...theme.textRgb),
    });

    // Total (right aligned)
    const totalText = `${item.total.toFixed(2)} ${currencySymbol}`;
    const totalWidth = getTextWidth(totalText, fontBold, 9);
    page1.drawText(totalText, {
      x: colX.total + 15 - totalWidth,
      y: rowY,
      size: 9,
      font: fontBold,
      color: rgb(...theme.textRgb),
    });

    currentY -= rowHeight;
  }

  // --- TOTALS SECTION ---
  currentY -= 15;
  const totalsBoxX = MARGIN_X + 250;
  const totalsBoxW = CONTENT_W - 250;

  // Subtotal
  drawTotalsRow(
    page1,
    fontRegular,
    "Subtotal",
    `${budget.subtotal.toFixed(2)} ${currencySymbol}`,
    totalsBoxX,
    currentY,
    totalsBoxW,
    theme
  );
  currentY -= 14;

  // Discount
  if (budget.discount > 0) {
    drawTotalsRow(
      page1,
      fontRegular,
      "Descuento",
      `-${budget.discount.toFixed(2)} ${currencySymbol}`,
      totalsBoxX,
      currentY,
      totalsBoxW,
      theme
    );
    currentY -= 14;
  }

  // Tax
  drawTotalsRow(
    page1,
    fontRegular,
    `IVA (${budget.taxPercent}%)`,
    `${budget.taxAmount.toFixed(2)} ${currencySymbol}`,
    totalsBoxX,
    currentY,
    totalsBoxW,
    theme
  );
  currentY -= 8;

  // Final total with emphasis
  page1.drawRectangle({
    x: totalsBoxX - 10,
    y: currentY - 28,
    width: totalsBoxW + 10,
    height: 28,
    color: rgb(...theme.primaryRgb),
  });

  page1.drawText("TOTAL", {
    x: totalsBoxX,
    y: currentY - 9,
    size: 12,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  const finalTotalText = `${budget.finalTotal.toFixed(2)} ${currencySymbol}`;
  const finalTotalWidth = getTextWidth(finalTotalText, fontBold, 13);
  page1.drawText(finalTotalText, {
    x: totalsBoxX + totalsBoxW - finalTotalWidth,
    y: currentY - 9,
    size: 13,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  currentY -= 45;

  // --- NOTES SECTION ---
  if (budget.notes && currentY > footerReserved + 30) {
    page1.drawLine({
      start: { x: MARGIN_X, y: currentY },
      end: { x: PAGE_W - MARGIN_X, y: currentY },
      thickness: 0.5,
      color: rgb(...theme.borderRgb),
    });
    currentY -= 15;

    page1.drawText("NOTAS", {
      x: MARGIN_X,
      y: currentY,
      size: 9,
      font: fontBold,
      color: rgb(...theme.mutedRgb),
    });
    currentY -= 12;

    const maxChars = Math.floor((currentY - footerReserved) / 12) * 80;
    const notesText = budget.notes.length > maxChars ? budget.notes.slice(0, maxChars) + "…" : budget.notes;

    page1.drawText(notesText, {
      x: MARGIN_X,
      y: currentY,
      size: 8,
      font: fontRegular,
      color: rgb(...theme.mutedRgb),
      maxWidth: CONTENT_W,
      lineHeight: 12,
    });
  }

  // --- FOOTER ---
  drawProfessionalFooter(page1, fontRegular, footer, theme, PAGE_W, docId);

  // ================================================================
  // PAGE 2 — Terms & Conditions
  // ================================================================
  if (budget.status !== "aceptado") {
    const page2 = pdf.addPage([PAGE_W, PAGE_H]);

    // White background
    page2.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_W,
      height: PAGE_H,
      color: rgb(1, 1, 1),
    });

    // Top accent
    page2.drawRectangle({
      x: 0,
      y: PAGE_H - 6,
      width: PAGE_W,
      height: 6,
      color: rgb(...theme.primaryRgb),
    });

    let py = PAGE_H - MARGIN_Y - 10;

    // Header
    if (logo) {
      page2.drawImage(logo, {
        x: MARGIN_X,
        y: py - logoSize + 4,
        width: logoSize,
        height: logoSize,
      });
    }

    page2.drawText("LUMICATECH", {
      x: logo ? MARGIN_X + logoSize + 12 : MARGIN_X,
      y: py - 8,
      size: 16,
      font: fontBold,
      color: rgb(...theme.textRgb),
    });

    page2.drawText("Industrial Systems", {
      x: logo ? MARGIN_X + logoSize + 12 : MARGIN_X,
      y: py - 24,
      size: 9,
      font: fontRegular,
      color: rgb(...theme.mutedRgb),
    });

    page2.drawText("TÉRMINOS Y CONDICIONES", {
      x: PAGE_W - MARGIN_X - 170,
      y: py - 8,
      size: 14,
      font: fontBold,
      color: rgb(...theme.primaryRgb),
    });

    py -= 50;

    // Divider
    page2.drawLine({
      start: { x: MARGIN_X, y: py },
      end: { x: PAGE_W - MARGIN_X, y: py },
      thickness: 1,
      color: rgb(...theme.borderRgb),
    });
    py -= 30;

    // Section: Terms
    page2.drawText("1. TÉRMINOS DEL PRESUPUESTO", {
      x: MARGIN_X,
      y: py,
      size: 11,
      font: fontBold,
      color: rgb(...theme.textRgb),
    });
    py -= 20;

    const terms = [
      `Este presupuesto tiene una validez de 15 días desde la fecha de emisión (${docDate}).`,
      "Los precios incluyen IVA salvo indicación contraria.",
      "El plazo de ejecución comenzará una vez recibido el abono de la señal.",
      "Cualquier modificación en el alcance del proyecto podrá afectar al precio final.",
      "El cliente será notificado de cualquier incidencia que afecte al cronograma.",
    ];

    for (const term of terms) {
      page2.drawText(`• ${term}`, {
        x: MARGIN_X,
        y: py,
        size: 9,
        font: fontRegular,
        color: rgb(...theme.mutedRgb),
        maxWidth: CONTENT_W,
        lineHeight: 14,
      });
      py -= 18;
    }

    py -= 15;

    // Section: Payment
    page2.drawText("2. FORMA DE PAGO", {
      x: MARGIN_X,
      y: py,
      size: 11,
      font: fontBold,
      color: rgb(...theme.textRgb),
    });
    py -= 20;

    const payments = [
      "Señal del 50% al inicio del proyecto para confirmar la reserva.",
      "El 50% restante contra entrega y aceptación del trabajo.",
      "Forma de pago: transferencia bancaria.",
    ];

    for (const p of payments) {
      page2.drawText(`• ${p}`, {
        x: MARGIN_X,
        y: py,
        size: 9,
        font: fontRegular,
        color: rgb(...theme.mutedRgb),
        maxWidth: CONTENT_W,
      });
      py -= 16;
    }

    py -= 20;

    // Section: Acceptance
    page2.drawText("3. ACEPTACIÓN", {
      x: MARGIN_X,
      y: py,
      size: 11,
      font: fontBold,
      color: rgb(...theme.textRgb),
    });
    py -= 20;

    page2.drawText("El abajo firmante acepta los términos y condiciones descritos en el presente presupuesto,", {
      x: MARGIN_X,
      y: py,
      size: 9,
      font: fontRegular,
      color: rgb(...theme.mutedRgb),
      maxWidth: CONTENT_W,
    });
    py -= 14;

    page2.drawText("incluyendo alcance, condiciones, plazos y forma de pago.", {
      x: MARGIN_X,
      y: py,
      size: 9,
      font: fontRegular,
      color: rgb(...theme.mutedRgb),
      maxWidth: CONTENT_W,
    });
    py -= 50;

    // Signature lines
    const sigY = py;
    page2.drawLine({
      start: { x: MARGIN_X, y: sigY },
      end: { x: MARGIN_X + 200, y: sigY },
      thickness: 0.7,
      color: rgb(...theme.mutedRgb),
    });
    page2.drawText("Firma y sello del cliente", {
      x: MARGIN_X,
      y: sigY - 12,
      size: 8,
      font: fontRegular,
      color: rgb(...theme.mutedRgb),
    });

    page2.drawLine({
      start: { x: MARGIN_X + 250, y: sigY },
      end: { x: PAGE_W - MARGIN_X, y: sigY },
      thickness: 0.7,
      color: rgb(...theme.mutedRgb),
    });
    page2.drawText("Fecha", {
      x: MARGIN_X + 250,
      y: sigY - 12,
      size: 8,
      font: fontRegular,
      color: rgb(...theme.mutedRgb),
    });

    // Footer on page 2
    drawProfessionalFooter(page2, fontRegular, footer, theme, PAGE_W, docId);
  }

  const pdfBytes = await pdf.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="presupuesto-${docId}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}

// ================================================================
// HELPER FUNCTIONS
// ================================================================

function drawTotalsRow(
  page: PDFPage,
  font: PDFFont,
  label: string,
  value: string,
  x: number,
  y: number,
  width: number,
  theme: BudgetTemplateTheme
) {
  // Label
  page.drawText(label, {
    x: x,
    y: y,
    size: 9,
    font: font,
    color: rgb(...theme.mutedRgb),
  });

  // Value (right aligned)
  const valueWidth = getTextWidth(value, font, 9);
  page.drawText(value, {
    x: x + width - valueWidth,
    y: y,
    size: 9,
    font: font,
    color: rgb(...theme.textRgb),
  });
}

function drawProfessionalFooter(
  page: PDFPage,
  font: PDFFont,
  footerLines: string[],
  theme: BudgetTemplateTheme,
  pageWidth: number,
  docId: string
) {
  const footerY = 65;
  const lineHeight = 11;

  // Top line
  page.drawLine({
    start: { x: MARGIN_X, y: footerY + 15 },
    end: { x: pageWidth - MARGIN_X, y: footerY + 15 },
    thickness: 1,
    color: rgb(...theme.borderRgb),
  });

  // Footer text
  let y = footerY;
  for (const line of footerLines) {
    page.drawText(line, {
      x: MARGIN_X,
      y: y,
      size: 8,
      font: font,
      color: rgb(...theme.mutedRgb),
    });
    y -= lineHeight;
  }

  // Page info
  const pageInfo = `LumicaTech Industrial Systems · www.lumicatech.es · Ref: ${docId}`;
  const pageInfoWidth = getTextWidth(pageInfo, font, 7);
  page.drawText(pageInfo, {
    x: (pageWidth - pageInfoWidth) / 2,
    y: 25,
    size: 7,
    font: font,
    color: rgb(...theme.mutedRgb),
  });

  // Page number (bottom right)
  const pageCount = page.doc.getPageCount();
  const currentPage = page.doc.getPages().indexOf(page) + 1;
  const pageNumText = `Página ${currentPage} de ${pageCount}`;
  const pageNumWidth = getTextWidth(pageNumText, font, 7);
  page.drawText(pageNumText, {
    x: pageWidth - MARGIN_X - pageNumWidth,
    y: 25,
    size: 7,
    font: font,
    color: rgb(...theme.mutedRgb),
  });
}

function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;
}

// Approximate text width for Helvetica fonts
function getTextWidth(text: string, font: PDFFont, size: number): number {
  // Helvetica has roughly average character width of 0.56 * size
  return text.length * size * 0.56;
}

// Simple text wrapping for titles
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number, page: PDFPage): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = getTextWidth(testLine, font, size);

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length > 0 ? lines : [text];
}
