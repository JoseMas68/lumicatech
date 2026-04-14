'use client';

import AnimatedCounter from './AnimatedCounter';

export default function SocialProof() {
  const stats = [
    { end: 500, suffix: "+", decimals: 0, label: "Almacenes digitalizados" },
    { end: 23, suffix: "%", decimals: 0, label: "Ahorro medio en costes" },
    { end: 47, suffix: "s", decimals: 0, label: "Tiempo medio de escaneo" },
    { end: 99.9, suffix: "%", decimals: 1, label: "Uptime garantizado" }
  ];

  return (
    <section className="border-y border-outline-variant/10 bg-surface-container-low/50 py-12">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-4xl md:text-5xl font-black text-primary-container mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="text-sm text-on-surface-variant">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trusted By Label */}
        <div className="text-center">
          <p className="text-sm text-on-surface-variant mb-6 font-label tracking-wider uppercase">
            Empresas que confían en nosotros
          </p>
          <div className="flex justify-center items-center gap-12 opacity-50 flex-wrap">
            {/* Placeholder company logos - replace with real logos when available */}
            <div className="text-2xl font-black text-on-surface-variant">CERÁMICA MAS</div>
            <div className="text-2xl font-black text-on-surface-variant">ROCA GROUP</div>
            <div className="text-2xl font-black text-on-surface-variant">PORCELANOSA</div>
            <div className="text-2xl font-black text-on-surface-variant">LAMINART</div>
          </div>
        </div>
      </div>
    </section>
  );
}
