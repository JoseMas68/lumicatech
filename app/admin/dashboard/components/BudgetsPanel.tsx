"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Copy, Eye, FilePlus2, Filter, FileDown, RefreshCw, Send, Trash2,
  X, Check, Plus, Minus, Sparkles, Palette, Download, ExternalLink,
  Clock, CheckCircle2, XCircle, AlertCircle, Search, FileText
} from "lucide-react";
import {
  BUDGET_TEMPLATES, DEFAULT_BUDGET_FOOTER, DEFAULT_BUDGET_TEMPLATE,
  getTemplateTheme, type BudgetTemplateId, type BudgetTemplateTheme
} from "@/src/lib/budget-branding";

// Currency symbol helper
function currencySymbol(cur: string): string {
  if (cur === "EUR") return "€";
  if (cur === "USD") return "$";
  if (cur === "GBP") return "£";
  if (cur === "CHF") return "Fr";
  return cur;
}

type BudgetStatus = "borrador" | "enviado" | "aceptado" | "rechazado" | "vencido";

type BudgetItem = {
  id?: string;
  concept: string;
  description?: string;
  quantity: number;
  unitPrice: number;
};

type Budget = {
  id: string;
  token: string;
  clientName: string;
  clientEmail: string;
  company?: string;
  title: string;
  finalTotal: number;
  subtotal: number;
  taxAmount: number;
  discount: number;
  currency: string;
  taxPercent: number;
  status: BudgetStatus;
  createdAt: string;
  validUntil?: string;
  template: BudgetTemplateId;
  brandFooter?: string;
  items?: BudgetItem[];
  notes?: string;
};

