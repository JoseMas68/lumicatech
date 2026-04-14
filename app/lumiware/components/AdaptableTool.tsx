'use client';

import { motion } from 'framer-motion';

export default function AdaptableTool() {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Adopción Instantánea",
      description: "Sin instalaciones ni curvas de aprendizaje. Si tus usuarios saben navegar por internet, ya saben usar nuestra solución. Rentabilidad inmediata desde el minuto uno."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Precisión a Medida",
      description: "Interfaz 100% adaptable. Nuestros especialistas la configuran para que encaje perfectamente en tu flujo de trabajo."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Venta en Tiempo Real",
      description: "Máxima autonomía para el cliente. Precios, stock y pedidos al instante, 24/7 y sin intermediarios."
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white mb-6">
            La Herramienta que se Adapta a Ti <span className="text-blue-400">no al Revés</span>
          </h2>
        </motion.div>

        {/* Main Content - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image with tech overlay */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
              <div className="aspect-[4/3] relative">
                <img
                  src="https://lumicatech.b-cdn.net/LumiwareImages/trabando%20en%20lumiware.webp"
                  alt="Trabajador usando ordenador en almacén"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-blue-900/40 to-transparent"></div>
                
                {/* Tech floating UI overlay */}
                <div className="absolute inset-x-8 bottom-8 flex justify-between items-end">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
                    <p className="text-white font-mono text-sm">Estado: <span className="text-emerald-400">Sincronizado</span></p>
                    <div className="w-full bg-white/20 h-1 mt-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="bg-emerald-400 h-full"
                      />
                    </div>
                  </div>
                  
                  {/* Decorative dots grid */}
                  <div className="grid grid-cols-4 gap-2 opacity-50">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Outline box effect */}
            <div className="absolute inset-0 border-2 border-blue-500/20 rounded-3xl -m-4 pointer-events-none hidden md:block"></div>
          </motion.div>

          {/* Right: Benefits */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 space-y-10"
          >
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex gap-6 group"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-400/50 group-hover:scale-110 transition-all duration-300">
                  {benefit.icon}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-light text-lg">
                    {benefit.description}
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
