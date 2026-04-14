'use client';

import { motion } from 'framer-motion';

export default function AutomaticCatalogs() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Generación automática",
      description: "El catálogo se crea desde los datos ya existentes en el sistema, sin trabajo adicional. Permite generar catálogos personalizados seleccionando productos específicos o el stock completo."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Organización por gamas",
      description: "Agrupa productos por colecciones o familias de forma clara y estructurada."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Exportación en PDF",
      description: "Lista para imprimir o enviar digitalmente al cliente con un solo clic."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Uso comercial inmediato",
      description: "Ideal para ceramotecas en fábricas de cerámica y showrooms, pero también como herramienta clave en cualquier almacén. Permite ofrecer un catálogo a medida y al momento."
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Decorative floating blurred orbs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-purple-500"></span>
            <span className="font-mono text-xs text-purple-400 tracking-[0.3em] uppercase">
              Motor Comercial
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white mb-6">
            Catálogos Automáticos
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
            Crea catálogos directamente desde tu almacén
          </p>
        </motion.div>

        {/* Main Content - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image (SaaS floating mockup style) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
              <div className="relative rounded-2xl overflow-hidden group aspect-[4/3] lg:aspect-square">
                <img
                  src="https://lumicatech.b-cdn.net/LumiwareImages/grok_image_1773938972210.jpg"
                  alt="Generación de catálogos con tablet"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Tech overlay grid and glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-transparent to-black/20"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
              </div>
            </div>
            
            {/* Floating element */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 lg:-right-12 bg-black/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold">Catálogo.pdf</p>
                  <p className="text-xs text-slate-400">Generado con éxito</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Features */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 space-y-8"
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex gap-5 group"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
