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
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Enviar email de prueba</h2>
        <p className="text-sm text-slate-500 mt-1">Envía un email de prueba para verificar que las plantillas y el envío funcionan correctamente.</p>
      </div>

      <form onSubmit={handleSend} className="bg-[#111827] border border-white/5 rounded-xl p-6 space-y-4 max-w-lg">
        <div>
          <label className="block text-xs text-slate-400 mb-2">Tipo de email</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition"
          >
            <option value="both">Ambos (cliente + propietario)</option>
            <option value="client">Solo email al cliente</option>
            <option value="owner">Solo notificación al propietario</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">
            Email destinatario
            <span className="text-slate-600 ml-1">(donde llegará el email de prueba)</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition"
            placeholder="tu@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-2">Nombre de prueba</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-2">Hora de prueba</label>
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">Fecha de prueba</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20 text-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando...
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Enviar email de prueba
            </>
          )}
        </button>

        {result === "success" && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
            <Check className="w-4 h-4" />
            Email enviado correctamente
          </div>
        )}
        {result === "error" && (
          <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4" />
            Error al enviar. Revisa la configuración de Resend.
          </div>
        )}
      </form>
    </div>
  );
}
