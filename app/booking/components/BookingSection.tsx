"use client";

import { useState } from "react";
import AvailabilityCalendar from "./AvailabilityCalendar";
import BookingForm from "./BookingForm";

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calendar */}
          <div className="border border-outline-variant/50 rounded-2xl p-8 bg-surface-container-lowest/50 backdrop-blur-md">
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-6">
              Selecciona día y hora
            </h2>
            <AvailabilityCalendar
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateSelect={(date) => {
                setSelectedDate(date);
                setSelectedTime(null);
              }}
              onTimeSelect={setSelectedTime}
            />
          </div>

          {/* Form */}
          <div className="border border-outline-variant/50 rounded-2xl p-8 bg-surface-container-lowest/50 backdrop-blur-md">
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-6">
              Tus datos
            </h2>
            <BookingForm selectedDate={selectedDate} selectedTime={selectedTime} />
          </div>
        </div>
      </div>
    </section>
  );
}
