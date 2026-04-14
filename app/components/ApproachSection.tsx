'use client';

import { motion } from 'framer-motion';

export default function ApproachSection() {
  const services = [
    {
      icon: "code_blocks",
      title: "Software a Medida",
      description: "Soluciones estables para problemas complejos de arquitectura digital.",
    },
    {
      icon: "dns",
      title: "Infraestructura Cloud",
      description: "Sistemas resilientes diseñados para escalar de forma eficiente.",
    },
    {
      icon: "smart_toy",
      title: "IA & Datos",
      description: "Modelos inteligentes para potenciar la productividad operativa.",
    },
    {
      icon: "shield_lock",
      title: "Ciberseguridad",
      description: "Protección robusta para los activos digitales más críticos.",
    }
  ];

  return (
    <section id="approach" className="py-20 md:py-32 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden relative">
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          
          {/* Left Column - Philosophy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:sticky top-32"
          >
            <div className="font-mono text-xs text-primary tracking-[0.3em] uppercase mb-6 font-bold">
              El Enfoque
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-black text-black dark:text-white tracking-tighter mb-6 md:mb-8 leading-tight">
              Ingeniería a otro nivel.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-10 md:mb-12">
              Calidad, atención al detalle y obsesión por la excelencia radical. Cada proyecto es una pieza única de arquitectura de software.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
              {/* Point A */}
              <div className="flex gap-5 md:gap-6 group">
                <div className="w-11 h-11 md:w-12 md:h-12 shrink-0 bg-primary/5 flex items-center justify-center rounded-xl border border-primary/20 text-primary backdrop-blur-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined font-light text-xl md:text-2xl">
                    precision_manufacturing
                  </span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-black dark:text-white text-lg mb-1 md:mb-2">
                    Código Limpio
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 font-light text-sm">
                    Sistemas testeados y escalables desde el primer despliegue.
                  </p>
                </div>
              </div>

              {/* Point B */}
              <div className="flex gap-5 md:gap-6 group">
                <div className="w-11 h-11 md:w-12 md:h-12 shrink-0 bg-primary/5 flex items-center justify-center rounded-xl border border-primary/20 text-primary backdrop-blur-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined font-light text-xl md:text-2xl">
                    lightbulb
                  </span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-black dark:text-white text-lg mb-1 md:mb-2">
                    Mentalidad de Producto
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 font-light text-sm">
                    Entendemos tu negocio para proponer la solución óptima real.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Bento Services Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 lg:mt-0">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`bg-slate-50 dark:bg-white/5 p-8 lg:p-10 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-primary/10 group ${idx === 1 || idx === 3 ? 'sm:mt-8' : ''}`}
              >
                <div className="w-14 h-14 rounded-xl bg-white/80 dark:bg-white/5 flex items-center justify-center mb-8 text-primary border border-slate-100 dark:border-white/10 group-hover:bg-primary group-hover:text-white dark:group-hover:text-[#050505] group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <span
                    className="material-symbols-outlined text-2xl font-light"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    {service.icon}
                  </span>
                </div>
                <h4 className="text-xl font-headline font-bold text-black dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
