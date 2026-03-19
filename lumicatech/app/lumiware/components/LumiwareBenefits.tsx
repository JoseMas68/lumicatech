'use client';

export default function LumiwareBenefits() {
  const benefits = [
    {
      number: "01",
      title: "Automatización Total",
      description: "Elimina tareas manuales y reduce errores humanos hasta en un 95%."
    },
    {
      number: "02",
      title: "Visibilidad en Tiempo Real",
      description: "Conoce exactamente dónde está cada producto en todo momento."
    },
    {
      number: "03",
      title: "Toma de Decisiones",
      description: "Datos predictivos que te ayudan a anticipar la demanda y ajustar stock."
    },
    {
      number: "04",
      title: "Escalabilidad",
      description: "Crece sin preocuparte por la infraestructura. Sistema diseñado para miles de SKUs."
    }
  ];

  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="font-label text-xs text-primary-container tracking-[0.3em] uppercase mb-6">
            Beneficios
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
            Por qué elegir Lumiware
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Solución integral para gestión moderna de inventarios.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-surface-container border border-surface-container-high rounded-lg p-8 transition-all duration-300 hover:border-primary-container group"
            >
              {/* Number */}
              <div className="text-4xl font-bold font-headline text-primary-container opacity-20 group-hover:opacity-40 transition-opacity mb-6">
                {benefit.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold font-headline text-on-surface mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-on-surface-variant leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
