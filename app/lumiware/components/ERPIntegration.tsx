'use client';

export default function ERPIntegration() {
  const benefits = [
    {
      icon: "integration_instructions",
      title: "Compatible con tu ERP actual",
      description: "No es necesario cambiar lo que ya funciona. LUMIWARE se añade encima."
    },
    {
      icon: "speed",
      title: "Añade agilidad y usabilidad",
      description: "La operativa diaria del almacén se acelera sin tocar los sistemas base."
    },
    {
      icon: "upgrade",
      title: "Mejora procesos existentes",
      description: "Digitaliza los puntos críticos: inventario, catálogos, presupuestos y facturación."
    }
  ];

  return (
    <section className="py-32 bg-surface">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-20">
          <div className="font-label text-xs text-primary-container tracking-[0.3em] uppercase mb-4">
            Integración
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-6">
            Complemento para tu ERP
          </h2>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl">
            LUMIWARE no sustituye tu sistema de gestión actual. Se integra con él para añadir la capa de agilidad y usabilidad que le falta al almacén.
          </p>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Benefits */}
          <div className="space-y-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center border border-primary-container/30">
                  <span className="material-symbols-outlined text-xl text-primary-container">
                    {benefit.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-on-surface">
                    {benefit.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: ERP Dashboard Image */}
          <div>
            <div className="relative rounded-2xl overflow-hidden glow-shadow">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda8e89f0d?w=800&q=80"
                alt="Dashboard de ERP"
                className="w-full h-auto object-cover"
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
