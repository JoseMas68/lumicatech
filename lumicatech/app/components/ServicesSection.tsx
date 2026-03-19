export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 bg-surface" id="filosofia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Philosophy */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-6">
                Filosofía
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                No solo escribimos código; diseñamos soluciones estratégicas. El software es una herramienta para impulsar el crecimiento, no una barrera técnica.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">engineering</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-2">Ingeniería de Precisión</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Arquitecturas escalables, seguras y mantenibles a largo plazo.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">lightbulb</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-2">Mentalidad de Producto</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Entregamos valor real desde las primeras etapas del desarrollo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Services Grid */}
          <div>
            <h3 className="text-2xl font-bold text-on-surface mb-8">Servicios</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Service 1 */}
              <div className="glass-card rounded-xl p-6 card-glow-hover border border-primary/10">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">code</span>
                <h4 className="font-bold text-on-surface mb-2">Custom Software</h4>
                <p className="text-on-surface-variant text-sm">
                  Aplicaciones a medida
                </p>
              </div>

              {/* Service 2 */}
              <div className="glass-card rounded-xl p-6 card-glow-hover border border-primary/10">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">cloud</span>
                <h4 className="font-bold text-on-surface mb-2">Cloud Infrastructure</h4>
                <p className="text-on-surface-variant text-sm">
                  Escalabilidad automática
                </p>
              </div>

              {/* Service 3 */}
              <div className="glass-card rounded-xl p-6 card-glow-hover border border-primary/10">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">smart_toy</span>
                <h4 className="font-bold text-on-surface mb-2">AI & Automation</h4>
                <p className="text-on-surface-variant text-sm">
                  Procesos inteligentes
                </p>
              </div>

              {/* Service 4 */}
              <div className="glass-card rounded-xl p-6 card-glow-hover border border-primary/10">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">security</span>
                <h4 className="font-bold text-on-surface mb-2">Cybersecurity</h4>
                <p className="text-on-surface-variant text-sm">
                  Protección avanzada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
