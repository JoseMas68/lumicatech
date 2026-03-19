'use client';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-6 sm:px-8 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 technical-grid opacity-50"></div>

      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 hero-glow"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight text-on-surface">
              Ingeniería que transforma
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant font-headline max-w-3xl mx-auto">
              Diseñamos sistemas que funcionan. Precisión técnica con mentalidad de producto.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button className="px-8 py-3 bg-primary-container text-on-primary-container font-headline font-medium rounded-full hover:bg-primary transition-all duration-300 hover:shadow-lg">
              Ver Proyectos
            </button>
            <button className="px-8 py-3 border border-outline-variant text-on-surface font-headline font-medium rounded-full hover:bg-surface-container transition-colors duration-300">
              Conversemos
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 border-t border-surface-container">
            <p className="text-sm text-on-surface-variant font-label mb-6">Confiado por:</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="text-on-surface-variant text-sm font-medium">Startup Scaling</div>
              <div className="text-on-surface-variant text-sm font-medium">Enterprise Tech</div>
              <div className="text-on-surface-variant text-sm font-medium">Digital Products</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
