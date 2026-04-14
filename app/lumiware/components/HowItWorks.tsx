'use client';

export default function HowItWorks() {
  const steps = [
    {
      icon: "qr_code_scanner",
      title: "Escaneas → accedes a información",
      description: "Ficha de producto completa al instante desde móvil o tablet."
    },
    {
      icon: "inventory",
      title: "Consulta stock en tiempo real",
      description: "Siempre actualizado. Sin retrasos ni discrepancias."
    },
    {
      icon: "sync",
      title: "Registro automático de movimientos",
      description: "Cada entrada y salida queda registrada."
    },
    {
      icon: "speed",
      title: "Rápido, visual y sin fricción",
      description: "Interfaz optimizada para operarios de almacén."
    }
  ];

  return (
    <section className="py-32 bg-surface">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter">
            Cómo Funciona
          </h2>
          <p className="text-2xl text-on-surface-variant leading-relaxed font-medium">
            Gestión de inventario basada en <span className="text-primary-container">QR</span>
          </p>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Toda la tienda en un simple escaneo
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 hover:border-primary-container/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary-container/10 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl text-primary-container">
                  {step.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-on-surface">
                {step.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
