"use client";

import { useState } from "react";
import { Send, Check, AlertCircle } from "lucide-react";

export default function TestEmailForm() {
  const [form, setForm] = useState({
    name: "Carlos García",
    email: "",
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    type: "both" as "client" | "owner" | "both",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/admin/test-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    setResult(res.ok ? "success" : "error");
    setTimeout(() => setResult(null), 4000);
  }

  return (
    <div className="bg-[#23242f] rounded-2xl border border-white/10 p-6">
      <h2 className="text-lg font-semibold mb-1">Enviar email de prueba</h2>
      <p className="text-gray-400 text-sm mb-6">
        Envía un email de prueba para verificar que las plantillas y el envío funcionan correctamente.
      </p>

      <form onSubmit={handleSend} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-xs text-gray-400 mb-2">Tipo de email</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full bg-[#1a1b24] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="both">Ambos (cliente + propietario)</option>
            <option value="client">Solo email al cliente</option>
            <option value="owner">Solo notificación al propietario</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-2">
            Email destinatario
            <span className="text-gray-500 ml-1">(donde llegará el email de prueba)</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-[#1a1b24] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            placeholder="tu@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-2">Nombre de prueba</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#1a1b24] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Hora de prueba</label>
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              className="w-full bg-[#1a1b24] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-2">Fecha de prueba</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full bg-[#1a1b24] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium px-6 py-3 rounded-xl transition"
        >
          {loading ? (
            "Enviando..."
          ) : (
            <>
              <Send className="w-4 h-4" />
              Enviar email de prueba
            </>
          )}
        </button>

        {result === "success" && (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <Check className="w-4 h-4" />
            Email enviado correctamente
          </div>
        )}
        {result === "error" && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            Error al enviar. Revisa la configuración de Resend.
          </div>
        )}
      </form>
    </div>
  );
}
