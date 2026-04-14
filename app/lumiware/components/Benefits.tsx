'use client';

export default function Benefits() {
  const benefits = [
    {
      icon: "error",
      title: "Menos Errores",
      description: "Reducción del 60% en errores humanos mediante automatización y validación de procesos."
    },
    {
      icon: "inventory_2",
      title: "Stock Optimizado",
      description: "Maximización del espacio de almacenamiento y reducción de stock obsoleto."
    },
    {
      icon: "schedule",
      title: "Ahorro de Tiempo",
      description: "Ahorro del 40% en tiempo operativo gracias a la eliminación de procesos manuales."
    },
    {
      icon: "visibility",
      title: "Visibilidad Total",
      description: "Conocimiento exacto del stock en tiempo real, ubicación y estado de cada producto."
    },
    {
      icon: "insights",
      title: "Decisiones Informadas",
      description: "Toma de decisiones basada en datos reales y analytics avanzado."
    },
    {
      icon: "trending_up",
      title: "Escalabilidad",
      description: "Sistema que crece con tu negocio sin límites de capacidad."
    }
  ];

  return (
    <section className="py-32 bg-surface-container-lowest">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black font-headline text-on-surface">
            Qué cambia en tu empresa.
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/10">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-10 space-y-4"
            >
              <span className="material-symbols-outlined text-primary-container text-4xl">
                {benefit.icon}
              </span>
              <h4 className="text-xl font-bold font-headline text-on-surface">
                {benefit.title}
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
