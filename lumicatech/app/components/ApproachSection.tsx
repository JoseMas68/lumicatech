'use client';

export default function ApproachSection() {
  const services = [
    {
      icon: "developer_mode_tv",
      title: "Custom Software",
      description: "Soluciones a medida para problemas complejos de arquitectura digital.",
      filled: true
    },
    {
      icon: "cloud_done",
      title: "Cloud Infrastructure",
      description: "Infraestructuras resilientes diseñadas para escalar masivamente.",
      filled: true
    },
    {
      icon: "auto_awesome",
      title: "AI & Automation",
      description: "Integramos modelos inteligentes para potenciar la productividad operativa.",
      filled: true
    },
    {
      icon: "security",
      title: "Cybersecurity",
      description: "Protección robusta para los activos digitales más críticos de tu empresa.",
      filled: true
    }
  ];

  return (
    <section id="approach" className="py-32 bg-surface-container-low relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column - Philosophy */}
          <div className="lg:col-span-5">
            <div className="font-label text-xs text-primary-container tracking-[0.3em] uppercase mb-6">
              Filosofía
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tighter mb-8 leading-tight">
              Qué hacemos y por qué importa.
            </h2>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-12">
              Calidad, atención al detalle y obsesión por la excelencia. Cada proyecto es único y buscamos soluciones que realmente generen impacto.
            </p>

            {/* Philosophy Points */}
            <div className="space-y-8">
              {/* Point 1 */}
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-surface-container flex items-center justify-center rounded-lg border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary-container">
                    precision_manufacturing
                  </span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface text-lg mb-2">
                    Ingeniería de Precisión
                  </h4>
                  <p className="text-on-surface-variant">
                    Código limpio, escalable y mantenible desde el primer día.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-surface-container flex items-center justify-center rounded-lg border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary-container">
                    lightbulb
                  </span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface text-lg mb-2">
                    Mentalidad de Producto
                  </h4>
                  <p className="text-on-surface-variant">
                    No solo ejecutamos, entendemos tu negocio para proponer la mejor ruta.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Services Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`bg-surface p-8 rounded-xl border border-outline-variant/5 hover:scale-[1.02] transition-transform duration-300 ${
                  idx >= 2 ? 'sm:mt-8' : ''
                }`}
              >
                <span
                  className="material-symbols-outlined text-primary-container mb-4 text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {service.icon}
                </span>
                <h4 className="font-headline font-bold text-on-surface mb-3">
                  {service.title}
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
