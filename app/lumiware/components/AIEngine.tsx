'use client';

import { motion } from 'framer-motion';

export default function AIEngine() {
  const aiFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Recomendaciones similares",
      description: "La IA sugiere productos de características equivalentes o complementarias."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Variantes de la misma gama",
      description: "Localiza alternativas dentro del catálogo propio de forma instantánea."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Mejora de propuestas comerciales",
      description: "El equipo de ventas trabaja con más información y más rapidez."
    }
  ];

  const budgetFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Selección desde catálogo",
      description: "El cliente registrado o un comercial selecciona productos directamente del inventario actualizado."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Validación de disponibilidad",
      description: "El sistema confirma que cada producto presupuestado existe en stock."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Sin errores comerciales",
      description: "Elimina propuestas con productos agotados o descatalogados."
    }
  ];

  return (
    <section className="py-32 bg-[#0a0a0a] relative z-10 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-screen-xl mx-auto px-8 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white mb-6">
            Inteligencia Artificial
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
            Encuentra productos similares <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">automáticamente</span>
          </p>
        </motion.div>

        {/* Two Groups */}
        <div className="space-y-24">
          {/* Group 1: AI Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {aiFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-violet-500/30 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(139,92,246,0.15)] transition-all duration-300 group backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[40px] group-hover:bg-violet-500/20 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6 border border-violet-500/20 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300">
                      <div className="text-violet-400">
                        {feature.icon}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-violet-200 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-slate-400 text-base leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          {/* Group 2: Smart Budgets */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Presupuestos Inteligentes
              </h3>
              <p className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Presupuestos basados en stock real
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {budgetFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-amber-500/30 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(251,191,36,0.15)] transition-all duration-300 group backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] group-hover:bg-amber-500/10 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                      <div className="text-amber-400">
                        {feature.icon}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-amber-100 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-slate-400 text-base leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <p className="text-lg font-bold text-amber-400">
                  Vendes lo que realmente tienes.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
