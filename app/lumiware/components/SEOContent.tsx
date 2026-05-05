'use client';

import { motion } from 'framer-motion';

export default function SEOContent() {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>

      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Main Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="space-y-8">
              {/* Introduction */}
              <div>
                <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tighter text-white mb-6">
                  Por qué tu pyme necesita software de gestión de almacenes
                </h2>
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                  Si gestionas un almacén con Excel, papel y procesos manuales, estás perdiendo dinero cada semana. El{" "}
                  <span className="text-cyan-400 font-semibold">software de gestión de almacenes para pymes</span>{" "}
                  no es un lujo reservado a grandes empresas: es una herramienta que ahorra tiempo, reduce errores y libera a tu equipo para tareas de más valor.
                </p>
              </div>

              {/* Benefits for Small Businesses */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Ahorra tiempo sin invertir en infraestructura
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed font-light mb-6">
                  Muchas pequeñas empresas españolas creen que digitalizar su almacén requiere servidores, licencias costosas y un departamento informático. Con Lumiware, nada de eso. Es un{" "}
                  <span className="text-cyan-400 font-semibold">software almacén pequeña empresa</span>{" "}
                  100% cloud: funciona desde el navegador, sin instalación, y tú pagas una cuota mensual ajustada a tu tamaño. Sin sorpresas, sin costes ocultos.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  El resultado es inmediato: tu equipo deja de perseguir productos por pasillos, deja de llamar al encargado para saber si hay stock, deja de rehacer inventarios cada mes porque los números no cuadran. Con el{" "}
                  <span className="text-cyan-400 font-semibold">control de stock pymes</span>{" "}
                  basado en códigos QR, un escaneo te da la información exacta en segundos.
                </p>
              </div>

              {/* Digitalization Benefits */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Digitalización de almacén: más que tecnología, tranquilidad
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed font-light mb-6">
                  La <span className="text-cyan-400 font-semibold">digitalización almacén</span> significa que tus datos están seguros, actualizados y accesibles desde cualquier lugar. No dependes de que una persona concreta sepa dónde está todo: la información está en el sistema, no en la cabeza de nadie. Y cuando alguien se va de vacaciones, el almacén sigue funcionando.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed font-light mb-6">
                  Pero el verdadero cambio es en errores menos. Menos roturas de stock por sorpresa, menos devoluciones por enviar productos equivocados, menos tiempo perdido en reuniones para arreglar problemas que ya deberían estar resueltos. El sistema te avisa antes de que el problema ocurra.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  Con el <span className="text-cyan-400 font-semibold">inventario en tiempo real</span>, tomas decisiones con datos frescos, no con estimaciones de hace tres semanas. Sabes qué productos se venden más, cuáles están estancados, cuándo reponer antes de que se agoten. Tu almacén pasa de ser un cajón desastre a un motor que impulsa tu negocio.
                </p>
              </div>

              {/* Integration & Value */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Integración con tu ERP: todo conectado, todo sincronizado
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed font-light mb-6">
                  Una de las mayores frustraciones de las pymes es tener sistemas que no se hablan entre sí. Ventas en un programa, almacén en otro, contabilidad en un tercero. Lumiware se integra con tu ERP para que la información fluya sin fricciones: cuando sale un producto del almacén, el stock se actualiza en todos los sistemas automáticamente.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  Esto significa menos trabajo manual, menos errores de transcripción y más confianza en tus datos. Tu equipo comercial puede saber si hay stock antes de prometer entrega. Tu equipo de compras sabe cuándo reponer antes de que se agote. Y tú, como responsable, tienes visibilidad total sin estar presente físicamente en el almacén.
                </p>
              </div>

              {/* Closing CTA */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-2xl p-8 md:p-12">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  El primer paso es el más fácil: probarlo
                </h4>
                <p className="text-lg text-slate-300 leading-relaxed font-light mb-6">
                  No tienes que comprometerte a nada para ver si Lumiware funciona para tu pyme. Pide una demo personalizada y verás cómo funciona con tus productos, tus procesos, tus necesidades. Sin tecnicismos, sin promesas vacías: solo una herramienta real para una empresa real.
                </p>
                <p className="text-xl font-semibold text-cyan-400">
                  Tu almacén digitalizado está a un escaneo de distancia.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
