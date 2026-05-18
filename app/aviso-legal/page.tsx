import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Aviso Legal | LumicaTech",
  description: "Información legal sobre LumicaTech Industrial Systems conforme a la LSSICE.",
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-grow pt-28 pb-20 px-4">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-on-surface mb-2">Aviso Legal</h1>
          <p className="text-on-surface-variant text-sm mb-10">Última actualización: marzo de 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">1. Datos identificativos</h2>
            <p className="text-on-surface-variant text-sm mb-2">
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
              Información y del Comercio Electrónico (LSSICE), se informa de los datos del titular de este sitio web:
            </p>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 text-sm text-on-surface-variant space-y-1">
              <p><strong className="text-on-surface">Nombre y apellidos:</strong> José Manuel Mas Albiol</p>
              <p><strong className="text-on-surface">NIF:</strong> 53226557A</p>
              <p><strong className="text-on-surface">Condición:</strong> Trabajador autónomo</p>
              <p><strong className="text-on-surface">Actividad:</strong> Desarrollo de software y soluciones tecnológicas industriales</p>
              <p><strong className="text-on-surface">Email de contacto:</strong>{" "}
                <a href="mailto:info@lumicatech.es" className="text-[#135bec] hover:underline">info@lumicatech.es</a>
              </p>
              <p><strong className="text-on-surface">Sitio web:</strong> https://lumicatech.es</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">2. Objeto y ámbito de aplicación</h2>
            <p className="text-on-surface-variant text-sm">
              El presente Aviso Legal regula el acceso y uso del sitio web <strong className="text-on-surface">lumicatech.es</strong>{" "}
              (en adelante, «el Sitio»). El acceso al Sitio implica la aceptación plena y sin reservas de las presentes
              condiciones. LumicaTech se reserva el derecho a modificar este Aviso Legal en cualquier momento; los cambios
              se publicarán en esta misma página con la fecha de actualización.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">3. Propiedad intelectual e industrial</h2>
            <p className="text-on-surface-variant text-sm">
              Todos los contenidos del Sitio (textos, imágenes, logotipos, código fuente, diseño gráfico y demás elementos)
              son titularidad de LumicaTech o de sus licenciantes y están protegidos por la legislación española e
              internacional sobre propiedad intelectual e industrial. Queda expresamente prohibida su reproducción,
              distribución, comunicación pública o transformación sin autorización escrita del titular.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">4. Responsabilidad</h2>
            <p className="text-on-surface-variant text-sm">
              LumicaTech no garantiza la disponibilidad continua del Sitio ni la ausencia de errores en los contenidos.
              No será responsable de los daños o perjuicios derivados del uso del Sitio, de la imposibilidad de acceso
              o de la presencia de virus u otros elementos lesivos introducidos por terceros.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">5. Enlaces a terceros</h2>
            <p className="text-on-surface-variant text-sm">
              El Sitio puede contener enlaces a sitios web de terceros. LumicaTech no controla ni es responsable de los
              contenidos, políticas de privacidad o prácticas de dichos sitios, y no asume ninguna responsabilidad
              por ellos. Se recomienda revisar las políticas de privacidad de cada sitio visitado.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">6. Legislación aplicable y jurisdicción</h2>
            <p className="text-on-surface-variant text-sm">
              El presente Aviso Legal se rige por la legislación española. Para la resolución de controversias derivadas
              del acceso o uso del Sitio, las partes se someten a los Juzgados y Tribunales competentes conforme a la
              normativa vigente, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
