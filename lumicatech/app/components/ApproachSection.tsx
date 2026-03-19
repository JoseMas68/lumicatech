'use client';

export default function ApproachSection() {
  return (
    <section id="approach" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">
              Nuestra Filosofía
            </h2>
            <div className="h-1 w-12 bg-primary-container mb-6"></div>
            <p className="text-on-surface-variant">
              Proceso estructurado para máximo impacto técnico y valor sostenible.
            </p>
          </div>
          <div className="font-label text-on-surface-variant tracking-widest uppercase text-xs">
            Metodología Comprobada
          </div>
        </div>

        {/* Philosophy Points */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Point 1 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-container bg-opacity-10 flex items-center justify-center flex-shrink-0 border border-primary-container border-opacity-20">
                <span className="material-symbols-outlined text-primary-container">precision</span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-headline text-on-surface mb-2">
                  Precisión Técnica
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Código limpio, arquitecturas escalables y soluciones pensadas para durar. No buscamos atajos, buscamos excelencia.
                </p>
              </div>
            </div>
          </div>

          {/* Point 2 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-container bg-opacity-10 flex items-center justify-center flex-shrink-0 border border-primary-container border-opacity-20">
                <span className="material-symbols-outlined text-primary-container">target</span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-headline text-on-surface mb-2">
                  Mentalidad de Producto
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  No solo construimos features. Entendemos tu negocio, objetivos y usuarios para crear soluciones que realmente impacten.
                </p>
              </div>
            </div>
          </div>

          {/* Point 3 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-container bg-opacity-10 flex items-center justify-center flex-shrink-0 border border-primary-container border-opacity-20">
                <span className="material-symbols-outlined text-primary-container">speed</span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-headline text-on-surface mb-2">
                  Velocidad Responsable
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Iteramos rápido sin sacrificar calidad. Entrega de valor constante, decisiones informadas y adaptación ágil.
                </p>
              </div>
            </div>
          </div>

          {/* Point 4 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-container bg-opacity-10 flex items-center justify-center flex-shrink-0 border border-primary-container border-opacity-20">
                <span className="material-symbols-outlined text-primary-container">handshake</span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-headline text-on-surface mb-2">
                  Transparencia Total
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Comunicación clara, documentación completa y visibilidad total del progreso. Eres parte del proceso.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-surface-container-low border border-surface-container-high rounded-xl p-12 text-center">
          <h3 className="text-2xl font-bold font-headline text-on-surface mb-4">
            ¿Listo para transformar tu proyecto?
          </h3>
          <p className="text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Cuéntanos sobre tu idea. Analizaremos la viabilidad técnica y crearemos un plan de acción claro.
          </p>
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-lg text-base font-bold tracking-tight hover:shadow-[0_0_30px_rgba(156,240,255,0.4)] transition-all active:scale-95 inline-flex items-center gap-2">
            Solicitar diagnóstico
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
