'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tighter text-on-surface font-headline">
          LumicaTech
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <Link href="#projects" className="text-on-surface-variant hover:text-on-surface transition-colors font-headline tracking-tight">
            Proyectos
          </Link>
          <Link href="#services" className="text-on-surface-variant hover:text-on-surface transition-colors font-headline tracking-tight">
            Servicios
          </Link>
          <Link href="#approach" className="text-on-surface-variant hover:text-on-surface transition-colors font-headline tracking-tight">
            Filosofía
          </Link>
          <Link href="#contact" className="text-on-surface-variant hover:text-on-surface transition-colors font-headline tracking-tight">
            Contacto
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-6">
          <button className="hidden md:inline-flex bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight hover:shadow-[0_0_20px_rgba(156,240,255,0.3)] transition-all active:scale-95 duration-200">
            Solicitar diagnóstico
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-on-surface-variant">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}
