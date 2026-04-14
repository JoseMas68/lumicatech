'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import AutomaticCatalogs from './components/AutomaticCatalogs';
import AdaptableTool from './components/AdaptableTool';
import StockControl from './components/StockControl';
import QRStock from './components/QRStock';
import AnalyticsEngine from './components/AnalyticsEngine';
import CommercialEngine from './components/CommercialEngine';
import AIEngine from './components/AIEngine';
import ERPIntegration from './components/ERPIntegration';
import Benefits from './components/Benefits';
import ClosingCTA from './components/ClosingCTA';

export default function LumiwarePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />
      <main className="flex-grow pt-24 break-words">
        <Hero />
        <SocialProof />
        <Problem />
        <Solution />
        <HowItWorks />
        <AutomaticCatalogs />
        <AdaptableTool />
        <StockControl />
        <QRStock />
        <AnalyticsEngine />
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
