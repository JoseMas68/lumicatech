"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Save, Check, X } from "lucide-react";
import { AvailabilityConfig } from "@/src/lib/availability-config";

const ALL_TIME_SLOTS: string[] = [];
for (let h = 7; h <= 21; h++) {
  ALL_TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  ALL_TIME_SLOTS.push(`${String(h).padStart(2, "0")}:30`);
}

const DAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTH_LABELS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function firstWeekday(year: number, month: number): number {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // lunes = 0
}

interface Props {
  initialConfig: AvailabilityConfig;
}

export default function ScheduleConfig({ initialConfig }: Props) {
  const now = new Date();
  const [config, setConfig] = useState<AvailabilityConfig>(initialConfig);
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Recargar configuración desde el servidor cuando el componente se monta
  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch("/api/admin/config");
        if (response.ok) {
          const serverConfig = await response.json();
          setConfig(serverConfig);
        }
      } catch (error) {
        console.error("Error loading config:", error);
      }
    }
    loadConfig();
  }, []);

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = firstWeekday(calYear, calMonth);
  const todayStr = toDateStr(now.getFullYear(), now.getMonth(), now.getDate());

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  }

  function toggleSlot(date: string, slot: string) {
    setConfig((prev) => {
      const current = prev.slots[date] ?? [];
      const updated = current.includes(slot)
        ? current.filter((s) => s !== slot)
        : [...current, slot].sort();
      return { ...prev, slots: { ...prev.slots, [date]: updated } };
    });
  }

  function clearDay(date: string) {
    setConfig((prev) => {
      const { [date]: _, ...rest } = prev.slots;
      return { ...prev, slots: rest };
    });
  }

  async function handleSave() {
    setSaving(true);
    const cleanSlots = Object.fromEntries(
      Object.entries(config.slots).filter(([, v]) => v.length > 0)
    );
    await fetch("/api/admin/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...config, slots: cleanSlots }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const selectedSlots = selectedDate ? (config.slots[selectedDate] ?? []) : [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Disponibilidad</h2>
          <p className="text-sm text-slate-500 mt-1">
            Selecciona un día en el calendario y activa las horas en que puedes recibir reuniones.
          </p>
        </div>
        <div className="flex items-end gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Duración reunión</label>
            <select
              value={config.meetingDuration}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, meetingDuration: Number(e.target.value) }))
              }
              className="bg-[#0a0f1e] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition"
            >
              <option value={30}>30 minutos</option>
              <option value={45}>45 minutos</option>
              <option value={60}>1 hora</option>
              <option value={90}>1.5 horas</option>
              <option value={120}>2 horas</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-xl transition text-sm shadow-lg shadow-cyan-500/20"
          >
            {saved ? (
              <><Check className="w-4 h-4" /> Guardado</>
            ) : saving ? (
              "Guardando..."
            ) : (
              <><Save className="w-4 h-4" /> Guardar</>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendario */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-white/10 transition text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium text-sm">
              {MONTH_LABELS[calMonth]} {calYear}
            </span>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-white/10 transition text-slate-400 hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAY_LABELS.map((d) => (
              <div key={d} className="w-10 text-center text-xs text-slate-500 py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array(firstDay)
              .fill(null)
              .map((_, i) => (
                <div key={`e-${i}`} className="w-10 h-10" />
              ))}
            {Array(daysInMonth)
              .fill(null)
              .map((_, i) => {
                const dayNum = i + 1;
                const dateStr = toDateStr(calYear, calMonth, dayNum);
                const slotCount = (config.slots[dateStr] ?? []).length;
                const isSelected = selectedDate === dateStr;
                const isToday = dateStr === todayStr;

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                    className={`relative w-10 h-10 rounded-xl text-sm font-medium transition flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                        : isToday
                        ? "bg-white/10 text-white"
                        : "hover:bg-white/5 text-slate-300"
                    }`}
                  >
                    {dayNum}
                    {slotCount > 0 && (
                      <span
                        className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-white" : "bg-cyan-400"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Editor de horas */}
        <div className="flex-1 min-w-0 bg-[#111827] border border-white/5 rounded-xl p-4">
          {!selectedDate ? (
            <div className="h-full min-h-[200px] flex items-center justify-center text-slate-500 text-sm">
              Selecciona un día para editar sus horas disponibles
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-medium text-sm">{selectedDate}</span>
                  <span className="text-slate-500 text-xs ml-2">
                    {selectedSlots.length} hora{selectedSlots.length !== 1 ? "s" : ""} activa{selectedSlots.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {selectedSlots.length > 0 && (
                  <button
                    onClick={() => clearDay(selectedDate)}
                    className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition"
                  >
                    <X className="w-3 h-3" />
                    Limpiar día
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {ALL_TIME_SLOTS.map((slot) => {
                  const active = selectedSlots.includes(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(selectedDate, slot)}
                      className={`py-2 rounded-xl text-xs font-medium transition border ${
                        active
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-500/50 text-white shadow-sm shadow-cyan-500/10"
                          : "bg-[#0a0f1e] border-white/10 text-slate-400 hover:border-cyan-500/30 hover:text-white"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
