'use client';

export default function AIEngine() {
  const aiFeatures = [
    {
      icon: "lightbulb",
      title: "Recomendaciones similares",
      description: "La IA sugiere productos de características equivalentes o complementarias."
    },
    {
      icon: "category",
      title: "Variantes de la misma gama",
      description: "Localiza alternativas dentro del catálogo propio de forma instantánea."
    },
    {
      icon: "trending_up",
      title: "Mejora de propuestas comerciales",
      description: "El equipo de ventas trabaja con más información y más rapidez."
    }
  ];

  const budgetFeatures = [
    {
      icon: "shopping_cart",
      title: "Selección desde catálogo",
      description: "El cliente registrado o un comercial selecciona productos directamente del inventario actualizado."
    },
    {
      icon: "check_circle",
      title: "Validación de disponibilidad",
      description: "El sistema confirma que cada producto presupuestado existe en stock."
    },
    {
      icon: "verified",
      title: "Sin errores comerciales",
      description: "Elimina propuestas con productos agotados o descatalogados."
    }
  ];

  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter mb-6">
            Inteligencia Artificial
          </h2>
          <p className="text-2xl text-on-surface-variant leading-relaxed font-medium">
            Encuentra productos similares <span className="text-primary-container">automáticamente</span>
          </p>
        </div>

        {/* Two Groups */}
        <div className="space-y-16">
          {/* Group 1: AI Features */}
          <div>
            <div className="grid md:grid-cols-3 gap-6">
              {aiFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-surface border border-outline-variant/10 rounded-xl p-6 hover:border-primary-container/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-container/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center mb-4 border border-primary-container/30">
                    <span className="material-symbols-outlined text-xl text-primary-container">
                      {feature.icon}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-on-surface">
                    {feature.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Smart Budgets */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-on-surface mb-6">
                Presupuestos Inteligentes
              </h3>
              <p className="text-xl text-primary-container font-medium">
                Presupuestos basados en stock real
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {budgetFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-6 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 border border-primary/20">
                    <span className="material-symbols-outlined text-xl text-primary">
                      {feature.icon}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-on-surface">
                    {feature.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-primary-container">
                Vendes lo que realmente tienes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
