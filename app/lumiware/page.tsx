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
  alternates: { canonical: "https://lumicatech.es/lumiware" },
};

export default function LumiwarePage() {
  return <LumiwareClient />;
}
