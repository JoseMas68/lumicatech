'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function SocialProof() {
  const stats = [
    { end: 500, suffix: "+", decimals: 0, label: "Almacenes digitalizados" },
    { end: 23, suffix: "%", decimals: 0, label: "Ahorro medio en costes" },
    { end: 47, suffix: "s", decimals: 0, label: "Tiempo medio de escaneo" },
    { end: 99.9, suffix: "%", decimals: 1, label: "Uptime garantizado" }
  ];

  return (
    <section className="bg-[#050505] py-20 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      
      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 divide-x divide-white/5">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`text-center ${idx !== 0 ? 'pl-8' : ''}`}
            >
              <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3 drop-shadow-[0_0_15px_rgba(0,196,217,0.3)]">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="text-sm text-slate-400 font-label tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trusted By Label */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-xs text-slate-500 mb-8 font-mono tracking-[0.2em] uppercase">
            Empresas de referencia confían en nosotros
          </p>
          <div className="flex justify-center items-center gap-x-16 gap-y-8 opacity-40 flex-wrap filter grayscale hover:grayscale-0 transition-all duration-700">
            <div className="text-2xl font-black text-white mix-blend-screen tracking-tighter">CERÁMICA MAS</div>
            <div className="text-2xl font-black text-white mix-blend-screen tracking-tighter">ROCA GROUP</div>
            <div className="text-2xl font-black text-white mix-blend-screen tracking-tighter">PORCELANOSA</div>
            <div className="text-2xl font-black text-white mix-blend-screen tracking-tighter">LAMINART</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
