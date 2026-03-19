'use client';

export default function LumiwareFeatures() {
  const features = [
    {
      icon: "qr_code_2",
      title: "Códigos QR Inteligentes",
      description: "Escaneo instantáneo de productos, ubicación y cantidades en tiempo real."
    },
    {
      icon: "analytics",
      title: "Analytics Avanzado",
      description: "Dashboards predictivos con alertas automáticas y reportería detallada."
    },
    {
      icon: "sync",
      title: "Sincronización Cloud",
      description: "Datos sincronizados en tiempo real entre almacenes y sistemas."
    },
    {
      icon: "verified_user",
      title: "Control de Acceso",
      description: "Permisos granulares y auditoría completa de movimientos."
    },
    {
      icon: "speed",
      title: "Rendimiento Extremo",
      description: "Arquitectura optimizada para alta concurrencia y bajo latency."
    },
    {
      icon: "integration_instructions",
      title: "Integraciones API",
      description: "Conecta con tus sistemas ERP, CRM y herramientas existentes."
    }
  ];

  return (
    <section className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="font-label text-xs text-primary-container tracking-[0.3em] uppercase mb-6">
            Características Principales
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Herramientas poderosas diseñadas para simplificar la gestión de inventarios.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-surface-container border border-surface-container-high rounded-lg p-6 transition-all duration-300 hover:border-primary-container hover:bg-surface-container-high group"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary-container bg-opacity-10 rounded-lg flex items-center justify-center mb-4 border border-primary-container border-opacity-20 group-hover:bg-opacity-20 transition-all">
                <span className="material-symbols-outlined text-primary-container">
                  {feature.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-headline text-on-surface mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
