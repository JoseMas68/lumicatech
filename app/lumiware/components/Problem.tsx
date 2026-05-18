'use client';

import { motion } from 'framer-motion';

export default function Problem() {
  const issues = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "Excel y procesos manuales",
      description: "Dependencia de hojas de cálculo y papel, lentos y propensos a errores."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Catálogos desactualizados",
      description: "Dificultad para mantener la información de producto al día."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ),
      title: "Poca visibilidad del stock",
      description: "No se conoce el inventario real en tiempo real."
    }
  ];

  return (
    <section className="py-32 bg-white dark:bg-[#050505] relative z-10 transition-colors duration-500">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h2 className="text-xl md:text-2xl font-light tracking-widest text-rose-500 uppercase mb-4">
              El Problema
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface dark:text-white font-headline leading-tight transition-colors duration-500">
              La gestión de almacenes sigue siendo <span className="text-rose-500">ineficiente</span>
            </h3>
          </motion.div>

          {/* Issues Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {issues.map((issue, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group p-8 rounded-2xl bg-surface-container dark:bg-white/5 border border-outline-variant dark:border-white/10 overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Number + Icon */}
                <div className="relative flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-300">
                    {issue.icon}
                  </div>
                  <span className="text-6xl font-black text-on-surface/5 dark:text-white/5 font-sans leading-none select-none transition-colors duration-500">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="relative space-y-3">
                  <h4 className="text-xl font-bold text-on-surface dark:text-white group-hover:text-rose-500 transition-colors">
                    {issue.title}
                  </h4>
                  <p className="text-on-surface-variant dark:text-slate-400 leading-relaxed font-light transition-colors duration-500">
                    {issue.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Callout Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden group shadow-lg"
          >
            <div className="absolute inset-0 bg-surface-container dark:bg-[#0a0a0a] transition-colors duration-500"></div>
            <div className="absolute inset-0 border border-outline-variant dark:border-white/10 group-hover:border-rose-500/30 rounded-2xl transition-all duration-500"></div>

            <div className="relative p-10 md:p-14 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
              {/* Left icon */}
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-rose-500/30 blur-xl rounded-full"></div>
                <div className="relative w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 flex-1">
                <h4 className="text-2xl md:text-4xl font-bold text-on-surface dark:text-white tracking-tight transition-colors duration-500">
                  Elimina el caos de los sistemas aislados
                </h4>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light transition-colors duration-500">
                  ¿Sistemas que no se hablan entre sí? Eso es cosa del pasado. Unifica tus procesos, elimina el error humano y transforma tu almacén de un obstáculo en un motor de alta velocidad.
                </p>
                <div className="pt-6 border-t border-outline-variant dark:border-white/10">
                  <p className="text-xl font-medium text-rose-500">
                    El resultado son costes invisibles.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
