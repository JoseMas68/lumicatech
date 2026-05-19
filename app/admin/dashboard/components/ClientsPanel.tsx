"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Plus, RefreshCw, Trash2, Users } from "lucide-react";

type Client = {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  taxId?: string;
};

export default function ClientsPanel() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "" });

  async function loadClients() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      setClients(data.clients ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  const canCreate = useMemo(() => form.name.trim().length >= 2 && form.email.includes("@"), [form]);

  async function createClient() {
    if (!canCreate) return;
    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ name: "", email: "", company: "", phone: "" });
      loadClients();
    }
  }

  async function removeClient(id: string) {
    if (!confirm("¿Eliminar cliente?")) return;
    await fetch("/api/admin/clients", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadClients();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Metric icon={<Users className="w-4 h-4" />} label="Clientes" value={clients.length} />
        <Metric icon={<Building2 className="w-4 h-4" />} label="Empresas" value={clients.filter((c) => !!c.company).length} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#242634] p-4 space-y-3">
        <h3 className="font-semibold">Nuevo cliente</h3>
        <div className="grid md:grid-cols-2 gap-2">
          <Input value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Nombre" />
          <Input value={form.email} onChange={(value) => setForm({ ...form, email: value })} placeholder="Email" />
          <Input value={form.company} onChange={(value) => setForm({ ...form, company: value })} placeholder="Empresa" />
          <Input value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} placeholder="Telefono" />
        </div>
        <button onClick={createClient} disabled={!canCreate} className="px-3 py-2 rounded-lg bg-sky-600 disabled:opacity-50 text-sm inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Crear cliente
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1f2230] overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold text-sm">Base de clientes</h3>
          <button onClick={loadClients} className="text-xs text-gray-300 inline-flex items-center gap-1"><RefreshCw className="w-3 h-3" />Actualizar</button>
        </div>
        {loading ? (
          <div className="px-4 py-8 text-sm text-gray-400">Cargando clientes...</div>
        ) : clients.length === 0 ? (
          <div className="px-4 py-8 text-sm text-gray-400">No hay clientes todavia.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {clients.map((client) => (
              <div key={client.id} className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{client.name}</p>
                  <p className="text-xs text-gray-400 truncate">{client.email}{client.company ? ` · ${client.company}` : ""}</p>
                </div>
                <button onClick={() => removeClient(client.id)} className="px-2 py-1.5 text-xs rounded border border-red-500/30 text-red-300 inline-flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Borrar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="rounded-lg border border-white/10 bg-[#151722] px-3 py-2 text-sm" />;
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#242634] p-3">
      <div className="text-gray-400 text-xs inline-flex items-center gap-1">{icon}{label}</div>
      <div className="text-lg font-bold mt-1">{value}</div>
    </div>
  );
}
