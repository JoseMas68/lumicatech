'use client';

export default function ServicesSection() {
  const services = [
    {
      number: "01",
      title: "Desarrollo Full-Stack",
      description: "Aplicaciones escalables desde frontend hasta infraestructura. TypeScript, React, Next.js, Node.js, PostgreSQL y arquitecturas modernas."
    },
    {
      number: "02",
      title: "Arquitectura de Sistemas",
      description: "Diseño de arquitecturas robustas, microservicios, APIs escalables y bases de datos optimizadas para alto rendimiento."
    },
    {
      number: "03",
      title: "Dashboards & Analytics",
      description: "Interfaces de datos inteligentes, reportería en tiempo real, visualizaciones impactantes y análisis predictivo."
    },
    {
      number: "04",
      title: "DevOps & Infraestructura",
      description: "Infraestructura segura, CI/CD, monitoreo proactivo, escalabilidad automática y optimización de costos cloud."
    },
    {
      number: "05",
      title: "Design System & UI",
      description: "Sistemas de diseño consistentes basados en Material Design 3, accesibilidad WCAG y experiencia de usuario excepcional."
    },
    {
      number: "06",
      title: "Consultoría Técnica",
      description: "Estrategia tecnológica, auditoría de código, optimización de procesos, mentoría técnica y transformación digital."
    }
  ];

  return (
    <section id="services" className="py-32 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">
              Servicios especializados
            </h2>
            <div className="h-1 w-12 bg-primary-container mb-6"></div>
            <p className="text-on-surface-variant">
              Soluciones técnicas diseñadas para transformar tu negocio.
            </p>
          </div>
          <div className="font-label text-on-surface-variant tracking-widest uppercase text-xs">
            6 Especialidades
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-surface-container border border-surface-container-high rounded-lg p-8 transition-all duration-300 hover:border-primary-container hover:border-opacity-50 group"
            >
              {/* Number */}
              <div className="text-5xl font-bold font-headline text-primary-container opacity-20 group-hover:opacity-40 transition-opacity mb-6">
                {service.number}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-headline text-on-surface mb-4">
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
