'use client';

export default function QRStock() {
  return (
    <section className="py-32 bg-surface-container-lowest">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-12">
            <div>
              <span className="text-primary-container font-label tracking-[0.2em] text-sm uppercase mb-4 block">
                Motor Digital
              </span>
              <h2 className="text-4xl font-black font-headline mb-6 leading-tight">
                Escalable. Flexible. Tecnológico.
              </h2>
              <p className="text-on-surface-variant text-lg">
                Un motor digital diseñado para crecer con tu negocio. Tecnología probada que se adapta a cualquier operación de almacenaje.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Gestión por QR",
                  desc: "Identificación única de cada producto mediante códigos QR para trazabilidad total."
                },
                {
                  number: "02",
                  title: "Escalabilidad Sin Límites",
                  desc: "Sistema que crece contigo sin restricciones de capacidad o complejidad."
                },
                {
                  number: "03",
                  title: "Flexibilidad Operativa",
                  desc: "Se adapta a cualquier tipo de almacén, producto o proceso de gestión."
                }
              ].map((feat, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <span className="font-label text-primary-container/50 text-2xl">{feat.number}</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-on-surface">{feat.title}</h4>
                    <p className="text-on-surface-variant">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative rounded-2xl overflow-hidden glow-shadow">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
              alt="Sistema de gestión de inventario con tecnología QR"
              className="w-full h-full object-cover rounded-2xl"
            />
            {/* QR code pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
