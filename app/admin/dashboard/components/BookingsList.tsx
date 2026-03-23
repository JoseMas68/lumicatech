"use client";

import { useState, useEffect } from "react";
import { Trash2, Mail, Video, Bell, BellOff, RefreshCw } from "lucide-react";

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
      setReminderResult(
        `Enviados: ${data.sent} · Fallidos: ${data.failed}`
      );
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
    (b) => b.date === new Date(Date.now() + 86400000).toISOString().split("T")[0] && !b.reminderSent
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        Cargando reservas...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: bookings.length, color: "text-white" },
          { label: "Próximas", value: upcoming.length, color: "text-indigo-400" },
          { label: "Pasadas", value: past.length, color: "text-gray-400" },
          { label: "Recordatorios pendientes", value: pendingReminders.length, color: "text-yellow-400" },
        ].map((s) => (
          <div key={s.label} className="bg-[#2a2b38] rounded-xl p-4 border border-white/10 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Acción recordatorios */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleSendReminders}
          disabled={sendingReminders}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-lg text-sm hover:bg-yellow-500/30 transition disabled:opacity-50"
        >
          <Bell className="w-4 h-4" />
          {sendingReminders ? "Enviando..." : "Enviar recordatorios de mañana"}
        </button>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white border border-white/10 rounded-lg text-sm transition"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </button>
        {reminderResult && (
          <span className="text-sm text-gray-300">{reminderResult}</span>
        )}
      </div>

      {/* Lista */}
      {bookings.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          No hay reservas registradas todavía.
        </div>
      ) : (
        <div className="space-y-3">
          {/* Próximas */}
          {upcoming.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Próximas citas</h3>
              <div className="space-y-2">
                {upcoming.map((b) => (
                  <BookingCard key={b.id} booking={b} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}
          {/* Pasadas */}
          {past.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 mt-4">Historial</h3>
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
  return (
    <div className="bg-[#2a2b38] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-white text-sm">{b.name}</span>
          {b.company && <span className="text-xs text-gray-400">· {b.company}</span>}
          {b.reminderSent
            ? <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1"><Bell className="w-3 h-3" />Recordatorio enviado</span>
            : <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full flex items-center gap-1"><BellOff className="w-3 h-3" />Sin recordatorio</span>
          }
        </div>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="text-xs text-indigo-300 font-medium">{b.date} · {b.time}</span>
          <a href={`mailto:${b.email}`} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
            <Mail className="w-3 h-3" />{b.email}
          </a>
          {b.meetLink && (
            <a href={b.meetLink} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              <Video className="w-3 h-3" />Meet
            </a>
          )}
        </div>
        {b.message && (
          <p className="text-xs text-gray-500 mt-1 truncate">{b.message}</p>
        )}
        <p className="text-xs text-gray-600 mt-1">
          Consentimiento: {b.consentGiven ? "✓" : "✗"} · {new Date(b.consentAt).toLocaleDateString("es-ES")}
        </p>
      </div>
      <button
        onClick={() => onDelete(b.id)}
        className="flex items-center gap-1 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-xs transition flex-shrink-0"
      >
        <Trash2 className="w-4 h-4" />
        Eliminar
      </button>
    </div>
  );
}
