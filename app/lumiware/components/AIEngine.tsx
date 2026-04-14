'use client';

export default function AIEngine() {
  return (
    <section className="py-32 bg-surface-container-low relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-2xl p-6 sm:p-8 lg:p-12 border border-outline-variant/10 overflow-hidden relative">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-br from-primary-container/40 to-transparent blur-3xl rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20">
                <span
                  className="material-symbols-outlined text-sm text-primary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                <span className="text-xs font-label uppercase tracking-widest text-primary-container">
                  Motor AI
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-surface leading-tight break-words">
                Funcionalidades avanzadas.
              </h2>

              {/* Description */}
              <p className="text-lg sm:text-xl text-on-surface-variant break-words">
                Inteligencia artificial que analiza patrones de consumo, optimiza stock y genera recomendaciones inteligentes para maximizar tus ventas.
              </p>

              {/* Features List */}
              <ul className="space-y-4 text-on-surface-variant">
                {[
                  "Análisis predictivo de demanda",
                  "Optimización automática de stock",
                  "Recomendaciones inteligentes",
                  "Detección de anomalías"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 min-w-0">
                    <span className="material-symbols-outlined text-primary-container text-sm">
                      check_circle
                    </span>
                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Product Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-surface-container-highest p-4 rounded-lg border border-outline-variant/20 ${
                    idx >= 2 ? 'mt-4' : ''
                  }`}
                >
                  <div className="w-full h-24 bg-gradient-to-br from-primary-container/20 to-transparent rounded mb-3 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary-container/50">
                      image
                    </span>
                  </div>
                  <span className="text-[10px] font-label text-primary-container block break-all leading-tight">
                    SIMILAR_MATCH_{85 + idx * 2}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
