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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container/20 mb-4">
          <span className="material-symbols-outlined text-3xl text-primary-container">
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
          onChange={handleChange}
          className="w-full px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
          placeholder="Tu nombre"
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
          className="w-full px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
          placeholder="tu@email.com"
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
          className="w-full px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
          placeholder="Nombre de tu empresa"
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
          className="w-full px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all resize-none"
          placeholder="Cuéntanos brevemente sobre tu proyecto..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-primary-container text-on-primary font-medium rounded-xl glow-button hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
