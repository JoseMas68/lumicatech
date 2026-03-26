import { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contacto | LumicaTech - Software a Medida en Castellón",
  description: "Contacta con LumicaTech para desarrollar tu software a medida. Estamos en Castellón de la Plana. Email, teléfono o reserva una reunión online.",
  alternates: { canonical: "https://lumicatech.es/contacto" },
  openGraph: {
    title: "Contacto | LumicaTech",
    description: "Habla con nuestro equipo sobre tu proyecto de software. Respuesta en menos de 24h.",
    url: "https://lumicatech.es/contacto",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contacto LumicaTech",
  "url": "https://lumicatech.es/contacto",
  "description": "Página de contacto de LumicaTech, empresa de desarrollo de software a medida en Castellón",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "LumicaTech",
    "description": "Empresa de desarrollo de software a medida en Castellón de la Plana, España",
    "url": "https://lumicatech.es",
    "email": "info@lumicatech.es",
    "telephone": "+34-XXX-XXX-XXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Castellón de la Plana",
      "addressRegion": "Comunitat Valenciana",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.9864,
      "longitude": -0.0367
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://linkedin.com/company/lumicatech"
    ]
  }
};

export default function ContactoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-surface">
        <Header />
        <main className="flex-grow pt-24 technical-grid relative overflow-hidden">
          <div className="hero-glow absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">

            {/* Hero */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-on-surface-variant mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Respondemos en menos de 24h
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-on-surface mb-4">
                Hablemos de tu{" "}
                <span className="text-gradient-primary">proyecto</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-xl mx-auto">
                Cuéntanos qué necesitas y te decimos cómo podemos ayudarte. Sin compromiso.
              </p>
            </div>

            {/* Tarjetas de contacto */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {/* Email */}
              <a
                href="mailto:info@lumicatech.es"
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/8 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition-colors">
                  <span className="material-symbols-outlined text-indigo-400">mail</span>
                </div>
                <h2 className="font-bold text-on-surface mb-1">Email</h2>
                <p className="text-on-surface-variant text-sm mb-3">Respuesta en &lt;24h laborables</p>
                <span className="text-indigo-400 text-sm font-medium">info@lumicatech.es</span>
              </a>

              {/* Reunión */}
              <a
                href="/booking"
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/8 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <span className="material-symbols-outlined text-purple-400">video_call</span>
                </div>
                <h2 className="font-bold text-on-surface mb-1">Reunión online</h2>
                <p className="text-on-surface-variant text-sm mb-3">30 min por Google Meet</p>
                <span className="text-purple-400 text-sm font-medium">Reservar cita →</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/lumicatech"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/8 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <span className="material-symbols-outlined text-blue-400">business</span>
                </div>
                <h2 className="font-bold text-on-surface mb-1">LinkedIn</h2>
                <p className="text-on-surface-variant text-sm mb-3">Síguenos para novedades</p>
                <span className="text-blue-400 text-sm font-medium">@lumicatech →</span>
              </a>
            </div>

            {/* Formulario de contacto */}
            <div className="max-w-2xl mx-auto">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="text-2xl font-bold text-on-surface mb-6">Envíanos un mensaje</h2>
                <ContactForm />
              </div>
            </div>

            {/* Ubicación */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-base">location_on</span>
                Castellón de la Plana, Comunitat Valenciana, España
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

// Formulario cliente
function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/info@lumicatech.es"
      method="POST"
      className="space-y-5"
    >
      <input type="hidden" name="_subject" value="Nuevo mensaje desde lumicatech.es/contacto" />
      <input type="hidden" name="_next" value="https://lumicatech.es/contacto?enviado=true" />
      <input type="hidden" name="_captcha" value="false" />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nombre" className="block text-sm text-on-surface-variant mb-2">
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Tu nombre"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:border-indigo-500 focus:outline-none transition-colors text-sm"
          />
        </div>
        <div>
          <label htmlFor="empresa" className="block text-sm text-on-surface-variant mb-2">
            Empresa
          </label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            placeholder="Tu empresa"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:border-indigo-500 focus:outline-none transition-colors text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-on-surface-variant mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="tu@empresa.com"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:border-indigo-500 focus:outline-none transition-colors text-sm"
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm text-on-surface-variant mb-2">
          ¿En qué podemos ayudarte? *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          placeholder="Cuéntanos tu proyecto o duda..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:border-indigo-500 focus:outline-none transition-colors text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-95"
      >
        Enviar mensaje
      </button>

      <p className="text-xs text-on-surface-variant text-center">
        Al enviar aceptas nuestra{" "}
        <a href="/privacidad" className="text-indigo-400 hover:underline">
          política de privacidad
        </a>
      </p>
    </form>
  );
}
