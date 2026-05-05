'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from './Hero';
import SocialProof from './SocialProof';
import Problem from './Problem';
import Solution from './Solution';
import HowItWorks from './HowItWorks';
import AutomaticCatalogs from './AutomaticCatalogs';
import AdaptableTool from './AdaptableTool';
import StockControl from './StockControl';
import QRStock from './QRStock';
import AnalyticsEngine from './AnalyticsEngine';
import CommercialEngine from './CommercialEngine';
import AIEngine from './AIEngine';
import ERPIntegration from './ERPIntegration';
import Benefits from './Benefits';
import SEOContent from './SEOContent';
import FAQ from './FAQ';
import ClosingCTA from './ClosingCTA';

export default function LumiwareClient() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white selection:bg-primary-container/30 selection:text-primary-container font-sans">
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
        <SEOContent />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
