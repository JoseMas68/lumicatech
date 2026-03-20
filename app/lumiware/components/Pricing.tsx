'use client';

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$999",
      period: "/mes",
      description: "Para almacenes pequeños",
      features: ["Hasta 5,000 SKUs", "Dashboard básico", "Soporte por email", "1 usuario"],
      highlighted: false
    },
    {
      name: "Professional",
      price: "$2,999",
      period: "/mes",
      description: "Para operaciones medianas",
      features: [
        "Hasta 50,000 SKUs",
        "Dashboard completo + IA",
        "Catálogos PDF automáticos",
        "5 usuarios",
        "Soporte prioritario"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contacta",
      description: "Para operaciones a escala",
      features: [
        "SKUs ilimitados",
        "Infraestructura dedicada",
        "IA + ML personalizado",
        "Usuarios ilimitados",
        "SLA 99.9%"
      ],
      highlighted: false
    }
  ];

  return (
    <section className="py-32 bg-surface-container-lowest">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-surface">
            Planes adaptados a tu escala
          </h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            WareFlow crece contigo. Desde pequeños almacenes hasta operaciones industriales.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl border transition-all p-8 ${
                plan.highlighted
                  ? 'bg-surface-container-low border-primary-container/50 ring-2 ring-primary-container/20 transform md:scale-105'
                  : 'bg-surface-container border-outline-variant/20'
              }`}
            >
              {/* Plan Name */}
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">
                {plan.name}
              </h3>
              <p className="text-on-surface-variant text-sm mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-black font-headline text-on-surface">
                  {plan.price}
                </span>
                <span className="text-on-surface-variant ml-2">{plan.period}</span>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-headline font-bold mb-8 transition-all ${
                  plan.highlighted
                    ? 'gradient-primary text-on-primary-container hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]'
                    : 'border border-outline-variant/30 text-on-surface hover:border-primary-container/30'
                }`}
              >
                {plan.highlighted ? 'Comenzar ahora' : 'Más info'}
              </button>

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container text-sm mt-0.5">
                      check_circle
                    </span>
                    <span className="text-on-surface-variant text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
