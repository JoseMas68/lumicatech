'use client';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import ApproachSection from './components/ApproachSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-500 selection:bg-slate-200 dark:selection:bg-white/20">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <ApproachSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
