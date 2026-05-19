import { Metadata } from "next";
import LumiwareClient from "./components/LumiwareClient";

export const metadata: Metadata = {
  title: "Lumiware | Software de Gestión de Almacenes para Pymes",
  description: "Lumiware digitaliza la gestión de almacenes para pymes con código QR, control de stock en tiempo real e integración con ERP en Castellón y Comunidad Valenciana. Sin instalación.",
  keywords: [
    "gestión de almacenes",
    "software de gestión de almacenes",
    "software almacén pymes",
    "WMS",
    "Warehouse Management System",
    "sistema de gestión de almacén",
    "software de inventario",
    "programa de almacén",
    "control de inventario",
    "software logístico para pymes",
    "gestión de stock",
    "código QR almacén",
    "software de gestión de almacenes Castellón",
    "software almacén Castellón de la Plana",
    "software de inventario Comunidad Valenciana",
    "gestión de almacenes Comunidad Valenciana"
  ],
  openGraph: {
    title: "Lumiware | Software de Gestión de Almacenes para Pymes",
    description: "Software de gestión de almacenes para pymes en Castellón y Comunidad Valenciana con código QR, control de stock en tiempo real e integración ERP.",
    url: "https://lumicatech.es/lumiware",
    images: [{ url: "https://lumicatech.b-cdn.net/LumiWare%20Portada/interior-of-warehouse-with-racks-full-of-boxes-2026-03-16-23-00-10-utc.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumiware: Software de Gestión de Almacenes en Castellón",
    description: "Digitaliza tu almacén en Castellón y Comunidad Valenciana con código QR, control de stock en tiempo real e integración ERP.",
    images: ["https://lumicatech.b-cdn.net/LumiWare%20Portada/interior-of-warehouse-with-racks-full-of-boxes-2026-03-16-23-00-10-utc.webp"],
  },
  alternates: { canonical: "https://lumicatech.es/lumiware" },
};

export default function LumiwarePage() {
  return (
    <>
      {/* Schema SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Lumiware",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web (SaaS)",
            "description": "Lumiware es un software de gestión de almacenes que digitaliza el inventario mediante códigos QR, ofrece control de stock en tiempo real, catálogos automáticos y se integra con tu ERP. Sin instalación, ideal para empresas de cualquier tamaño.",
            "url": "https://lumicatech.es/lumiware",
            "screenshot": "https://lumicatech.b-cdn.net/LumiWare%20Portada/interior-of-warehouse-with-racks-full-of-boxes-2026-03-16-23-00-10-utc.webp",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR",
              "description": "Precio personalizado según necesidades. Contactar para presupuesto.",
              "availability": "https://schema.org/InStock",
              "url": "https://lumicatech.es/booking"
            },
            "author": {
              "@type": "Organization",
              "name": "LumicaTech",
              "url": "https://lumicatech.es"
            },
            "provider": {
              "@type": "Organization",
              "name": "LumicaTech",
              "url": "https://lumicatech.es",
              "areaServed": [
                {
                  "@type": "AdministrativeArea",
                  "name": "Castellón"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Comunidad Valenciana"
                },
                {
                  "@type": "Country",
                  "name": "España"
                }
              ]
            },
            "featureList": [
              "Control de stock en tiempo real con códigos QR",
              "Catálogos automáticos de productos",
              "Integración con ERP",
              "Gestión de movimientos de almacén",
              "Inventario digitalizado sin papel",
              "Acceso desde móvil y tablet",
              "Alertas de stock mínimo",
              "Exportación de informes y análisis"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "45"
            }
          })
        }}
      />

      {/* Schema LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "LumicaTech",
            "url": "https://lumicatech.es",
            "areaServed": [
              {
                "@type": "AdministrativeArea",
                "name": "Castellón"
              },
              {
                "@type": "AdministrativeArea",
                "name": "Comunidad Valenciana"
              },
              {
                "@type": "Country",
                "name": "España"
              }
            ],
            "makesOffer": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "SoftwareApplication",
                "name": "Lumiware"
              }
            }
          })
        }}
      />
      <LumiwareClient />
    </>
  );
}
