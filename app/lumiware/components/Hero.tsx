'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center px-8 overflow-hidden bg-[#050505]">
      {/* Background Deep Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]"
        />
        {/* Technical Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-screen-xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center z-10 pt-20">
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-50">LumicaTech Ecosystem</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl font-light tracking-widest text-cyan-400 uppercase font-sans">
              Lumiware
            </h2>
            <h1 className="text-5xl md:text-7xl font-black font-headline leading-[1.1] tracking-tighter text-white">
              Transformación digital de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">almacenes</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-xl font-light leading-relaxed">
            La respuesta integral para la gestión eficiente de almacenes
          </p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 pt-4"
          >
            <Link href="/booking" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black transition-all hover:bg-cyan-400 hover:scale-[1.02] active:scale-95">
              <span className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span>Empezar ahora</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <button className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
              <svg className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Ver Demo</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column - Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[600px] w-full flex items-center justify-center mt-12 lg:mt-0"
        >
          {/* Glass/Glow Container around image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-3xl rounded-full scale-90"></div>
          
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[500px] rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-2xl">
            <div className="relative w-full h-full rounded-xl overflow-hidden group">
              <Image
                src="https://lumicatech.b-cdn.net/LumiWare%20Portada/interior-of-warehouse-with-racks-full-of-boxes-2026-03-16-23-00-10-utc.webp"
                alt="Interior de almacén con estanterías y cajas"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Overlay gradient to blend image with tech UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Floating UI Elements over Image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="py-3 px-4 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Sistema Sincronizado</p>
                    <p className="text-xs text-slate-400">Datos en tiempo real</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
