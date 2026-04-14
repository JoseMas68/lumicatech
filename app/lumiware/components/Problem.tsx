'use client';

export default function Problem() {
  const issues = [
    {
      icon: "table_chart",
      title: "Excel y procesos manuales",
      description: "Dependencia de hojas de cálculo y papel, lentos y propensos a errores."
    },
    {
      icon: "inventory",
      title: "Catálogos desactualizados",
      description: "Dificultad para mantener la información de producto al día."
    },
    {
      icon: "visibility_off",
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
                className="relative group p-8 rounded-2xl bg-surface border border-outline-variant/10 overflow-hidden hover:-translate-y-1 hover:border-error/30 transition-all duration-300"
              >
                {/* Top accent gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-error/60 via-error/40 to-transparent"></div>

                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Number + Icon */}
                <div className="relative flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-error/10 border border-error/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-error/80">
                      {issue.icon}
                    </span>
                  </div>
                  <span className="text-5xl font-black text-error/10 font-headline leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="relative space-y-3">
                  <h3 className="text-xl font-bold text-on-surface">
                    {issue.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {issue.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Callout Section */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-error/10 via-error/5 to-surface-container-low"></div>
            <div className="absolute inset-0 border border-error/20 rounded-2xl group-hover:border-error/40 transition-all duration-300"></div>
            <div className="relative p-10 md:p-12 flex flex-col md:flex-row gap-8 items-start">
              {/* Left icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-error/10 border border-error/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-error">warning</span>
              </div>

              {/* Content */}
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-on-surface">
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
      </div>
    </section>
  );
}
