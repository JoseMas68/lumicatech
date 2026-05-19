export type BudgetTemplateId = "executive" | "studio" | "clean";

export interface BudgetTemplateTheme {
  id: BudgetTemplateId;
  name: string;
  description: string;
  badge: string;
  accent: string;
  panel: string;
}

export const DEFAULT_BUDGET_TEMPLATE: BudgetTemplateId = "executive";

export const DEFAULT_BUDGET_FOOTER = [
  "LumicaTech Industrial Systems · NIF 53226557A",
  "info@lumicatech.es · https://lumicatech.es",
  "Propuesta valida durante 15 dias salvo indicacion contraria.",
].join("\n");

export const BUDGET_TEMPLATES: BudgetTemplateTheme[] = [
  {
    id: "executive",
    name: "Executive Tech",
    description: "Corporativo, ideal para propuestas B2B y direccion.",
    badge: "Recomendada",
    accent: "#22d3ee",
    panel: "from-[#10233d] to-[#111827]",
  },
  {
    id: "studio",
    name: "Studio Product",
    description: "Visual y moderna para software y proyectos digitales.",
    badge: "Creativa",
    accent: "#60a5fa",
    panel: "from-[#1b1538] to-[#0f1f2f]",
  },
  {
    id: "clean",
    name: "Clean Minimal",
    description: "Sobria y minimalista para propuestas rapidas.",
    badge: "Minimal",
    accent: "#14b8a6",
    panel: "from-[#12363b] to-[#0f172a]",
  },
];

export function getTemplateTheme(template: string | undefined): BudgetTemplateTheme {
  return BUDGET_TEMPLATES.find((item) => item.id === template) || BUDGET_TEMPLATES[0];
}
