'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-[#050505] transition-colors duration-500 w-full border-t border-slate-200 dark:border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 max-w-screen-2xl mx-auto">
        {/* Left: Brand */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black text-black dark:text-white font-headline">
              LumicaTech
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-label uppercase tracking-widest">
            © {currentYear} LumicatTech Industrial Systems. Todos los derechos reservados.
          </p>
        </div>

        {/* Right: Links */}
        <div className="flex flex-wrap justify-center gap-8">
          <Link
            href="/privacidad"
            className="text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors font-label text-sm uppercase tracking-widest"
          >
            Privacidad
          </Link>
          <Link
            href="/cookies"
            className="text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors font-label text-sm uppercase tracking-widest"
          >
            Cookies
          </Link>
          <Link
            href="/aviso-legal"
            className="text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors font-label text-sm uppercase tracking-widest"
          >
            Aviso Legal
          </Link>
        </div>
      </div>
    </footer>
  );
}
