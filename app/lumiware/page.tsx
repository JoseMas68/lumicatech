import { Metadata } from "next";
import LumiwareClient from "./components/LumiwareClient";

export const metadata: Metadata = {
  title: "Lumiware | Software de Gestión de Almacenes para Pymes",
  description: "Lumiware digitaliza la gestión de almacenes para pymes con QR, control de stock en tiempo real, catálogos automáticos e integración con tu ERP. Sin instalación. Empieza hoy.",
  keywords: ["gestión almacenes pyme", "software gestión almacén pymes", "control de stock pymes", "digitalización almacén pequeña empresa", "inventario almacén", "gestión stock"],
  openGraph: {
    title: "Lumiware | Software de Gestión de Almacenes para Pymes",
    description: "Lumiware digitaliza la gestión de almacenes para pymes con QR, control de stock en tiempo real, catálogos automáticos e integración con tu ERP. Sin instalación. Empieza hoy.",
    url: "https://lumicatech.es/lumiware",
    images: [{ url: "https://lumicatech.es/og-lumiware.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumiware: Software de Gestión de Almacenes para Pymes",
    description: "Digitaliza tu almacén con QR, control de stock en tiempo real y catálogos automáticos. Sin instalación. Ideal para pymes españolas.",
    images: ["https://lumicatech.es/og-lumiware.png"],
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
            "description": "Lumiware es un software de gestión de almacenes para pymes que digitaliza el inventario mediante códigos QR, ofrece control de stock en tiempo real, catálogos automáticos y se integra con tu ERP. Sin instalación, ideal para pequeñas empresas españolas.",
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
              "url": "https://lumicatech.es"
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
      <LumiwareClient />
    </>
  );
}
