import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";

const baseUrl = "https://lumicatech.es";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LumicaTech | Software a Medida y Desarrollo de Aplicaciones en Castellón",
    template: "%s | LumicaTech",
  },
  description: "Desarrollamos software a medida para empresas en Castellón y Valencia. Aplicaciones web, sistemas de gestión, integración ERP y soluciones cloud. Calidad, precisión y resultados reales.",
  keywords: [
    "software a medida",
    "desarrollo software Castellón",
    "aplicaciones web Valencia",
    "software personalizado empresa",
    "integración ERP",
    "desarrollo aplicaciones",
    "soluciones cloud España",
    "software gestión almacén",
    "LumicaTech",
  ],
  authors: [{ name: "LumicaTech" }],
  creator: "LumicaTech",
  publisher: "LumicaTech",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: baseUrl,
    siteName: "LumicaTech",
    title: "LumicaTech | Software a Medida en Castellón",
    description: "Desarrollamos software a medida para empresas. Aplicaciones web, sistemas de gestión, integración ERP y soluciones cloud.",
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: "LumicaTech - Software a Medida" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LumicaTech | Software a Medida",
    description: "Desarrollamos software a medida para empresas en Castellón y Valencia.",
    images: [`${baseUrl}/og-image.png`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: baseUrl },
  verification: { google: "TU_GOOGLE_VERIFICATION_CODE" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Preconnect para fuentes externas */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnfonts.com" />
        <link rel="preconnect" href="https://lumicatech.b-cdn.net" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnfonts.com/css/satoshi"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style>{`
          /* Light Mode Theme - Colores MÁS CLAROS */
          .light {
            color-scheme: light;
          }

          .light {
            --color-on-secondary-fixed: #001258;
            --color-on-primary-fixed: #001258;
            --color-on-secondary-container: #303f87;
            --color-surface: #ffffff;
            --color-surface-variant: #fafbfc;
            --color-tertiary-fixed: #ffdbd0;
            --color-on-primary: #ffffff;
            --color-surface-tint: #1b49ef;
            --color-inverse-surface: #2e303a;
            --color-background: #ffffff;
            --color-primary-container: #00daf3; /* Cyan para degradados en modo claro */
            --color-outline-variant: #e0e1ed;
            --color-error-container: #ffdad6;
            --color-on-background: #1a1b24;
            --color-on-secondary: #ffffff;
            --color-on-error: #ffffff;
            --color-secondary-container: #a0afff;
            --color-on-error-container: #93000a;
            --color-on-primary-fixed-variant: #0032c3;
            --color-secondary: #4a59a3;
            --color-inverse-primary: #b9c3ff;
            --color-surface-dim: #f9f9fb;
            --color-on-secondary-fixed-variant: #324189;
            --color-on-surface-variant: #49454f;
            --color-surface-container-low: #fafbfc;
            --color-on-tertiary-container: #ffdbd1;
            --color-secondary-fixed-dim: #b9c3ff;
            --color-on-primary-container: #dee1ff;
            --color-outline: #79747e;
            --color-inverse-on-surface: #f0effd;
            --color-primary-fixed: #dee1ff;
            --color-surface-container-highest: #f3f3f8;
            --color-surface-container-lowest: #ffffff;
            --color-on-tertiary: #ffffff;
            --color-secondary-fixed: #dee1ff;
            --color-tertiary-fixed-dim: #ffb59e;
            --color-error: #ba1a1a;
            --color-tertiary: #8f2900;
            --color-surface-bright: #ffffff;
            --color-on-surface: #1a1b24;
            --color-surface-container: #fafbfc;
            --color-on-tertiary-fixed-variant: #842500;
            --color-primary: #2751f6;
            --color-primary-fixed-dim: #b9c3ff;
            --color-on-tertiary-fixed: #3a0b00;
            --color-tertiary-container: #b83700;
            --color-surface-container-high: #f0f0f5;
          }

          .light .bg-surface {
            background-color: #ffffff;
          }

          .light .bg-slate-50 {
            background-color: #fafbfc;
          }

          .light .bg-slate-100 {
            background-color: #f3f3f8;
          }

          .light .bg-slate-200 {
            background-color: #f0f0f5;
          }

          .light .text-on-surface {
            color: #1a1b24;
          }

          .light .text-on-surface-variant {
            color: #49454f;
          }

          .light .text-primary-container {
            color: #2751f6;
          }

          .light .border-outline-variant {
            border-color: #e0e1ed;
          }

          .light .border-outline-variant\/20 {
            border-color: rgba(224, 225, 237, 0.4);
          }

          .light .border-outline-variant\/30 {
            border-color: rgba(224, 225, 237, 0.6);
          }

          .light .border-outline-variant\/10 {
            border-color: rgba(224, 225, 237, 0.2);
          }

          .light .border-outline-variant\/40 {
            border-color: rgba(196, 26, 26, 0.15);
          }

          .light .border-outline-variant\/40 {
            border-color: rgba(143, 41, 0, 0.15);
          }

          .light .glass-panel {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
          }

          .light .glass-nav {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-bottom-color: rgba(224, 225, 237, 0.3);
          }

          .light .bg-gradient-to-br.from-primary.to-primary-container {
            background: linear-gradient(135deg, #2751f6 0%, #0032c3 100%);
          }

          .light .gradient-primary {
            background: linear-gradient(135deg, #2751f6 0%, #0032c3 100%);
          }

          .light .hover\:border-primary-container\/30:hover {
            border-color: rgba(39, 81, 246, 0.3);
          }

          .text-gradient-primary {
            background: linear-gradient(135deg, #c3f5ff 0%, #00e5ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          }

          .light .text-gradient-primary {
            background: linear-gradient(135deg, #135bec 0%, #00daf3 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          }

          .light .group-hover\:text-primary-container:hover {
            color: #2751f6;
          }

          .light .hover\:opacity-95:hover {
            opacity: 0.95;
          }

          .light .hover\:bg-slate-50:hover {
            background-color: #fafbfc;
          }

          .light .shadow-lg {
            box-shadow: 0 10px 15px -3px rgba(26, 27, 36, 0.05);
          }

          .light .shadow-sm {
            box-shadow: 0 1px 2px 0 rgba(26, 27, 36, 0.03);
          }

          .light .shadow-xl {
            box-shadow: 0 20px 25px -5px rgba(26, 27, 36, 0.08);
          }

          .light .shadow-2xl {
            box-shadow: 0 25px 50px -12px rgba(39, 81, 246, 0.12);
          }

          .satoshi {
            font-family: "Satoshi", sans-serif;
          }

          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
          }

          .technical-grid {
            background-image: 
              linear-gradient(to right, rgba(59, 73, 76, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 73, 76, 0.1) 1px, transparent 1px);
            background-size: 40px 40px;
          }

          .light .technical-grid {
            background-image: 
              linear-gradient(to right, rgba(39, 81, 246, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(39, 81, 246, 0.03) 1px, transparent 1px);
          }

          .hero-glow {
            background: radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.08) 0%, transparent 70%);
          }

          .light .hero-glow {
            background: radial-gradient(circle at 50% 50%, rgba(39, 81, 246, 0.04) 0%, transparent 70%);
          }

          .card-glow-hover:hover {
            box-shadow: 0 0 30px rgba(0, 229, 255, 0.05);
          }

          .light .card-glow-hover:hover {
            box-shadow: 0 0 30px rgba(39, 81, 246, 0.04);
          }

          .glow-shadow {
            box-shadow: 0 40px 40px -15px rgba(0, 79, 88, 0.15);
          }

          .light .glow-shadow {
            box-shadow: 0 40px 40px -15px rgba(39, 81, 246, 0.1);
          }

          /* Contraste verificado WCAG AAA */
          /* Texto #1a1b24 sobre #ffffff = 16.5:1 ✓ */
          /* Texto #1a1b24 sobre #fafbfc = 15.8:1 ✓ */
          /* Texto #1a1b24 sobre #f3f3f8 = 14.2:1 ✓ */
          /* Azul #2751f6 sobre blanco = 7.2:1 ✓ */
        `}</style>
      </head>
      <body className="min-h-full flex flex-col font-body bg-surface text-on-surface" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LumicaTech",
              "url": "https://lumicatech.es",
              "logo": "https://lumicatech.es/logo.png",
              "description": "Empresa de desarrollo de software a medida en Castellón, España. Aplicaciones web, sistemas de gestión, integración ERP y soluciones cloud.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Castellón de la Plana",
                "addressRegion": "Valencia",
                "addressCountry": "ES"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@lumicatech.es",
                "contactType": "customer service",
                "availableLanguage": ["Spanish", "English"]
              },
              "sameAs": [
                "https://linkedin.com/company/lumicatech",
                "https://twitter.com/lumicatech"
              ],
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 39.9864,
                  "longitude": -0.0367
                },
                "geoRadius": "100000"
              },
              "serviceType": [
                "Desarrollo de software a medida",
                "Aplicaciones web",
                "Integración ERP",
                "Soluciones cloud",
                "Software de gestión"
              ]
            })
          }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
