import { NextResponse } from "next/server";
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb, PDFImage, PDFDocumentEmbed } from "pdf-lib";
import { readFileSync } from "fs";
import { requireAuth } from "@/src/lib/auth";
import { getTemplateTheme, DEFAULT_BUDGET_FOOTER, type BudgetTemplateTheme } from "@/src/lib/budget-branding";
import { getBudgetById } from "@/src/lib/budgets-db";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 50;
const CONTENT_W = PAGE_W - MARGIN_X * 2; // 495.28

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
  const fontItalic = await pdf.embedFont(StandardFonts.HelveticaOblique);
  const fontBoldItalic = await pdf.embedFont(StandardFonts.Helvetica-BoldOblique);
  const theme = getTemplateTheme(budget.template);
  const footer = (budget.brandFooter || DEFAULT_BUDGET_FOOTER).split("\n").filter(Boolean);

  // Load logo
  let logo: PDFImage | undefined;
  try {
    const logoBytes = readFileSync("/opt/hermes/projects/lumicatech/public/logo.png");
    logo = await pdf.embedPng(logoBytes);
  } catch {
    // No logo — continue without it
  }

  const currencySymbol = budget.currency === "EUR" ? "€" : budget.currency === "USD" ? "$" : budget.currency === "GBP" ? "£" : budget.currency;

  // ================================================================
  // PAGE 1 — Header + Client info + Items table
  // ================================================================
  const page1 = pdf.addPage([PAGE_W, PAGE_H]);

  // Background
  drawRect(page1, 0, 0, PAGE_W, PAGE_H, theme.light);

  // --- TOP ACCENT BAR (thin line at top) ---
  drawRect(page1, 0, PAGE_H - 3, PAGE_W, 3, theme.primary);

  // --- HEADER SECTION ---
  const headerTop = PAGE_H - 65;

  // Logo top-left
  if (logo) {
    page1.drawImage(logo, { x: MARGIN_X, y: headerTop - 22, width: 36, height: 36 });
  }

  // Company name next to logo
  page1.drawText("LUMICATECH", {
    x: logo ? MARGIN_X + 44 : MARGIN_X,
    y: headerTop - 12,
    size: 14,
    font: fontBold,
    color: theme.text,
  });
  page1.drawText("Industrial Systems", {
    x: logo ? MARGIN_X + 44 : MARGIN_X,
    y: headerTop - 26,
    size: 8,
    font: fontRegular,
    color: theme.muted,
  });

  // "PRESUPUESTO" top-right
  const docDate = new Date(budget.createdAt).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
  const docId = id.slice(0, 8).toUpperCase();

  page1.drawText("PRESUPUESTO", {
    x: PAGE_W - MARGIN_X - 140,
    y: headerTop - 10,
    size: 16,
    font: fontBold,
    color: theme.primary,
  });
  page1.drawText(`#${docId}`, {
    x: PAGE_W - MARGIN_X - 140,
    y: headerTop - 26,
    size: 9,
    font: fontRegular,
    color: theme.muted,
  });

  // --- DIVIDER LINE ---
  drawLine(page1, MARGIN_X, headerTop - 40, PAGE_W - MARGIN_X, headerTop - 40, theme.border, 0.5);

  // --- CLIENT INFO BOX ---
  const clientY = headerTop - 70;

  // "CLIENTE" label
  page1.drawText("CLIENTE", {
    x: MARGIN_X,
    y: clientY + 10,
    size: 7,
    font: fontBold,
    color: theme.muted,
  });

  // Client name
  page1.drawText(budget.clientName, {
    x: MARGIN_X,
    y: clientY - 5,
    size: 13,
    font: fontBold,
    color: theme.text,
  });

  // Company
  if (budget.company) {
    page1.drawText(budget.company, {
      x: MARGIN_X,
      y: clientY - 20,
      size: 10,
      font: fontRegular,
      color: theme.muted,
    });
  }

  // Email
  page1.drawText(budget.clientEmail, {
    x: MARGIN_X,
    y: clientY - 34,
    size: 9,
    font: fontRegular,
    color: theme.muted,
  });

  // --- PROJECT TITLE ---
  const titleY = clientY - 60;
  page1.drawText(budget.title, {
    x: MARGIN_X,
    y: titleY,
    size: 14,
    font: fontBold,
    color: theme.text,
  });

  // Valid until
  if (budget.validUntil) {
    const validDate = new Date(budget.validUntil).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
    page1.drawText(`Válido hasta: ${validDate}`, {
      x: MARGIN_X,
      y: titleY - 18,
      size: 9,
      font: fontRegular,
      color: theme.muted,
    });
  }

  // --- ITEMS TABLE ---
  const tableTop = titleY - 40;
  const items = budget.items || [];

  // Table header bar
  drawRect(page1, MARGIN_X, tableTop - 2, CONTENT_W, 20, theme.dark);

  // Column positions
  const col1 = MARGIN_X + 5;      // Concepto
  const col2 = MARGIN_X + 260;    // Descripción
  const col3 = MARGIN_X + 350;    // Cant.
  const col4 = MARGIN_X + 400;    // P. Unit.
  const col5 = MARGIN_X + 465;    // Total

  // Header labels
  const headerY = tableTop + 4;
  page1.drawText("CONCEPTO", { x: col1, y: headerY, size: 7, font: fontBold, color: theme.white });
  page1.drawText("DESCRIPCIÓN", { x: col2, y: headerY, size: 7, font: fontBold, color: theme.white });
  page1.drawText("CANT.", { x: col3, y: headerY, size: 7, font: fontBold, color: theme.white });
  page1.drawText("P. UNIT.", { x: col4, y: headerY, size: 7, font: fontBold, color: theme.white });
  page1.drawText("TOTAL", { x: col5, y: headerY, size: 7, font: fontBold, color: theme.white });

  // Table bottom line
  drawLine(page1, MARGIN_X, tableTop - 2, PAGE_W - MARGIN_X, tableTop - 2, theme.dark, 1);

  // Items rows
  let rowY = tableTop - 24;
  const rowH = 16;
  const minContentY = 140; // stop before footer

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Alternating row bg
    if (i % 2 === 0) {
      drawRect(page1, MARGIN_X, rowY - rowH, CONTENT_W, rowH, theme.surface);
    }

    // Left border accent for each row
    if (i % 3 === 0) {
      drawRect(page1, MARGIN_X, rowY - rowH, 2, rowH, theme.primary);
    }

    // Concept
    const conceptText = item.concept.length > 32 ? item.concept.slice(0, 32) + "…" : item.concept;
    page1.drawText(conceptText, {
      x: col1,
      y: rowY - 4,
      size: 9,
      font: fontBold,
      color: theme.text,
    });

    // Description
    if (item.description) {
      page1.drawText(item.description.slice(0, 30), {
        x: col2,
        y: rowY - 4,
        size: 8,
        font: fontRegular,
        color: theme.muted,
      });
    }

    // Quantity
    page1.drawText(String(item.quantity), {
      x: col3,
      y: rowY - 4,
      size: 9,
      font: fontRegular,
      color: theme.text,
    });

    // Unit price
    page1.drawText(`${item.unitPrice.toFixed(2)}`, {
      x: col4,
      y: rowY - 4,
      size: 9,
      font: fontRegular,
      color: theme.text,
    });

    // Total (right aligned)
    page1.drawText(`${item.total.toFixed(2)} ${currencySymbol}`, {
      x: col5,
      y: rowY - 4,
      size: 9,
      font: fontBold,
      color: theme.text,
    });

    rowY -= rowH;
  }

  // --- TOTALS BOX ---
  const totalsY = Math.max(rowY - 20, minContentY + 30);
  const totalsBoxX = MARGIN_X + 240;
  const totalsBoxW = 255;
  const totalsBoxH = budget.discount > 0 ? 82 : 66;

  // Box background
  drawRect(page1, totalsBoxX, totalsY - totalsBoxH, totalsBoxW, totalsBoxH, theme.surface, theme.border, 0.5);

  // Subtotal
  drawTotalsLine(page1, fontRegular, "Subtotal", `${budget.subtotal.toFixed(2)} ${currencySymbol}`, totalsBoxX + 10, totalsY, theme.muted, theme.text, 9);
  let ty = totalsY - 16;

  // Discount
  if (budget.discount > 0) {
    drawTotalsLine(page1, fontRegular, `Descuento`, `-${budget.discount.toFixed(2)} ${currencySymbol}`, totalsBoxX + 10, ty, theme.muted, theme.text, 9);
    ty -= 16;
  }

  // IVA
  drawTotalsLine(page1, fontRegular, `IVA (${budget.taxPercent}%)`, `${budget.taxAmount.toFixed(2)} ${currencySymbol}`, totalsBoxX + 10, ty, theme.muted, theme.text, 9);
  ty -= 16;

  // Final total bar
  drawRect(page1, totalsBoxX, ty - 2, totalsBoxW, 22, theme.primary);
  page1.drawText("TOTAL", { x: totalsBoxX + 10, y: ty + 4, size: 10, font: fontBold, color: theme.white });
  page1.drawText(`${budget.finalTotal.toFixed(2)} ${currencySymbol}`, { x: totalsBoxX + totalsBoxW - 10, y: ty + 4, size: 11, font: fontBold, color: theme.white });

  // --- NOTES ---
  if (budget.notes) {
    const notesY = Math.min(totalsY - totalsBoxH - 20, PAGE_H - 160);
    if (notesY > minContentY + 20) {
      drawLine(page1, MARGIN_X, notesY + 10, PAGE_W - MARGIN_X, notesY + 10, theme.border, 0.5);
      page1.drawText("NOTAS", { x: MARGIN_X, y: notesY + 5, size: 7, font: fontBold, color: theme.muted });
      const notesText = budget.notes.length > 300 ? budget.notes.slice(0, 300) + "…" : budget.notes;
      page1.drawText(notesText, {
        x: MARGIN_X,
        y: notesY - 10,
        size: 8,
        font: fontRegular,
        color: theme.muted,
        maxWidth: CONTENT_W,
      });
    }
  }

  // --- FOOTER ---
  drawFooter(page1, fontRegular, footer, theme, PAGE_H, PAGE_W);

  // ================================================================
  // PAGE 2 — Terms + Acceptance (if not accepted)
  // ================================================================
  if (budget.status !== "aceptado") {
    const page2 = pdf.addPage([PAGE_W, PAGE_H]);
    drawRect(page2, 0, 0, PAGE_W, PAGE_H, theme.light);
    drawRect(page2, 0, PAGE_H - 3, PAGE_W, 3, theme.primary);

    // Header
    const hY = PAGE_H - 55;
    if (logo) {
      page2.drawImage(logo, { x: MARGIN_X, y: hY - 18, width: 30, height: 30 });
    }
    page2.drawText("LUMICATECH", {
      x: logo ? MARGIN_X + 38 : MARGIN_X,
      y: hY - 8,
      size: 12,
      font: fontBold,
      color: theme.text,
    });
    page2.drawText("Industrial Systems", {
      x: logo ? MARGIN_X + 38 : MARGIN_X,
      y: hY - 20,
      size: 8,
      font: fontRegular,
      color: theme.muted,
    });

    page2.drawText("CONDICIONES Y ACEPTACIÓN", {
      x: PAGE_W - MARGIN_X - 200,
      y: hY - 8,
      size: 14,
      font: fontBold,
      color: theme.primary,
    });
    drawLine(page2, MARGIN_X, hY - 30, PAGE_W - MARGIN_X, hY - 30, theme.border, 0.5);

    // Section: Terms
    let termsY = hY - 65;

    page2.drawText("TÉRMINOS DEL PRESUPUESTO", {
      x: MARGIN_X,
      y: termsY,
      size: 10,
      font: fontBold,
      color: theme.text,
    });
    termsY -= 18;

    const terms = [
      `Este presupuesto tiene una validez de 15 días desde la fecha de emisión.`,
      "Los precios incluyen IVA salvo indicación contraria.",
      "El plazo de ejecución comenzará una vez recibido el abono de la señal.",
      "Cualquier modificación en el alcance del proyecto podrá afectar al precio final.",
      "El cliente será notificado de cualquier incidencia que afecte al cronograma.",
    ];

    for (const term of terms) {
      page2.drawText(`• ${term}`, {
        x: MARGIN_X,
        y: termsY,
        size: 8.5,
        font: fontRegular,
        color: theme.muted,
        maxWidth: CONTENT_W,
      });
      termsY -= 14;
    }

    // Section: Payment
    termsY -= 8;
    page2.drawText("FORMA DE PAGO", {
      x: MARGIN_X,
      y: termsY,
      size: 10,
      font: fontBold,
      color: theme.text,
    });
    termsY -= 18;

    const payments = [
      "Señal del 50% al inicio del proyecto.",
      "El 50% restante contra entrega y aceptación del trabajo.",
      "Forma de pago: transferencia bancaria.",
    ];

    for (const p of payments) {
      page2.drawText(`• ${p}`, {
        x: MARGIN_X,
        y: termsY,
        size: 8.5,
        font: fontRegular,
        color: theme.muted,
        maxWidth: CONTENT_W,
      });
      termsY -= 14;
    }

    // Section: Acceptance
    termsY -= 10;
    if (termsY > 200) {
      page2.drawText("ACEPTACIÓN", {
        x: MARGIN_X,
        y: termsY,
        size: 10,
        font: fontBold,
        color: theme.text,
      });
      termsY -= 20;

      page2.drawText("El abajo firmante acepta los términos y condiciones descritos en el presente presupuesto,", {
        x: MARGIN_X,
        y: termsY,
        size: 9,
        font: fontRegular,
        color: theme.muted,
        maxWidth: CONTENT_W,
      });
      page2.drawText("incluyendo alcance, condiciones y forma de pago.", {
        x: MARGIN_X,
        y: termsY - 14,
        size: 9,
        font: fontRegular,
        color: theme.muted,
        maxWidth: CONTENT_W,
      });

      termsY -= 35;

      // Signature lines
      page2.drawLine({ start: { x: MARGIN_X, y: termsY }, end: { x: MARGIN_X + 200, y: termsY }, thickness: 0.5, color: theme.muted });
      page2.drawText("Firma y sello del cliente", { x: MARGIN_X, y: termsY - 14, size: 8, font: fontRegular, color: theme.muted });

      page2.drawLine({ start: { x: MARGIN_X + 250, y: termsY }, end: { x: PAGE_W - MARGIN_X, y: termsY }, thickness: 0.5, color: theme.muted });
      page2.drawText("Fecha", { x: MARGIN_X + 250, y: termsY - 14, size: 8, font: fontRegular, color: theme.muted });
    }

    drawFooter(page2, fontRegular, footer, theme, PAGE_H, PAGE_W);
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

// --- Helper functions ---

function drawRect(page: PDFPage, x: number, y: number, w: number, h: number, color: [number, number, number], borderColor?: [number, number, number], borderWidth?: number, borderOpacity?: number) {
  page.drawRectangle({ x, y, width: w, height: h, color: rgb(...color) });
  if (borderColor && borderWidth) {
    page.drawRectangle({ x, y, width: w, height: h, borderColor: rgb(...borderColor), borderWidth, borderOpacity: borderOpacity ?? 1 });
  }
}

function drawLine(page: PDFPage, x1: number, y1: number, x2: number, y2: number, color: [number, number, number], thickness: number) {
  page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness, color: rgb(...color) });
}

function drawTotalsLine(page: PDFPage, font: PDFFont, label: string, value: string, x: number, y: number, labelColor: [number, number, number], valueColor: [number, number, number], size: number) {
  page.drawText(label, { x, y, size, font, color: rgb(...labelColor) });
  page.drawText(value, { x: x + 130, y, size, font, color: rgb(...valueColor) });
}

function drawFooter(page: PDFPage, font: PDFFont, footerLines: string[], theme: BudgetTemplateTheme, H: number, W: number) {
  const footerY = 55;
  drawLine(page, MARGIN_X, footerY + 15, W - MARGIN_X, footerY + 15, theme.border, 0.5);

  for (const line of footerLines) {
    page.drawText(line, { x: MARGIN_X, y: footerY, size: 7, font, color: theme.muted });
    footerY -= 10;
  }

  page.drawText("LumicaTech Industrial Systems · www.lumicatech.es", {
    x: W / 2 - 70,
    y: 25,
    size: 7,
    font,
    color: theme.muted,
  });
}
