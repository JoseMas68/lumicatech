'use client';

export default function StockControl() {
  const stockFeatures = [
    {
      icon: "qr_code_scanner",
      title: "Registro de movimientos 100% digital",
      description: "Digitaliza tus salidas, automatiza tu éxito. Ofrece a tus clientes la libertad de autogestionar."
    },
    {
      icon: "sync",
      title: "Actualización automática",
      description: "El stock se ajusta en tiempo real con cada operación. Siempre sabes lo que tienes."
    },
    {
      icon: "history",
      title: "Trazabilidad de movimientos",
      description: "Historial completo de quién movió qué y cuándo. Documentos y movimientos vinculados."
    }
  ];

  const documentFeatures = [
    {
      icon: "receipt_long",
      title: "Generación de pedidos y albaranes",
      description: "Crea pedidos y/o albaranes directamente desde el inventario escaneado, sin reescribir datos."
    },
    {
      icon: "request_quote",
      title: "Facturación asociada",
      description: "Vincula la factura al albarán de forma automática y coherente."
    },
    {
      icon: "save",
      title: "Registro automático en el sistema",
      description: "Todo queda guardado sin intervención manual adicional. De producto a albarán en segundos."
    }
  ];

  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter mb-6">
            Control de Stock
          </h2>
          <p className="text-2xl text-on-surface-variant leading-relaxed font-medium">
            Inventario siempre <span className="text-primary-container">actualizado</span>
          </p>
        </div>

        {/* Two Groups */}
        <div className="space-y-16">
          {/* Group 1: Stock Features */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-on-surface mb-6">
                Digitaliza tus salidas, automatiza tu éxito
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {stockFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-surface border border-outline-variant/10 rounded-xl p-6 hover:border-primary-container/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-container/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center mb-4 border border-primary-container/30">
                    <span className="material-symbols-outlined text-xl text-primary-container">
                      {feature.icon}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-on-surface">
                    {feature.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Documents */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-on-surface mb-6">
                Documentos Comerciales
              </h3>
              <p className="text-xl text-primary-container font-medium">
                De producto a albarán en segundos
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {documentFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 border border-primary/20">
                    <span className="material-symbols-outlined text-xl text-primary">
                      {feature.icon}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-on-surface">
                    {feature.title}
                  </h4>
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