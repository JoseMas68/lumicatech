"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, RefreshCw, Settings2, Wrench, CheckCircle2, XCircle, Trash2 } from "lucide-react";

type Service = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  basePrice: number;
  active: boolean;
};

export default function ServicesPanel() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "", category: "", basePrice: 0 });

  async function loadServices() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      setServices(data.services ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  const canCreate = useMemo(() => form.name.trim().length >= 2, [form]);
  const activeCount = services.filter((s) => s.active).length;

  async function createService() {
    if (!canCreate) return;
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ name: "", description: "", category: "", basePrice: 0 });
      loadServices();
    }
  }

  async function toggleService(service: Service) {
    await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: service.id, active: !service.active }),
    });
    loadServices();
  }

  async function removeService(id: string) {
    if (!confirm("¿Eliminar servicio?")) return;
    await fetch("/api/admin/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadServices();
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Servicios</h2>
        <p className="text-sm text-slate-500 mt-1">Catálogo de servicios que aparecen en presupuestos y página web.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard label="Total servicios" value={services.length} icon={<Wrench className="w-4 h-4" />} accent="from-cyan-500 to-blue-500" />
        <StatCard label="Activos" value={activeCount} icon={<CheckCircle2 className="w-4 h-4" />} accent="from-emerald-500 to-green-500" />
        <StatCard label="Inactivos" value={services.length - activeCount} icon={<XCircle className="w-4 h-4" />} accent="from-slate-500 to-slate-600" />
      </div>

      {/* Create form */}
      <div className="bg-[#111827] border border-white/5 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-sm">Nuevo servicio</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormField label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Nombre del servicio" icon={<Wrench className="w-3.5 h-3.5" />} />
          <FormField label="Categoría" value={form.category} onChange={(v) => setForm({ ...form, category: v })} placeholder="Ej: Desarrollo web" icon={<Settings2 className="w-3.5 h-3.5" />} />
          <FormField label="Precio base (€)" value={String(form.basePrice)} onChange={(v) => setForm({ ...form, basePrice: Number(v || 0) })} placeholder="0.00" icon={<span className="text-xs font-bold">€</span>} type="number" />
          <FormField label="Descripción" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Breve descripción" icon={<span className="text-xs">📝</span>} />
        </div>
        <button
          onClick={createService}
          disabled={!canCreate}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-sm font-medium transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Crear servicio
        </button>
      </div>

      {/* Services list */}
      <div className="rounded-xl border border-white/5 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-[#111827]">
          <h3 className="font-semibold text-sm">Catálogo de servicios</h3>
          <button onClick={loadServices} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition">
            <RefreshCw className="w-3 h-3" /> Actualizar
          </button>
        </div>
        {loading ? (
          <div className="px-4 py-8 text-sm text-slate-500 text-center flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" /> Cargando servicios...
          </div>
        ) : services.length === 0 ? (
          <div className="px-4 py-12 text-sm text-slate-500 text-center">
            <Wrench className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            No hay servicios todavía.
          </div>
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {services.map((service) => (
              <div key={service.id} className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/[0.02] transition group">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold truncate">{service.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      service.active
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                    }`}>
                      {service.active ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {service.category || "Sin categoría"} · {service.basePrice.toFixed(2)} EUR
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleService(service)}
                    className={`px-2.5 py-1 text-[10px] rounded-lg transition ${
                      service.active
                        ? "text-emerald-400 hover:bg-emerald-500/10"
                        : "text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    {service.active ? "Desactivar" : "Activar"}
                  </button>
                  <button
                    onClick={() => removeService(service.id)}
                    className="px-2.5 py-1 text-[10px] rounded-lg text-rose-400 hover:bg-rose-500/10 transition"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, accent }: { label: string; value: number; icon: React.ReactNode; accent: string }) {
  return (
    <div className="bg-[#111827] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${accent} grid place-items-center text-white`}>
          {icon}
        </div>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, icon, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; icon: React.ReactNode; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5 flex items-center gap-1.5">{icon}{label}</label>
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
