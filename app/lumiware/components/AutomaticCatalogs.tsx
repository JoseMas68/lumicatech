'use client';

export default function AutomaticCatalogs() {
  const features = [
    {
      icon: "auto_awesome",
      title: "Generación automática",
      description: "El catálogo se crea desde los datos ya existentes en el sistema, sin trabajo adicional. Permite generar catálogos personalizados seleccionando productos específicos o el stock completo."
    },
    {
      icon: "category",
      title: "Organización por gamas",
      description: "Agrupa productos por colecciones o familias de forma clara y estructurada."
    },
    {
      icon: "picture_as_pdf",
      title: "Exportación en PDF",
      description: "Lista para imprimir o enviar digitalmente al cliente con un solo clic."
    },
    {
      icon: "store",
      title: "Uso comercial inmediato",
      description: "Ideal para ceramotecas en fábricas de cerámica y showrooms, pero también como herramienta clave en cualquier almacén o red de distribución. Permite a las tiendas ofrecer un catálogo a medida y al momento."
    }
  ];

  return (
    <section className="py-32 bg-surface-container-lowest">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-20">
          <div className="font-label text-xs text-primary-container tracking-[0.3em] uppercase mb-4">
            Motor Comercial
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter mb-6">
            Catálogos Automáticos
          </h2>
          <p className="text-2xl text-on-surface-variant leading-relaxed font-medium">
            Crea catálogos directamente desde tu almacén
          </p>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden glow-shadow">
              <img
                src="https://lumicatech.b-cdn.net/LumiwareImages/grok_image_1773938972210.jpg"
                alt="Generación de catálogos con tablet"
                className="w-full h-auto object-cover"
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface/20 to-transparent"></div>
            </div>
          </div>

          {/* Right: Features with Icons */}
          <div className="order-1 md:order-2 space-y-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center border border-primary-container/30">
                  <span className="material-symbols-outlined text-primary-container">
                    {feature.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-on-surface mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm">
                    {feature.description}
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
