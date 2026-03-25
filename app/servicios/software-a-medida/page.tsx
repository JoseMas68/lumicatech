import { Metadata } from "next";
import SoftwareAMedidaClient from "./components/SoftwareAMedidaClient";

export const metadata: Metadata = {
  title: "Software a Medida en Castellón | Desarrollo de Aplicaciones Personalizadas",
  description: "Desarrollamos software a medida para empresas en Castellón y Valencia. Aplicaciones web, sistemas de gestión, integración ERP y soluciones cloud. Presupuesto sin compromiso.",
  keywords: ["software a medida Castellón", "desarrollo software Valencia", "aplicaciones web personalizadas", "software gestión empresa", "integración ERP España"],
  openGraph: {
    title: "Software a Medida en Castellón | LumicaTech",
    description: "Desarrollamos software a medida para empresas. Aplicaciones web, sistemas de gestión, integración ERP y soluciones cloud.",
    url: "https://lumicatech.es/servicios/software-a-medida",
    images: [{ url: "https://lumicatech.es/og-software.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://lumicatech.es/servicios/software-a-medida" },
};

export default function SoftwareAMedidaPage() {
  return <SoftwareAMedidaClient />;
}
