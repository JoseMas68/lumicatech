'use client';

export default function ProjectsSection() {
  const projects = [
    {
      title: "Delta Caravan",
      description: "Plataforma de gestión de reservas con calendario avanzado y documentación integrada.",
      tech: "Next.js, Prisma, PostgreSQL",
      status: "En Producción"
    },
    {
      title: "CRMDev",
      description: "Sistema CRM empresarial con gestión de proyectos, tareas y soporte integrado.",
      tech: "Next.js, Prisma, Neon DB",
      status: "En Desarrollo"
    },
    {
      title: "App Sphera",
      description: "Aplicación de gestión de eventos con análisis y reportería en tiempo real.",
      tech: "React, Node.js, MongoDB",
      status: "Completado"
    }
  ];

  return (
    <section id="projects" className="relative py-20 px-6 sm:px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-on-surface">
            Proyectos Destacados
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Cada proyecto representa precisión técnica y impacto medible.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="card-glow-hover bg-surface-container border border-surface-container-high rounded-xl p-6 transition-all duration-300 hover:border-outline-variant"
            >
              {/* Project Badge */}
              <div className="inline-block px-3 py-1 bg-primary-container bg-opacity-10 border border-primary-container border-opacity-20 rounded-full mb-4">
                <span className="text-xs font-medium text-primary-container font-label">
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold font-headline text-on-surface mb-3">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.split(", ").map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-full border border-outline-variant border-opacity-30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
