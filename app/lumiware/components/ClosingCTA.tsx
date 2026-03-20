'use client';

export default function ClosingCTA() {
  return (
    <section className="py-40 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary-container/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-screen-md mx-auto px-8 text-center relative z-10 space-y-8">
        {/* Main Headline */}
        <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter italic text-on-surface">
          Digitaliza tu almacén.
        </h2>

        {/* Description */}
        <p className="text-xl md:text-2xl text-on-surface-variant mb-12 leading-relaxed font-light">
          WareFlow transforma la gestión de inventario en un proceso{' '}
          <span className="text-on-surface font-medium underline decoration-primary-container/30">
            ágil, visual y altamente eficiente.
          </span>
        </p>

        {/* CTA Button */}
        <button className="gradient-primary text-on-primary px-12 py-5 rounded-lg font-black text-xl hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,229,255,0.2)]">
          Solicitar reunión
        </button>

        {/* Footer Indicators */}
        <div className="mt-12 flex justify-center items-center gap-8 opacity-50">
          <span className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
            Process Optimization
          </span>
          <span className="w-1 h-1 rounded-full bg-outline"></span>
          <span className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
            Digital Twin Ready
          </span>
          <span className="w-1 h-1 rounded-full bg-outline"></span>
          <span className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
            QR Ecosystem
          </span>
        </div>
      </div>
    </section>
  );
}
