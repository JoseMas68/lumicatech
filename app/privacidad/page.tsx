import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Política de Privacidad | LumicaTech",
  description: "Información sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD.",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-grow pt-28 pb-20 px-4">
        <article className="max-w-3xl mx-auto prose prose-invert prose-sm">
          <h1 className="text-3xl font-bold text-on-surface mb-2">Política de Privacidad</h1>
          <p className="text-on-surface-variant text-sm mb-10">Última actualización: marzo de 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">1. Responsable del tratamiento</h2>
            <div className="text-on-surface-variant space-y-1 text-sm">
              <p><strong className="text-on-surface">Nombre y apellidos:</strong> José Manuel Mas Albiol</p>
              <p><strong className="text-on-surface">NIF:</strong> 53226557A</p>
              <p><strong className="text-on-surface">Condición:</strong> Trabajador autónomo</p>
              <p><strong className="text-on-surface">Email de contacto:</strong>{" "}
                <a href="mailto:info@lumicatech.es" className="text-[#135bec] hover:underline">info@lumicatech.es</a>
              </p>
              <p><strong className="text-on-surface">Web:</strong> https://lumicatech.es</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">2. Finalidad del tratamiento</h2>
            <p className="text-on-surface-variant text-sm">
              Los datos personales que nos facilitas a través del formulario de reserva (nombre, email, empresa y mensaje)
              se tratan exclusivamente con las siguientes finalidades:
            </p>
            <ul className="text-on-surface-variant text-sm list-disc list-inside mt-2 space-y-1">
              <li>Gestionar la cita o reunión solicitada.</li>
              <li>Enviarte la confirmación de la reserva y el enlace de videollamada.</li>
              <li>Enviarte un recordatorio 24 horas antes de la reunión.</li>
              <li>Notificar internamente al equipo de LumicaTech de la nueva reserva.</li>
            </ul>
            <p className="text-on-surface-variant text-sm mt-2">
              No utilizamos tus datos para envíos de marketing ni los cedemos a terceros para publicidad.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">3. Base jurídica del tratamiento</h2>
            <p className="text-on-surface-variant text-sm">
              El tratamiento se basa en el <strong className="text-on-surface">consentimiento expreso</strong> del interesado
              (art. 6.1.a RGPD), otorgado mediante la marcación del checkbox de aceptación en el formulario de reserva.
              Puedes retirar tu consentimiento en cualquier momento sin que ello afecte a la licitud del
              tratamiento previo a su retirada.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">4. Destinatarios de los datos</h2>
            <p className="text-on-surface-variant text-sm">
              Tus datos pueden ser comunicados a los siguientes prestadores de servicios, que actúan como
              encargados del tratamiento bajo acuerdos de confidencialidad:
            </p>
            <ul className="text-on-surface-variant text-sm list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-on-surface">Resend (resend.com):</strong> servicio de envío de correo electrónico.</li>
              <li><strong className="text-on-surface">Google LLC (Google Calendar / Google Meet):</strong> creación del evento y enlace de videollamada.</li>
            </ul>
            <p className="text-on-surface-variant text-sm mt-2">
              Ambos proveedores pueden tratar datos fuera del EEE bajo mecanismos de transferencia adecuados
              (Cláusulas Contractuales Tipo o Marco de Privacidad UE-EE.UU.).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">5. Plazo de conservación</h2>
            <p className="text-on-surface-variant text-sm">
              Los datos se conservan durante el tiempo necesario para gestionar la cita y, una vez celebrada,
              durante un plazo máximo de <strong className="text-on-surface">12 meses</strong> con fines de registro e
              historial de actividad, salvo que solicites su supresión antes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">6. Tus derechos</h2>
            <p className="text-on-surface-variant text-sm mb-2">
              Conforme al RGPD y la Ley Orgánica 3/2018 (LOPDGDD), puedes ejercer en cualquier momento los
              siguientes derechos dirigiéndote a{" "}
              <a href="mailto:josemas68@gmail.com" className="text-[#135bec] hover:underline">josemas68@gmail.com</a>:
            </p>
            <ul className="text-on-surface-variant text-sm list-disc list-inside space-y-1">
              <li><strong className="text-on-surface">Acceso:</strong> obtener confirmación sobre si tratamos tus datos.</li>
              <li><strong className="text-on-surface">Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong className="text-on-surface">Supresión:</strong> solicitar la eliminación de tus datos («derecho al olvido»).</li>
              <li><strong className="text-on-surface">Limitación:</strong> restringir el tratamiento en determinadas circunstancias.</li>
              <li><strong className="text-on-surface">Portabilidad:</strong> recibir tus datos en formato estructurado y legible.</li>
              <li><strong className="text-on-surface">Oposición:</strong> oponerte al tratamiento por motivos relacionados con tu situación particular.</li>
              <li><strong className="text-on-surface">Retirada del consentimiento:</strong> sin efecto retroactivo.</li>
            </ul>
            <p className="text-on-surface-variant text-sm mt-3">
              Si consideras que el tratamiento vulnera la normativa, tienes derecho a presentar una reclamación
              ante la <strong className="text-on-surface">Agencia Española de Protección de Datos (AEPD)</strong>:{" "}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#135bec] hover:underline">
                www.aepd.es
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-on-surface mb-3">7. Seguridad de los datos</h2>
            <p className="text-on-surface-variant text-sm">
              Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos
              no autorizados, pérdida o alteración, entre ellas: comunicaciones cifradas mediante HTTPS,
              acceso restringido al sistema de gestión y almacenamiento local en servidor propio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-on-surface mb-3">8. Cambios en esta política</h2>
            <p className="text-on-surface-variant text-sm">
              Nos reservamos el derecho a actualizar esta política para adaptarla a cambios legislativos o
              de funcionamiento del servicio. La fecha de «Última actualización» siempre indicará cuándo se
              realizó la última modificación.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
