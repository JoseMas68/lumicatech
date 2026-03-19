'use client';

export default function CTA() {
  return (
    <section className="py-24 bg-surface-container-lowest text-center overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-primary-container/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto px-8 relative z-10">
        <h2 className="text-6xl font-headline font-bold text-on-surface mb-6 leading-tight">
          La transformación digital comienza hoy
        </h2>
        <p className="text-xl text-on-surface-variant mb-12">
          Únete a cientos de empresas que ya automatizan sus almacenes con WareFlow.
          Prueba gratis por 30 días, sin tarjeta de crédito.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="gradient-primary text-on-primary-container px-12 py-4 rounded-lg font-headline font-bold text-lg hover:glow-shadow transition-all active:scale-95">
            Prueba Gratis
          </button>
          <button className="px-12 py-4 rounded-lg font-headline font-bold text-lg text-on-surface border border-outline-variant/30 hover:border-primary-container/30 hover:bg-surface-container transition-all">
            Hablar con Ventas
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-outline-variant/20">
          <p className="text-on-surface-variant text-sm font-label mb-6">
            ✓ Sin tarjeta de crédito • ✓ Acceso completo • ✓ Soporte incluido
          </p>
        </div>
      </div>
    </section>
  );
}
