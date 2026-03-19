'use client';

export default function ERPIntegration() {
  const integrations = [
    { icon: "terminal", label: "SAP_READY", active: false },
    { icon: "database", label: "NAV_SYNC", active: false },
    { icon: "hub", label: "WAREFLOW_CORE", active: true }
  ];

  return (
    <section className="py-32 bg-surface">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-12 bg-surface-container-low rounded-2xl border-t border-outline-variant/10">
          {/* Left: Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-on-surface">
              Complemento para tu ERP.
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              No sustituimos tu sistema actual; lo potenciamos. WareFlow añade la agilidad y usabilidad que a los ERPs tradicionales les falta en el campo de batalla: el almacén.
            </p>
          </div>

          {/* Right: Integrations */}
          <div className="flex items-center gap-8 md:w-1/2 justify-end flex-wrap">
            {integrations.map((integration, idx) => (
              <div key={idx}>
                <div className={`flex flex-col items-center gap-2 transition-all ${
                  integration.active
                    ? 'grayscale-0 opacity-100'
                    : 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100'
                }`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${
                    integration.active
                      ? 'bg-surface-container border-primary-container/30'
                      : 'bg-surface-container border-outline-variant/20'
                  }`}>
                    <span className={`material-symbols-outlined text-3xl ${
                      integration.active ? 'text-primary-container' : 'text-on-surface-variant'
                    }`}>
                      {integration.icon}
                    </span>
                  </div>
                  <span className={`text-[10px] font-label ${
                    integration.active ? 'text-primary-container' : 'text-on-surface-variant'
                  }`}>
                    {integration.label}
                  </span>
                </div>
                {idx < integrations.length - 1 && (
                  <div className="w-12 h-px bg-outline-variant/30 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
