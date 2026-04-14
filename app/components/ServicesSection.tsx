'use client';

import { motion } from 'framer-motion';

export default function ServicesSection() {
  const allServices = [
    {
      title: "Sistemas WMS & Logística",
      description: "Implementamos sistemas de gestión de almacenes inteligentes. Etiquetas QR, trazabilidad total y control de stock en tiempo real.",
      icon: "inventory_2",
      features: ["Control de Inventario", "Etiquetado QR/NFC", "Gestión de Flotas"]
    },
    {
      title: "Software a Medida & SaaS",
      description: "Desarrollamos aplicaciones web de alto rendimiento y plataformas SaaS escalables diseñadas para el crecimiento.",
      icon: "terminal",
      features: ["Next.js & Node.js", "Arquitectura Escalable", "Cloud Native"]
    },
    {
      title: "Digitalización de Procesos",
      description: "Transformamos flujos de trabajo manuales y hojas de Excel en aplicaciones robustas que eliminan errores y ahorran horas.",
      icon: "settings_suggest",
      features: ["Automatización", "Eliminación de Papel", "Fácil de usar"]
    },
    {
      title: "Integración de Sistemas",
      description: "Conectamos tu software actual con ERPs, CRMs y APIs externas para unificar toda la información de tu negocio.",
      icon: "dataset_linked",
      features: ["Conexión ERP", "Sincronización APIs", "Datos Unificados"]
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-white dark:bg-[#050505] transition-colors duration-500 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-mono font-bold tracking-[0.3em] uppercase text-primary bg-primary/5 rounded-full border border-primary/20"
          >
            Servicios
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-headline font-black text-black dark:text-white mb-6 tracking-tighter"
          >
            Soluciones para la <br className="hidden md:block" /> era digital
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto"
          >
            Diseñamos infraestructura digital que impulsa la eficiencia operativa y acelera el crecimiento de tu empresa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {allServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex flex-col p-8 md:p-10 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center mb-8 border border-slate-100 dark:border-white/10 group-hover:bg-primary group-hover:text-white dark:group-hover:text-black transition-all duration-500 shadow-sm">
                <span className="material-symbols-outlined text-3xl font-light">
                  {service.icon}
                </span>
              </div>

              <h3 className="text-2xl font-headline font-bold text-black dark:text-white mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200 dark:border-white/10">
                {service.features.map((feature, fIdx) => (
                  <span 
                    key={fIdx}
                    className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-white/5 px-3 py-1.5 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
