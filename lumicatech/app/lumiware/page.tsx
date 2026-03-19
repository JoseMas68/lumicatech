'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import CTA from './components/CTA';

export default function LumiwarePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Benefits />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
