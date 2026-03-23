"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
  consent: boolean;
}

interface Props {
  selectedDate: string | null;
  selectedTime: string | null;
}

export default function BookingForm({ selectedDate, selectedTime }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setError("Por favor selecciona un día y hora antes de continuar.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, date: selectedDate, time: selectedTime, consentGiven: formData.consent }),
    });

    setIsSubmitting(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      const data = await res.json();
      setError(data.error || "Error al procesar la reserva. Inténtalo de nuevo.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <span className="material-symbols-outlined text-3xl text-primary">
            check_circle
          </span>
        </div>
        <h3 className="text-xl font-bold text-on-surface mb-2">¡Reserva confirmada!</h3>
        <p className="text-on-surface-variant mb-4">
          Te hemos enviado un email con los detalles de la cita.
        </p>
        <p className="text-sm text-on-surface-variant">
          Recibirás un recordatorio 24 horas antes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Resumen de selección */}
      {(selectedDate || selectedTime) && (
        <div className="p-3 rounded-xl bg-[#135bec]/10 border border-[#135bec]/20 text-sm text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-[#135bec] text-base">event</span>
          {selectedDate && selectedTime
            ? <span><strong>{selectedDate}</strong> a las <strong>{selectedTime}</strong></span>
            : selectedDate
            ? <span>Fecha: <strong>{selectedDate}</strong> — elige una hora</span>
            : <span>Hora: <strong>{selectedTime}</strong> — elige un día</span>}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-on-surface mb-2">
          Nombre completo
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-transparent border border-outline-variant/60 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-on-surface mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-transparent border border-outline-variant/60 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-on-surface mb-2">
          Empresa <span className="text-on-surface-variant">(opcional)</span>
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-transparent border border-outline-variant/60 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-on-surface mb-2">
          Mensaje <span className="text-on-surface-variant">(opcional)</span>
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-transparent border border-outline-variant/60 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-[#135bec] text-white font-medium rounded-xl hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#135bec]/30"
      >
        {isSubmitting ? (
          <>
            <span className="material-symbols-outlined animate-spin">
              progress_activity
            </span>
            <span>Reservando...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">event_available</span>
            <span>Confirmar reserva</span>
          </>
        )}
      </button>

      {/* Consentimiento RGPD */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 w-4 h-4 accent-[#135bec] cursor-pointer flex-shrink-0"
        />
        <label htmlFor="consent" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer">
          He leído y acepto la{" "}
          <a href="/privacidad" target="_blank" className="text-[#135bec] underline hover:opacity-80">
            Política de Privacidad
          </a>
          . Consiento el tratamiento de mis datos para gestionar la cita solicitada.
        </label>
      </div>
    </form>
  );
}
