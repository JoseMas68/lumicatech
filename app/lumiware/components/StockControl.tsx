'use client';

import { motion } from 'framer-motion';

export default function StockControl() {
  const stockFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      title: "Registro de movimientos 100% digital",
      description: "Digitaliza tus salidas, automatiza tu éxito. Ofrece a tus clientes la libertad de autogestionar."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Actualización automática",
      description: "El stock se ajusta en tiempo real con cada operación. Siempre sabes lo que tienes."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Trazabilidad de movimientos",
      description: "Historial completo de quién movió qué y cuándo. Documentos y movimientos vinculados."
    }
  ];

  const documentFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Generación de pedidos y albaranes",
      description: "Crea pedidos y/o albaranes directamente desde el inventario escaneado, sin reescribir datos."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Facturación asociada",
      description: "Vincula la factura al albarán de forma automática y coherente."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      ),
      title: "Registro automático en el sistema",
      description: "Todo queda guardado sin intervención manual adicional. De producto a albarán en segundos."
    }
  ];

  return (
    <section className="py-32 bg-[#0a0a0a] relative z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,196,217,0.05),transparent_60%)] pointer-events-none"></div>
      
      <div className="max-w-screen-xl mx-auto px-8 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white mb-6">
            Control de Stock
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
            Inventario siempre <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">actualizado</span>
          </p>
        </motion.div>

        {/* Two Groups */}
        <div className="space-y-24">
          {/* Group 1: Stock Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Digitaliza tus salidas, automatiza tu éxito
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {stockFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(0,229,255,0.15)] transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                    <div className="text-cyan-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-50 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-slate-400 text-base leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          {/* Group 2: Documents */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Documentos Comerciales
              </h3>
              <p className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                De producto a albarán en segundos
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {documentFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.15)] transition-all duration-300 group backdrop-blur-sm"
                >
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                    <div className="text-blue-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white group-hover:text-blue-100 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-slate-400 text-base leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}