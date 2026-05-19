'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SEOContent() {
  return (
    <section className="py-24 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
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
                <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tighter text-on-surface dark:text-white mb-6 transition-colors duration-500">
                  Por qué tu pyme necesita software de gestión de almacenes
                </h2>
                <p className="text-lg md:text-xl text-on-surface-variant dark:text-slate-300 leading-relaxed font-light transition-colors duration-500">
                  Si gestionas un almacén con Excel, papel y procesos manuales, estás perdiendo dinero cada semana. El{" "}
                  <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500">software de gestión de almacenes para pymes</span>{" "}
                  no es un lujo reservado a grandes empresas: es una herramienta que ahorra tiempo, reduce errores y libera a tu equipo para tareas de más valor.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-on-surface dark:text-white mb-6 transition-colors duration-500">
                  ¿Qué es un WMS y por qué importa en una pyme?
                </h3>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light mb-6 transition-colors duration-500">
                  Un <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500">WMS (Warehouse Management System)</span> o
                  <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500"> sistema de gestión de almacén</span> permite controlar ubicaciones,
                  entradas, salidas, picking y trazabilidad desde una única plataforma. Para una pyme, esto se traduce en menos errores operativos y mejor servicio al cliente.
                </p>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light transition-colors duration-500">
                  Si estás buscando <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500">software de inventario</span> o un
                  <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500"> programa de almacén</span>, la clave es que incluya
                  <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500"> control de inventario</span> en tiempo real,
                  automatización documental y facilidad de implantación.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-on-surface dark:text-white mb-6 transition-colors duration-500">
                  Solución local para empresas de Castellón y Comunidad Valenciana
                </h3>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light mb-6 transition-colors duration-500">
                  Si tu empresa opera en <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500">Castellón</span> o en cualquier punto de la
                  <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500"> Comunidad Valenciana</span>, Lumiware te ayuda a digitalizar el almacén con una implantación cercana,
                  rápida y alineada con tu operativa real.
                </p>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light transition-colors duration-500">
                  Trabajamos con pymes industriales, distribución y comercio técnico que necesitan un software de gestión de almacenes práctico, con soporte en castellano y enfoque en resultados desde el primer mes.
                </p>
              </div>

              {/* Benefits for Companies */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-on-surface dark:text-white mb-6 transition-colors duration-500">
                  Ahorra tiempo sin invertir en infraestructura
                </h3>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light mb-6 transition-colors duration-500">
                  Muchas empresas creen que digitalizar su almacén requiere servidores propios, licencias costosas y un departamento informático. Con Lumiware, nada de eso. Es un{" "}
                  <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500">software de gestión de almacenes</span>{" "}
                  100% cloud: funciona desde el navegador, sin instalación, y tú pagas una cuota mensual ajustada a tu tamaño. Sin sorpresas, sin costes ocultos. Escala desde pymes hasta grandes operaciones industriales y encaja como
                  <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500"> software logístico para pymes</span> orientado a resultados.
                </p>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light transition-colors duration-500">
                  El resultado es inmediato: tu equipo deja de perseguir productos por pasillos, deja de llamar al encargado para saber si hay stock, deja de rehacer inventarios cada mes porque los números no cuadran. Con el{" "}
                  <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500">control de stock</span>{" "}
                  basado en <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500">código QR</span>, un escaneo te da la información exacta en segundos y mejora la
                  <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500"> gestión de stock</span> diaria.
                </p>
              </div>

              {/* Digitalization Benefits */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-on-surface dark:text-white mb-6 transition-colors duration-500">
                  Digitalización de almacén: más que tecnología, tranquilidad
                </h3>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light mb-6 transition-colors duration-500">
                  La <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500">digitalización de almacenes</span> significa que tus datos están seguros, actualizados y accesibles desde cualquier lugar. No dependes de que una persona concreta sepa dónde está todo: la información está en el sistema, no en la cabeza de nadie. Y cuando alguien se va de vacaciones, el almacén sigue funcionando.
                </p>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light mb-6 transition-colors duration-500">
                  Pero el verdadero cambio está en la reducción de errores. Menos roturas de stock por sorpresa, menos devoluciones por enviar productos equivocados, menos tiempo perdido en reuniones para arreglar problemas que ya deberían estar resueltos. El sistema te avisa antes de que el problema ocurra.
                </p>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light transition-colors duration-500">
                  Con el <span className="text-primary dark:text-cyan-400 font-semibold transition-colors duration-500">inventario en tiempo real</span>, tomas decisiones con datos frescos, no con estimaciones de hace tres semanas. Sabes qué productos se venden más, cuáles están estancados, cuándo reponer antes de que se agoten. Tu almacén pasa de ser un centro de costes a un motor que impulsa tu negocio.
                </p>
              </div>

              {/* Integration & Value */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-on-surface dark:text-white mb-6 transition-colors duration-500">
                  Integración con tu ERP: todo conectado, todo sincronizado
                </h3>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light mb-6 transition-colors duration-500">
                  Una de las mayores frustraciones de las pymes es tener sistemas que no se hablan entre sí. Ventas en un programa, almacén en otro, contabilidad en un tercero. Lumiware se integra con tu ERP para que la información fluya sin fricciones: cuando sale un producto del almacén, el stock se actualiza en todos los sistemas automáticamente.
                </p>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light transition-colors duration-500">
                  Esto significa menos trabajo manual, menos errores de transcripción y más confianza en tus datos. Tu equipo comercial puede saber si hay stock antes de prometer entrega. Tu equipo de compras sabe cuándo reponer antes de que se agote. Y tú, como responsable, tienes visibilidad total sin estar presente físicamente en el almacén.
                </p>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light mt-6 transition-colors duration-500">
                  Si quieres ver cómo encaja con tus procesos, puedes revisar también nuestro enfoque de
                  <Link href="/servicios/software-a-medida" className="text-primary dark:text-cyan-400 font-semibold hover:underline transition-colors duration-500"> software a medida</Link>
                  o contactar con el equipo desde
                  <Link href="/contacto" className="text-primary dark:text-cyan-400 font-semibold hover:underline transition-colors duration-500"> la página de contacto</Link>.
                </p>
              </div>

              {/* Closing CTA */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-2xl p-8 md:p-12">
                <h4 className="text-2xl md:text-3xl font-bold text-on-surface dark:text-white mb-4 transition-colors duration-500">
                  El primer paso es el más fácil: reunirte con nosotros
                </h4>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed font-light mb-6 transition-colors duration-500">
                  No necesitas comprometerte a nada para descubrir si Lumiware es la solución que tu pyme necesita. Agenda una reunión con nuestro equipo y te explicaremos, sin tecnicismos, cómo el software se adapta a tu almacén, tus productos y tus procesos. Veremos casos reales de empresas como la tuya y resolveremos todas tus dudas.
                </p>
                <p className="text-xl font-semibold text-primary dark:text-cyan-400 transition-colors duration-500">
                  Tu almacén digitalizado empieza con una conversación.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
