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
                Core Technology
              </span>
              <h2 className="text-4xl font-black font-headline mb-6 leading-tight">
                Gestión de inventario basada en QR & Stock Real.
              </h2>
              <p className="text-on-surface-variant text-lg">
                Trazabilidad absoluta de cada movimiento. Olvida los recuentos manuales trimestrales; vive en un inventario perpetuo y preciso.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "QR Único por Producto",
                  desc: "Cada pallet o caja tiene su propia identidad digital inmutable."
                },
                {
                  number: "02",
                  title: "Escaneo en Tiempo Real",
                  desc: "Cualquier operario con un smartphone se convierte en un sensor de datos."
                },
                {
                  number: "03",
                  title: "Registro de Movimientos",
                  desc: "Logs automáticos de entrada, salida y ubicación interna sin errores."
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
              src="https://lumicatech.b-cdn.net/LumiwareImages/grok_image_1773938972210.jpg"
              alt="Escaneo de código QR en showroom"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
