'use client';

export default function Benefits() {
  const benefits = [
    {
      icon: "speed",
      title: "Velocidad Operativa",
      description: "Reducción del 60% en el tiempo de registro y localización de mercancía."
    },
    {
      icon: "inventory_2",
      title: "Control Total",
      description: "Visibilidad 24/7 de existencias reales, m² disponibles y valor de stock."
    },
    {
      icon: "point_of_sale",
      title: "Venta Ágil",
      description: "Herramientas comerciales directas integradas con la realidad del almacén."
    },
    {
      icon: "visibility",
      title: "Sin Puntos Ciegos",
      description: "Trazabilidad de cada producto desde que entra hasta que se factura."
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/10">
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
