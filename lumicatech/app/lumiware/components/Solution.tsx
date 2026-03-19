'use client';

export default function Solution() {
  const steps = [
    {
      icon: "qr_code_2",
      title: "Escanear",
      description: "Acceso instantáneo a la ficha técnica, stock y ubicación del producto con un solo escaneo móvil."
    },
    {
      icon: "analytics",
      title: "Gestionar",
      description: "Actualiza unidades, mueve existencias entre almacenes o asocia fotos del estado real del producto."
    },
    {
      icon: "share",
      title: "Compartir",
      description: "Envía catálogos o albaranes digitales directamente desde la aplicación al cliente final."
    }
  ];

  return (
    <section className="py-32 bg-surface relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter">
            Una nueva forma de <span className="text-primary-container">gestionar</span>.
          </h2>
          <p className="text-xl text-on-surface-variant">
            Todo comienza escaneando un código QR. Hemos simplificado la complejidad industrial en una interfaz intuitiva y potente.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 group hover:bg-surface-container transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6 text-primary-container group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">{step.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-on-surface">
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
