"use client";

import { useState } from "react";

export default function EmailPreview() {
  const [activeEmail, setActiveEmail] = useState<"client" | "owner">("client");

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Vista previa de emails</h2>
        <p className="text-sm text-slate-500 mt-1">Así verán los emails los destinatarios cuando se realice una reserva.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111827] p-1 rounded-xl w-fit border border-white/5">
        <button
          onClick={() => setActiveEmail("client")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeEmail === "client"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Email al cliente
        </button>
        <button
          onClick={() => setActiveEmail("owner")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeEmail === "owner"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Notificación propietario
        </button>
      </div>

      {/* Preview iframe */}
      <div className="rounded-xl overflow-hidden border border-white/5 bg-[#111827]">
        <iframe
          key={activeEmail}
          src={`/api/admin/email-preview?type=${activeEmail}`}
          className="w-full h-[600px] bg-white"
          title={`Preview ${activeEmail}`}
        />
      </div>
    </div>
  );
}
