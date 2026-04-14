"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Circle } from "lucide-react";

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function firstWeekday(year: number, month: number): number {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

interface Props {
  selectedDate: string | null;
  selectedTime: string | null;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

export default function AvailabilityCalendar({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: Props) {
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availableDays, setAvailableDays] = useState<Set<string>>(new Set());
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const todayStr = toDateStr(now.getFullYear(), now.getMonth(), now.getDate());
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = firstWeekday(calYear, calMonth);

  // Cargar días disponibles cuando cambia el mes
  useEffect(() => {
    async function loadAvailableDays() {
      setLoadingAvailability(true);
      try {
        const response = await fetch(`/api/booking/availability?year=${calYear}&month=${calMonth}`);
        if (response.ok) {
          const data = await response.json();
          setAvailableDays(new Set(data.availableDays));
        }
      } catch (error) {
        console.error("Error loading available days:", error);
        setAvailableDays(new Set());
      } finally {
        setLoadingAvailability(false);
      }
    }
    loadAvailableDays();
  }, [calYear, calMonth]);

  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    fetch(`/api/booking?date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.availableSlots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  }

  function handleDayClick(dateStr: string) {
    if (dateStr < todayStr) return;
    // Solo permitir seleccionar días que tienen horas disponibles
    if (!loadingAvailability && availableDays.size > 0 && !availableDays.has(dateStr)) {
      return;
    }
    onDateSelect(dateStr);
  }

  return (
    <div className="space-y-6">
      {/* Cabecera mes */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-surface-container-highest transition text-on-surface-variant"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-on-surface">
          {MONTH_NAMES[calMonth]} {calYear}
        </span>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-surface-container-highest transition text-on-surface-variant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Grid días de la semana */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-xs text-on-surface-variant py-1">{d}</div>
        ))}
        {Array(firstDay).fill(null).map((_, i) => (
          <div key={`e-${i}`} />
        ))}
        {loadingAvailability ? (
          <div className="col-span-7 text-center py-8">
            <p className="text-sm text-on-surface-variant/50">Cargando disponibilidad...</p>
          </div>
        ) : (
          Array(daysInMonth).fill(null).map((_, i) => {
          const dayNum = i + 1;
          const dateStr = toDateStr(calYear, calMonth, dayNum);
          const isPast = dateStr < todayStr;
          const isSelected = selectedDate === dateStr;
          const isToday = dateStr === todayStr;
          const hasAvailability = availableDays.has(dateStr);
          const isDisabled = isPast || (!loadingAvailability && availableDays.size > 0 && !hasAvailability);

          return (
            <button
              key={dayNum}
              onClick={() => handleDayClick(dateStr)}
              disabled={isDisabled}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all relative ${
                isSelected
                  ? "bg-[#135bec] text-white shadow-lg shadow-[#135bec]/30"
                  : isToday
                  ? "border border-[#135bec] text-[#135bec]"
                  : isDisabled
                  ? "text-on-surface-variant/30 cursor-not-allowed"
                  : "hover:bg-surface-container-highest text-on-surface-variant"
              }`}
            >
              {dayNum}
              {!isDisabled && hasAvailability && (
                <Circle className="w-1 h-1 fill-[#135bec] text-[#135bec] absolute bottom-1" />
              )}
            </button>
          );
        })
        )}
      </div>

      {/* Leyenda */}
      {!loadingAvailability && availableDays.size > 0 && (
        <div className="flex items-center gap-2 text-xs text-on-surface-variant/70">
          <Circle className="w-2 h-2 fill-[#135bec] text-[#135bec]" />
          <span>Días con horarios disponibles</span>
        </div>
      )}

      {/* Slots de hora */}
      {selectedDate && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-on-surface-variant">
            Horas disponibles — {selectedDate}
          </h3>
          {loadingSlots ? (
            <p className="text-sm text-on-surface-variant/50 text-center py-4">Cargando...</p>
          ) : slots.length === 0 ? (
            <p className="text-sm text-on-surface-variant/50 text-center py-4">
              No hay horas disponibles este día
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => onTimeSelect(slot)}
                  className={`py-2 px-3 rounded-lg text-sm transition-all ${
                    selectedTime === slot
                      ? "bg-[#135bec] text-white font-medium shadow-lg shadow-[#135bec]/30"
                      : "bg-transparent border border-outline-variant/60 hover:bg-surface-container-highest text-on-surface-variant"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!selectedDate && (
        <div className="text-center py-8 text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl mb-2 block text-primary/50">calendar_today</span>
          <p className="text-sm">Selecciona un día para ver los horarios disponibles</p>
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="flex items-center gap-2 p-4 bg-[#135bec]/10 rounded-xl border border-[#135bec]/20">
          <span className="material-symbols-outlined text-[#135bec]">check_circle</span>
          <span className="text-sm text-on-surface">
            <strong>{selectedDate}</strong> a las <strong>{selectedTime}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
