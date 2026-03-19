'use client';

export default function Hero() {
  return (
    <section className="relative min-h-[921px] flex items-center px-8 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary-fixed/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-screen-xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="text-xs font-label uppercase tracking-widest text-primary-container">LumicaTech Ecosystem</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-black font-headline leading-[0.9] tracking-tighter text-on-surface">
            Gestión digital de <span className="text-primary-container">almacenes</span>.
          </h1>

          {/* Subtitle */}
          <div className="space-y-4">
            <h2 className="text-2xl font-label text-on-surface-variant font-light tracking-tight">WareFlow</h2>
            <p className="text-xl text-on-surface-variant max-w-md">
              Convierte tu almacén en un sistema inteligente
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="gradient-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all active:scale-95">
              Empezar ahora
            </button>
            <button className="px-8 py-4 rounded-lg border border-outline-variant/30 text-on-surface font-bold text-lg hover:bg-surface-container transition-all">
              Ver Demo
            </button>
          </div>
        </div>

        {/* Right Column - Visual */}
        <div className="relative">
          <div className="aspect-square rounded-xl bg-surface-container-low border border-outline-variant/10 p-4 relative overflow-hidden group">
            <div className="w-full h-full bg-gradient-to-br from-primary-container/10 to-transparent rounded-lg flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-primary-container/30 rounded-xl relative">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary-container"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary-container"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary-container"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary-container"></div>
                <div className="absolute inset-0 bg-primary-container/5 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                  <span className="material-symbols-outlined text-5xl text-primary-container">qr_code_scanner</span>
                  <span className="text-xs font-label tracking-widest text-primary-fixed uppercase">Scanning Layer Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
