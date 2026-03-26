// Email Integration via Resend
// Setup: See docs/BOOKING_SETUP.md for configuration

import { Resend } from "resend";

interface BookingDetails {
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  time: string;
  meetLink?: string;
}

export async function sendBookingConfirmation(booking: BookingDetails): Promise<boolean> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "LumicaTech <info@lumicatech.es>",
    to: booking.email,
    subject: "✅ Reserva confirmada - LumicaTech",
    html: generateClientEmailTemplate(booking),
  });

  return true;
}

export async function sendNotificationToOwner(booking: BookingDetails): Promise<boolean> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!ownerEmail) return false;

  await resend.emails.send({
    from: "LumicaTech Bookings <info@lumicatech.es>",
    to: ownerEmail,
    subject: `📅 Nueva reserva: ${booking.name}${booking.company ? ` - ${booking.company}` : ""}`,
    html: generateOwnerEmailTemplate(booking),
  });

  return true;
}

export function generateClientEmailTemplate(booking: BookingDetails): string {
  return `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9;">
      <div style="background: #1a1b24; padding: 20px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <img src="https://lumicatech.b-cdn.net/Logos/logo_h_light.png" alt="LumicaTech" style="height: 44px; width: auto; display: inline-block;" />
      </div>
      <div style="background: #ffffff; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <h2 style="color: #1a1b24; margin-top: 0;">✅ Reserva Confirmada</h2>
        <p style="color: #4b5563;">Hola <strong>${booking.name}</strong>,</p>
        <p style="color: #4b5563;">Tu cita ha sido confirmada con los siguientes detalles:</p>
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 8px 0;"><strong>📅 Fecha:</strong> ${booking.date}</p>
          <p style="margin: 8px 0;"><strong>🕐 Hora:</strong> ${booking.time}</p>
          ${booking.meetLink ? `<p style="margin: 8px 0;"><strong>💻 Google Meet:</strong> <a href="${booking.meetLink}" style="color: #6366f1;">${booking.meetLink}</a></p>` : ""}
        </div>
        <p style="color: #4b5563;">Recibirás un recordatorio 30 minutos antes de la reunión.</p>
        <p style="color: #9ca3af; font-size: 14px;">Gracias por confiar en LumicaTech.</p>
        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 11px; line-height: 1.6; margin: 0;">
            Este correo ha sido enviado a <strong>${booking.email}</strong> porque solicitaste una reunión a través de <a href="https://lumicatech.es" style="color: #9ca3af;">lumicatech.es</a>.<br/>
            Si no realizaste ninguna reserva o crees que has recibido este mensaje por error, por favor ignóralo.<br/><br/>
            <strong>LumicaTech</strong> · <a href="https://lumicatech.es/privacidad" style="color: #9ca3af;">Política de privacidad</a> · <a href="https://lumicatech.es/aviso-legal" style="color: #9ca3af;">Aviso legal</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function sendReminderEmail(booking: BookingDetails): Promise<boolean> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "LumicaTech <info@lumicatech.es>",
    to: booking.email,
    subject: "⏰ Recordatorio: tienes una reunión mañana - LumicaTech",
    html: generateReminderEmailTemplate(booking),
  });

  return true;
}

export function generateReminderEmailTemplate(booking: BookingDetails): string {
  return `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9;">
      <div style="background: #1a1b24; padding: 20px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <img src="https://lumicatech.b-cdn.net/Logos/logo_h_light.png" alt="LumicaTech" style="height: 44px; width: auto; display: inline-block;" />
      </div>
      <div style="background: #ffffff; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <h2 style="color: #1a1b24; margin-top: 0;">⏰ Recordatorio de reunión</h2>
        <p style="color: #4b5563;">Hola <strong>${booking.name}</strong>,</p>
        <p style="color: #4b5563;">Te recordamos que mañana tienes una reunión con LumicaTech:</p>
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 8px 0;"><strong>📅 Fecha:</strong> ${booking.date}</p>
          <p style="margin: 8px 0;"><strong>🕐 Hora:</strong> ${booking.time}</p>
          ${booking.meetLink ? `<p style="margin: 8px 0;"><strong>💻 Enlace Google Meet:</strong> <a href="${booking.meetLink}" style="color: #6366f1; font-weight: bold;">${booking.meetLink}</a></p>` : ""}
        </div>
        <p style="color: #4b5563;">Accede al enlace unos minutos antes para que todo funcione correctamente.</p>
        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 11px; line-height: 1.6; margin: 0;">
            Este correo ha sido enviado a <strong>${booking.email}</strong> porque solicitaste una reunión a través de <a href="https://lumicatech.es" style="color: #9ca3af;">lumicatech.es</a>.<br/>
            Si no realizaste ninguna reserva o crees que has recibido este mensaje por error, por favor ignóralo.<br/><br/>
            <strong>LumicaTech</strong> · <a href="https://lumicatech.es/privacidad" style="color: #9ca3af;">Política de privacidad</a> · <a href="https://lumicatech.es/aviso-legal" style="color: #9ca3af;">Aviso legal</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

export function generateOwnerEmailTemplate(booking: BookingDetails): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lumicatech.es";
  return `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9;">
      <div style="background: #1a1b24; padding: 20px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <img src="https://lumicatech.b-cdn.net/Logos/logo_h_light.png" alt="LumicaTech" style="height: 44px; width: auto; display: inline-block;" />
      </div>
      <div style="background: #ffffff; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <h2 style="color: #1a1b24; margin-top: 0;">📅 Nueva reserva recibida</h2>
        <p style="color: #4b5563;">Tienes una nueva cita programada con los siguientes datos:</p>
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 8px 0;"><strong>👤 Nombre:</strong> ${booking.name}</p>
          ${booking.company ? `<p style="margin: 8px 0;"><strong>🏢 Empresa:</strong> ${booking.company}</p>` : ""}
          <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${booking.email}" style="color: #6366f1;">${booking.email}</a></p>
          <p style="margin: 8px 0;"><strong>📅 Fecha:</strong> ${booking.date}</p>
          <p style="margin: 8px 0;"><strong>🕐 Hora:</strong> ${booking.time}</p>
          ${booking.meetLink ? `<p style="margin: 8px 0;"><strong>💻 Google Meet:</strong> <a href="${booking.meetLink}" style="color: #6366f1;">${booking.meetLink}</a></p>` : ""}
          ${booking.message ? `<p style="margin: 8px 0; border-top: 1px solid #e5e7eb; padding-top: 12px; margin-top: 12px;"><strong>💬 Mensaje:</strong><br/><span style="color: #6b7280;">${booking.message}</span></p>` : ""}
        </div>
        <a href="${siteUrl}/admin/dashboard" style="display: inline-block; background: #6366f1; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; margin-top: 8px;">Ver en el panel →</a>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 11px; line-height: 1.6; margin: 0;">
            Notificación automática generada por el sistema de reservas de <strong>LumicaTech</strong>.<br/>
            Este mensaje es de uso interno y no debe ser reenviado.<br/><br/>
            <a href="https://lumicatech.es/privacidad" style="color: #9ca3af;">Política de privacidad</a> · <a href="https://lumicatech.es/aviso-legal" style="color: #9ca3af;">Aviso legal</a>
          </p>
        </div>
      </div>
    </div>
  `;
}
