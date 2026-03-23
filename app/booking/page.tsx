import Header from "../components/Header";
import Footer from "../components/Footer";
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
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-grow pt-24 technical-grid relative overflow-hidden">
        {/* Hero Glow */}
        <div className="hero-glow absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <BookingHero />
          
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Calendar */}
                <div className="border border-outline-variant/50 rounded-2xl p-8 bg-surface-container-lowest/50 backdrop-blur-md">
                  <h2 className="text-2xl font-headline font-bold text-on-surface mb-6">
                    Selecciona día y hora
                  </h2>
                  <AvailabilityCalendar />
                </div>
                
                {/* Form */}
                <div className="border border-outline-variant/50 rounded-2xl p-8 bg-surface-container-lowest/50 backdrop-blur-md">
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
      <Footer />
    </div>
  );
}
