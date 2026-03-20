"use client";

import { useState } from "react";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySlots {
  date: Date;
  formatted: string;
  dayName: string;
  slots: TimeSlot[];
}

// Generate mock time slots
function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour < 18; hour++) {
    slots.push({
      time: `${hour}:00`,
      available: Math.random() > 0.3,
    });
    slots.push({
      time: `${hour}:30`,
      available: Math.random() > 0.3,
    });
  }
  return slots;
}

function generateWeekDays(): DaySlots[] {
  const days: DaySlots[] = [];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    days.push({
      date,
      formatted: `${date.getDate()} ${monthNames[date.getMonth()]}`,
      dayName: dayNames[date.getDay()],
      slots: generateTimeSlots(),
    });
  }
  
  return days;
}

export default function AvailabilityCalendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [days] = useState<DaySlots[]>(generateWeekDays);
  const [selectedDaySlots, setSelectedDaySlots] = useState<TimeSlot[]>([]);

  const handleDaySelect = (index: number) => {
    setSelectedDate(index);
    setSelectedTime(null);
    setSelectedDaySlots(days[index].slots);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div className="space-y-6">
      {/* Day selector */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDaySelect(index)}
            className={`p-3 rounded-xl text-center transition-all duration-200 ${
              selectedDate === index
                ? "bg-primary-container text-on-primary font-medium shadow-lg"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
            }`}
          >
            <div className="text-xs mb-1">{day.dayName}</div>
            <div className="text-sm font-semibold">{day.formatted.split(" ")[0]}</div>
          </button>
        ))}
      </div>

      {/* Time slots */}
      {selectedDate !== null && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-on-surface-variant">
            Horarios disponibles para el {days[selectedDate].formatted}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {selectedDaySlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
                  selectedTime === slot.time
                    ? "bg-primary-container text-on-primary font-medium shadow-lg"
                    : slot.available
                    ? "bg-surface-container hover:bg-surface-container-high text-on-surface-variant border border-outline-variant/20"
                    : "bg-surface-container-low text-on-surface-variant/40 cursor-not-allowed line-through"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No day selected message */}
      {selectedDate === null && (
        <div className="text-center py-8 text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl mb-2 block text-primary-container/50">
            calendar_today
          </span>
          <p className="text-sm">Selecciona un día para ver los horarios disponibles</p>
        </div>
      )}

      {/* Selected info */}
      {selectedDate !== null && selectedTime && (
        <div className="flex items-center gap-2 p-4 bg-primary-container/10 rounded-xl border border-primary-container/20">
          <span className="material-symbols-outlined text-primary-container">
            check_circle
          </span>
          <span className="text-sm text-on-surface">
            <strong>{days[selectedDate].formatted}</strong> a las <strong>{selectedTime}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
