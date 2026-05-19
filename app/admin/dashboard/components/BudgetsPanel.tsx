"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Copy, Eye, FilePlus2, Filter, FileDown, RefreshCw, Send, Trash2 } from "lucide-react";
import { BUDGET_TEMPLATES, DEFAULT_BUDGET_FOOTER, DEFAULT_BUDGET_TEMPLATE, getTemplateTheme, type BudgetTemplateId } from "@/src/lib/budget-branding";

type BudgetStatus = "borrador" | "enviado" | "aceptado" | "rechazado" | "vencido";

type BudgetItem = {
  id?: string;
  concept: string;
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
  currency: string;
  status: BudgetStatus;
  createdAt: string;
  template: BudgetTemplateId;
  brandFooter?: string;
};

const STATUS_OPTIONS: BudgetStatus[] = ["borrador", "enviado", "aceptado", "rechazado", "vencido"];

export default function BudgetsPanel() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BudgetStatus | "todos">("todos");
  const [newBudget, setNewBudget] = useState({
    clientName: "",
    clientEmail: "",
    company: "",
    title: "Propuesta de servicios",
    notes: "",
    taxPercent: 21,
    discount: 0,
    template: DEFAULT_BUDGET_TEMPLATE as BudgetTemplateId,
    brandFooter: DEFAULT_BUDGET_FOOTER,
    items: [{ concept: "Servicio principal", quantity: 1, unitPrice: 0 }] as BudgetItem[],
  });

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

  const totalPresupuestado = useMemo(() => budgets.reduce((acc, b) => acc + (b.finalTotal || 0), 0), [budgets]);
  const accepted = useMemo(() => budgets.filter((b) => b.status === "aceptado").length, [budgets]);
  const conversion = budgets.length > 0 ? ((accepted / budgets.length) * 100).toFixed(1) : "0.0";
  const filteredBudgets = useMemo(() => {
    if (statusFilter === "todos") return budgets;
    return budgets.filter((b) => b.status === statusFilter);
  }, [budgets, statusFilter]);
  const canCreate = useMemo(() => {
    const hasName = newBudget.clientName.trim().length >= 2;
    const hasEmail = newBudget.clientEmail.includes("@");
    const hasTitle = newBudget.title.trim().length >= 3;
    const hasValidItem = newBudget.items.some((item) => item.concept.trim().length > 0);
    return hasName && hasEmail && hasTitle && hasValidItem;
  }, [newBudget]);

  async function createBudget() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBudget),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "No se pudo crear");
        return;
      }
      setNewBudget({
        clientName: "",
        clientEmail: "",
        company: "",
        title: "Propuesta de servicios",
        notes: "",
        taxPercent: 21,
        discount: 0,
        template: DEFAULT_BUDGET_TEMPLATE,
        brandFooter: DEFAULT_BUDGET_FOOTER,
        items: [{ concept: "Servicio principal", quantity: 1, unitPrice: 0 }],
      });
      fetchBudgets(query);
    } finally {
      setSaving(false);
    }
  }

  async function mutate(id: string, action: "delete" | "duplicate" | "send") {
    if (action === "delete") {
      if (!confirm("¿Eliminar presupuesto?")) return;
      await fetch("/api/admin/budgets", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      fetchBudgets(query);
      return;
    }
    const payload = action === "duplicate"
      ? { id, action: "duplicate" }
      : { id, action: "status", status: "enviado" };
    await fetch("/api/admin/budgets", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
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

  function updateItem(idx: number, key: keyof BudgetItem, value: string) {
    const items = [...newBudget.items];
    items[idx] = { ...items[idx], [key]: key === "concept" ? value : Number(value) };
    setNewBudget({ ...newBudget, items });
  }

  const previewItems = useMemo(
    () => newBudget.items.filter((item) => item.concept.trim()).map((item) => ({
      ...item,
      total: Math.max(0, item.quantity) * Math.max(0, item.unitPrice),
    })),
    [newBudget.items]
  );

  const previewSubtotal = useMemo(() => previewItems.reduce((acc, item) => acc + item.total, 0), [previewItems]);
  const safeDiscount = Math.min(Math.max(0, Number(newBudget.discount) || 0), previewSubtotal);
  const previewTaxAmount = Math.max(0, ((previewSubtotal - safeDiscount) * Math.max(0, Number(newBudget.taxPercent) || 0)) / 100);
  const previewTotal = previewSubtotal - safeDiscount + previewTaxAmount;
  const selectedTemplate = getTemplateTheme(newBudget.template);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Stat label="Total" value={budgets.length} />
        <Stat label="Enviados" value={budgets.filter((b) => b.status === "enviado").length} />
        <Stat label="Aceptados" value={accepted} />
        <Stat label="Conversion" value={`${conversion}%`} />
        <Stat label="Importe" value={`${totalPresupuestado.toFixed(2)} EUR`} />
      </div>

      <div className="grid xl:grid-cols-[1.2fr_1fr] gap-4">
      <div className="bg-[#101425] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-sm">Crear propuesta</h3>
          <button onClick={createBudget} disabled={saving || !canCreate} className="px-3 py-2 text-xs bg-cyan-600 hover:bg-cyan-500 rounded-lg flex items-center gap-1.5 disabled:opacity-50">
            <FilePlus2 className="w-3 h-3" />{saving ? "Creando..." : "Crear presupuesto"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-2">
          <Input placeholder="Cliente" value={newBudget.clientName} onChange={(v) => setNewBudget({ ...newBudget, clientName: v })} />
          <Input placeholder="Email" value={newBudget.clientEmail} onChange={(v) => setNewBudget({ ...newBudget, clientEmail: v })} />
          <Input placeholder="Empresa" value={newBudget.company} onChange={(v) => setNewBudget({ ...newBudget, company: v })} />
          <Input placeholder="Título" value={newBudget.title} onChange={(v) => setNewBudget({ ...newBudget, title: v })} />
        </div>

        <textarea
          value={newBudget.notes}
          onChange={(e) => setNewBudget({ ...newBudget, notes: e.target.value })}
          placeholder="Notas internas o alcance del proyecto"
          className="w-full min-h-20 bg-[#0a0f1e] border border-white/10 rounded-lg px-3 py-2 text-sm"
        />

        <div className="grid md:grid-cols-2 gap-2">
          <label className="text-xs text-slate-300 space-y-1">
            <span>Impuestos (%)</span>
            <input type="number" min={0} value={newBudget.taxPercent} onChange={(e) => setNewBudget({ ...newBudget, taxPercent: Number(e.target.value || 0) })} className="w-full bg-[#0a0f1e] border border-white/10 rounded-lg px-3 py-2 text-sm" />
          </label>
          <label className="text-xs text-slate-300 space-y-1">
            <span>Descuento</span>
            <input type="number" min={0} value={newBudget.discount} onChange={(e) => setNewBudget({ ...newBudget, discount: Number(e.target.value || 0) })} className="w-full bg-[#0a0f1e] border border-white/10 rounded-lg px-3 py-2 text-sm" />
          </label>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Plantillas</p>
          <div className="grid sm:grid-cols-3 gap-2">
            {BUDGET_TEMPLATES.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setNewBudget({ ...newBudget, template: template.id })}
                className={`rounded-xl border p-3 text-left transition ${newBudget.template === template.id ? "border-cyan-400 bg-cyan-500/10" : "border-white/10 bg-[#0a0f1e]"}`}
              >
                <p className="text-xs text-cyan-300">{template.badge}</p>
                <p className="text-sm font-semibold mt-1">{template.name}</p>
                <p className="text-xs text-slate-400 mt-1">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-slate-300">Pie profesional Lumicatech</p>
          <textarea
            value={newBudget.brandFooter}
            onChange={(e) => setNewBudget({ ...newBudget, brandFooter: e.target.value })}
            className="w-full min-h-24 bg-[#0a0f1e] border border-white/10 rounded-lg px-3 py-2 text-xs"
          />
        </div>

        <div className="space-y-2">
          {newBudget.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2">
              <input className="col-span-6 bg-[#0a0f1e] border border-white/10 rounded-lg px-2 py-2 text-xs" value={item.concept} onChange={(e) => updateItem(idx, "concept", e.target.value)} placeholder="Concepto" />
              <input className="col-span-2 bg-[#0a0f1e] border border-white/10 rounded-lg px-2 py-2 text-xs" type="number" min={0} value={item.quantity} onChange={(e) => updateItem(idx, "quantity", e.target.value)} placeholder="Ud" />
              <input className="col-span-3 bg-[#0a0f1e] border border-white/10 rounded-lg px-2 py-2 text-xs" type="number" min={0} value={item.unitPrice} onChange={(e) => updateItem(idx, "unitPrice", e.target.value)} placeholder="Precio" />
              <button className="col-span-1 text-red-400 text-xs" onClick={() => setNewBudget({ ...newBudget, items: newBudget.items.filter((_, i) => i !== idx) })}>×</button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          <button onClick={() => setNewBudget({ ...newBudget, items: [...newBudget.items, { concept: "", quantity: 1, unitPrice: 0 }] })} className="px-3 py-1.5 text-xs border border-white/10 rounded-lg">Añadir línea</button>
          {!canCreate && <p className="text-xs text-amber-300">Faltan datos obligatorios para crear.</p>}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0f1426]">
        <div className={`p-4 bg-gradient-to-br ${selectedTemplate.panel}`}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Vista previa</p>
          <h4 className="text-lg font-bold mt-1">{newBudget.title || "Propuesta de servicios"}</h4>
          <p className="text-xs text-slate-300 mt-1">{newBudget.clientName || "Cliente"} · {newBudget.clientEmail || "email@cliente.com"}</p>
        </div>
        <div className="p-4 space-y-3">
          {previewItems.slice(0, 4).map((item, index) => (
            <div key={`${item.concept}-${index}`} className="grid grid-cols-12 text-xs gap-2">
              <span className="col-span-6 truncate">{item.concept}</span>
              <span className="col-span-2 text-slate-300">{item.quantity} ud</span>
              <span className="col-span-2 text-slate-300">{item.unitPrice.toFixed(2)} EUR</span>
              <span className="col-span-2 text-right">{item.total.toFixed(2)} EUR</span>
            </div>
          ))}
          {previewItems.length === 0 && <p className="text-xs text-slate-400">Añade al menos una linea para ver detalle.</p>}
          <div className="border-t border-white/10 pt-3 text-xs space-y-1">
            <PreviewLine label="Subtotal" value={`${previewSubtotal.toFixed(2)} EUR`} />
            <PreviewLine label={`Impuestos (${Number(newBudget.taxPercent) || 0}%)`} value={`${previewTaxAmount.toFixed(2)} EUR`} />
            <PreviewLine label="Descuento" value={`${safeDiscount.toFixed(2)} EUR`} />
            <PreviewLine label="Total" value={`${previewTotal.toFixed(2)} EUR`} strong />
          </div>
          <div className="text-[11px] text-slate-400 whitespace-pre-line border-t border-white/10 pt-3">
            {newBudget.brandFooter || DEFAULT_BUDGET_FOOTER}
          </div>
        </div>
      </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por cliente, email o empresa" className="flex-1 bg-[#0a0f1e] border border-white/10 rounded-lg px-3 py-2 text-sm" />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-[#0a0f1e] text-xs">
            <Filter className="w-3 h-3" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as BudgetStatus | "todos")} className="bg-transparent outline-none">
              <option value="todos">Todos</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={() => fetchBudgets(query)} className="px-3 py-2 border border-white/10 rounded-lg text-sm flex items-center gap-1.5"><RefreshCw className="w-4 h-4" />Actualizar</button>
        </div>
      </div>

      {loading ? <p className="text-gray-400 text-sm">Cargando cotizaciones...</p> : (
        <div className="space-y-2">
          {filteredBudgets.map((b) => (
            <div key={b.id} className="bg-[#0e1324] border border-white/10 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-white truncate">{b.title}</p>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-xs text-gray-400 truncate mt-1">{b.clientName} · {b.clientEmail}{b.company ? ` · ${b.company}` : ""}</p>
                <p className="text-xs text-cyan-300 mt-1">{b.finalTotal.toFixed(2)} {b.currency} · {new Date(b.createdAt).toLocaleDateString("es-ES")}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <select value={b.status} onChange={(e) => changeStatus(b.id, e.target.value as BudgetStatus)} className="bg-[#1a1b24] border border-white/10 rounded-lg px-2 py-1.5 text-xs">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <a href={`/presupuesto/${b.token}`} target="_blank" rel="noreferrer" className="px-2 py-1.5 text-xs border border-white/10 rounded-lg">Ver link</a>
                <a href={`/presupuesto/${b.token}`} target="_blank" rel="noreferrer" className="px-2 py-1.5 text-xs border border-white/10 rounded-lg flex items-center gap-1"><Eye className="w-3 h-3" />Preview</a>
                <a href={`/api/admin/budgets/${b.id}/pdf`} target="_blank" rel="noreferrer" className="px-2 py-1.5 text-xs border border-emerald-500/40 text-emerald-300 rounded-lg flex items-center gap-1"><FileDown className="w-3 h-3" />PDF</a>
                <button onClick={() => mutate(b.id, "send")} className="px-2 py-1.5 text-xs border border-indigo-500/40 text-indigo-300 rounded-lg flex items-center gap-1"><Send className="w-3 h-3" />Enviar</button>
                <button onClick={() => mutate(b.id, "duplicate")} className="px-2 py-1.5 text-xs border border-white/10 rounded-lg flex items-center gap-1"><Copy className="w-3 h-3" />Duplicar</button>
                <button onClick={() => mutate(b.id, "delete")} className="px-2 py-1.5 text-xs border border-red-500/40 text-red-300 rounded-lg flex items-center gap-1"><Trash2 className="w-3 h-3" />Borrar</button>
              </div>
            </div>
          ))}
          {filteredBudgets.length === 0 && <p className="text-gray-500 text-sm">No hay cotizaciones en este filtro.</p>}
        </div>
      )}
    </div>
  );
}

function PreviewLine({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className={strong ? "text-white font-semibold" : "text-slate-300"}>{label}</span>
      <span className={strong ? "text-white font-semibold" : "text-slate-100"}>{value}</span>
    </div>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm" />;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[#101425] rounded-xl p-4 border border-white/10 text-center">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: BudgetStatus }) {
  const styles: Record<BudgetStatus, string> = {
    borrador: "bg-slate-500/20 text-slate-300 border-slate-400/30",
    enviado: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
    aceptado: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    rechazado: "bg-rose-500/20 text-rose-300 border-rose-400/30",
    vencido: "bg-amber-500/20 text-amber-300 border-amber-400/30",
  };
  return <span className={`px-2 py-0.5 rounded-full border text-[11px] ${styles[status]}`}>{status}</span>;
}
