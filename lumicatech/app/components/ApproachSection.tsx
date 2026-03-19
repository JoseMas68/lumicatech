import React from 'react';

const ApproachSection: React.FC = () => {
  return (
    <section className="py-24 bg-surface-variant relative overflow-hidden">
      {/* Background decoration */}
      <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-6">
          Listos para transformar tu empresa
        </h2>
        <p className="text-xl text-on-surface-variant mb-10 max-w-2xl mx-auto">
          Comienza tu proyecto con un diagnóstico gratuito de tus necesidades tecnológicas.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
            Ver más proyectos
          </a>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
