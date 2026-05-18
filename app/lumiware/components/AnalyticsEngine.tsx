'use client';

import { motion } from 'framer-motion';

export default function AnalyticsEngine() {
  const stats = [
    { label: "Stock Total", value: "12,847", change: "+2.3%", color: "text-emerald-400" },
    { label: "Movimientos Hoy", value: "342", change: "+12%", color: "text-emerald-400" },
    { label: "Valor Inventario", value: "€847K", change: "+5.1%", color: "text-blue-400" },
    { label: "Eficiencia", value: "94.2%", change: "+3.8%", color: "text-emerald-400" }
  ];

  const chartData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95];

  return (
    <section className="py-32 bg-white dark:bg-[#050505] relative z-10 border-t border-outline-variant dark:border-white/5 transition-colors duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-screen-xl mx-auto px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-emerald-500"></span>
                <span className="font-mono text-xs text-emerald-400 tracking-[0.3em] uppercase">
                  Motor Analytics
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-headline text-on-surface dark:text-white leading-tight mb-6 transition-colors duration-500">
                Inteligencia de <span className="text-emerald-400">datos.</span>
              </h2>
              <p className="text-on-surface-variant dark:text-slate-300 text-xl leading-relaxed font-light transition-colors duration-500">
                Convierte los datos de tu almacén en información estratégica. Analiza patrones, optimiza procesos y toma decisiones basadas en datos reales.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: "Dashboard en Tiempo Real",
                  desc: "Visualización completa de KPIs, stock y rendimiento operativo."
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                  title: "Análisis Predictivo",
                  desc: "Anticipa demanda y optimiza niveles de stock automáticamente."
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: "Reportes Automatizados",
                  desc: "Genera informes personalizados para gestión y toma de decisiones."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex gap-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-container dark:bg-white/5 border border-outline-variant dark:border-white/10 flex items-center justify-center flex-shrink-0 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-on-surface dark:text-white mb-2 group-hover:text-emerald-400 transition-colors duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-on-surface-variant dark:text-slate-400 font-light leading-relaxed transition-colors duration-500">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual Dashboard UI Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Outer Box */}
            <div className="bg-surface-container dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-outline-variant dark:border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              {/* Internal glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-outline-variant dark:border-white/10 pb-4">
                  <h3 className="font-mono text-sm font-bold text-on-surface-variant dark:text-slate-300 transition-colors duration-500">KPIs PRINCIPALES</h3>
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-emerald-500 rounded-full"
                    ></motion.span>
                    <span className="text-xs text-emerald-400 font-bold tracking-wider">EN VIVO</span>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-surface-container dark:bg-white/5 border border-outline-variant dark:border-white/5 p-5 rounded-2xl transition-transform cursor-default shadow-sm hover:shadow-md"
                    >
                      <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-2 font-mono uppercase transition-colors duration-500">{stat.label}</p>
                      <p className="text-3xl font-black text-on-surface dark:text-white mb-2 font-headline transition-colors duration-500">{stat.value}</p>
                      <div className="flex items-center gap-1">
                        <svg className={`w-3 h-3 ${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <p className={`text-sm font-bold ${stat.color}`}>{stat.change}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="bg-surface-container dark:bg-white/5 border border-outline-variant dark:border-white/5 p-6 rounded-2xl relative pt-8 shadow-sm hover:shadow-md">
                  <p className="absolute top-4 left-6 text-xs font-mono text-on-surface-variant dark:text-slate-400 uppercase transition-colors duration-500">Tendencia Mensual</p>

                  <div className="flex items-end justify-between h-32 gap-3 mt-4">
                    {chartData.map((height, idx) => (
                      <div key={idx} className="w-full h-full relative group/bar flex items-end justify-center">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${height}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + (idx * 0.05), type: "spring" }}
                          className="w-full bg-emerald-500/20 rounded-t-sm border-t border-emerald-500/50 group-hover/bar:bg-emerald-400/40 transition-colors"
                        ></motion.div>
                        {/* Tooltip on hover */}
                        <div className="absolute -top-8 bg-black border border-outline-variant dark:border-white/10 text-on-surface dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                          {height * 12}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Decorative chart lines */}
                  <div className="absolute bottom-6 left-6 right-6 border-t border-outline-variant dark:border-white/5 transition-colors duration-500"></div>
                  <div className="absolute bottom-16 left-6 right-6 border-t border-outline-variant dark:border-white/5 border-dashed transition-colors duration-500"></div>
                  <div className="absolute bottom-28 left-6 right-6 border-t border-outline-variant dark:border-white/5 transition-colors duration-500"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
