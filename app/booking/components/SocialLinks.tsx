"use client";

export default function SocialLinks() {
  return (
    <section className="py-16 px-4 border-t border-outline-variant/10">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-xl font-headline font-bold text-on-surface mb-4">
          ¿Prefieres hablar directamente?
        </h3>
        <p className="text-on-surface-variant mb-8">
          También puedes contactarnos por WhatsApp o llamarnos directamente.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/34624237696"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-surface-container hover:bg-surface-container-high rounded-xl text-on-surface-variant hover:text-on-surface transition-all group border border-outline-variant/30"
          >
            <span className="material-symbols-outlined">forum</span>
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
          
          {/* Telefono */}
          <a
            href="tel:+34624237696"
            className="flex items-center gap-2 px-6 py-3 bg-surface-container hover:bg-surface-container-high rounded-xl text-on-surface-variant hover:text-on-surface transition-all group border border-outline-variant/30"
          >
            <span className="material-symbols-outlined">call</span>
            <span className="text-sm font-medium">Llámanos</span>
          </a>
        </div>
      </div>
    </section>
  );
}
