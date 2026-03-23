'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[921px] flex items-center px-8 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary-fixed/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-screen-xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="text-xs font-label uppercase tracking-widest text-primary-container">LumicaTech Ecosystem</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black font-headline leading-[0.9] tracking-tighter text-on-surface">
            Gestión digital de <span className="text-primary-container">almacenes</span>.
          </h1>

          {/* Subtitle */}
          <div className="space-y-4">
            <h2 className="text-2xl font-label text-on-surface-variant font-light tracking-tight">LumiFlow</h2>
            <p className="text-xl text-on-surface-variant max-w-md">
              Convierte tu almacén en un sistema inteligente
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/booking" className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container border border-current px-8 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_20px_rgba(156,240,255,0.3)] transition-all duration-200 hover:opacity-95 active:scale-95 flex items-center justify-center">
              Empezar ahora
            </Link>
            <button className="px-8 py-4 rounded-lg border border-outline-variant/30 text-on-surface font-bold text-lg hover:bg-surface-container transition-all">
              Ver Demo
            </button>
          </div>
        </div>

        {/* Right Column - Visual */}
        <div className="relative">
          <div className="aspect-square rounded-xl bg-surface-container-low border border-outline-variant/10 p-2 relative overflow-hidden group">
            <div className="w-full h-full relative rounded-lg overflow-hidden border border-outline-variant/20">
              <Image 
                src="/images/lumiware_dashboard.png" 
                alt="Lumiware Dashboard" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            
            {/* Subtle floating glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
