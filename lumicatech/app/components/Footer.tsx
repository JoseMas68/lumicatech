'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container border-t border-surface-container-high">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold font-headline text-on-surface mb-4">
              LumicaTech
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Ingeniaría que transforma. Soluciones técnicas de alto impacto para empresas.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold font-headline text-on-surface mb-4 uppercase tracking-wide">
              Servicios
            </h4>
            <ul className="space-y-2">
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
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Contacto</Link></li>
              <li><Link href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">Privacidad</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-bold font-headline text-on-surface mb-4 uppercase tracking-wide">
              Conecta
            </h4>
            <div className="flex gap-4">
              <Link href="#" className="w-8 h-8 bg-surface-container-high rounded-full flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">mail</span>
              </Link>
              <Link href="#" className="w-8 h-8 bg-surface-container-high rounded-full flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">language</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-surface-container-high mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-on-surface-variant">
          <p>© {currentYear} LumicaTech. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-on-surface transition-colors">Términos</Link>
            <Link href="#" className="hover:text-on-surface transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-on-surface transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
