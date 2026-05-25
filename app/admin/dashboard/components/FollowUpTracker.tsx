"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  RefreshCw, Save, ChevronDown, Search, User, Mail, Building2,
  MessageSquare, Calendar, Clock, TrendingUp, Users, CheckCircle2,
  XCircle, Filter, ArrowUpDown, History, Phone, ExternalLink,
  Sparkles, Target, Zap
} from "lucide-react";
import type { LeadStatus } from "@/src/lib/bookings-store";

// ============================================
// Types
// ============================================

interface Booking {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  date: string;
  time: string;
  meetLink?: string;
  consentGiven: boolean;
  consentAt: string;
  reminderSent: boolean;
  createdAt: string;
  status: LeadStatus;
  notes: string;
  updatedAt?: string;
}

type SortField = "name" | "date" | "createdAt" | "status";
type SortDir = "asc" | "desc";

const STATUS_CONFIG: Record<LeadStatus, {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  order: number;
}> = {
  nuevo: {
    label: "Nuevo",
    color: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    icon: <Sparkles className="w-3 h-3" />,
    order: 0,
  },
  contactado: {
    label: "Contactado",
    color: "text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: <Mail className="w-3 h-3" />,
    order: 1,
  },
  propuesta: {
    label: "Propuesta",
    color: "text-purple-300",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    icon: <Target className="w-3 h-3" />,
    order: 2,
  },
  cliente: {
    label: "Cliente",
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: <CheckCircle2 className="w-3 h-3" />,
    order: 3,
  },
  descartado: {
    label: "Descartado",
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
    icon: <XCircle className="w-3 h-3" />,
    order: 4,
  },
};

const STATUS_ORDER: LeadStatus[] = ["nuevo", "contactado", "propuesta", "cliente", "descartado"];

// ============================================
// Stats Bar
// ============================================

