'use client';

import { motion } from 'framer-motion';

export default function ERPIntegration() {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      ),
      title: "Compatible con tu ERP actual",
      description: "No es necesario cambiar lo que ya funciona. LUMIWARE se añade encima."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Añade agilidad y usabilidad",
      description: "La operativa diaria del almacén se acelera sin tocar los sistemas base."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
      title: "Mejora procesos existentes",
      description: "Digitaliza los puntos críticos: inventario, catálogos, presupuestos y facturación."
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background glow lines */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none translate-y-1/2"></div>

      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-sky-500"></span>
                <span className="font-mono text-xs text-sky-400 tracking-[0.3em] uppercase">
                  Integración
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-headline text-white leading-tight mb-6">
                Complemento para tu <span className="text-sky-400">ERP</span>
              </h2>
              <p className="text-slate-300 text-xl leading-relaxed font-light">
                <span className="font-bold text-white">LUMIWARE</span> no sustituye tu sistema de gestión actual. Se integra con él para añadir la capa de agilidad y usabilidad que le falta al almacén.
              </p>
            </div>

            {/* Benefits Array */}
            <div className="space-y-8 pl-4 border-l-2 border-white/10">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  <div className="absolute -left-[2.35rem] top-2.5 w-4 h-4 rounded-full bg-white/10 border border-white/20 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(14,165,233,0)] group-hover:shadow-[0_0_15px_rgba(14,165,233,0.8)]"></div>
                  
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/[0.08] hover:border-sky-500/30 transition-all duration-300 ml-4 group-hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-200 transition-colors">{benefit.title}</h3>
                    <p className="text-slate-400 font-light leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Mockup/Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden p-2 bg-gradient-to-br from-white/10 to-transparent shadow-2xl backdrop-blur">
              <div className="relative rounded-[20px] overflow-hidden bg-black border border-white/10 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda8e89f0d?w=800&q=80"
                  alt="Dashboard de ERP"
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/60 to-indigo-900/30 mix-blend-color"></div>
                
                {/* Tech UI connecting 2 systems visually */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-4 w-full px-8">
                     {/* Legacy System */}
                    <div className="flex-1 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300 text-center">
                      <span className="text-slate-400 font-mono text-xs block mb-2">SISTEMA BASE</span>
                      <span className="text-white font-bold text-sm">ERP Actual</span>
                    </div>

                    {/* Connection */}
                    <div className="flex-shrink-0 flex items-center gap-1 group">
                      <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-sky-400 rounded-full"></motion.div>
                      <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-sky-400 rounded-full"></motion.div>
                      <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-sky-400 rounded-full"></motion.div>
                      <svg className="w-6 h-6 text-sky-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>

                    {/* Lumiware */}
                    <div className="flex-1 bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.3)] transform rotate-[5deg] hover:rotate-0 transition-transform duration-300 text-center">
                      <span className="text-sky-300 font-mono text-xs block mb-2">CAPA ÁGIL</span>
                      <span className="text-white font-bold text-sm">LUMIWARE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
