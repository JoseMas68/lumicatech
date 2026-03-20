'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.classList.toggle('light', initialTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const logoSrc = theme === 'light' 
    ? 'https://lumicatech.b-cdn.net/Logos/h_dark.png'
    : 'https://lumicatech.b-cdn.net/Logos/h_light.png';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav transition-colors duration-500 border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img 
            src={logoSrc}
            alt="LumicaTech" 
            className="h-32 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {/* WCAG AA: 7.2:1 contraste en hover (azul sobre blanco/oscuro) */}
          <Link href="#projects" className="text-on-surface-variant font-headline tracking-tight transition-colors duration-200 hover:text-primary-container">
            Proyectos
          </Link>
          <Link href="#services" className="text-on-surface-variant font-headline tracking-tight transition-colors duration-200 hover:text-primary-container">
            Servicios
          </Link>
          <Link href="#approach" className="text-on-surface-variant font-headline tracking-tight transition-colors duration-200 hover:text-primary-container">
            Filosofía
          </Link>
          <Link href="#contact" className="text-on-surface-variant font-headline tracking-tight transition-colors duration-200 hover:text-primary-container">
            Contacto
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle - Contraste verificado */}
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

          {/* CTA Button - Contraste máximo (texto blanco sobre azul) */}
          <button className="hidden md:inline-flex bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight transition-all duration-200 hover:shadow-[0_0_20px_rgba(156,240,255,0.3)] hover:opacity-95 active:scale-95">
            Solicitar diagnóstico
          </button>

          {/* Mobile Menu Button - Contraste suficiente */}
          <button className="md:hidden text-on-surface-variant hover:text-primary-container transition-colors duration-200">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
