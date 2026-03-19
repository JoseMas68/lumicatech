'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LumiwareHero from './components/LumiwareHero';
import LumiwareFeatures from './components/LumiwareFeatures';
import LumiwareQR from './components/LumiwareQR';
import LumiwareAnalytics from './components/LumiwareAnalytics';
import LumiwareBenefits from './components/LumiwareBenefits';
import LumiwareCTA from './components/LumiwareCTA';

export default function LumiwarePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-grow">
        <LumiwareHero />
        <LumiwareFeatures />
        <LumiwareQR />
        <LumiwareAnalytics />
        <LumiwareBenefits />
        <LumiwareCTA />
      </main>
      <Footer />
    </div>
  );
}
