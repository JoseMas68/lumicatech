'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Benefits() {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Menos errores",
      description: "Los procesos automatizados eliminan los fallos manuales en inventario y documentos."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Más rapidez operativa",
      description: "Escanear un QR es más rápido que buscar en Excel o preguntar al encargado."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Mejor control del almacén",
      description: "Stock actualizado, movimientos trazados y catálogos siempre vigentes."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Mejores herramientas comerciales",
      description: "Catálogos, presupuestos y albaranes generados desde el propio almacén."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Mayor visibilidad para gerencia",
      description: "Datos en tiempo real para tomar decisiones con información fiable."
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]"></div>

      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white mb-6">
            Beneficios
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
            Qué cambia en tu empresa con <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">LUMIWARE</span>
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 hover:bg-white/[0.08] hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(0,229,255,0.1)] transition-all duration-300 group backdrop-blur-sm"
            >
              <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,196,217,0.5)]">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-50 transition-colors">
                {benefit.title}
              </h4>
              <p className="text-base text-slate-400 leading-relaxed font-light">
                {benefit.description}
              </p>
            </motion.div>
          ))}
          {/* Add a filler card to maintain grid layout perfectly if needed. Since it's 5 items in a 3 col layout, let's add an action card to complete it */}
          <Link href="/booking" className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 5 * 0.1 }}
              className="h-full w-full flex bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8 flex-col justify-center items-center text-center cursor-pointer group hover:bg-cyan-500/10 transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <svg className="w-6 h-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-cyan-300">Descubre más beneficios</h4>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
