import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingHero from "./components/BookingHero";
import BookingSection from "./components/BookingSection";
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
          <BookingSection />
          <SocialLinks />
        </div>
      </main>
      <Footer />
    </div>
  );
}
