'use client';

import Link from 'next/link';

export default function ContactSection() {
  return (
    <section id="contact" className="py-28 px-6 bg-white dark:bg-[#050505] transition-colors duration-500 border-t border-slate-200 dark:border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-primary font-mono font-bold uppercase tracking-widest text-xs mb-6">
          Contacto
        </p>
        <h2 className="text-4xl md:text-5xl font-headline font-black text-black dark:text-white mb-6 leading-tight tracking-tight">
          Hablemos de tu proyecto
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-xl mx-auto font-light">
          Agenda una reunión, escríbenos por WhatsApp o llámanos directamente. Respondemos en menos de 24 horas.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* Reservar cita */}
          <Link
            href="/booking"
            className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl text-sm font-bold tracking-tight transition-all hover:scale-105 shadow-sm hover:shadow-[0_0_20px_rgba(0,196,217,0.3)]"
          >
            <span className="material-symbols-outlined text-base">event_available</span>
            Reservar cita
          </Link>

          {/* WhatsApp */}
          <a
            href="https://wa.me/34624237696"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl text-slate-700 dark:text-white transition-all border border-slate-200 dark:border-white/10 text-sm font-medium hover:border-primary/30 dark:hover:border-primary/30 group"
          >
            <span className="material-symbols-outlined text-base group-hover:text-primary transition-colors">chat_bubble</span>
            WhatsApp
          </a>

          {/* Teléfono */}
          <a
            href="tel:+34624237696"
            className="flex items-center gap-2 px-7 py-3.5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl text-slate-700 dark:text-white transition-all border border-slate-200 dark:border-white/10 text-sm font-medium hover:border-primary/30 dark:hover:border-primary/30 group"
          >
            <span className="material-symbols-outlined text-base group-hover:text-primary transition-colors">phone_in_talk</span>
            +34 624 237 696
          </a>
        </div>

        <p className="text-slate-500 dark:text-slate-500 text-sm font-light">
          También por email:{' '}
          <a
            href="mailto:info@lumicatech.es"
            className="text-black dark:text-white hover:text-primary transition-colors font-medium"
          >
            info@lumicatech.es
          </a>
        </p>
      </div>
    </section>
  );
}
