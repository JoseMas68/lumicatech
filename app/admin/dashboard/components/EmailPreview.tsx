"use client";

import { useState } from "react";

export default function EmailPreview() {
  const [activeEmail, setActiveEmail] = useState<"client" | "owner">("client");

  return (
    <div className="bg-[#23242f] rounded-2xl border border-white/10 p-6">
      <h2 className="text-lg font-semibold mb-1">Vista previa de emails</h2>
      <p className="text-gray-400 text-sm mb-6">
        Así verán los emails los destinatarios cuando se realice una reserva.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#1a1b24] p-1 rounded-xl mb-4 w-fit border border-white/10">
        <button
          onClick={() => setActiveEmail("client")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeEmail === "client"
              ? "bg-indigo-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Email al cliente
        </button>
        <button
          onClick={() => setActiveEmail("owner")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeEmail === "owner"
              ? "bg-indigo-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Notificación propietario
        </button>
      </div>

      {/* Preview iframe */}
      <div className="rounded-xl overflow-hidden border border-white/10">
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
