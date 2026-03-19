'use client';

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$299",
      period: "/mes",
      description: "Para pequeños almacenes",
      features: [
        "Hasta 1,000 SKUs",
        "Dashboard básico",
        "Soporte por email",
        "Actualizaciones incluidas"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "$799",
      period: "/mes",
      description: "Para operaciones medianas",
      features: [
        "Hasta 10,000 SKUs",
        "Dashboard avanzado",
        "IA predictiva",
        "Soporte prioritario",
        "Integraciones API"
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
        "Soporte 24/7",
        "SLA garantizado"
      ],
      highlighted: false
    }
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-headline font-bold text-on-surface mb-6">
            Planes Transparentes
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Elige el plan que mejor se ajusta a tu operación
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl border transition-all ${
                plan.highlighted
                  ? 'bg-surface-container-low border-primary-container/50 ring-2 ring-primary-container/20 transform scale-105'
                  : 'bg-surface-container border-outline-variant/20'
              } p-8`}
            >
              {/* Plan Name */}
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">
                {plan.name}
              </h3>
              <p className="text-on-surface-variant text-sm mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-headline font-bold text-on-surface">
                  {plan.price}
                </span>
                <span className="text-on-surface-variant ml-2">
                  {plan.period}
                </span>
              </div>

              {/* CTA Button */}
              <button className={`w-full py-3 rounded-lg font-headline font-bold mb-8 transition-all ${
                plan.highlighted
                  ? 'gradient-primary text-on-primary-container hover:glow-shadow'
                  : 'border border-outline-variant/30 text-on-surface hover:border-primary-container/30'
              }`}>
                {plan.highlighted ? 'Comenzar Ahora' : 'Más Info'}
              </button>

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container text-sm mt-0.5">
                      check_circle
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      {feature}
                    </span>
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
