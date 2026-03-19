'use client';

export default function LumiwareQR() {
  return (
    <section className="py-32 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div>
              <div className="font-label text-xs text-primary-container tracking-[0.3em] uppercase mb-4">
                QR Inventory
              </div>
              <h2 className="text-4xl font-headline font-bold text-on-surface mb-4">
                Escanea. Gestiona. Optimiza.
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Sistema de códigos QR inteligentes que integra toda la información de tu producto en un solo scan.
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-4">
              {[
                "Generación automática de códigos QR",
                "Lectura instantánea de ubicación y cantidad",
                "Historial completo de movimientos",
                "Alertas automáticas de stock bajo",
                "Movimiento de productos optimizado"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-container rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary-container text-sm">check</span>
                  </span>
                  <span className="text-on-surface-variant">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-lg text-base font-bold tracking-tight hover:shadow-[0_0_30px_rgba(156,240,255,0.4)] transition-all active:scale-95">
              Ver en Acción
            </button>
          </div>

          {/* Right: Visual */}
          <div className="relative h-96 bg-gradient-to-br from-surface-container to-surface-container-high rounded-xl border border-outline-variant/20 flex items-center justify-center overflow-hidden">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-surface rounded-lg mx-auto flex items-center justify-center border border-outline-variant/30">
                <span className="material-symbols-outlined text-6xl text-primary-container opacity-50">qr_code_2</span>
              </div>
              <p className="text-on-surface-variant font-label">Código QR dinámico</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
