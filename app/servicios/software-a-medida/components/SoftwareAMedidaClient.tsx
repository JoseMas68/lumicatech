'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const benefits = [
  {
    icon: 'precision_manufacturing',
    title: 'Adaptación Total',
    description: 'Software diseñado específicamente para tus procesos únicos. Sin adaptarte a sistemas genéricos.',
  },
  {
    icon: 'trending_up',
    title: 'Escalabilidad',
    description: 'Crece con tu negocio. Añade funcionalidades cuando las necesites sin empezar de cero.',
  },
  {
    icon: 'integration_instructions',
    title: 'Integración ERP',
    description: 'Conecta con tus sistemas existentes: SAP, Odoo, Dynamics, ERPs personalizados.',
  },
  {
    icon: 'security',
    title: 'Control Total',
    description: 'Propiedad del código, datos en tu infraestructura, sin dependencia de terceros.',
  },
  {
    icon: 'speed',
    title: 'Eficiencia Operativa',
    description: 'Automatiza procesos repetitivos y reduce errores humanos significativamente.',
  },
  {
    icon: 'workspace_premium',
    title: 'Ventaja Competitiva',
    description: 'Diferénciate con herramientas únicas que tu competencia no tiene.',
  },
];

const useCases = [
  {
    sector: 'Logística y Almacenes',
    icon: 'local_shipping',
    items: ['WMS personalizados', 'Control de stock con QR', 'Gestión de pedidos', 'Trazabilidad completa'],
  },
  {
    sector: 'Industria Cerámica',
    icon: 'texture',
    items: ['Catálogos automáticos', 'Traducción internacional', 'Gestión de muestrarios', 'Control de producción'],
  },
  {
    sector: 'Servicios Profesionales',
    icon: 'business_center',
    items: ['CRMs personalizados', 'Gestión de proyectos', 'Facturación integrada', 'Portales de clientes'],
  },
  {
    sector: 'E-commerce y Retail',
    icon: 'shopping_cart',
    items: ['Integración marketplaces', 'Gestión multicanal', 'Inventario en tiempo real', 'Automatización pedidos'],
  },
];

const process = [
  { step: '01', title: 'Análisis', description: 'Entendemos tu negocio, procesos y objetivos. Identificamos oportunidades de mejora.' },
  { step: '02', title: 'Diseño', description: 'Definimos la arquitectura, interfaces y funcionalidades. Prototipado visual.' },
  { step: '03', title: 'Desarrollo', description: 'Construcción con metodología ágil. Entregas incrementales cada 2 semanas.' },
  { step: '04', title: 'Implementación', description: 'Despliegue en producción, formación del equipo y soporte continuo.' },
];

const faqs = [
  {
    question: '¿Cuánto cuesta desarrollar software a medida?',
    answer: 'Depende de la complejidad. Proyectos pequeños desde 5.000€, aplicaciones empresariales desde 15.000€. Ofrecemos presupuesto gratuito tras el análisis inicial.',
  },
  {
    question: '¿Cuánto tiempo tarda en desarrollarse?',
    answer: 'MVPs en 4-8 semanas. Proyectos completos típicamente 3-6 meses. Trabajamos con sprints de 2 semanas para entregas incrementales.',
  },
  {
    question: '¿Qué tecnologías utilizan?',
    answer: 'Next.js/React para frontend, Node.js/Python para backend, PostgreSQL/MongoDB para datos. Cloud en AWS, Vercel o tu infraestructura preferida.',
  },
  {
    question: '¿Ofrecen mantenimiento?',
    answer: 'Sí, planes de mantenimiento desde 500€/mes que incluyen soporte, actualizaciones, mejoras y monitorización proactiva.',
  },
  {
    question: '¿Puedo integrar con mi ERP actual?',
    answer: 'Absolutamente. Integramos con SAP, Odoo, Dynamics, ERPs legacy y cualquier sistema con API o acceso a base de datos.',
  },
];

