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

          {/* Right: Technical UI */}
          <div className="relative p-8 rounded-2xl bg-surface-container-high/50 border border-outline-variant/10 glow-shadow">
            <div className="bg-surface rounded-lg overflow-hidden border border-outline-variant/20 shadow-2xl">
              {/* Header */}
              <div className="bg-surface-container px-4 py-3 flex justify-between items-center border-b border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error/30"></span>
                  <span className="w-3 h-3 rounded-full bg-primary-fixed/30"></span>
                  <span className="w-3 h-3 rounded-full bg-primary-container/30"></span>
                </div>
                <span className="text-[10px] font-label text-on-surface-variant">
                  WAREFLOW_V2.4_DASHBOARD
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h5 className="text-sm font-label text-on-surface-variant mb-1">
                      PRODUCT_ID: WF-9920-X
                    </h5>
                    <p className="text-xl font-bold text-on-surface">
                      Porcelánico Grey Stone 60x120
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-label text-primary-container">CURRENT_STOCK</span>
                    <p className="text-3xl font-black text-primary-container">
                      42.5 <span className="text-sm font-normal text-on-surface-variant">m²</span>
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-surface-container-low w-full rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container w-[70%]"></div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-surface-container rounded border border-outline-variant/10">
                    <span className="text-[10px] text-on-surface-variant block mb-1">LOCATION</span>
                    <span className="text-sm font-bold text-on-surface">Aisle B - Row 4</span>
                  </div>
                  <div className="p-3 bg-surface-container rounded border border-outline-variant/10">
                    <span className="text-[10px] text-on-surface-variant block mb-1">LAST_SCAN</span>
                    <span className="text-sm font-bold text-on-surface">2m ago by J. Smith</span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="pt-4 flex justify-center">
                  <div className="p-2 border-2 border-primary-container/20 rounded-lg">
                    <span className="material-symbols-outlined text-6xl text-on-surface/80">qr_code_2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
