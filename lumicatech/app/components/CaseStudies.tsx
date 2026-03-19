import React from 'react';

const CaseStudies: React.FC = () => {
  return (
    <section className="py-24 bg-surface-variant" id="proyectos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Proyectos destacados</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary-container rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Case Study 1: Lumiware */}
          <article className="glass-card rounded-2xl overflow-hidden card-glow-hover flex flex-col h-full border border-primary/10">
            <div className="aspect-video bg-surface-light relative overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-primary/30 text-9xl">inventory_2</span>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Logística & ERP</div>
              <h3 className="text-2xl font-bold text-on-surface mb-4">Lumiware</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">
                Sistema integral de gestión de inventario y pedidos para optimizar la cadena de suministro.
              </p>
              <div className="pt-6 border-t border-surface-light flex items-center justify-between">
                <span className="text-sm font-semibold text-on-surface-muted">+45% Eficiencia</span>
                <a className="text-primary font-bold hover:underline flex items-center gap-2" href="#">
                  Ver detalles
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>

          {/* Case Study 2: Eficiencia Operativa */}
          <article className="glass-card rounded-2xl overflow-hidden card-glow-hover flex flex-col h-full border border-primary/10">
            <div className="aspect-video bg-surface-light relative overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-primary/30 text-9xl">settings_suggest</span>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Automatización</div>
              <h3 className="text-2xl font-bold text-on-surface mb-4">Eficiencia Operativa</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">
                Automatización inteligente de procesos industriales con monitoreo en tiempo real.
              </p>
              <div className="pt-6 border-t border-surface-light flex items-center justify-between">
                <span className="text-sm font-semibold text-on-surface-muted">-60% Tiempo de proceso</span>
                <a className="text-primary font-bold hover:underline flex items-center gap-2" href="#">
                  Ver detalles
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