const STATUS_CONFIG: Record<BudgetStatus, { label: string; icon: React.ReactNode; color: string; bg: string; border: string }> = {
  borrador: { label: "Borrador", icon: <Clock className="w-3 h-3" />, color: "text-slate-300", bg: "bg-slate-500/10", border: "border-slate-500/20" },
  enviado: { label: "Enviado", icon: <Send className="w-3 h-3" />, color: "text-cyan-300", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  aceptado: { label: "Aceptado", icon: <CheckCircle2 className="w-3 h-3" />, color: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  rechazado: { label: "Rechazado", icon: <XCircle className="w-3 h-3" />, color: "text-rose-300", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  vencido: { label: "Vencido", icon: <AlertCircle className="w-3 h-3" />, color: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/20" },
};

export default function BudgetsPanel() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BudgetStatus | "todos">("todos");
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form state
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    company: "",
    title: "",
    notes: "",
    taxPercent: 21,
    discount: 0,
    currency: "EUR",
    validUntil: "",
    template: DEFAULT_BUDGET_TEMPLATE as BudgetTemplateId,
    brandFooter: DEFAULT_BUDGET_FOOTER,
    items: [{ concept: "", description: "", quantity: 1, unitPrice: 0 }] as BudgetItem[],
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchBudgets = useCallback(async (q?: string) => {
    setLoading(true);
    try {
      const search = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : "";
      const res = await fetch(`/api/admin/budgets${search}`);
      const data = await res.json();
      setBudgets(data.budgets ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  // Stats
  const stats = useMemo(() => {
    const total = budgets.length;
    const accepted = budgets.filter((b) => b.status === "aceptado").length;
    const sent = budgets.filter((b) => b.status === "enviado").length;
    const revenue = budgets.reduce((acc, b) => acc + (b.finalTotal || 0), 0);
    const conversion = total > 0 ? ((accepted / total) * 100).toFixed(1) : "0.0";
    return { total, accepted, sent, revenue, conversion };
  }, [budgets]);

  const filteredBudgets = useMemo(() => {
    let result = budgets;
    if (statusFilter !== "todos") result = result.filter((b) => b.status === statusFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((b) =>
        [b.clientName, b.clientEmail, b.company || "", b.title].some((f) => f.toLowerCase().includes(q))
      );
    }
    return result;
  }, [budgets, statusFilter, query]);

  // Form helpers
  const resetForm = () => {
    setForm({
      clientName: "",
      clientEmail: "",
      company: "",
      title: "",
      notes: "",
      taxPercent: 21,
      discount: 0,
      currency: "EUR",
      validUntil: "",
      template: DEFAULT_BUDGET_TEMPLATE as BudgetTemplateId,
      brandFooter: DEFAULT_BUDGET_FOOTER,
      items: [{ concept: "", description: "", quantity: 1, unitPrice: 0 }],
    });
    setEditingBudget(null);
  };

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setForm({
      clientName: budget.clientName,
      clientEmail: budget.clientEmail,
      company: budget.company || "",
      title: budget.title,
      notes: budget.notes || "",
      taxPercent: budget.taxPercent,
      discount: budget.discount,
      currency: budget.currency,
      validUntil: budget.validUntil || "",
      template: budget.template,
      brandFooter: budget.brandFooter || DEFAULT_BUDGET_FOOTER,
      items: budget.items?.length ? budget.items : [{ concept: "", description: "", quantity: 1, unitPrice: 0 }],
    });
    setShowModal(true);
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { concept: "", description: "", quantity: 1, unitPrice: 0 }] });
  };

  const removeItem = (idx: number) => {
    if (form.items.length <= 1) return;
    setForm({ ...form, items: form.items.filter((_, i) => i !== idx) });
  };

  const updateItem = (idx: number, key: keyof BudgetItem, value: string | number) => {
    const items = [...form.items];
    items[idx] = { ...items[idx], [key]: value };
    setForm({ ...form, items });
  };

  const canCreate = useMemo(() => {
    const hasName = form.clientName.trim().length >= 2;
    const hasEmail = form.clientEmail.includes("@");
    const hasTitle = form.title.trim().length >= 3;
    const hasValidItem = form.items.some((item) => item.concept.trim().length > 0);
    return hasName && hasEmail && hasTitle && hasValidItem;
  }, [form]);

  // Preview calculations
  const previewItems = useMemo(
    () => form.items.filter((item) => item.concept.trim()).map((item) => ({
      ...item,
      total: Math.max(0, item.quantity) * Math.max(0, item.unitPrice),
    })),
    [form.items]
  );

  const previewSubtotal = useMemo(() => previewItems.reduce((acc, item) => acc + item.total, 0), [previewItems]);
  const safeDiscount = Math.min(Math.max(0, Number(form.discount) || 0), previewSubtotal);
  const previewTaxAmount = Math.max(0, ((previewSubtotal - safeDiscount) * Math.max(0, Number(form.taxPercent) || 0)) / 100);
  const previewTotal = previewSubtotal - safeDiscount + previewTaxAmount;
  const selectedTheme = getTemplateTheme(form.template);

  async function saveBudget() {
    if (!canCreate) return;
    setSaving(true);
    try {
      const isEdit = !!editingBudget;
      const res = await fetch("/api/admin/budgets", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isEdit ? { id: editingBudget!.id } : {}),
          ...form,
          items: form.items.map((i) => ({
            concept: i.concept,
            description: i.description,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        showToast(data.error || "Error al guardar", "error");
        return;
      }

      showToast(isEdit ? "Presupuesto actualizado ✓" : "Presupuesto creado ✓");
      setShowModal(false);
      resetForm();
      fetchBudgets(query);
    } catch {
      showToast("Error de conexión", "error");
    } finally {
      setSaving(false);
    }
  }

  async function mutate(id: string, action: "delete" | "duplicate" | "send") {
    if (action === "delete") {
      if (!confirm("¿Eliminar presupuesto?")) return;
      await fetch("/api/admin/budgets", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      showToast("Presupuesto eliminado");
      fetchBudgets(query);
      return;
    }
    const payload = action === "duplicate"
      ? { id, action: "duplicate" }
      : { id, action: "status", status: "enviado" };
    await fetch("/api/admin/budgets", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (action === "send") showToast("Presupuesto enviado ✓");
    fetchBudgets(query);
  }

  async function changeStatus(id: string, status: BudgetStatus) {
    await fetch("/api/admin/budgets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "status", status }),
    });
    fetchBudgets(query);
  }

  // Modal
  if (showModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#111827]" onClick={(e) => e.stopPropagation()}>
          {/* Modal header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111827]/95 backdrop-blur">
            <h2 className="text-lg font-bold">{editingBudget ? "Editar presupuesto" : "Nuevo presupuesto"}</h2>
            <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-white/5 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid xl:grid-cols-[1fr_1fr] gap-0">
            {/* LEFT: Form */}
            <div className="p-6 space-y-5 border-r border-white/5">
              {/* Client info */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Datos del cliente</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <FormField label="Cliente *" value={form.clientName} onChange={(v) => setForm({...form, clientName: v})} placeholder="Nombre completo" />
                  <FormField label="Email *" value={form.clientEmail} onChange={(v) => setForm({...form, clientEmail: v})} placeholder="email@ejemplo.com" type="email" />
                  <FormField label="Empresa" value={form.company} onChange={(v) => setForm({...form, company: v})} placeholder="Nombre empresa" />
                  <FormField label="Título *" value={form.title} onChange={(v) => setForm({...form, title: v})} placeholder="Ej: Desarrollo web para..." />
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Notas</h3>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({...form, notes: e.target.value})}
                  placeholder="Alcance del proyecto, detalles adicionales..."
                  className="w-full min-h-20 bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-sm resize-none focus:border-cyan-500/50 focus:outline-none transition"
                />
              </div>

              {/* Financial */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Financiero</h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <NumberField label="IVA (%)" value={form.taxPercent} onChange={(v) => setForm({...form, taxPercent: v})} min={0} max={100} />
                  <NumberField label="Descuento (€)" value={form.discount} onChange={(v) => setForm({...form, discount: v})} min={0} />
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Moneda</label>
                    <select
                      value={form.currency}
                      onChange={(e) => setForm({...form, currency: e.target.value})}
                      className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:border-cyan-500/50 focus:outline-none"
                    >
                      <option value="EUR">EUR (€)</option>
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CHF">CHF (Fr)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-xs text-slate-400 mb-1.5">Válido hasta</label>
                  <input
                    type="date"
                    value={form.validUntil}
                    onChange={(e) => setForm({...form, validUntil: e.target.value})}
                    className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:border-cyan-500/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Template selection */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Palette className="w-3 h-3" /> Plantilla PDF
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {BUDGET_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setForm({...form, template: template.id})}
                      className={`relative rounded-xl border p-3 text-left transition-all ${
                        form.template === template.id
                          ? "border-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-400/30"
                          : "border-white/10 bg-[#0a0f1e] hover:border-white/20"
                      }`}
                    >
                      {/* Color swatch */}
                      <div className="flex gap-1 mb-2">
                        <div className="h-2.5 w-5 rounded-sm" style={{ backgroundColor: template.primary }} />
                        <div className="h-2.5 w-5 rounded-sm" style={{ backgroundColor: template.dark }} />
                        <div className="h-2.5 w-5 rounded-sm" style={{ backgroundColor: template.surface }} />
                      </div>
                      <div className="relative">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500">{template.badge}</p>
                        <p className="text-sm font-semibold mt-0.5">{template.name}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{template.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Líneas</h3>
                  <button onClick={addItem} className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Añadir línea
                  </button>
                </div>
                <div className="space-y-2">
                  {form.items.map((item, idx) => (
                    <div key={idx} className="bg-[#0a0f1e] border border-white/5 rounded-xl p-3 space-y-2">
                      <div className="grid grid-cols-12 gap-2">
                        <input
                          className="col-span-6 bg-transparent border border-white/5 rounded-lg px-2.5 py-2 text-xs focus:border-cyan-500/50 focus:outline-none"
                          value={item.concept}
                          onChange={(e) => updateItem(idx, "concept", e.target.value)}
                          placeholder="Concepto"
                        />
                        <input
                          className="col-span-2 bg-transparent border border-white/5 rounded-lg px-2.5 py-2 text-xs focus:border-cyan-500/50 focus:outline-none"
                          type="number"
                          min={0}
                          value={item.quantity || ""}
                          onChange={(e) => updateItem(idx, "quantity", Number(e.target.value) || 0)}
                          placeholder="Cant."
                        />
                        <input
                          className="col-span-3 bg-transparent border border-white/5 rounded-lg px-2.5 py-2 text-xs focus:border-cyan-500/50 focus:outline-none"
                          type="number"
                          min={0}
                          step="0.01"
                          value={item.unitPrice || ""}
                          onChange={(e) => updateItem(idx, "unitPrice", Number(e.target.value) || 0)}
                          placeholder="Precio"
                        />
                        <button
                          onClick={() => removeItem(idx)}
                          disabled={form.items.length <= 1}
                          className="col-span-1 text-slate-500 hover:text-red-400 disabled:opacity-30 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>
                      {item.description && (
                        <input
                          className="w-full bg-transparent border border-white/5 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-400 focus:border-cyan-500/50 focus:outline-none"
                          value={item.description}
                          onChange={(e) => updateItem(idx, "description", e.target.value)}
                          placeholder="Descripción (opcional)"
                        />
                      )}
                      <div className="text-right text-xs text-slate-500">
                        {(item.quantity * item.unitPrice).toFixed(2)} {form.currency}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Pie del documento</h3>
                <textarea
                  value={form.brandFooter}
                  onChange={(e) => setForm({...form, brandFooter: e.target.value})}
                  className="w-full min-h-20 bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-xs resize-none focus:border-cyan-500/50 focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-sm text-slate-400 hover:bg-white/5 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveBudget}
                  disabled={!canCreate || saving}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-medium hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-cyan-500/20"
                >
                  {saving ? "Guardando..." : editingBudget ? "Actualizar" : "Crear presupuesto"}
                </button>
              </div>
            </div>

              {/* RIGHT: Live Preview */}
              <div className="bg-[#0d1117] p-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Eye className="w-3 h-3" /> Vista previa del PDF
                </h3>

                {/* Preview card */}
                <div className="rounded-xl border border-white/10 overflow-hidden shadow-2xl" style={{ backgroundColor: selectedTheme.light }}>
                  {/* Top accent line */}
                  <div className="h-[3px]" style={{ backgroundColor: selectedTheme.primary }} />

                  {/* Header */}
                  <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${selectedTheme.border}` }}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-slate-700 flex items-center justify-center">
                        <span className="text-[8px] text-white font-bold">LT</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold" style={{ color: selectedTheme.text }}>LUMICATECH</p>
                        <p className="text-[7px]" style={{ color: selectedTheme.muted }}>Industrial Systems</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold" style={{ color: selectedTheme.primary }}>PRESUPUESTO</p>
                      <p className="text-[8px]" style={{ color: selectedTheme.muted }}>#{(form.title || "BUDGET").slice(0, 8).toUpperCase()}</p>
                    </div>
                  </div>

                  {/* Client info */}
                  <div className="px-4 py-3">
                    <p className="text-[7px] font-bold uppercase tracking-wider" style={{ color: selectedTheme.muted }}>Cliente</p>
                    <p className="text-[11px] font-bold mt-0.5" style={{ color: selectedTheme.text }}>{form.clientName || "Nombre cliente"}</p>
                    {form.company && <p className="text-[9px]" style={{ color: selectedTheme.muted }}>{form.company}</p>}
                    <p className="text-[8px]" style={{ color: selectedTheme.muted }}>{form.clientEmail || "email@ejemplo.com"}</p>
                    <p className="text-[11px] font-bold mt-2" style={{ color: selectedTheme.text }}>{form.title || "Título del proyecto"}</p>
                  </div>

                  {/* Items table */}
                  <div className="px-4 pb-3">
                    {/* Table header */}
                    <div className="grid grid-cols-12 text-[7px] font-bold uppercase tracking-wider mb-1 px-2 py-1 rounded" style={{ backgroundColor: selectedTheme.dark, color: "#ffffff" }}>
                      <span className="col-span-5">Concepto</span>
                      <span className="col-span-2 text-center">Cant.</span>
                      <span className="col-span-2 text-right">P.Unit</span>
                      <span className="col-span-3 text-right">Total</span>
                    </div>
                    {previewItems.length > 0 ? (
                      previewItems.map((item, i) => (
                        <div key={i} className={`grid grid-cols-12 text-[9px] py-1 px-2 ${i % 2 === 0 ? "" : ""}`} style={{ backgroundColor: i % 2 === 0 ? selectedTheme.surface : selectedTheme.light }}>
                          <div className="col-span-5 font-bold truncate" style={{ color: selectedTheme.text }}>{item.concept}</div>
                          <span className="col-span-2 text-center" style={{ color: selectedTheme.text }}>{item.quantity}</span>
                          <span className="col-span-2 text-right" style={{ color: selectedTheme.muted }}>{item.unitPrice.toFixed(2)}</span>
                          <span className="col-span-3 text-right font-bold" style={{ color: selectedTheme.text }}>{item.total.toFixed(2)}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[9px] text-center py-2" style={{ color: selectedTheme.muted }}>Añade líneas</p>
                    )}
                  </div>

                  {/* Totals */}
                  <div className="px-4 pb-3" style={{ borderTop: `1px solid ${selectedTheme.border}` }}>
                    <div className="flex justify-between text-[9px] py-0.5">
                      <span style={{ color: selectedTheme.muted }}>Subtotal</span>
                      <span style={{ color: selectedTheme.text }}>{previewSubtotal.toFixed(2)} {form.currency}</span>
                    </div>
                    {form.discount > 0 && (
                      <div className="flex justify-between text-[9px] py-0.5">
                        <span style={{ color: selectedTheme.muted }}>Descuento</span>
                        <span style={{ color: selectedTheme.muted }}>-{safeDiscount.toFixed(2)} {form.currency}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[9px] py-0.5">
                      <span style={{ color: selectedTheme.muted }}>IVA ({form.taxPercent}%)</span>
                      <span style={{ color: selectedTheme.text }}>{previewTaxAmount.toFixed(2)} {form.currency}</span>
                    </div>
                    <div className="flex justify-between text-[10px] py-1.5 px-2 mt-1 rounded" style={{ backgroundColor: selectedTheme.primary, color: "#ffffff" }}>
                      <span className="font-bold">TOTAL</span>
                      <span className="font-bold">{previewTotal.toFixed(2)} {form.currency}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  {form.brandFooter && (
                    <div className="px-4 py-2" style={{ borderTop: `1px solid ${selectedTheme.border}` }}>
                      <p className="text-[7px] whitespace-pre-line leading-relaxed" style={{ color: selectedTheme.muted }}>{form.brandFooter}</p>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard label="Total" value={stats.total} accent="from-slate-500 to-slate-600" />
        <StatCard label="Enviados" value={stats.sent} accent="from-cyan-500 to-blue-500" />
        <StatCard label="Aceptados" value={stats.accepted} accent="from-emerald-500 to-teal-500" />
        <StatCard label="Conversión" value={`${stats.conversion}%`} accent="from-indigo-500 to-purple-500" />
        <StatCard label="Importe" value={`${stats.revenue.toFixed(0)}€`} accent="from-amber-500 to-orange-500" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por cliente, email o empresa..."
            className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-cyan-500/50 focus:outline-none transition"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-[#111827] text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as BudgetStatus | "todos")}
              className="bg-transparent outline-none text-slate-300"
            >
              <option value="todos">Todos</option>
              {(["borrador", "enviado", "aceptado", "rechazado", "vencido"] as BudgetStatus[]).map((s) => (
                <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
              ))}
            </select>
          </div>
          <button onClick={() => fetchBudgets(query)} className="px-3 py-2 border border-white/10 rounded-xl text-sm flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-white/5 transition">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={openCreate} className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5">
            <FilePlus2 className="w-4 h-4" />
            Nuevo presupuesto
          </button>
        </div>
      </div>

      {/* Budgets list */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          Cargando cotizaciones...
        </div>
      ) : filteredBudgets.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No hay presupuestos{statusFilter !== "todos" ? " con este filtro" : ""}.</p>
          <button onClick={openCreate} className="mt-3 text-sm text-cyan-400 hover:text-cyan-300">Crear el primero →</button>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredBudgets.map((b) => (
            <BudgetRow
              key={b.id}
              budget={b}
              statusConfig={STATUS_CONFIG[b.status]}
              onStatusChange={(s) => changeStatus(b.id, s)}
              onSend={() => mutate(b.id, "send")}
              onDuplicate={() => mutate(b.id, "duplicate")}
              onDelete={() => mutate(b.id, "delete")}
              onEdit={() => openEdit(b)}
            />
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl border text-sm font-medium shadow-2xl z-50 flex items-center gap-2 ${
          toast.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            : "bg-rose-500/10 border-rose-500/30 text-rose-300"
        }`}>
          {toast.type === "success" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {toast.message}
        </div>
      )}
    </div>
  );
}

/* --- Subcomponents --- */

function StatCard({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div className="bg-[#111827] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-xl font-bold bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>{value}</p>
    </div>
  );
}

function BudgetRow({
  budget, statusConfig, onStatusChange, onSend, onDuplicate, onDelete, onEdit
}: {
  budget: Budget;
  statusConfig: typeof STATUS_CONFIG[BudgetStatus];
  onStatusChange: (s: BudgetStatus) => void;
  onSend: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="bg-[#111827] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all group">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-white truncate">{budget.title}</p>
            <span className={`px-2 py-0.5 rounded-full border text-[11px] flex items-center gap-1 ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}>
              {statusConfig.icon}
              {statusConfig.label}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400 flex-wrap">
            <span className="font-medium text-slate-300">{budget.clientName}</span>
            <span>·</span>
            <span className="truncate">{budget.clientEmail}</span>
            {budget.company && (
              <>
                <span>·</span>
                <span className="truncate">{budget.company}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="text-cyan-300 font-semibold">{budget.finalTotal.toFixed(2)} {budget.currency}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">{new Date(budget.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</span>
            {budget.validUntil && (
              <>
                <span className="text-slate-600">|</span>
                <span className="text-slate-500">Vál. hasta: {new Date(budget.validUntil).toLocaleDateString("es-ES")}</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <select
            value={budget.status}
            onChange={(e) => onStatusChange(e.target.value as BudgetStatus)}
            className="bg-[#1a1f2e] border border-white/5 rounded-lg px-2 py-1.5 text-[11px] text-slate-300 focus:border-cyan-500/50 focus:outline-none"
          >
            {(["borrador", "enviado", "aceptado", "rechazado", "vencido"] as BudgetStatus[]).map((s) => (
              <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
            ))}
          </select>

          <button onClick={onEdit} className="px-2.5 py-1.5 text-[11px] border border-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition">
            Editar
          </button>

          <a href={`/presupuesto/${budget.token}`} target="_blank" rel="noreferrer" className="px-2.5 py-1.5 text-[11px] border border-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            Ver
          </a>

          <a href={`/api/admin/budgets/${budget.id}/pdf`} target="_blank" rel="noreferrer" className="px-2.5 py-1.5 text-[11px] border border-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-500/10 transition flex items-center gap-1">
            <Download className="w-3 h-3" />
            PDF
          </a>

          <button onClick={onSend} className="px-2.5 py-1.5 text-[11px] border border-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/10 transition flex items-center gap-1">
            <Send className="w-3 h-3" />
            Enviar
          </button>

          <button onClick={onDuplicate} className="px-2.5 py-1.5 text-[11px] border border-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition flex items-center gap-1">
            <Copy className="w-3 h-3" />
          </button>

          <button onClick={onDelete} className="px-2.5 py-1.5 text-[11px] border border-rose-500/20 text-rose-300 rounded-lg hover:bg-rose-500/10 transition flex items-center gap-1">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500/50 focus:outline-none transition"
      />
    </div>
  );
}

function NumberField({ label, value, onChange, min, max }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
      <input
        type="number"
        min={min}
        max={max}
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:border-cyan-500/50 focus:outline-none transition"
      />
    </div>
  );
}
