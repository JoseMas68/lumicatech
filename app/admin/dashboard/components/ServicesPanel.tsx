"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, RefreshCw, Settings2, Trash2, Wrench } from "lucide-react";

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
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Metric icon={<Wrench className="w-4 h-4" />} label="Servicios" value={services.length} />
        <Metric icon={<Settings2 className="w-4 h-4" />} label="Activos" value={services.filter((s) => s.active).length} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#242634] p-4 space-y-3">
        <h3 className="font-semibold">Nuevo servicio</h3>
        <div className="grid md:grid-cols-2 gap-2">
          <Input value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Nombre" />
          <Input value={form.category} onChange={(value) => setForm({ ...form, category: value })} placeholder="Categoria" />
          <Input value={String(form.basePrice)} onChange={(value) => setForm({ ...form, basePrice: Number(value || 0) })} placeholder="Precio base" type="number" />
          <Input value={form.description} onChange={(value) => setForm({ ...form, description: value })} placeholder="Descripcion" />
        </div>
        <button onClick={createService} disabled={!canCreate} className="px-3 py-2 rounded-lg bg-fuchsia-600 disabled:opacity-50 text-sm inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Crear servicio
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1f2230] overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold text-sm">Catalogo de servicios</h3>
          <button onClick={loadServices} className="text-xs text-gray-300 inline-flex items-center gap-1"><RefreshCw className="w-3 h-3" />Actualizar</button>
        </div>
        {loading ? (
          <div className="px-4 py-8 text-sm text-gray-400">Cargando servicios...</div>
        ) : services.length === 0 ? (
          <div className="px-4 py-8 text-sm text-gray-400">No hay servicios todavia.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {services.map((service) => (
              <div key={service.id} className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{service.name}</p>
                  <p className="text-xs text-gray-400 truncate">{service.category || "Sin categoria"} · {service.basePrice.toFixed(2)} EUR</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleService(service)} className={`px-2 py-1.5 text-xs rounded border ${service.active ? "border-emerald-500/30 text-emerald-300" : "border-white/20 text-gray-300"}`}>
                    {service.active ? "Activo" : "Inactivo"}
                  </button>
                  <button onClick={() => removeService(service.id)} className="px-2 py-1.5 text-xs rounded border border-red-500/30 text-red-300 inline-flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Borrar
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

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (value: string) => void; placeholder: string; type?: string }) {
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="rounded-lg border border-white/10 bg-[#151722] px-3 py-2 text-sm" />;
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#242634] p-3">
      <div className="text-gray-400 text-xs inline-flex items-center gap-1">{icon}{label}</div>
      <div className="text-lg font-bold mt-1">{value}</div>
    </div>
  );
}
