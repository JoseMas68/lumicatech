'use client';

export default function Problem() {
  const issues = [
    {
      title: "Excel y procesos manuales",
      description: "Dependencia de hojas de cálculo y papel, lentos y propensos a errores."
    },
    {
      title: "Catálogos desactualizados",
      description: "Dificultad para mantener la información de producto al día."
    },
    {
      title: "Poca visibilidad del stock",
      description: "No se conoce el inventario real en tiempo real."
    }
  ];

  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-black font-headline tracking-tight">
              El Problema
            </h2>
            <p className="text-2xl md:text-3xl text-on-surface-variant leading-relaxed font-medium">
              La gestión de almacenes sigue siendo <span className="text-error">ineficiente</span>
            </p>
          </div>

          {/* Issues Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {issues.map((issue, idx) => (
              <div
                key={idx}
                className="p-8 bg-surface-container rounded-xl border-l-4 border-error/50 space-y-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-on-surface">
                  {issue.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {issue.description}
                </p>
              </div>
            ))}
          </div>

          {/* Callout Section */}
          <div className="bg-gradient-to-br from-error/10 to-error/5 rounded-2xl p-12 border border-error/20 hover:border-error/40 transition-all duration-300">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-on-surface">
                Elimina el caos de los sistemas aislados
              </h3>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Sistemas que no se hablan entre sí? Eso es cosa del pasado. Unifica tus procesos, elimina el error humano y transforma tu almacén de un obstáculo en un motor de alta velocidad.
              </p>
              <div className="pt-4 border-t border-error/20">
                <p className="text-xl font-medium text-error">
                  Un almacén es un obstáculo si no se digitaliza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
