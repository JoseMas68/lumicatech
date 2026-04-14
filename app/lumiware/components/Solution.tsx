'use client';

import { motion } from 'framer-motion';

export default function Solution() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      title: "Escanea un QR",
      description: "Cada producto tiene su código único. Un escaneo da acceso inmediato a su ficha completa y productos relacionados en caso de existencia."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Consulta información en segundos",
      description: "Stock, movimientos, variantes, documentos y más desde cualquier dispositivo."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122M6.15 15.82a9 9 0 1111.7 0" />
        </svg>
      ),
      title: "Sin fricción, sin formación compleja",
      description: "Interfaz pensada para el operario de almacén. Rápido, visual y directo."
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-xl md:text-2xl font-light tracking-widest text-[#00e5ff] uppercase mb-4">
            La Solución
          </h2>
          <h3 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white">
            Una nueva forma de gestionar el almacén
          </h3>
        </motion.div>

        {/* Main Content - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">LUMIWARE</span> digitaliza el inventario mediante códigos QR y una interfaz simple que permite acceder a toda la información del producto en segundos.
            </p>

            {/* Features List */}
            <div className="space-y-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                    {feature.icon}
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-50 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Callout */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 inline-block">
                Todo empieza con escanear un QR.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Visual Abstract Phone/Device Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Outer glowing frame */}
            <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl p-[1px] bg-gradient-to-b from-cyan-500/50 via-blue-500/20 to-transparent">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 blur-xl rounded-3xl"></div>
              
              {/* Inner content */}
              <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[23px] flex flex-col items-center justify-center border border-white/5 overflow-hidden group">
                
                {/* Tech grid inside device */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
                
                {/* Scanning line animation */}
                <motion.div 
                  animate={{ y: ["-150%", "150%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#00e5ff]"
                />

                <div className="relative z-10 text-center space-y-6">
                  {/* Glowing Icon */}
                  <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl group-hover:bg-cyan-400/40 transition-colors duration-500"></div>
                    <svg className="relative w-full h-full text-cyan-400 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  {/* Decorative Scan Box */}
                  <div className="w-32 h-32 mx-auto mt-4 border-2 border-cyan-500/30 rounded-xl flex items-center justify-center relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-lg"></div>
                    <svg className="w-12 h-12 text-cyan-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>

                  <p className="text-cyan-400/80 font-mono tracking-[0.3em] text-sm font-bold pt-4">
                    ESCANEA Y GESTIONA
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floaters */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 top-1/4 py-3 px-5 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"></div>
                <span className="text-white text-sm font-medium">Stock: 145 uds</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
