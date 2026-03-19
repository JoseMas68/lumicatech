'use client';

export default function ClosingCTA() {
  return (
    <section className="py-40 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary-container/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-screen-md mx-auto px-8 text-center relative z-10 space-y-8">
        <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter italic text-on-surface">
          Digitaliza tu almacén.
        </h2>

        <p className="text-xl text-on-surface-variant leading-relaxed">
          WareFlow es la herramienta que faltaba en tu operación. Desde hoy, tus almacenes hablan datos.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button className="gradient-primary text-on-primary px-12 py-4 rounded-lg font-headline font-bold text-lg hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] transition-all active:scale-95">
            Comienza tu Transformación
          </button>
          <button className="px-12 py-4 rounded-lg font-headline font-bold text-lg text-on-surface border border-outline-variant/30 hover:border-primary-container/30 hover:bg-surface-container transition-all">
            Agendar Demostración
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-on-surface-variant pt-8">
          Sin compromiso. Setup en 7 días. ROI comprobado en 90 días.
        </p>
      </div>
    </section>
  );
}
