export type BudgetTemplateId = "lumica" | "corporate" | "minimal" | "elegant";

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

export const BUDGET_TEMPLATES: BudgetTemplateTheme[] = [
  {
    id: "lumica",
    name: "Lumica Brand",
    description: "Identidad propia con acento cyan profesional.",
    badge: "Principal",
    primary: "#0891b2",
    primaryRgb: hexToRgb01("#0891b2"),
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
    description: "Azul corporativo clásico, limpio y formal.",
    badge: "Empresarial",
    primary: "#1e40af",
    primaryRgb: hexToRgb01("#1e40af"),
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
    description: "Monocromático sobrio, tipografía clara, sin distracciones.",
    badge: "Sobrio",
    primary: "#18181b",
    primaryRgb: hexToRgb01("#18181b"),
    dark: "#18181b",
    darkRgb: hexToRgb01("#18181b"),
    light: "#fafafa",
    lightRgb: hexToRgb01("#fafafa"),
    surface: "#ffffff",
    surfaceRgb: hexToRgb01("#ffffff"),
    text: "#18181b",
    textRgb: hexToRgb01("#18181b"),
    muted: "#71717a",
    mutedRgb: hexToRgb01("#71717a"),
    border: "#e4e4e7",
    borderRgb: hexToRgb01("#e4e4e7"),
    white: [1, 1, 1],
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Verde esmeralda premium, sofisticado y moderno.",
    badge: "Premium",
    primary: "#059669",
    primaryRgb: hexToRgb01("#059669"),
    dark: "#064e3b",
    darkRgb: hexToRgb01("#064e3b"),
    light: "#f0fdf4",
    lightRgb: hexToRgb01("#f0fdf4"),
    surface: "#ffffff",
    surfaceRgb: hexToRgb01("#ffffff"),
    text: "#064e3b",
    textRgb: hexToRgb01("#064e3b"),
    muted: "#64748b",
    mutedRgb: hexToRgb01("#64748b"),
    border: "#d1fae5",
    borderRgb: hexToRgb01("#d1fae5"),
    white: [1, 1, 1],
  },
];

export function getTemplateTheme(template: string | undefined): BudgetTemplateTheme {
  return BUDGET_TEMPLATES.find((item) => item.id === template) || BUDGET_TEMPLATES[0];
}
