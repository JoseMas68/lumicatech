import BookingHero from "./components/BookingHero";
import AvailabilityCalendar from "./components/AvailabilityCalendar";
import BookingForm from "./components/BookingForm";
import SocialLinks from "./components/SocialLinks";

export const metadata = {
  title: "Reservar Cita | LumicaTech",
  description: "Agenda una reunión con nuestro equipo. 30 minutos para entender tu proyecto y ver cómo podemos ayudarte.",
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-surface technical-grid">
      {/* Hero Glow */}
      <div className="hero-glow top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative z-10">
        <BookingHero />
        
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Calendar */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-headline font-bold text-on-surface mb-6">
                  Selecciona día y hora
                </h2>
                <AvailabilityCalendar />
              </div>
              
              {/* Form */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-headline font-bold text-on-surface mb-6">
                  Tus datos
                </h2>
                <BookingForm />
              </div>
            </div>
          </div>
        </section>
        
        <SocialLinks />
      </div>
    </main>
  );
}
