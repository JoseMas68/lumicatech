'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent border-t border-outline-variant/15 py-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
          {/* Brand & Description */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-2xl font-bold text-on-surface tracking-tighter">
              LumicaTech
            </div>
            <p className="text-on-surface-variant font-label text-sm tracking-wide text-center md:text-left max-w-sm">
              © {currentYear} LumicaTech. Calidad, atención al detalle y obsesión por la excelencia.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-10">
            <Link
              href="#"
              className="text-on-surface-variant hover:text-primary-container transition-colors font-label text-sm tracking-widest uppercase"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="text-on-surface-variant hover:text-primary-container transition-colors font-label text-sm tracking-widest uppercase"
            >
              GitHub
            </Link>
            <Link
              href="#"
              className="text-on-surface-variant hover:text-primary-container transition-colors font-label text-sm tracking-widest uppercase"
            >
              Proyectos
            </Link>
            <Link
              href="#"
              className="text-on-surface-variant hover:text-primary-container transition-colors font-label text-sm tracking-widest uppercase"
            >
              Contacto
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-outline-variant/15 mb-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <span className="text-[10px] text-outline tracking-[0.4em] uppercase">
            Engineered for Excellence — All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
