'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectsSection() {
  const projects = [
    {
      category: "SaaS / Logística",
      title: "Lumiware",
      description: "Sistema de gestión de almacén. Optimización de inventarios y pedidos con tecnología móvil de escaneo.",
      tech: ["Next.js", "PostgreSQL", "Real-time", "Movilidad"],
      link: "/lumiware"
    },
    {
      category: "Gestión & Reservas",
      title: "Delta Caravan",
      description: "Ecosistema integral para gestión de flotas y reservas de vehículos de recreo con panel de control avanzado.",
      tech: ["Plataforma Base", "Gestor Documental", "Pasarela Pagos"],
      link: "/en-construccion"
    },
    {
      category: "Optimización de procesos",
      title: "Eficiencia Operativa",
      description: "Aumento de la comunicación y colaboración entre equipos mediante automatizaciones y procesos inteligentes.",
      tech: ["Node.js", "Multidispositivo", "Integración API"],
      link: "/en-construccion"
    }
  ];

  return (
    <section id="projects" className="py-32 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-500 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-headline font-black text-black dark:text-white tracking-tight mb-6">
              El ecosistema.
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-light">
              Desarrollamos infraestructura digital especializada. Estos son algunos de los motores que construimos.
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white dark:bg-white/5 p-8 lg:p-10 rounded-2xl border border-slate-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/10 dark:hover:shadow-cyan-400/5 hover:border-cyan-500/30 overflow-hidden flex flex-col items-start backdrop-blur-sm"
            >
              <span className="font-mono text-xs text-cyan-500 dark:text-cyan-400 tracking-widest uppercase mb-6 block">
                {String(idx + 1).padStart(2, '0')} // {project.category}
              </span>

              <h3 className="text-3xl font-headline font-bold text-black dark:text-white mb-4 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-3 py-1.5 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={project.link}
                className="inline-flex items-center gap-2 text-black dark:text-white font-bold text-sm tracking-wide group-hover:gap-4 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-all"
              >
                Explorar proyecto
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
