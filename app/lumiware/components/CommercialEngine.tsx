'use client';

export default function CommercialEngine() {
  const features = [
    {
      icon: "picture_as_pdf",
      title: "Catálogos Automatizados",
      description: "Genera catálogos visuales profesionales en segundos basados en tu stock real."
    },
    {
      icon: "receipt_long",
      title: "Presupuestos y Albaranes",
      description: "Crea documentos de venta instantáneos con validación de disponibilidad."
    },
    {
      icon: "sync",
      title: "Sincronización Comercial",
      description: "Conexión directa entre stock disponible y capacidad de venta."
    }
  ];

  return (
    <section className="py-32 bg-surface">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative rounded-2xl overflow-hidden glow-shadow">
            <img
              src="https://lumicatech.b-cdn.net/LumiwareImages/grok_image_1773938396019.jpg"
              alt="Módulo comercial WareFlow"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <span className="text-primary-container font-label tracking-[0.2em] text-sm uppercase block">
                Motor Comercialización
              </span>
              <h2 className="text-4xl font-black font-headline text-on-surface leading-tight">
                Automatización de ventas.
              </h2>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                Lumiware no es solo logística; es una herramienta comercial que conecta el almacén con las ventas. Automatiza catálogos, presupuestos y albaranes.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/10 flex flex-col gap-4 hover:border-primary-container/30 transition-all"
                >
                  <span className="material-symbols-outlined text-3xl text-primary-container">
                    {feature.icon}
                  </span>
                  <h3 className="text-xl font-bold text-on-surface">
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
      </div>
    </section>
  );
}
