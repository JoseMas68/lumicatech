'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesSection() {
  return (
    <section className="py-32 bg-slate-50 dark:bg-[#0a0a0a] text-center overflow-hidden relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-headline font-black text-black dark:text-white mb-8 tracking-tighter leading-tight"
        >
          Listos para transformar tu empresa
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-light"
        >
          Contacta con nosotros y descubre cómo nuestra infraestructura tecnológica puede optimizar tus procesos operativos.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link 
            href="/booking"
            className="group relative bg-gradient-to-br from-primary to-primary-container text-white px-10 py-5 rounded-xl text-lg font-bold tracking-tight hover:shadow-[0_0_30px_rgba(0,196,217,0.3)] transition-all active:scale-95 inline-flex items-center justify-center gap-2"
          >
            Acelerar ahora
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
