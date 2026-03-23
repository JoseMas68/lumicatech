"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
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

      <p className="text-xs text-on-surface-variant text-center">
        Al reservar, aceptas recibir comunicaciones sobre tu cita.
      </p>
    </form>
  );
}
