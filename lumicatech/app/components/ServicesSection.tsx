'use client';

export default function ServicesSection() {
  const services = [
    {
      icon: "code",
      title: "Desarrollo Full-Stack",
      description: "Aplicaciones escalables desde frontend hasta infraestructura. TypeScript, React, Node.js, PostgreSQL."
    },
    {
      icon: "architecture",
      title: "Arquitectura de Sistemas",
      description: "Diseño de arquitecturas robustas, microservicios, APIs y bases de datos optimizadas."
    },
    {
      icon: "dashboard",
      title: "Dashboards & Analytics",
      description: "Interfaces de datos inteligentes, reportería en tiempo real y visualizaciones impactantes."
    },
    {
      icon: "security",
      title: "Seguridad & DevOps",
      description: "Infraestructura segura, CI/CD, monitoreo y escalabilidad automática."
    },
    {
      icon: "design",
      title: "Design System & UI",
      description: "Sistemas de diseño consistentes, Material Design 3, accesibilidad y experiencia de usuario."
    },
    {
      icon: "support",
      title: "Consultoría Técnica",
      description: "Estrategia tecnológica, auditoría de código, optimización de procesos y mentoría."
    }
  ];

  return (
    <section id="services" className="relative py-20 px-6 sm:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-on-surface">
            Servicios Especializados
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Soluciones técnicas diseñadas para resolver problemas complejos.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="card-glow-hover bg-surface-container border border-surface-container-high rounded-lg p-6 transition-all duration-300 hover:border-primary-container hover:border-opacity-50"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary-container bg-opacity-10 rounded-lg flex items-center justify-center mb-4 border border-primary-container border-opacity-20">
                <span className="material-symbols-outlined text-primary-container">
                  {service.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-headline text-on-surface mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
