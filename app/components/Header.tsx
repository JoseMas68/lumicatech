'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const navItems = [
  { num: '01', label: 'Inicio',     href: '/',          indent: 'pl-2' },
  { num: '02', label: 'Proyectos',  href: '/#projects', indent: 'pl-8' },
  { num: '03', label: 'Servicios',  href: '/#services', indent: 'pl-4' },
  { num: '04', label: 'Filosofía',  href: '/#approach', indent: 'pl-10' },
  { num: '05', label: 'Contacto',   href: '/#contact',  indent: 'pl-6' },
];

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.classList.toggle('light', initialTheme === 'light');
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const logoSrc = theme === 'light'
    ? 'https://lumicatech.b-cdn.net/Logos/logo_h_dark.png'
    : 'https://lumicatech.b-cdn.net/Logos/logo_h_light.png';

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 glass-nav transition-colors duration-500 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={logoSrc} alt="LumicaTech" className="h-8 md:h-11 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="/#projects" className="text-on-surface-variant font-headline tracking-tight transition-colors duration-200 hover:text-primary-container">Proyectos</Link>
            <Link href="/#services" className="text-on-surface-variant font-headline tracking-tight transition-colors duration-200 hover:text-primary-container">Servicios</Link>
            <Link href="/#approach" className="text-on-surface-variant font-headline tracking-tight transition-colors duration-200 hover:text-primary-container">Filosofía</Link>
            <a href="/#contact" className="text-on-surface-variant font-headline tracking-tight transition-colors duration-200 hover:text-primary-container">Contacto</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="relative w-12 h-12 rounded-lg bg-surface-container border border-outline-variant/20 transition-all flex items-center justify-center group hover:bg-surface-container-high hover:border-primary-container/50"
                aria-label="Toggle theme"
              >
                <span className="material-symbols-outlined text-lg text-on-surface-variant group-hover:text-primary-container transition-colors duration-200">
                  {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            )}

            <Link
              href="/booking"
              className="hidden md:inline-flex bg-gradient-to-br from-primary to-primary-container text-on-primary-container border border-current px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight transition-all duration-200 hover:shadow-[0_0_20px_rgba(156,240,255,0.3)] hover:opacity-95 active:scale-95"
            >
              Solicitar diagnóstico
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container border border-outline-variant/20 text-on-surface-variant hover:text-primary-container transition-colors duration-200"
              aria-label="Abrir menú"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Menu ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#050508] overflow-hidden flex flex-col justify-between p-6">
          {/* Blob backgrounds */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-600/25 top-[-80px] left-[-80px] blur-[80px] animate-pulse pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-700/15 bottom-[10%] right-[-60px] blur-[80px] animate-pulse pointer-events-none" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }}
          />

          {/* Close button */}
          <div className="relative z-50 flex justify-between items-center pt-2">
            {/* Logo en menú móvil */}
            <img
              src="https://lumicatech.b-cdn.net/Logos/logo_h_light.png"
              alt="LumicaTech"
              className="h-8 w-auto"
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300 hover:scale-110 active:scale-95 pointer-events-auto"
              aria-label="Cerrar menú"
            >
              <span className="material-symbols-outlined text-white transition-transform duration-300 group-hover:rotate-90">close</span>
            </button>
          </div>

          {/* Nav items */}
          <nav className="relative z-10 flex-1 flex flex-col justify-center gap-1 -mt-8">
            <div className="w-24 h-px bg-white/15 mb-6 ml-4" />
            {navItems.map((item) => (
              <a
                key={item.num}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group block w-full ${item.indent} pr-4 py-3 transform transition-all duration-300 hover:translate-x-3`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] font-mono text-indigo-400/60 font-bold tracking-widest -translate-y-3 group-hover:text-white transition-colors">
                    {item.num}
                  </span>
                  <span
                    className="text-[2rem] leading-none font-black text-white tracking-tighter transition-all duration-300 group-hover:skew-x-[-8deg] group-hover:scale-105"
                    style={{ textShadow: 'none' }}
                  >
                    {item.label.toUpperCase()}
                  </span>
                </div>
                <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-transparent transition-all duration-500 mt-1" />
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div className="relative z-10 mt-auto flex flex-col items-end gap-4">
            {/* Contact links */}
            <div className="flex flex-col items-end gap-2">
              <a
                href="https://wa.me/34624237696"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-mono tracking-widest text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <span className="h-px w-8 bg-slate-700" />
                WHATSAPP
              </a>
              <a
                href="tel:+34624237696"
                className="flex items-center gap-3 text-sm font-mono tracking-widest text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <span className="h-px w-6 bg-slate-700" />
                +34 624 237 696
              </a>
              <a
                href="mailto:info@lumicatech.es"
                className="flex items-center gap-3 text-sm font-mono tracking-widest text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <span className="h-px w-4 bg-slate-700" />
                INFO@LUMICATECH.ES
              </a>
            </div>

            {/* CTA */}
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold tracking-tight transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              Solicitar diagnóstico
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
