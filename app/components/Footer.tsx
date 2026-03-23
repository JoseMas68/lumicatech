'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest w-full border-t border-outline-variant/15">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 max-w-screen-2xl mx-auto">
        {/* Left: Brand */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black text-on-surface font-headline">
              LumicaTech
            </span>
          </div>
          <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest">
            © {currentYear} LumicaTech Industrial Systems. All rights reserved.
          </p>
        </div>

        {/* Right: Links */}
        <div className="flex flex-wrap justify-center gap-8">
          <Link
            href="/privacidad"
            className="text-on-surface-variant hover:text-primary-container transition-colors font-label text-sm uppercase tracking-widest"
          >
            Privacidad
          </Link>
          <Link
            href="/cookies"
            className="text-on-surface-variant hover:text-primary-container transition-colors font-label text-sm uppercase tracking-widest"
          >
            Cookies
          </Link>
          <Link
            href="/aviso-legal"
            className="text-on-surface-variant hover:text-primary-container transition-colors font-label text-sm uppercase tracking-widest"
          >
            Aviso Legal
          </Link>
        </div>
      </div>
    </footer>
  );
}
