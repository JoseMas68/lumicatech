'use client';

export default function Benefits() {
  const benefits = [
    {
      metric: "85%",
      title: "Reducción de Errores",
      description: "Automatización elimina errores manuales en operaciones de almacén"
    },
    {
      metric: "3x",
      title: "Más Rápido",
      description: "Velocidad de procesamiento triplicada en búsqueda y picking"
    },
    {
      metric: "45%",
      title: "Menos Costos",
      description: "Optimización operativa reduce significativamente gastos generales"
    },
    {
      metric: "99.9%",
      title: "Uptime Garantizado",
      description: "Infraestructura cloud con disponibilidad enterprise-grade"
    }
  ];

  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-headline font-bold text-on-surface mb-6">
            Resultados Comprobados
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Empresas líderes ya optimizaron sus operaciones con WareFlow
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-surface-container border border-outline-variant/20 rounded-xl p-8 text-center hover:border-primary-container/30 transition-all"
            >
              {/* Metric */}
              <div className="text-5xl font-headline font-bold gradient-primary bg-clip-text text-transparent mb-4">
                {benefit.metric}
              </div>

              {/* Title */}
              <h3 className="font-headline font-bold text-on-surface mb-2">
                {benefit.title}
              </h3>

              {/* Description */}
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
