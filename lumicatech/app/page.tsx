import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CaseStudies from './components/CaseStudies';
import ApproachSection from './components/ApproachSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="pt-20 flex-grow">
        <HeroSection />
        <CaseStudies />
        <ServicesSection />
        <ApproachSection />
      </main>
      <Footer />
    </div>
  );
}
