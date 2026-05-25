"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Building2, Plus, RefreshCw, Trash2, Users, Search, X, Check,
  Mail, Phone, MapPin, IdCard, FileText
} from "lucide-react";

type Client = {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  taxId?: string;
  address?: string;
  notes?: string;
  createdAt?: string;
};

export default function ClientsPanel() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "", taxId: "", address: "", notes: "",
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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

  useEffect(() => { loadClients(); }, []);

  const filteredClients = useMemo(() => {
    if (!query.trim()) return clients;
    const q = query.toLowerCase();
    return clients.filter((c) =>
      [c.name, c.email, c.company || "", c.phone || "", c.taxId || ""].some((f) => f.toLowerCase().includes(q))
    );
  }, [clients, query]);

  const stats = useMemo(() => ({
    total: clients.length,
    companies: clients.filter((c) => !!c.company).length,
  }), [clients]);

  const resetForm = () => {
    setForm({ name: "", email: "", company: "", phone: "", taxId: "", address: "", notes: "" });
    setEditingClient(null);
  };

  const openCreate = () => { resetForm(); setShowModal(true); };

  const openEdit = (client: Client) => {
    setEditingClient(client);
    setForm({
      name: client.name,
      email: client.email,
      company: client.company || "",
      phone: client.phone || "",
      taxId: client.taxId || "",
      address: client.address || "",
      notes: client.notes || "",
    });
    setShowModal(true);
  };

  const canCreate = form.name.trim().length >= 2 && form.email.includes("@");

  async function saveClient() {
    if (!canCreate) return;
    const isEdit = !!editingClient;
    const res = await fetch("/api/admin/clients", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(isEdit ? { id: editingClient!.id } : {}),
        ...form,
      }),
    });
    if (res.ok) {
      showToast(isEdit ? "Cliente actualizado ✓" : "Cliente creado ✓");
      setShowModal(false);
      resetForm();
      loadClients();
    } else {
      showToast("Error al guardar", "error");
    }
  }

  async function removeClient(id: string) {
    if (!confirm("¿Eliminar cliente?")) return;
    await fetch("/api/admin/clients", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    showToast("Cliente eliminado");
    loadClients();
  }

  // Modal
  if (showModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-bold">{editingClient ? "Editar cliente" : "Nuevo cliente"}</h2>
            <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-white/5 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <FormField label="Nombre *" value={form.name} onChange={(v) => setForm({...form, name: v})} placeholder="Nombre completo" icon={<Users className="w-3.5 h-3.5" />} />
            <FormField label="Email *" value={form.email} onChange={(v) => setForm({...form, email: v})} placeholder="email@ejemplo.com" icon={<Mail className="w-3.5 h-3.5" />} type="email" />
            <FormField label="Empresa" value={form.company} onChange={(v) => setForm({...form, company: v})} placeholder="Nombre empresa" icon={<Building2 className="w-3.5 h-3.5" />} />
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Teléfono" value={form.phone} onChange={(v) => setForm({...form, phone: v})} placeholder="+34 600 000 000" icon={<Phone className="w-3.5 h-3.5" />} />
              <FormField label="NIF/CIF" value={form.taxId} onChange={(v) => setForm({...form, taxId: v})} placeholder="B12345678" icon={<IdCard className="w-3.5 h-3.5" />} />
            </div>
            <FormField label="Dirección" value={form.address} onChange={(v) => setForm({...form, address: v})} placeholder="Calle, ciudad..." icon={<MapPin className="w-3.5 h-3.5" />} />
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Notas</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({...form, notes: e.target.value})}
                placeholder="Notas internas..."
                className="w-full min-h-16 bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-2.5 text-sm resize-none focus:border-cyan-500/50 focus:outline-none transition"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 hover:bg-white/5 transition">
                Cancelar
              </button>
              <button onClick={saveClient} disabled={!canCreate} className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-medium hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 transition shadow-lg shadow-cyan-500/20">
                {editingClient ? "Actualizar" : "Crear cliente"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard label="Total clientes" value={stats.total} icon={<Users className="w-4 h-4" />} accent="from-cyan-500 to-blue-500" />
        <StatCard label="Con empresa" value={stats.companies} icon={<Building2 className="w-4 h-4" />} accent="from-indigo-500 to-purple-500" />
        <div className="bg-[#111827] border border-white/5 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 grid place-items-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Base de datos</p>
            <p className="text-xs text-slate-400">{clients.length} registros</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cliente, email, empresa, NIF..."
            className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-cyan-500/50 focus:outline-none transition"
          />
        </div>
        <button onClick={loadClients} className="px-3 py-2 border border-white/10 rounded-xl text-sm flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-white/5 transition">
          <RefreshCw className="w-4 h-4" />
        </button>
        <button onClick={openCreate} className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          Nuevo cliente
        </button>
      </div>

      {/* Client list */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          Cargando clientes...
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No hay clientes{query ? " con esta búsqueda" : ""}.</p>
          <button onClick={openCreate} className="mt-3 text-sm text-cyan-400 hover:text-cyan-300">Crear el primero →</button>
        </div>
      ) : (
        <div className="rounded-xl border border-white/5 overflow-hidden">
          {/* Table header */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-4 py-3 bg-[#111827] border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
            <span className="col-span-3">Cliente</span>
            <span className="col-span-3">Email</span>
            <span className="col-span-2">Empresa</span>
            <span className="col-span-2">Teléfono</span>
            <span className="col-span-2 text-right">Acciones</span>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {filteredClients.map((client) => (
              <div key={client.id} className="px-4 py-3 hover:bg-white/[0.02] transition group">
                {/* Mobile layout */}
                <div className="sm:hidden space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{client.name}</p>
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(client)} className="px-2 py-1 text-[10px] border border-white/10 rounded text-slate-400 hover:text-white">Editar</button>
                      <button onClick={() => removeClient(client.id)} className="px-2 py-1 text-[10px] border border-rose-500/20 text-rose-300 rounded">Borrar</button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">{client.email}</p>
                  {client.company && <p className="text-xs text-slate-500">{client.company}</p>}
                  {client.phone && <p className="text-xs text-slate-500">{client.phone}</p>}
                </div>
                {/* Desktop layout */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-3 items-center">
                  <div className="col-span-3 min-w-0">
                    <p className="text-sm font-medium truncate">{client.name}</p>
                    {client.taxId && <p className="text-[10px] text-slate-500">NIF: {client.taxId}</p>}
                  </div>
                  <div className="col-span-3 min-w-0">
                    <p className="text-xs text-slate-300 truncate">{client.email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-400 truncate">{client.company || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-400 truncate">{client.phone || "—"}</p>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(client)} className="px-2.5 py-1 text-[10px] border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition">Editar</button>
                    <button onClick={() => removeClient(client.id)} className="px-2.5 py-1 text-[10px] border border-rose-500/20 text-rose-300 rounded-lg hover:bg-rose-500/10 transition">Borrar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

function StatCard({ label, value, icon, accent }: { label: string; value: number; icon: React.ReactNode; accent: string }) {
  return (
    <div className="bg-[#111827] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${accent} grid place-items-center`}>
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
