import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "En Construcción | Lumicatech",
  description: "Página en construcción.",
};

export default function EnConstruccionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden px-8 pt-24 pb-16">
      {/* Background Grid */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-50"></div>
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <span className="material-symbols-outlined text-6xl text-primary-container mb-6 animate-pulse">
          construction
        </span>
        
        <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter text-on-surface mb-6">
          Página en <span className="text-gradient-primary">Construcción</span>
        </h1>
        
        <p className="text-lg text-on-surface-variant mb-12">
          Estamos trabajando en algo increíble para ti. Vuelve pronto para descubrir las novedades de este proyecto.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface font-bold rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Volver al inicio
        </Link>
      </div>
      </main>
      <Footer />
    </div>
  );
}
