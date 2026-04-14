'use client';

export default function AdaptableTool() {
  const benefits = [
    {
      icon: "rocket_launch",
      title: "Adopción Instantánea",
      description: "Sin instalaciones ni curvas de aprendizaje. Si tus usuarios saben navegar por internet, ya saben usar nuestra solución. Rentabilidad inmediata desde el minuto uno."
    },
    {
      icon: "tune",
      title: "Precisión a Medida",
      description: "Interfaz 100% adaptable. Nuestros especialistas la configuran para que encaje perfectamente en tu flujo de trabajo."
    },
    {
      icon: "schedule",
      title: "Venta en Tiempo Real",
      description: "Máxima autonomía para el cliente. Precios, stock y pedidos al instante, 24/7 y sin intermediarios."
    }
  ];

  return (
    <section className="py-32 bg-surface">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-6">
            La Herramienta que se Adapta a Ti, <span className="text-primary-container">no al Revés</span>
          </h2>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden glow-shadow">
              <img
                src="https://images.unsplash.com/photo-1551288049-beebdedf1c9ee8?w=800&q=80"
                alt="Trabajador usando ordenador en almacén"
                className="w-full h-auto object-cover"
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            </div>
          </div>

          {/* Right: Benefits with Icons */}
          <div className="order-1 md:order-2 space-y-10">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 bg-primary-container/10 rounded-xl flex items-center justify-center border border-primary-container/30">
                  <span className="material-symbols-outlined text-2xl text-primary-container">
                    {benefit.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-on-surface">
                    {benefit.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
