import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Política de Cookies | LumicaTech",
  description: "Información sobre el uso de cookies en lumicatech.es conforme al RGPD y la LSSICE.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-grow pt-28 pb-20 px-4">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-on-surface mb-2">Política de Cookies</h1>
          <p className="text-on-surface-variant text-sm mb-10">Última actualización: marzo de 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">1. ¿Qué son las cookies?</h2>
            <p className="text-on-surface-variant text-sm">
              Las cookies son pequeños ficheros de texto que se almacenan en tu dispositivo cuando visitas un sitio web.
              Permiten que el sitio recuerde tus preferencias y acciones durante un tiempo determinado, de modo que no
              tengas que volver a introducirlas cada vez que regreses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">2. Cookies que utilizamos</h2>

            <h3 className="text-base font-medium text-on-surface mb-2 mt-4">2.1 Cookies estrictamente necesarias</h3>
            <p className="text-on-surface-variant text-sm mb-3">
              Son imprescindibles para el funcionamiento del sitio. No requieren tu consentimiento conforme al art. 22.2 LSSICE.
            </p>
            <div className="overflow-x-auto rounded-xl border border-outline-variant/30 mb-4">
              <table className="w-full text-xs text-on-surface-variant">
                <thead className="bg-surface-container-lowest text-on-surface">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Nombre</th>
                    <th className="text-left px-4 py-3 font-semibold">Proveedor</th>
                    <th className="text-left px-4 py-3 font-semibold">Finalidad</th>
                    <th className="text-left px-4 py-3 font-semibold">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  <tr>
                    <td className="px-4 py-3 font-mono">admin_token</td>
                    <td className="px-4 py-3">lumicatech.es</td>
                    <td className="px-4 py-3">Sesión del panel de administración</td>
                    <td className="px-4 py-3">Sesión</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono">cookie_consent</td>
                    <td className="px-4 py-3">lumicatech.es</td>
                    <td className="px-4 py-3">Almacena tu preferencia sobre cookies</td>
                    <td className="px-4 py-3">12 meses</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-medium text-on-surface mb-2 mt-4">2.2 Cookies de análisis y rendimiento</h3>
            <p className="text-on-surface-variant text-sm">
              Actualmente, <strong className="text-on-surface">este sitio no utiliza cookies de análisis ni de seguimiento</strong>.
              Si en el futuro se incorporasen (p. ej. Google Analytics), se actualizará esta política y se solicitará
              tu consentimiento antes de activarlas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">3. Cómo gestionar o eliminar las cookies</h2>
            <p className="text-on-surface-variant text-sm mb-3">
              Puedes retirar o modificar tu consentimiento en cualquier momento haciendo clic en el botón
              de preferencias que aparece al pie de esta página o borrando las cookies directamente desde tu navegador:
            </p>
            <ul className="text-on-surface-variant text-sm list-disc list-inside space-y-1">
              <li><strong className="text-on-surface">Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
              <li><strong className="text-on-surface">Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
              <li><strong className="text-on-surface">Safari:</strong> Preferencias → Privacidad → Administrar datos de sitios web</li>
              <li><strong className="text-on-surface">Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies</li>
            </ul>
            <p className="text-on-surface-variant text-sm mt-3">
              Ten en cuenta que desactivar las cookies estrictamente necesarias puede afectar al funcionamiento del sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">4. Base jurídica</h2>
            <p className="text-on-surface-variant text-sm">
              El uso de cookies estrictamente necesarias se ampara en el <strong className="text-on-surface">interés legítimo</strong> del
              responsable (art. 6.1.f RGPD) y en la excepción del art. 22.2 LSSICE. Las cookies no esenciales solo se
              activan con tu <strong className="text-on-surface">consentimiento previo</strong> (art. 6.1.a RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-on-surface mb-3">5. Más información</h2>
            <p className="text-on-surface-variant text-sm">
              Para cualquier consulta relacionada con el uso de cookies puedes contactar con nosotros en{" "}
              <a href="mailto:info@lumicatech.es" className="text-[#135bec] hover:underline">info@lumicatech.es</a>
              {" "}(José Manuel Mas Albiol, NIF: 53226557A).
              También puedes consultar más información sobre cookies en la web de la{" "}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#135bec] hover:underline">
                Agencia Española de Protección de Datos (AEPD)
              </a>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
