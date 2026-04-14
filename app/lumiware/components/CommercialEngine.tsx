'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CommercialEngine() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Catálogos Automatizados",
      description: "Genera catálogos visuales profesionales en segundos basados en tu stock real."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Presupuestos y Albaranes",
      description: "Crea documentos de venta instantáneos con validación de disponibilidad."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Sincronización Comercial",
      description: "Conexión directa entre stock disponible y capacidad de venta."
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background Deep Glow - Pinkish/Purple for commerce */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-pink-500/30 to-purple-600/10 shadow-2xl shadow-pink-900/10 group">
              <div className="relative rounded-[22px] overflow-hidden aspect-[4/3] lg:aspect-[4/5] bg-black">
                <img
                  src="https://lumicatech.b-cdn.net/LumiwareImages/grok_image_1773938396019.jpg"
                  alt="Módulo comercial WareFlow"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                {/* Floating Sales Metrics inside Image */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between gap-4">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs text-slate-300 font-mono mb-1">Stock Disponible</p>
                    <p className="text-xl font-bold text-white">4,205 u.</p>
                  </div>
                  <div className="bg-pink-500/20 backdrop-blur-md border border-pink-500/30 p-4 rounded-xl flex-1 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                    <p className="text-xs text-pink-200 font-mono mb-1">Ventas Hoy</p>
                    <p className="text-xl font-bold text-white">€12.4k</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-px bg-pink-500"></span>
                <span className="font-mono text-xs text-pink-400 tracking-[0.3em] uppercase">
                  Motor Comercialización
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black font-headline text-white leading-tight">
                Automatización de <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">ventas.</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-xl font-light">
                Lumiware no es solo logística; es una herramienta comercial que conecta el almacén con las ventas. Automatiza catálogos, presupuestos y albaranes.
              </p>
            </div>

            {/* Features Array */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-5 hover:border-pink-500/30 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 group shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-300 text-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-100 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              {/* Added a filler card to balance 2x2 grid since there are 3 items */}
              <Link href="/booking" className="block h-full">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 3 * 0.15 }}
                  className="p-6 h-full rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-600/10 border border-pink-500/20 flex flex-col items-center justify-center gap-4 hover:border-pink-400/50 transition-all duration-300 group cursor-pointer text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:bg-pink-400 group-hover:text-black transition-colors duration-300">
                    <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <span className="text-pink-300 font-bold text-sm">Automatización del proceso comercial</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
