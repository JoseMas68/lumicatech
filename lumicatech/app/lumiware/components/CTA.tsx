'use client';

export default function CTA() {
  return (
    <section className="py-32 bg-surface text-center overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-primary-container/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto px-8 relative z-10">
        <h2 className="text-5xl md:text-6xl font-black font-headline text-on-surface mb-6 leading-tight tracking-tighter">
          El futuro de los almacenes está aquí
        </h2>
        <p className="text-xl text-on-surface-variant mb-12">
          Únete a cientos de empresas que ya transformaron sus operaciones con WareFlow. 
          Automatización total, control real-time y decisiones basadas en datos.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="gradient-primary text-on-primary px-12 py-4 rounded-lg font-headline font-bold text-lg hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] transition-all active:scale-95">
            Solicitar Demo
          </button>
          <button className="px-12 py-4 rounded-lg font-headline font-bold text-lg text-on-surface border border-outline-variant/30 hover:border-primary-container/30 hover:bg-surface-container transition-all">
            Hablar con Ventas
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-outline-variant/20">
          <p className="text-on-surface-variant text-sm font-label">
            ✓ Implementación en 7 días • ✓ Soporte 24/7 • ✓ ROI garantizado
          </p>
        </div>
      </div>
    </section>
  );
}
