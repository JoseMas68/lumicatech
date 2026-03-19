'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import QRStock from './components/QRStock';
import CommercialEngine from './components/CommercialEngine';
import AIEngine from './components/AIEngine';
import Pricing from './components/Pricing';
import CTA from './components/CTA';

export default function LumiwarePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-grow pt-24">
        <Hero />
        <Problem />
        <Solution />
        <QRStock />
        <CommercialEngine />
        <AIEngine />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
