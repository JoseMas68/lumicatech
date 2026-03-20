"use client";

export default function BookingHero() {
  return (
    <section className="pt-24 pb-12 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/10 border border-primary-container/20 mb-6">
          <span className="material-symbols-outlined text-primary-container text-sm">
            event_available
          </span>
          <span className="text-sm font-medium text-primary-container">
            Reserva tu cita
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-4">
          Hablemos de tu{" "}
          <span className="gradient-text">proyecto</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
          30 minutos para entender tu idea y ver cómo podemos ayudarte. 
          Sin compromiso, solo una conversación honesta sobre tecnología.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">
              videocam
            </span>
            <span className="text-sm">Google Meet</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">
              schedule
            </span>
            <span className="text-sm">30 minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">
              email
            </span>
            <span className="text-sm">Confirmación instantánea</span>
          </div>
        </div>
      </div>
    </section>
  );
}
