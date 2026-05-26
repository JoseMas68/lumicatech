export type BudgetTemplateId = "lumica" | "corporate" | "minimal";

export interface BudgetTemplateTheme {
  id: BudgetTemplateId;
  name: string;
  description: string;
  badge: string;
  // Colors
  primary: string;       // main accent
  primaryRgb: [number, number, number]; // pre-computed RGB (0-1)
  dark: string;          // dark background
  darkRgb: [number, number, number];
  light: string;         // light background
  lightRgb: [number, number, number];
  surface: string;       // card/panel bg
  surfaceRgb: [number, number, number];
  text: string;          // primary text
  textRgb: [number, number, number];
  muted: string;         // secondary text
  mutedRgb: [number, number, number];
  border: string;        // border color
  borderRgb: [number, number, number];
  white: [number, number, number]; // always white
}

export const DEFAULT_BUDGET_TEMPLATE: BudgetTemplateId = "lumica";

export const DEFAULT_BUDGET_FOOTER = [
  "LumicaTech Industrial Systems · NIF 53226557A",
  "info@lumicatech.es · https://lumicatech.es",
  "Propuesta válida durante 15 días salvo indicación contraria.",
].join("\n");

// Pre-computed RGB helpers (0-1 range for pdf-lib)
function hexToRgb01(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const bigint = Number.parseInt(clean, 16);
  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255,
  ];
}

function rgbStr(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255)).toString(16).slice(1)}`;
}

export const BUDGET_TEMPLATES: BudgetTemplateTheme[] = [
  {
    id: "lumica",
    name: "Lumica Brand",
    description: "Identidad propia, dark header con acento cyan.",
    badge: "Principal",
    primary: "#06b6d4",
    primaryRgb: hexToRgb01("#06b6d4"),
    dark: "#0f172a",
    darkRgb: hexToRgb01("#0f172a"),
    light: "#f8fafc",
    lightRgb: hexToRgb01("#f8fafc"),
    surface: "#ffffff",
    surfaceRgb: hexToRgb01("#ffffff"),
    text: "#0f172a",
    textRgb: hexToRgb01("#0f172a"),
    muted: "#64748b",
    mutedRgb: hexToRgb01("#64748b"),
    border: "#e2e8f0",
    borderRgb: hexToRgb01("#e2e8f0"),
    white: [1, 1, 1],
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Azul corporativo, limpio y formal.",
    badge: "Empresarial",
    primary: "#2563eb",
    primaryRgb: hexToRgb01("#2563eb"),
    dark: "#1e293b",
    darkRgb: hexToRgb01("#1e293b"),
    light: "#f1f5f9",
    lightRgb: hexToRgb01("#f1f5f9"),
    surface: "#ffffff",
    surfaceRgb: hexToRgb01("#ffffff"),
    text: "#0f172a",
    textRgb: hexToRgb01("#0f172a"),
    muted: "#64748b",
    mutedRgb: hexToRgb01("#64748b"),
    border: "#cbd5e1",
    borderRgb: hexToRgb01("#cbd5e1"),
    white: [1, 1, 1],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Blanco y negro, tipografía clara, sin ruido.",
    badge: "Sobrio",
    primary: "#111827",
    primaryRgb: hexToRgb01("#111827"),
    dark: "#111827",
    darkRgb: hexToRgb01("#111827"),
    light: "#fafafa",
    lightRgb: hexToRgb01("#fafafa"),
    surface: "#ffffff",
    surfaceRgb: hexToRgb01("#ffffff"),
    text: "#111827",
    textRgb: hexToRgb01("#111827"),
    muted: "#9ca3af",
    mutedRgb: hexToRgb01("#9ca3af"),
    border: "#e5e7eb",
    borderRgb: hexToRgb01("#e5e7eb"),
    white: [1, 1, 1],
  },
];

export function getTemplateTheme(template: string | undefined): BudgetTemplateTheme {
  return BUDGET_TEMPLATES.find((item) => item.id === template) || BUDGET_TEMPLATES[0];
}
