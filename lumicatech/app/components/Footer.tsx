'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-surface-container-high">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold font-headline text-on-surface mb-4">
              LumicaTech
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Ingeniaría que transforma. Soluciones técnicas de alto impacto.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-sm font-bold font-headline text-on-surface mb-4 uppercase tracking-wide">
              Servicios
            </h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Desarrollo</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Arquitectura</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Consultoría</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">DevOps</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-sm font-bold font-headline text-on-surface mb-4 uppercase tracking-wide">
              Empresa
            </h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Portafolio</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold font-headline text-on-surface mb-4 uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Privacidad</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Términos</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Cookies</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold font-headline text-on-surface mb-4 uppercase tracking-wide">
              Conecta
            </h4>
            <div className="flex gap-4">
              <Link href="#" title="Email" className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all text-on-surface-variant border border-surface-container-high">
                <span className="material-symbols-outlined text-lg">mail</span>
              </Link>
              <Link href="#" title="GitHub" className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all text-on-surface-variant border border-surface-container-high">
                <span className="material-symbols-outlined text-lg">code</span>
              </Link>
              <Link href="#" title="LinkedIn" className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all text-on-surface-variant border border-surface-container-high">
                <span className="material-symbols-outlined text-lg">person</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-surface-container-high mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-on-surface-variant gap-6">
          <p>© {currentYear} LumicaTech. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-on-surface transition-colors">Términos</Link>
            <Link href="#" className="hover:text-on-surface transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-on-surface transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
