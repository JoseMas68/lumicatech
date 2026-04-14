'use client';

export default function Benefits() {
  const benefits = [
    {
      icon: "check_circle",
      title: "Menos errores",
      description: "Los procesos automatizados eliminan los fallos manuales en inventario y documentos."
    },
    {
      icon: "speed",
      title: "Más rapidez operativa",
      description: "Escanear un QR es más rápido que buscar en Excel o preguntar al encargado."
    },
    {
      icon: "warehouse",
      title: "Mejor control del almacén",
      description: "Stock actualizado, movimientos trazados y catálogos siempre vigentes."
    },
    {
      icon: "shopping_cart",
      title: "Mejores herramientas comerciales",
      description: "Catálogos, presupuestos y albaranes generados desde el propio almacén."
    },
    {
      icon: "analytics",
      title: "Mayor visibilidad para gerencia",
      description: "Datos en tiempo real para tomar decisiones con información fiable."
    }
  ];

  return (
    <section className="py-32 bg-surface-container-lowest">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-surface mb-6">
            Beneficios
          </h2>
          <p className="text-2xl text-on-surface-variant leading-relaxed font-medium">
            Qué cambia en tu empresa con <span className="text-primary-container">LUMIWARE</span>
          </p>
        </div>

        {/* Benefits Grid - 3 columns layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-surface border border-outline-variant/10 rounded-xl p-8 hover:border-primary-container/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl text-primary-container">
                  {benefit.icon}
                </span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-on-surface">
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
