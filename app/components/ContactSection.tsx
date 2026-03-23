'use client';

import Link from 'next/link';

export default function ContactSection() {
  return (
    <section id="contact" className="py-28 px-6 border-t border-outline-variant/10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-primary-container font-label uppercase tracking-widest text-sm mb-4">
          Contacto
        </p>
        <h2 className="text-4xl md:text-5xl font-headline font-black text-on-surface mb-6 leading-tight">
          Hablemos de tu proyecto
        </h2>
        <p className="text-on-surface-variant text-lg mb-12 max-w-xl mx-auto">
          Agenda una reunión, escríbenos por WhatsApp o llámanos directamente. Respondemos en menos de 24 horas.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* Reservar cita */}
          <Link
            href="/booking"
            className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-br from-primary to-primary-container text-on-primary-container rounded-xl text-sm font-bold tracking-tight transition-all hover:shadow-[0_0_20px_rgba(156,240,255,0.3)] hover:opacity-95"
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            Reservar cita
          </Link>

          {/* WhatsApp */}
          <a
            href="https://wa.me/34624237696"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 bg-surface-container hover:bg-surface-container-high rounded-xl text-on-surface-variant hover:text-on-surface transition-all border border-outline-variant/30 text-sm font-medium"
          >
            <span className="material-symbols-outlined text-base">forum</span>
            WhatsApp
          </a>

          {/* Teléfono */}
          <a
            href="tel:+34624237696"
            className="flex items-center gap-2 px-7 py-3.5 bg-surface-container hover:bg-surface-container-high rounded-xl text-on-surface-variant hover:text-on-surface transition-all border border-outline-variant/30 text-sm font-medium"
          >
            <span className="material-symbols-outlined text-base">call</span>
            +34 624 237 696
          </a>
        </div>

        <p className="text-on-surface-variant/50 text-sm">
          También por email:{' '}
          <a
            href="mailto:info@lumicatech.es"
            className="text-primary-container hover:underline"
          >
            info@lumicatech.es
          </a>
        </p>
      </div>
    </section>
  );
}
