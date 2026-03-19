'use client';

export default function LumiwareHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface-container-lowest">
      {/* Background Grid */}
      <div className="absolute inset-0 technical-grid pointer-events-none"></div>

      {/* Glow Effect */}
      <div className="absolute inset-0 hero-glow pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant/30 border border-outline-variant/15 mb-8">
            <span className="material-symbols-outlined text-primary-container text-sm">inventory_2</span>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">Sistema de Gestión</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface leading-[1.05] mb-8">
            Gestión de inventarios <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">inteligente</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mb-12">
            Optimiza tu almacén con tecnología de punta. Control en tiempo real, automatización inteligente y análisis predictivo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-lg text-base font-bold tracking-tight hover:shadow-[0_0_30px_rgba(156,240,255,0.4)] transition-all active:scale-95">
              Solicitar Demo
            </button>
            <button className="px-8 py-4 rounded-lg text-base font-bold tracking-tight text-primary border border-outline-variant/20 hover:bg-surface-container transition-all">
              Conocer más
            </button>
          </div>
        </div>
      </div>

      {/* Floating Decorative Element */}
      <div className="absolute right-[-10%] top-[20%] hidden lg:block w-[600px] h-[600px] rounded-full border border-primary-container/10 bg-gradient-to-br from-primary-container/5 to-transparent blur-3xl"></div>
    </section>
  );
}
