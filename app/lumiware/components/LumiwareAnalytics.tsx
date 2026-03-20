'use client';

export default function LumiwareAnalytics() {
  return (
    <section className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <div className="order-2 md:order-1">
            <div className="relative h-96 bg-gradient-to-br from-surface-container to-surface-container-high rounded-xl border border-outline-variant/20 flex items-center justify-center overflow-hidden">
              <div className="text-center space-y-4 w-full px-8">
                <div className="space-y-2">
                  <div className="h-2 bg-primary rounded-full w-3/4 mx-auto"></div>
                  <div className="h-2 bg-primary/60 rounded-full w-1/2 mx-auto"></div>
                  <div className="h-2 bg-primary/30 rounded-full w-2/3 mx-auto"></div>
                </div>
                <p className="text-on-surface-variant font-label text-sm mt-8">Dashboard Analytics</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 md:order-2 space-y-8">
            <div>
              <div className="font-label text-xs text-primary-container tracking-[0.3em] uppercase mb-4">
                Advanced Analytics
              </div>
              <h2 className="text-4xl font-headline font-bold text-on-surface mb-4">
                Datos que hablan
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Análisis predictivo en tiempo real. Identifica tendencias, anticipa demanda y optimiza tu operación.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Rotación de Stock", value: "+45%" },
                { label: "Reducción de Costos", value: "-30%" },
                { label: "Eficiencia de Almacén", value: "+65%" },
                { label: "Tiempo de Búsqueda", value: "-80%" }
              ].map((metric, idx) => (
                <div key={idx} className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/10">
                  <p className="text-sm text-on-surface-variant mb-2">{metric.label}</p>
                  <p className="text-2xl font-bold font-headline text-primary-container">{metric.value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="px-8 py-4 rounded-lg text-base font-bold tracking-tight text-primary border border-outline-variant/20 hover:bg-surface-container transition-all">
              Explorar Reports
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
