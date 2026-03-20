'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import QRStock from './components/QRStock';
import CommercialEngine from './components/CommercialEngine';
import AIEngine from './components/AIEngine';
import ERPIntegration from './components/ERPIntegration';
import Benefits from './components/Benefits';
import ClosingCTA from './components/ClosingCTA';

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
        <ERPIntegration />
        <Benefits />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
