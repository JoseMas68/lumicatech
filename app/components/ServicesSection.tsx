'use client';

export default function ServicesSection() {
  return (
    <section className="py-32 bg-surface text-center overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-on-surface mb-8 tracking-tighter leading-tight">
          Listos para transformar tu empresa
        </h2>
        <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Contacta con nosotros y descubre cómo nuestras soluciones tecnológicas pueden optimizar tus procesos y escalar tu negocio.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-10 py-5 rounded-lg text-lg font-bold tracking-tight hover:shadow-[0_0_40px_rgba(156,240,255,0.4)] transition-all active:scale-95">
            Solicitar diagnóstico
          </button>
          <button className="px-10 py-5 rounded-lg text-lg font-bold tracking-tight text-on-surface border border-outline-variant/30 hover:bg-surface-container transition-all">
            Ver proyectos
          </button>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
}
