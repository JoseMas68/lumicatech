'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Filosofía', href: '#filosofia' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 glass-nav z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text font-display">
                LumicaTech
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                className="nav-link text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
                href={item.href}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              className="glow-button bg-gradient-to-r from-primary to-primary-container text-surface px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300"
              href="#contacto"
            >
              Solicitar diagnóstico
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-surface-variant shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-base font-medium text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contacto"
              className="block w-full px-6 py-3 mt-4 text-center bg-gradient-to-r from-primary to-primary-container text-surface rounded-lg font-bold transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Solicitar diagnóstico
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
