"use client";

import { useState, useEffect } from "react";
import { Trash2, Mail, Video, Bell, BellOff, RefreshCw, Calendar, Clock, User, Building2, CheckCircle2, XCircle } from "lucide-react";

interface Booking {
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  time: string;
  meetLink?: string;
  consentGiven: boolean;
  consentAt: string;
  reminderSent: boolean;
  createdAt: string;
}

export default function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingReminders, setSendingReminders] = useState(false);
  const [reminderResult, setReminderResult] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchBookings(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta reserva?")) return;
    await fetch("/api/admin/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  async function handleSendReminders() {
    setSendingReminders(true);
    setReminderResult("");
    try {
      const res = await fetch("/api/admin/reminders", { method: "POST" });
      const data = await res.json();
      setReminderResult(`Enviados: ${data.sent} · Fallidos: ${data.failed}`);
      fetchBookings();
    } catch {
      setReminderResult("Error al enviar recordatorios");
    } finally {
      setSendingReminders(false);
    }
  }

  const upcoming = bookings.filter((b) => b.date >= today);
  const past = bookings.filter((b) => b.date < today);
  const pendingReminders = upcoming.filter(
    (b) => b.date === tomorrow && !b.reminderSent
  );

  // Stats
  const stats = [
    { label: "Total", value: bookings.length, color: "text-white", bg: "from-slate-500 to-slate-600" },
    { label: "Próximas", value: upcoming.length, color: "text-cyan-300", bg: "from-cyan-500 to-blue-500" },
    { label: "Pasadas", value: past.length, color: "text-slate-400", bg: "from-slate-600 to-slate-700" },
    { label: "Recordatorios", value: pendingReminders.length, color: "text-amber-300", bg: "from-amber-500 to-orange-500" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-500">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        Cargando reservas...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#111827] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
            <p className={`text-2xl font-bold bg-gradient-to-r ${s.bg} bg-clip-text text-transparent`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleSendReminders}
          disabled={sendingReminders}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-xl text-sm hover:bg-amber-500/20 transition disabled:opacity-50"
        >
          <Bell className="w-4 h-4" />
          {sendingReminders ? "Enviando..." : "Enviar recordatorios de mañana"}
        </button>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white border border-white/10 rounded-xl text-sm transition"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </button>
        {reminderResult && (
          <span className="text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg">{reminderResult}</span>
        )}
      </div>

      {/* List */}
      {bookings.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-[#111827] border border-white/5 rounded-xl">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm">No hay reservas registradas todavía.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Próximas citas ({upcoming.length})</h3>
              </div>
              <div className="space-y-2">
                {upcoming.map((b) => (
                  <BookingCard key={b.id} booking={b} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}

          {/* Past */}
          {past.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-slate-500" />
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Historial ({past.length})</h3>
              </div>
              <div className="space-y-2 opacity-60">
                {past.map((b) => (
                  <BookingCard key={b.id} booking={b} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BookingCard({ booking: b, onDelete }: { booking: Booking; onDelete: (id: string) => void }) {
  const isToday = b.date === new Date().toISOString().split("T")[0];
  const isPast = b.date < new Date().toISOString().split("T")[0];

  return (
    <div className={`bg-[#111827] border rounded-xl p-4 transition-all group ${
      isToday ? "border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "border-white/5 hover:border-white/10"
    } ${isPast ? "opacity-60" : ""}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm">{b.name}</span>
            {b.company && (
              <span className="text-xs bg-white/5 text-slate-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Building2 className="w-3 h-3" />{b.company}
              </span>
            )}
            {isToday && (
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-medium">Hoy</span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs">
            <span className="flex items-center gap-1 text-cyan-300/80">
              <Calendar className="w-3 h-3" />{b.date}
            </span>
            <span className="flex items-center gap-1 text-cyan-300/80">
              <Clock className="w-3 h-3" />{b.time}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Mail className="w-3 h-3" />{b.email}
            </span>
            {b.meetLink && (
              <a href={b.meetLink} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition">
                <Video className="w-3 h-3" />Meet
              </a>
            )}
          </div>

          {b.message && (
            <p className="text-xs text-slate-500 mt-1.5 truncate max-w-lg">{b.message}</p>
          )}

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {b.consentGiven ? (
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />Consentimiento OK · {new Date(b.consentAt).toLocaleDateString("es-ES")}
              </span>
            ) : (
              <span className="text-[10px] text-rose-400 flex items-center gap-1">
                <XCircle className="w-3 h-3" />Sin consentimiento
              </span>
            )}
            {b.reminderSent ? (
              <span className="text-[10px] text-emerald-400/70 flex items-center gap-1">
                <Bell className="w-3 h-3" />Recordatorio enviado
              </span>
            ) : (
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Bell className="w-3 h-3" />Sin recordatorio
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onDelete(b.id)}
          className="flex items-center gap-1 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg text-xs transition flex-shrink-0 opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
          Eliminar
        </button>
      </div>
    </div>
  );
}
