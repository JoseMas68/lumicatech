'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ClosingCTA() {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background technical grid and Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl"
        >
          {/* subtle glow inside card */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 mx-auto relative z-10 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Siguientes pasos</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-white mb-8 relative z-10 leading-tight">
            Digitaliza tu <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">almacén</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto relative z-10 font-light">
            LUMIWARE transforma la gestión del inventario en un proceso ágil, visual y conectado con la realidad del negocio.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center relative z-10">
            <Link
              href="/booking"
              className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-cyan-500 px-10 py-5 font-bold text-black transition-all hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(0,196,217,0.3)]"
            >
              <span className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
              <span className="text-lg">Pide tu cita</span>
              <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>

          {/* Checklist Footer */}
          <div className="mt-20 flex justify-center items-center gap-6 md:gap-10 opacity-70 flex-wrap relative z-10">
            {[
              "Optimización de procesos",
              "Trazabilidad en Tiempo Real",
              "Ecosistema QR"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-mono tracking-widest uppercase text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
