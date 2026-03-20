'use client';

export default function Features() {
  const features = [
    {
      icon: "qr_code_2",
      title: "QR Inteligente",
      description: "Captura instantánea de productos con información completa y ubicación en tiempo real.",
      highlight: true
    },
    {
      icon: "dashboard",
      title: "Dashboard Avanzado",
      description: "Visualización de datos en tiempo real con gráficos interactivos y KPIs automáticos.",
      highlight: false
    },
    {
      icon: "auto_awesome",
      title: "IA Predictiva",
      description: "Predicción de demanda, optimización de stock y alertas automáticas inteligentes.",
      highlight: false
    },
    {
      icon: "sync_alt",
      title: "Sincronización",
      description: "Integración perfecta con tus sistemas ERP, CRM y herramientas existentes.",
      highlight: false
    },
    {
      icon: "security",
      title: "Seguridad Enterprise",
      description: "Cifrado end-to-end, auditoría completa y cumplimiento normativo garantizado.",
      highlight: false
    },
    {
      icon: "speed",
      title: "Rendimiento Extremo",
      description: "Procesa miles de transacciones por segundo sin latencia.",
      highlight: false
    }
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-headline font-bold text-on-surface mb-6">
            Características que transforman
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Todo lo que necesitas para gestionar almacenes de cualquier escala.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-xl border transition-all duration-300 ${
                feature.highlight
                  ? 'bg-surface-container-low border-primary-container/50 ring-1 ring-primary-container/20'
                  : 'bg-surface-container-low border-outline-variant/20 hover:border-primary-container/30'
              }`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${
                feature.highlight
                  ? 'bg-primary-container/20 border border-primary-container/30'
                  : 'bg-surface-container border border-outline-variant/20'
              }`}>
                <span className={`material-symbols-outlined text-2xl ${
                  feature.highlight ? 'text-primary-container' : 'text-on-surface-variant'
                }`}>
                  {feature.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-headline font-bold text-on-surface mb-3">
                {feature.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>

              {feature.highlight && (
                <div className="mt-4 pt-4 border-t border-outline-variant/20">
                  <span className="text-xs font-label uppercase tracking-widest text-primary-container">
                    Funcionalidad Principal
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
