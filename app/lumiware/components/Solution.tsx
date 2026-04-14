'use client';

export default function Solution() {
  const features = [
    {
      icon: "qr_code",
      title: "Escanea un QR",
      description: "Cada producto tiene su código único. Un escaneo da acceso inmediato a su ficha completa y productos relacionados en caso de existencia."
    },
    {
      icon: "speed",
      title: "Consulta información en segundos",
      description: "Stock, movimientos, variantes, documentos y más desde cualquier dispositivo."
    },
    {
      icon: "touch_app",
      title: "Sin fricción, sin formación compleja",
      description: "Interfaz pensada para el operario de almacén. Rápido, visual y directo."
    }
  ];

  return (
    <section className="py-32 bg-surface relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter mb-6">
            La Solución
          </h2>
          <p className="text-2xl md:text-3xl text-on-surface-variant leading-relaxed font-medium">
            Una nueva forma de gestionar el almacén
          </p>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-8">
            <p className="text-xl text-on-surface-variant leading-relaxed">
              <span className="font-bold text-primary-container">LUMIWARE</span> digitaliza el inventario mediante códigos QR y una interfaz simple que permite acceder a toda la información del producto en segundos.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 text-on-surface">
                      {feature.title}
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-outline-variant/20">
              <p className="text-xl font-medium text-primary-container">
                Todo empieza con escanear un QR.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary-container/20 to-primary/10 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <span className="material-symbols-outlined text-8xl text-primary-container/30">
                  smartphone
                </span>
                <p className="text-on-surface-variant/70 font-label tracking-wide text-sm">
                  ESCANEA Y GESTIONA
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary-container/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
