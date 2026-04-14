'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500">
      
      {/* Background Grid - Minimalist */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 dark:bg-slate-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500 dark:bg-slate-400"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 font-bold">Estándar de calidad 2026</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-headline font-black tracking-tighter text-black dark:text-white leading-[1.05] mb-8"
          >
            Software que <br className="hidden md:block" />
            <span className="text-slate-400 dark:text-slate-500 font-light italic">soluciona</span> problemas
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300/80 leading-relaxed max-w-2xl mb-12 font-light"
          >
            Diseñamos y desarrollamos soluciones tecnológicas de alto rendimiento que optimizan procesos y escalan tu negocio.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link 
              href="/booking"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-bold tracking-tight transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span>Solicitar un diagnóstico</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link 
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold tracking-tight text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95"
            >
              Ver ecosistema
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
