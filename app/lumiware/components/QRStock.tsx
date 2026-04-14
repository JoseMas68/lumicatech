'use client';

import { motion } from 'framer-motion';

export default function QRStock() {
  const features = [
    {
      number: "01",
      title: "Gestión por QR",
      desc: "Identificación única de cada producto mediante códigos QR para trazabilidad total."
    },
    {
      number: "02",
      title: "Escalabilidad Sin Límites",
      desc: "Sistema que crece contigo sin restricciones de capacidad o complejidad."
    },
    {
      number: "03",
      title: "Flexibilidad Operativa",
      desc: "Se adapta a cualquier tipo de almacén, producto o proceso de gestión."
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
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
                <span className="w-8 h-px bg-cyan-500"></span>
                <span className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase">
                  Motor Digital
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-headline mb-6 text-white leading-tight">
                Escalable. Flexible. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tecnológico.</span>
              </h2>
              <p className="text-slate-300 text-xl leading-relaxed font-light">
                Un motor digital diseñado para crecer con tu negocio. Tecnología probada que se adapta a cualquier operación de almacenaje.
              </p>
            </div>

            {/* Features Array */}
            <div className="space-y-8 relative">
              {/* Connecting vertical line */}
              <div className="absolute left-[1.15rem] top-8 bottom-8 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/20 to-transparent"></div>
              
              {features.map((feat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex gap-8 items-start relative group"
                >
                  <div className="relative z-10 w-10 h-10 flex-shrink-0 flex items-center justify-center bg-black border-2 border-cyan-500/30 rounded-full group-hover:border-cyan-400 transition-colors duration-300">
                    <span className="font-mono text-cyan-400 text-sm font-bold">{feat.number}</span>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-100 transition-colors">{feat.title}</h4>
                    <p className="text-slate-400 font-light leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image Component */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-cyan-500/30 to-blue-600/10 shadow-2xl shadow-cyan-900/20">
              <div className="relative rounded-[22px] overflow-hidden aspect-[4/5] lg:aspect-square group bg-black">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                  alt="Sistema de gestión de inventario con tecnología QR"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                {/* Tech overlay Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.8)_2px,transparent_2px)] bg-[size:4px_4px] opacity-40"></div>
                
                {/* Cyberpunk Scan Line */}
                <motion.div
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1bg-cyan-400/50 shadow-[0_0_20px_rgba(0,229,255,1)]"
                ></motion.div>

                {/* Floating QR Mockup */}
                <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-cyan-500/30 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-16 h-16 bg-white flex items-center justify-center p-1 rounded relative">
                    <div className="grid grid-cols-4 gap-1 w-full h-full">
                      <div className="bg-black col-span-2 row-span-2"></div>
                      <div className="bg-black"></div>
                      <div className="bg-black col-span-1 row-span-2"></div>
                      <div className="bg-black row-span-3"></div>
                      <div className="bg-black"></div>
                      <div className="bg-black col-span-2"></div>
                      <div className="bg-black"></div>
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
