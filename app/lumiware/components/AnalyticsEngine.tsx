'use client';

export default function AnalyticsEngine() {
  return (
    <section className="py-32 bg-surface">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <span className="text-primary-container font-label tracking-[0.2em] text-sm uppercase block">
                Motor Analytics
              </span>
              <h2 className="text-4xl font-black font-headline text-on-surface leading-tight">
                Inteligencia de datos.
              </h2>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                Convierte los datos de tu almacén en información estratégica. Analiza patrones, optimiza procesos y toma decisiones basadas en datos reales.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {[
                {
                  icon: "analytics",
                  title: "Dashboard en Tiempo Real",
                  desc: "Visualización completa de KPIs, stock y rendimiento operativo."
                },
                {
                  icon: "insights",
                  title: "Análisis Predictivo",
                  desc: "Anticipa demanda y optimiza niveles de stock automáticamente."
                },
                {
                  icon: "assessment",
                  title: "Reportes Automatizados",
                  desc: "Genera informes personalizados para gestión y toma de decisiones."
                }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary-container">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <div className="space-y-6">
                {/* Fake Analytics Dashboard */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-label text-sm text-on-surface-variant">KPIs PRINCIPALES</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-green-400 font-label">EN VIVO</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Stock Total", value: "12,847", change: "+2.3%" },
                    { label: "Movimientos Hoy", value: "342", change: "+12%" },
                    { label: "Valor Inventario", value: "€847K", change: "+5.1%" },
                    { label: "Eficiencia", value: "94.2%", change: "+3.8%" }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-surface p-4 rounded-lg">
                      <p className="text-xs text-on-surface-variant mb-1">{stat.label}</p>
                      <p className="text-xl font-bold text-on-surface mb-1">{stat.value}</p>
                      <p className="text-xs text-primary-container">{stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* Fake Chart */}
                <div className="bg-surface p-6 rounded-lg mt-6">
                  <p className="text-xs text-on-surface-variant mb-4">TENDENCIA MENSUAL</p>
                  <div className="flex items-end justify-between h-24 gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-primary-container/30 rounded-t chart-bar-animate"
                        style={{ height: `${height}%`, animationDelay: `${idx * 0.08}s` }}
                      />
                    ))}
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