export default function SoftwareAMedidaClient() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute inset-0 technical-grid opacity-30" />
          
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/10 border border-primary-container/30 mb-6">
              <span className="material-symbols-outlined text-primary-container text-sm">code</span>
              <span className="text-sm font-medium text-primary-container">Desarrollo de Software Personalizado</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-on-surface mb-6 leading-tight">
              Software a Medida en <span className="text-primary-container">Castellón</span>
            </h1>
            
            <p className="text-xl text-on-surface-variant max-w-3xl mx-auto mb-8">
              Desarrollamos aplicaciones web y sistemas de gestión personalizados para empresas en Castellón, 
              Valencia y toda España. Soluciones que se adaptan a tus procesos, no al revés.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(156,240,255,0.3)] transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">calendar_month</span>
                Solicitar presupuesto gratuito
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-surface-container border border-outline-variant/30 text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:border-primary-container/50 transition-all"
              >
                <span className="material-symbols-outlined">chat</span>
                Hablar con un experto
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4 bg-surface-container-low">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                ¿Por qué elegir software a medida?
              </h2>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
                A diferencia del software estándar, las soluciones personalizadas se diseñan 
                específicamente para tus necesidades únicas.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-surface border border-outline-variant/20 hover:border-primary-container/40 transition-all duration-300 card-glow-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center mb-4 group-hover:bg-primary-container/20 transition-colors">
                    <span className="material-symbols-outlined text-primary-container text-2xl">
                      {benefit.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">{benefit.title}</h3>
                  <p className="text-on-surface-variant">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Sectores y Casos de Uso
              </h2>
              <p className="text-lg text-on-surface-variant">
                Experiencia en múltiples sectores con soluciones probadas
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-container">
                        {useCase.icon}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-on-surface">{useCase.sector}</h3>
                  </div>
                  <ul className="space-y-2">
                    {useCase.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-4 bg-surface-container-low">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Nuestro Proceso de Desarrollo
              </h2>
              <p className="text-lg text-on-surface-variant">
                Metodología ágil con entregas incrementales y comunicación constante
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {process.map((step, i) => (
                <div key={i} className="relative">
                  <div className="text-5xl font-bold text-primary-container/20 mb-2">{step.step}</div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">{step.title}</h3>
                  <p className="text-on-surface-variant text-sm">{step.description}</p>
                  {i < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 right-0 w-1/2 h-px bg-gradient-to-r from-primary-container/30 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Software a Medida vs Software Estándar
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30">
                    <th className="text-left py-4 px-4 text-on-surface-variant font-medium">Característica</th>
                    <th className="text-center py-4 px-4 text-primary-container font-bold">Software a Medida</th>
                    <th className="text-center py-4 px-4 text-on-surface-variant font-medium">Software Estándar</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Adaptación a procesos', true, false],
                    ['Personalización completa', true, false],
                    ['Integración con sistemas existentes', true, 'Limitada'],
                    ['Propiedad del código', true, false],
                    ['Sin licencias recurrentes', true, false],
                    ['Soporte personalizado', true, 'Genérico'],
                    ['Escalabilidad sin límites', true, 'Limitada'],
                    ['Inversión inicial', 'Mayor', 'Menor'],
                    ['ROI a largo plazo', 'Superior', 'Inferior'],
                  ].map(([feature, custom, standard], i) => (
                    <tr key={i} className="border-b border-outline-variant/10">
                      <td className="py-3 px-4 text-on-surface">{feature}</td>
                      <td className="py-3 px-4 text-center">
                        {custom === true ? (
                          <span className="material-symbols-outlined text-green-500">check_circle</span>
                        ) : custom === false ? (
                          <span className="material-symbols-outlined text-red-500">cancel</span>
                        ) : (
                          <span className="text-primary-container font-medium">{custom}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {standard === true ? (
                          <span className="material-symbols-outlined text-green-500">check_circle</span>
                        ) : standard === false ? (
                          <span className="material-symbols-outlined text-red-500">cancel</span>
                        ) : (
                          <span className="text-on-surface-variant">{standard}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-surface-container-low">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Preguntas Frecuentes
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group p-6 rounded-xl bg-surface border border-outline-variant/20 hover:border-primary-container/30 transition-colors"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3 className="text-lg font-bold text-on-surface pr-4">{faq.question}</h3>
                    <span className="material-symbols-outlined text-primary-container group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-4 text-on-surface-variant">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-10 rounded-3xl bg-gradient-to-br from-primary-container/10 to-primary-container/5 border border-primary-container/20">
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                ¿Listo para digitalizar tu empresa?
              </h2>
              <p className="text-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
                Agenda una consultoría gratuita. Analizamos tus procesos y te proponemos 
                la solución más eficiente para tu negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(156,240,255,0.3)] transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">calendar_month</span>
                  Agendar consultoría gratuita
                </Link>
                <a
                  href="tel:+34624237696"
                  className="inline-flex items-center gap-2 bg-surface-container border border-outline-variant/30 text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:border-primary-container/50 transition-all"
                >
                  <span className="material-symbols-outlined">phone</span>
                  +34 624 237 696
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
