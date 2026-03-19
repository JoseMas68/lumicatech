'use client';

export default function ProjectsSection() {
  const projects = [
    {
      category: "Logística & ERP",
      icon: "inventory_2",
      title: "Lumiware",
      description: "Sistema de gestión de almacén: Optimización de inventarios y pedidos internos con arquitectura de baja latencia.",
      tech: ["Next.js", "PostgreSQL", "Real-time Analytics"],
      color: "from-primary"
    },
    {
      category: "Reservas & Turismo",
      icon: "calendar_month",
      title: "Delta Caravan",
      description: "Plataforma integral de gestión de reservas: Calendario avanzado, documentación automática y reportería en tiempo real.",
      tech: ["Next.js", "Prisma", "Stripe Integration"],
      color: "from-primary"
    },
    {
      category: "CRM Empresarial",
      icon: "dashboard",
      title: "CRMDev",
      description: "Sistema CRM escalable: Gestión de proyectos, tareas, soporte y webhooks para integraciones automáticas.",
      tech: ["Next.js", "Neon DB", "MCP API"],
      color: "from-primary"
    },
    {
      category: "Eventos & Análisis",
      icon: "analytics",
      title: "App Sphera",
      description: "Plataforma de gestión de eventos con análisis avanzados y reportería interactiva en tiempo real.",
      tech: ["React", "Node.js", "MongoDB"],
      color: "from-primary"
    }
  ];

  return (
    <section id="projects" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">
              Proyectos destacados
            </h2>
            <div className="h-1 w-12 bg-primary-container mb-6"></div>
          </div>
          <div className="font-label text-on-surface-variant tracking-widest uppercase text-xs">
            Case Studies / 2024
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group relative bg-surface-container-low p-8 md:p-12 transition-all duration-500 hover:bg-surface-container-high card-glow-hover overflow-hidden"
            >
              {/* Icon Background */}
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                <span className="material-symbols-outlined text-6xl text-primary-container">
                  {project.icon}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Category Badge */}
                <span className="font-label text-xs text-primary-container tracking-widest uppercase mb-4 block">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="text-3xl font-headline font-bold text-on-surface mb-4">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 bg-surface-container border border-outline-variant/30 text-on-surface-variant rounded font-label"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 rounded-lg text-base font-bold tracking-tight text-primary border border-outline-variant/20 hover:bg-surface-container transition-all">
            Ver todos los proyectos
          </button>
        </div>
      </div>
    </section>
  );
}
