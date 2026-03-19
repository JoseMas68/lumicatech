'use client';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-surface-container-lowest">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(to right, #849396 1px, transparent 1px), linear-gradient(to bottom, #849396 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-variant/20 border border-outline-variant/30 mb-8">
          <span className="material-symbols-outlined text-primary-container text-sm">warehouse</span>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Gestión Inteligente</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tight text-on-surface leading-[0.9] mb-8">
          Almacenes <span className="gradient-primary bg-clip-text text-transparent">sin límites</span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-on-surface-variant max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          Automatización inteligente, control total en tiempo real y escalabilidad infinita para tu operación logística.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="gradient-primary text-on-primary-container px-10 py-4 rounded-lg font-headline font-bold text-lg tracking-tight hover:glow-shadow transition-all active:scale-95">
            Comenzar Ahora
          </button>
          <button className="px-10 py-4 rounded-lg font-headline font-bold text-lg tracking-tight text-on-surface border border-outline-variant/30 hover:border-primary-container hover:bg-surface-container transition-all">
            Agendar Demo
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-16 flex justify-center items-center gap-4 text-sm text-on-surface-variant">
          <span className="material-symbols-outlined">verified</span>
          <span>Confiado por 500+ empresas en Latinoamérica</span>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
