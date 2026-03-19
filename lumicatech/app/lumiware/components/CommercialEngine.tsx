'use client';

export default function CommercialEngine() {
  const features = [
    {
      icon: "picture_as_pdf",
      title: "Auto-Catálogos PDF",
      description: "Organiza por colecciones o gamas y exporta catálogos visuales listos para enviar a arquitectos o tiendas (Ceramotecas)."
    },
    {
      icon: "receipt_long",
      title: "Albaranes & Presupuestos",
      description: "Selecciona productos del catálogo, valida disponibilidad y genera el documento en segundos. Sincronización comercial total."
    }
  ];

  return (
    <section className="py-32 bg-surface">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Content */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-4xl font-black font-headline text-on-surface">
              De producto a venta en segundos.
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              WareFlow no es solo logística; es una herramienta comercial. Genera catálogos, presupuestos y albaranes basados en lo que realmente tienes en el suelo.
            </p>
            <button className="text-primary-container font-label flex items-center gap-2 group hover:gap-3 transition-all">
              <span>EXPLORE_COMMERCIAL_MODULE</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Right: Features */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-surface-container-low border border-outline-variant/10 flex flex-col gap-6 hover:border-primary-container/30 transition-all"
              >
                <span className="material-symbols-outlined text-3xl text-primary-container">
                  {feature.icon}
                </span>
                <h3 className="text-2xl font-bold text-on-surface">
                  {feature.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
