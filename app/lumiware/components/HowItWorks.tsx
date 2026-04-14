'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      title: "Escaneas → accedes a información",
      description: "Ficha de producto completa al instante desde móvil o tablet."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Consulta stock en tiempo real",
      description: "Siempre actualizado. Sin retrasos ni discrepancias."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Registro automático de movimientos",
      description: "Cada entrada y salida queda registrada."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Rápido, visual y sin fricción",
      description: "Interfaz optimizada para operarios de almacén."
    }
  ];

  return (
    <section className="py-32 bg-[#0a0a0a] relative z-10 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05),transparent_70%)]"></div>
      
      <div className="max-w-screen-xl mx-auto px-8 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white">
            Cómo Funciona
          </h2>
          <div className="space-y-4">
            <p className="text-3xl text-slate-300 leading-relaxed font-light">
              Toda la tienda en un <span className="font-bold text-cyan-400">solo escaneo</span>
            </p>
          </div>
        </motion.div>

        {/* 2x2 Grid using Bento style */}
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden group backdrop-blur-sm"
            >
              {/* Animated Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Step Number Badge */}
              <span className="absolute top-6 right-6 w-10 h-10 bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-sm font-bold text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                {String(idx + 1).padStart(2, '0')}
              </span>
              
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                <div className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,196,217,0.8)]">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-50 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-light text-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