function StatsBar({ bookings }: { bookings: Booking[] }) {
  const total = bookings.length;
  const active = bookings.filter((b) => b.status !== "descartado").length;
  const converted = bookings.filter((b) => b.status === "cliente").length;
  const rate = total > 0 ? ((converted / active) * 100).toFixed(1) : "0.0";
  const newToday = bookings.filter((b) => {
    const d = new Date(b.createdAt);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;

  const stats = [
    { label: "Total Leads", value: total, icon: <Users className="w-4 h-4" />, accent: "from-slate-500 to-slate-600" },
    { label: "Activos", value: active, icon: <Zap className="w-4 h-4" />, accent: "from-cyan-500 to-blue-500" },
    { label: "Convertidos", value: converted, icon: <CheckCircle2 className="w-4 h-4" />, accent: "from-emerald-500 to-teal-500" },
    { label: "Tasa", value: `${rate}%`, icon: <TrendingUp className="w-4 h-4" />, accent: "from-amber-500 to-orange-500" },
    { label: "Hoy", value: newToday, icon: <Calendar className="w-4 h-4" />, accent: "from-indigo-500 to-violet-500" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-[#111827] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.accent} grid place-items-center`}>
              {s.icon}
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
          </div>
          <p className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Status Badge
// ============================================

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${cfg.bg} ${cfg.color}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

// ============================================
// Timeline Entry
// ============================================

interface TimelineEntry {
  status: LeadStatus;
  timestamp: string;
}

function StatusTimeline({ history }: { history: TimelineEntry[] }) {
  if (history.length <= 1) return null;

  return (
    <div className="mt-3 pt-3 border-t border-white/5">
      <div className="flex items-center gap-1.5 mb-2">
        <History className="w-3 h-3 text-slate-500" />
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Historial</span>
      </div>
      <div className="space-y-1.5">
        {history.slice().reverse().map((entry, idx) => {
          const cfg = STATUS_CONFIG[entry.status];
          const isLast = idx === 0;
          return (
            <div key={idx} className={`flex items-center gap-2 text-xs ${isLast ? cfg.color : "text-slate-500"}`}>
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isLast ? cfg.bg.replace("/20", "/50") : "bg-slate-600"}`} />
              <span className="flex-1 font-medium">{cfg.label}</span>
              <span className="text-[10px] text-slate-600">
                {new Date(entry.timestamp).toLocaleDateString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// Lead Card
// ============================================

function LeadCard({ booking, onUpdate }: { booking: Booking; onUpdate: (b: Booking) => void }) {
  const [status, setStatus] = useState<LeadStatus>(booking.status);
  const [notes, setNotes] = useState(booking.notes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<ReturnType<typeof setTimeout>>();

  const dirty = status !== booking.status || notes !== booking.notes;

  const statusHistory: TimelineEntry[] = useMemo(() => {
    const history: TimelineEntry[] = [{ status: booking.status, timestamp: booking.updatedAt || booking.createdAt }];
    // We only have current state, so we show a simplified timeline
    return history;
  }, [booking.status, booking.updatedAt, booking.createdAt]);

  // Auto-save after 1.5s of inactivity
  useEffect(() => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    if (!dirty) return;

    const timer = setTimeout(async () => {
      await handleSave(true);
    }, 1500);
    setAutoSaveTimer(timer);

    return () => clearTimeout(timer);
  }, [status, notes]);

  async function handleSave(silent = false) {
    if (!dirty) return;
    if (!silent) setSaving(true);

    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: booking.id, status, notes }),
    });

    if (res.ok) {
      const data = await res.json();
      onUpdate(data.booking);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    if (!silent) setSaving(false);
  }

  const isConverted = status === "cliente";
  const isDiscarded = status === "descartado";

  return (
    <div className={`bg-[#111827] border rounded-xl transition-all duration-200 group ${
      isConverted ? "border-emerald-500/20" :
      isDiscarded ? "border-white/5 opacity-50" :
      "border-white/5 hover:border-white/10"
    }`}>
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-white text-sm">{booking.name}</span>
              {booking.company && (
                <span className="text-[10px] bg-white/5 text-slate-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Building2 className="w-3 h-3" />{booking.company}
                </span>
              )}
              <StatusBadge status={status} />
            </div>

            <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs">
              <a href={`mailto:${booking.email}`} className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors">
                <Mail className="w-3 h-3" />{booking.email}
              </a>
              {booking.phone && (
                <a href={`tel:${booking.phone}`} className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors">
                  <Phone className="w-3 h-3" />{booking.phone}
                </a>
              )}
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />{booking.date}
              </span>
              <span className="text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />{booking.time}
              </span>
              {booking.meetLink && (
                <a href={booking.meetLink} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                  <ExternalLink className="w-3 h-3" />Meet
                </a>
              )}
            </div>

            {booking.message && (
              <div className="mt-2 flex items-start gap-1.5">
                <MessageSquare className="w-3 h-3 text-slate-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-500 line-clamp-1">{booking.message}</p>
              </div>
            )}

            {/* Consent indicator */}
            <div className="mt-1.5 flex items-center gap-1.5">
              {booking.consentGiven ? (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />Consentimiento · {new Date(booking.consentAt).toLocaleDateString("es-ES")}
                </span>
              ) : (
                <span className="text-[10px] text-rose-400 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />Sin consentimiento
                </span>
              )}
              {booking.reminderSent && (
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  · Recordatorio enviado
                </span>
              )}
            </div>
          </div>

          {/* Expand button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex-shrink-0 p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all ${expanded ? "rotate-180" : ""}`}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Expanded section */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
            {/* Status selector */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <Target className="w-3 h-3" />Estado del lead
              </label>
              <div className="flex flex-wrap gap-2">
                {STATUS_ORDER.map((s) => {
                  const cfg = STATUS_CONFIG[s];
                  const isActive = s === status;
                  return (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        isActive
                          ? `${cfg.bg} ${cfg.color} ${cfg.border} shadow-sm`
                          : "text-slate-500 border-white/5 hover:text-slate-300 hover:border-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {cfg.icon}
                        {cfg.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3" />Notas internas
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Apuntes sobre la reunión, interés del cliente, próximos pasos..."
                rows={4}
                className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-xs text-gray-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition resize-none"
              />
            </div>

            {/* Timeline */}
            <StatusTimeline history={statusHistory} />

            {/* Meta */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-[10px] text-slate-600">
                Creado: {new Date(booking.createdAt).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
                {booking.updatedAt && (
                  <span className="ml-2">· Actualizado: {new Date(booking.updatedAt).toLocaleDateString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                )}
              </span>
              <div className="flex items-center gap-2">
                {saved && (
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />Guardado
                  </span>
                )}
                {saving && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />Guardando...
                  </span>
                )}
                {dirty && !saving && (
                  <button
                    onClick={() => handleSave(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-medium rounded-lg transition shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500"
                  >
                    <Save className="w-3 h-3" />
                    Guardar cambios
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function FollowUpTracker() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "todos">("todos");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const fetch_ = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  function handleUpdate(updated: Booking) {
    setBookings((prev) => prev.map((b) => b.id === updated.id ? updated : b));
  }

  // Filter + Search + Sort
  const processed = useMemo(() => {
    let result = filter === "todos" ? bookings : bookings.filter((b) => b.status === filter);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((b) =>
        [b.name, b.email, b.company || "", b.message || ""].some((f) => f.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "date": cmp = a.date.localeCompare(b.date); break;
        case "status": cmp = STATUS_CONFIG[a.status].order - STATUS_CONFIG[b.status].order; break;
        case "createdAt": cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [bookings, filter, search, sortField, sortDir]);

  const counts = STATUS_ORDER.reduce((acc, s) => {
    acc[s] = bookings.filter((b) => b.status === s).length;
    return acc;
  }, {} as Record<LeadStatus, number>);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-500">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        Cargando leads...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Stats */}
      <StatsBar bookings={bookings} />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, email, empresa..."
            className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-cyan-500/50 focus:outline-none transition placeholder:text-slate-600"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortField("name")}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition flex items-center gap-1 ${
              sortField === "name" ? "bg-white/5 border-white/10 text-white" : "border-white/5 text-slate-500 hover:text-white"
            }`}
          >
            <User className="w-3 h-3" />Nombre
            {sortField === "name" && <ArrowUpDown className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setSortField("date")}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition flex items-center gap-1 ${
              sortField === "date" ? "bg-white/5 border-white/10 text-white" : "border-white/5 text-slate-500 hover:text-white"
            }`}
          >
            <Calendar className="w-3 h-3" />Fecha
            {sortField === "date" && <ArrowUpDown className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setSortField("status")}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition flex items-center gap-1 ${
              sortField === "status" ? "bg-white/5 border-white/10 text-white" : "border-white/5 text-slate-500 hover:text-white"
            }`}
          >
            <Filter className="w-3 h-3" />Estado
            {sortField === "status" && <ArrowUpDown className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setSortDir((d) => d === "asc" ? "desc" : "asc")}
            className={`px-2 py-2 rounded-xl border transition ${
              "border-white/5 text-slate-500 hover:text-white hover:bg-white/5"
            }`}
            title={sortDir === "asc" ? "Ascendente" : "Descendente"}
          >
            <ArrowUpDown className={`w-3 h-3 ${sortDir === "asc" ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setFilter("todos")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
            filter === "todos"
              ? "bg-white/10 text-white border-white/20"
              : "text-slate-400 border-white/10 hover:text-white hover:border-white/15"
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
                  ? `${cfg.bg} ${cfg.color} ${cfg.border}`
                  : "text-slate-400 border-white/10 hover:text-white hover:border-white/15"
              }`}
            >
              {cfg.icon}
              <span className="ml-1">{cfg.label}</span>
              {counts[s] > 0 && <span className="ml-1 opacity-60">({counts[s]})</span>}
            </button>
          );
        })}
        <button
          onClick={fetch_}
          className="ml-auto text-slate-500 hover:text-white transition p-1.5 rounded-lg hover:bg-white/5"
          title="Actualizar"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Lead list */}
      {processed.length === 0 ? (
        <div className="text-center py-16 bg-[#111827] border border-white/5 rounded-xl">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">
            {search ? "No se encontraron resultados." : filter !== "todos" ? `No hay leads con estado "${STATUS_CONFIG[filter as LeadStatus].label}".` : "No hay contactos todavía."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {processed.map((b) => (
            <LeadCard key={b.id} booking={b} onUpdate={handleUpdate} />
          ))}
          <p className="text-[10px] text-slate-600 text-center pt-2">
            Mostrando {processed.length} de {bookings.length} leads
          </p>
        </div>
      )}
    </div>
  );
}
