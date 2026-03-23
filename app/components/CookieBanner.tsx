"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie, ChevronDown, ChevronUp } from "lucide-react";

type ConsentState = "pending" | "accepted" | "rejected" | "custom";

interface CookiePrefs {
  necessary: true;    // siempre true, no editable
  analytics: boolean;
}

const STORAGE_KEY = "cookie_consent";
const PREFS_KEY   = "cookie_prefs";

function loadConsent(): ConsentState {
  try {
    return (localStorage.getItem(STORAGE_KEY) as ConsentState) ?? "pending";
  } catch {
    return "pending";
  }
}

function saveConsent(state: ConsentState, prefs: CookiePrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, state);
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    // Cookie HTTP para SSR si algún día es necesaria
    document.cookie = `cookie_consent=${state}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
  } catch { /* noop */ }
}

export default function CookieBanner() {
  const [state, setState] = useState<ConsentState | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    setState(loadConsent());
  }, []);

  // No renderizar hasta que hayamos leído localStorage (evita flash en SSR)
  if (state === null || state !== "pending") return null;

  function acceptAll() {
    const prefs: CookiePrefs = { necessary: true, analytics: true };
    saveConsent("accepted", prefs);
    setState("accepted");
  }

  function rejectAll() {
    const prefs: CookiePrefs = { necessary: true, analytics: false };
    saveConsent("rejected", prefs);
    setState("rejected");
  }

  function saveCustom() {
    const prefs: CookiePrefs = { necessary: true, analytics };
    saveConsent("custom", prefs);
    setState("custom");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto pointer-events-auto bg-[#1a1b24]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        
        {/* Main row */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-5 h-5 text-[#135bec] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium mb-1">Usamos cookies</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Utilizamos cookies estrictamente necesarias para el funcionamiento del sitio. Actualmente
                no empleamos cookies de seguimiento ni publicidad.{" "}
                <Link href="/cookies" className="text-[#135bec] hover:underline">
                  Política de cookies
                </Link>
                {" · "}
                <Link href="/privacidad" className="text-[#135bec] hover:underline">
                  Privacidad
                </Link>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowDetails((v) => !v)}
              className="flex items-center gap-1 px-3 py-2 text-xs text-gray-400 hover:text-white border border-white/10 rounded-lg transition"
            >
              Configurar
              {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              onClick={rejectAll}
              className="px-3 py-2 text-xs text-gray-300 hover:text-white border border-white/10 rounded-lg transition"
            >
              Solo necesarias
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-xs font-semibold bg-[#135bec] text-white rounded-lg hover:opacity-90 transition"
            >
              Aceptar
            </button>
            <button
              onClick={rejectAll}
              className="p-2 text-gray-500 hover:text-white transition"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Panel de configuración desplegable */}
        {showDetails && (
          <div className="border-t border-white/10 px-5 py-4 space-y-3">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Configuración de cookies</p>

            {/* Necesarias — siempre on */}
            <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
              <div>
                <p className="text-sm text-white font-medium">Necesarias</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Imprescindibles para el funcionamiento del sitio (sesión admin, preferencias). No pueden desactivarse.
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">Siempre activas</span>
              </div>
            </div>

            {/* Analítica — desactivada por defecto */}
            <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
              <div>
                <p className="text-sm text-white font-medium">Analítica y rendimiento</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Permiten medir el tráfico y mejorar el sitio. Actualmente no están en uso.
                </p>
              </div>
              <button
                onClick={() => setAnalytics((v) => !v)}
                role="switch"
                aria-checked={analytics}
                className={`relative flex-shrink-0 ml-4 w-10 h-6 rounded-full transition-colors ${
                  analytics ? "bg-[#135bec]" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    analytics ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={saveCustom}
                className="px-4 py-2 text-xs font-semibold bg-[#135bec] text-white rounded-lg hover:opacity-90 transition"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
