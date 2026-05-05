'use client';

import { motion } from 'framer-motion';

const faqs = [
  {
    question: "¿Qué es Lumiware y para qué sirve?",
    answer: "Lumiware es un software de gestión de almacenes que digitaliza tu inventario con códigos QR. Te permite controlar el stock en tiempo real, automatizar catálogos, integrar con tu ERP y gestionar movimientos desde móvil. Ideal para empresas de cualquier tamaño que quieren eliminar Excel y el papel de sus operaciones de almacén."
  },
  {
    question: "¿Cuánto cuesta el software de almacén Lumiware?",
    answer: "El precio de Lumiware es personalizado según las necesidades de tu empresa: tamaño del almacén, número de usuarios, integraciones requeridas, etc. Es un modelo SaaS sin inversión inicial en infraestructura. Escala según tu operación, desde pymes hasta grandes centros logísticos. Contacta con nosotros para un presupuesto sin compromiso."
  },
  {
    question: "¿Necesito instalar algo o comprar servidores?",
    answer: "No. Lumiware es 100% cloud (SaaS), así que no necesitas servidores ni instalación técnica. Funciona desde navegador web en cualquier dispositivo: ordenador, tablet o móvil. Nosotros nos encargamos de todas las actualizaciones y mantenimiento técnico."
  },
  {
    question: "¿Cuánto tiempo tarda en implementarse?",
    answer: "La implementación de Lumiware es rápida comparada con otros softwares de gestión. El plazo varía según el tamaño de tu operación, pero en la mayoría de casos, entre 2 y 4 semanas ya tienes el sistema operativo: etiquetado de productos con QR, formación del equipo y configuración de integraciones. Todo sin parar tu actividad."
  },
  {
    question: "¿Se integra con mi ERP o sistema de gestión actual?",
    answer: "Sí, Lumiware se integra con los ERPs más utilizados por empresas. La integración es bidireccional: los datos de stock y movimientos se sincronizan automáticamente, evitando la duplicación de trabajo y los errores manuales."
  }
];

export default function FAQ() {
  return (
    <>
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-screen-xl mx-auto px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-xl md:text-2xl font-light tracking-widest text-[#00e5ff] uppercase mb-4">
              Preguntas Frecuentes
            </h2>
            <h3 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white mb-6">
              Lo que preguntan las pymes sobre software de gestión de almacenes
            </h3>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Respuestas directas a las dudas más comunes de pequeñas empresas que están digitalizando su almacén
            </p>
          </motion.div>

          {/* FAQ Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 hover:bg-white/[0.08] transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold group-hover:bg-cyan-500/20 transition-colors">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-50 transition-colors">
                      {faq.question}
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-light text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </>
  );
}
