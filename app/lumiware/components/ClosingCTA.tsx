'use client';

import Link from 'next/link';

export default function ClosingCTA() {
  return (
    <section className="py-32 bg-surface relative overflow-hidden">
      {/* Background technical grid and Glow */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <div className="bg-surface-container-low border border-outline-variant/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden group">
          
          {/* subtle glow inside card */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-8 mx-auto relative z-10">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="text-xs font-label uppercase tracking-widest text-primary-container">Siguientes pasos</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-6xl font-black font-headline tracking-tighter text-on-surface mb-6 relative z-10">
            Digitaliza tu <span className="text-gradient-primary">almacén</span> hoy.
          </h2>

          {/* Description */}
          <p className="text-xl text-on-surface-variant mb-12 leading-relaxed max-w-2xl mx-auto relative z-10">
            Lumiware transforma la gestión de inventario en un proceso ágil, visual y altamente eficiente. Empieza a optimizar tu flujo de trabajo de la mano de expertos.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center relative z-10">
            <Link 
              href="/booking" 
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container border border-current px-10 py-5 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:opacity-95 active:scale-95 flex items-center gap-3"
            >
              Solicitar diagnóstico
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="mt-16 flex justify-center items-center gap-4 md:gap-8 opacity-60 flex-wrap relative z-10">
            <span className="text-xs font-label tracking-widest uppercase text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">done</span> Optimización de procesos
            </span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-outline"></span>
            <span className="text-xs font-label tracking-widest uppercase text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">done</span> Trazabilidad en Tiempo Real
            </span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-outline"></span>
            <span className="text-xs font-label tracking-widest uppercase text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">done</span> Ecosistema QR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
