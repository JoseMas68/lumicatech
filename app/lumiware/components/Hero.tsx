'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center px-8 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500">
      {/* Background Deep Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/8 dark:bg-primary/10 rounded-full blur-[150px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-600/8 dark:bg-cyan-600/10 rounded-full blur-[120px]"
        />
        {/* Technical Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
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
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container dark:bg-white/5 border border-outline-variant dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 dark:bg-cyan-400"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary dark:bg-cyan-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface dark:text-cyan-50 transition-colors duration-500">LumicaTech Ecosystem</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl font-light tracking-widest text-primary dark:text-cyan-400 uppercase font-sans transition-colors duration-500">
              Lumiware
            </h2>
            <h1 className="text-5xl md:text-7xl font-black font-headline leading-[1.1] tracking-tighter text-on-surface dark:text-white transition-colors duration-500">
              Software de Gestión de <span className="text-primary dark:text-cyan-400 transition-colors duration-500">Almacenes para Pymes con QR</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant dark:text-slate-400 max-w-2xl font-light leading-relaxed transition-colors duration-500">
              Digitaliza tu almacén con códigos QR y control de stock en tiempo real
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-on-surface-variant dark:text-slate-300 max-w-xl font-light leading-relaxed transition-colors duration-500">
            La respuesta integral para la gestión eficiente de almacenes
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 pt-4"
          >
            <Link href="/booking" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-container px-8 py-4 font-bold text-white dark:text-black transition-all hover:scale-[1.02] active:scale-95 shadow-lg dark:shadow-none">
              <span className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span>Solicitar Reunión</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
            <button className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-outline-variant dark:border-white/10 bg-surface-container dark:bg-white/5 px-8 py-4 font-bold text-on-surface dark:text-white backdrop-blur-sm transition-all hover:bg-surface-container-high dark:hover:bg-white/10 active:scale-95 shadow-sm dark:shadow-none">
              <svg className="w-5 h-5 text-primary dark:text-cyan-400 group-hover:text-primary-container dark:group-hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
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
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary-container/20 dark:from-cyan-500/20 dark:to-blue-600/20 blur-3xl rounded-full scale-90"></div>

          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[500px] rounded-2xl border border-outline-variant dark:border-white/10 bg-white/5 dark:bg-white/5 p-2 backdrop-blur-sm shadow-xl dark:shadow-2xl">
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
                <div className="py-3 px-4 rounded-lg bg-black/60 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 dark:bg-cyan-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Sistema Sincronizado</p>
                    <p className="text-xs text-slate-200 dark:text-slate-400">Datos en tiempo real</p>
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
