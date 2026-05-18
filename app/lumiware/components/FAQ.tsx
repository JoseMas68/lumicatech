'use client';

import { motion } from 'framer-motion';

const faqs = [
  {
    question: "¿Qué es Lumiware y para qué sirve?",
    answer: "Lumiware es un software de gestión de almacenes que digitaliza tu inventario con códigos QR. Te permite controlar el stock en tiempo real, automatizar catálogos, integrar con tu ERP y gestionar movimientos desde móvil. Ideal para empresas de cualquier tamaño que quieren eliminar Excel y el papel de sus operaciones de almacén."
  },
  {
    question: "¿Cuánto cuesta el software de almacén Lumiware?",
    answer: "El precio de Lumiware consta de dos partes: una cuota mensual SaaS que varía según el tamaño de tu operación (número de usuarios, productos, almacenes) y un coste de implementación que se paga una sola vez. No necesitas inversión en infraestructura ni servidores. Escala según tu operación, desde pymes hasta grandes centros logísticos. Contacta con nosotros para un presupuesto sin compromiso."
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
    answer: "Si tu ERP tiene API y documentación disponible, podemos realizar una integración para importar los datos desde tu sistema a Lumiware automáticamente. Si no es posible, siempre puedes exportar los datos de tu ERP en formato estándar (CSV, Excel) e importarlos a Lumiware. De cualquier forma, migrar tu inventario existente es sencillo."
  }
];

export default function FAQ() {
  return (
    <>
      <section className="py-32 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary-container/5 dark:bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-screen-xl mx-auto px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-xl md:text-2xl font-light tracking-widest text-primary dark:text-[#00e5ff] uppercase mb-4 transition-colors duration-500">
              Preguntas Frecuentes
            </h2>
            <h3 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-surface dark:text-white mb-6 transition-colors duration-500">
              Lo que preguntan las pymes sobre software de gestión de almacenes
            </h3>
            <p className="text-lg text-on-surface-variant dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-500">
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
                className="bg-surface-container dark:bg-white/5 border border-outline-variant dark:border-white/10 rounded-2xl p-8 hover:border-primary-container/30 dark:hover:border-cyan-500/30 hover:bg-surface-container-high dark:hover:bg-white/[0.08] transition-all duration-300 group shadow-sm dark:shadow-none"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-cyan-500/10 border border-primary/20 dark:border-cyan-500/20 flex items-center justify-center text-primary dark:text-cyan-400 font-bold group-hover:bg-primary/20 dark:group-hover:bg-cyan-500/20 transition-colors">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                      {faq.question}
                    </h4>
                    <p className="text-on-surface-variant dark:text-slate-400 leading-relaxed font-light text-base transition-colors duration-500">
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
