"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Save, ChevronDown } from "lucide-react";
import type { LeadStatus } from "@/src/lib/bookings-store";

interface Booking {
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  time: string;
  meetLink?: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt?: string;
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  nuevo:       { label: "Nuevo",            color: "text-blue-400",   bg: "bg-blue-500/20 border-blue-500/30" },
  contactado:  { label: "Contactado",       color: "text-yellow-400", bg: "bg-yellow-500/20 border-yellow-500/30" },
  propuesta:   { label: "Propuesta enviada",color: "text-purple-400", bg: "bg-purple-500/20 border-purple-500/30" },
  cliente:     { label: "Cliente",          color: "text-green-400",  bg: "bg-green-500/20 border-green-500/30" },
  descartado:  { label: "Descartado",       color: "text-gray-500",   bg: "bg-gray-500/20 border-gray-500/30" },
};

const STATUS_ORDER: LeadStatus[] = ["nuevo", "contactado", "propuesta", "cliente", "descartado"];

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

function LeadCard({ booking, onUpdate }: { booking: Booking; onUpdate: (b: Booking) => void }) {
  const [status, setStatus] = useState<LeadStatus>(booking.status);
  const [notes, setNotes] = useState(booking.notes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const dirty = status !== booking.status || notes !== booking.notes;

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: booking.id, status, notes }),
    });
    setSaving(false);
    if (res.ok) {
      const data = await res.json();
      onUpdate(data.booking);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className={`bg-[#2a2b38] border rounded-xl p-4 space-y-3 transition-colors ${
      status === "cliente" ? "border-green-500/30" :
      status === "descartado" ? "border-white/5 opacity-60" :
      "border-white/10"
    }`}>
      {/* Cabecera */}
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm">{booking.name}</span>
            {booking.company && <span className="text-xs text-gray-400">· {booking.company}</span>}
          </div>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <a href={`mailto:${booking.email}`} className="text-xs text-indigo-400 hover:text-indigo-300">
              {booking.email}
            </a>
            <span className="text-xs text-gray-500">
              {booking.date} · {booking.time}
            </span>
          </div>
          {booking.message && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{booking.message}</p>
          )}
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Estado */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 flex-shrink-0">Estado:</span>
        <div className="relative flex-1 max-w-xs">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as LeadStatus)}
            className="w-full appearance-none bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 pr-7 cursor-pointer"
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Notas */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">Notas internas</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Apuntes sobre la reunión, interés del cliente, próximos pasos..."
          rows={3}
          className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-xs text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">
          {booking.updatedAt
            ? `Actualizado: ${new Date(booking.updatedAt).toLocaleDateString("es-ES")}`
            : `Creado: ${new Date(booking.createdAt).toLocaleDateString("es-ES")}`}
        </span>
        {dirty && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
          >
            <Save className="w-3 h-3" />
            {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar"}
          </button>
        )}
        {!dirty && saved && (
          <span className="text-xs text-green-400">✓ Guardado</span>
        )}
      </div>
    </div>
  );
}

export default function FollowUpTracker() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "todos">("todos");

  const fetch_ = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  function handleUpdate(updated: Booking) {
    setBookings((prev) => prev.map((b) => b.id === updated.id ? updated : b));
  }

  const filtered = filter === "todos"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const counts = STATUS_ORDER.reduce((acc, s) => {
    acc[s] = bookings.filter((b) => b.status === s).length;
    return acc;
  }, {} as Record<LeadStatus, number>);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        Cargando contactos...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Filtros por estado */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setFilter("todos")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
            filter === "todos"
              ? "bg-white/10 text-white border-white/20"
              : "text-gray-400 border-white/10 hover:text-white"
          }`}
        >
          Todos ({bookings.length})
        </button>
        {STATUS_ORDER.map((s) => {
          const cfg = STATUS_CONFIG[s];
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
                filter === s
                  ? `${cfg.bg} ${cfg.color}`
                  : "text-gray-400 border-white/10 hover:text-white"
              }`}
            >
              {cfg.label} {counts[s] > 0 && `(${counts[s]})`}
            </button>
          );
        })}
        <button onClick={fetch_} className="ml-auto text-gray-500 hover:text-white transition p-1.5">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm">
          {filter === "todos" ? "No hay contactos todavía." : `No hay contactos con estado "${STATUS_CONFIG[filter as LeadStatus].label}".`}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <LeadCard key={b.id} booking={b} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}
