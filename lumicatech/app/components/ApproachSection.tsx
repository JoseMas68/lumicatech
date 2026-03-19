'use client';

export default function ApproachSection() {
  const steps = [
    {
      number: "01",
      title: "Descubrimiento",
      description: "Entendemos tu problema, contexto y objetivos. Análisis profundo del alcance técnico."
    },
    {
      number: "02",
      title: "Estrategia",
      description: "Diseñamos la solución: arquitectura, tecnología y roadmap de implementación."
    },
    {
      number: "03",
      title: "Ejecución",
      description: "Desarrollo iterativo con entrega de valor, código limpio y documentación completa."
    },
    {
      number: "04",
      title: "Entrega",
      description: "Deploy en producción, monitoreo inicial y transferencia de conocimiento."
    }
  ];

  return (
    <section id="approach" className="relative py-20 px-6 sm:px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-on-surface">
            Nuestro Enfoque
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Proceso estructurado para máximo impacto técnico.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[120%] h-px bg-gradient-to-r from-primary-container to-transparent"></div>
              )}

              {/* Step Card */}
              <div className="relative z-10 bg-surface-container border border-surface-container-high rounded-lg p-6">
                {/* Step Number */}
                <div className="text-4xl font-bold font-headline text-primary-container opacity-30 mb-4">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold font-headline text-on-surface mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-on-surface-variant mb-6">
            ¿Listo para transformar tu proyecto?
          </p>
          <button className="px-8 py-3 bg-primary-container text-on-primary-container font-headline font-medium rounded-full hover:bg-primary transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2">
            Hablemos
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
