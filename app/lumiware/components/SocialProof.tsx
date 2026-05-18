'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function SocialProof() {
  const stats = [
    { end: 20, suffix: "+", decimals: 0, label: "Proyectos en marcha" },
    { end: 23, suffix: "%", decimals: 0, label: "Ahorro medio en costes" },
    { end: 47, suffix: "s", decimals: 0, label: "Tiempo medio de escaneo" },
    { end: 99.9, suffix: "%", decimals: 1, label: "Uptime garantizado" }
  ];

  return (
    <section className="bg-white dark:bg-[#050505] py-20 relative overflow-hidden border-y border-outline-variant dark:border-white/5 transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-container/5 via-blue-500/5 to-purple-500/5 dark:from-cyan-500/5 dark:via-blue-500/5 dark:to-purple-500/5"></div>

      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 divide-x divide-outline-variant dark:divide-white/5">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`text-center ${idx !== 0 ? 'pl-8' : ''}`}
            >
              <p className="text-4xl md:text-5xl font-black text-primary dark:text-cyan-400 mb-3 drop-shadow-[0_0_15px_rgba(0,196,217,0.3)] transition-colors duration-500">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="text-sm text-on-surface-variant dark:text-slate-400 font-label tracking-wide transition-colors duration-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
