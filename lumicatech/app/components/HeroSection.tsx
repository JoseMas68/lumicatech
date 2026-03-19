'use client';

import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Decorations */}
      <div className="technical-grid absolute inset-0 opacity-50"></div>
      <div className="hero-glow top-0 right-0 -translate-y-1/2 translate-x-1/2"></div>
      <div className="hero-glow bottom-0 left-0 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <span className="material-symbols-outlined text-primary text-xl">terminal</span>
            <span className="text-sm font-medium text-on-surface-variant">Standard 2024</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface leading-tight mb-6">
            Aplicaciones que <span className="gradient-text">solucionan problemas</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Diseñamos sistemas que funcionan. Ingeniería de precisión y mentalidad de producto para empresas que buscan transformar su operación.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              className="glow-button bg-gradient-to-r from-primary to-primary-container text-surface px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
              href="#contacto"
            >
              Solicitar diagnóstico
            </a>
            <a
              className="px-8 py-4 glass-card text-on-surface rounded-lg font-bold text-lg hover:bg-surface-light transition-all duration-300 border border-primary/20"
              href="#proyectos"
            >
              Ver proyectos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
