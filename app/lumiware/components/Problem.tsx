'use client';

export default function Problem() {
  const issues = [
    { number: "ISSUE_01", title: "Operaciones manuales e ineficientes" },
    { number: "ISSUE_02", title: "Errores humanos en la gestión" },
    { number: "ISSUE_03", title: "Falta de visibilidad del stock" },
    { number: "ISSUE_04", title: "Procesos lentos y obsoletos" }
  ];

  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          {/* Left: Issue Cards */}
          <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
            {issues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-6 bg-surface-container rounded-xl border-l-2 border-error/50 ${
                  idx % 2 === 1 ? 'mt-8' : ''
                }`}
              >
                <span className="text-error font-label text-sm mb-4 block tracking-tighter">
                  {issue.number}
                </span>
                <p className="text-on-surface font-medium text-sm">
                  {issue.title}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Content */}
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tight">
              ¿Operas en un almacén <span className="text-error">ineficiente</span>?
            </h2>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              Sin digitalización, tu almacén es un cuello de botella. Los procesos manuales generan errores, la falta de visibilidad del stock impide decisiones informadas, y las operaciones se vuelven lentas y costosas.
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-4 text-error/80 font-label tracking-wide text-sm">
                <span className="material-symbols-outlined">warning</span>
                <span>WAREHOUSE_INEFFICIENCY_DETECTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
