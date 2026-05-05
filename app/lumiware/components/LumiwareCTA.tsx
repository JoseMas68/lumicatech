'use client';

export default function LumiwareCTA() {
  return (
    <section className="py-32 bg-surface text-center overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-on-surface mb-8 tracking-tighter leading-tight">
          ¿Listo para revolucionar tu almacén?
        </h2>
        <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Lumiware es la solución que tu operación necesita. Automatiza, optimiza y escala sin límites.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-10 py-5 rounded-lg text-lg font-bold tracking-tight hover:shadow-[0_0_40px_rgba(156,240,255,0.4)] transition-all active:scale-95">
            Solicitar Reunión
          </button>
          <button className="px-10 py-5 rounded-lg text-lg font-bold tracking-tight text-on-surface border border-outline-variant/30 hover:bg-surface-container transition-all">
            Contactar Ventas
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-surface-container">
          <p className="text-sm text-on-surface-variant font-label mb-6">Confiado por empresas líderes:</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-on-surface-variant text-sm font-medium">Logística Premium</div>
            <div className="text-on-surface-variant text-sm font-medium">Retail Chain</div>
            <div className="text-on-surface-variant text-sm font-medium">E-commerce Scale</div>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
}
