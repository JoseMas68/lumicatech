"use client";

import { useState } from "react";

export default function ResponseActions({ token }: { token: string }) {
  const [loading, setLoading] = useState<"aceptado" | "rechazado" | null>(null);
  const [message, setMessage] = useState<string>("");

  async function respond(decision: "aceptado" | "rechazado") {
    setLoading(decision);
    setMessage("");
    try {
      const res = await fetch(`/api/public/budgets/${token}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "No se pudo registrar la respuesta");
      } else {
        setMessage(`Respuesta registrada: ${decision}`);
      }
    } catch {
      setMessage("Error de red al responder presupuesto");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mt-6 space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => respond("aceptado")}
          disabled={loading !== null}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50"
        >
          {loading === "aceptado" ? "Enviando..." : "Aceptar presupuesto"}
        </button>
        <button
          type="button"
          onClick={() => respond("rechazado")}
          disabled={loading !== null}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-rose-600 hover:bg-rose-500 disabled:opacity-50"
        >
          {loading === "rechazado" ? "Enviando..." : "Rechazar presupuesto"}
        </button>
      </div>
      {message && <p className="text-sm text-slate-300">{message}</p>}
    </div>
  );
}
