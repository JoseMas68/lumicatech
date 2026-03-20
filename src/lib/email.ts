// Email Integration via Resend
// Setup: See docs/BOOKING_SETUP.md for configuration

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
  // TODO: Implement actual email sending via Resend
  // This requires:
  // 1. Resend API key (RESEND_API_KEY env var)
  // 2. resend npm package
  // 3. Verified domain (optional but recommended)
  
  console.log("Confirmation email would be sent to:", booking.email);
  
  // In production:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'LumicaTech <noreply@lumicatech.com>',
  //   to: booking.email,
  //   subject: 'Reserva confirmada',
  //   html: generateEmailTemplate(booking),
  // });
  
  return true;
}

export async function sendNotificationToOwner(booking: BookingDetails): Promise<boolean> {
  // TODO: Send notification to business owner
  console.log("Owner notification would be sent for:", booking);
  return true;
}

function generateEmailTemplate(booking: BookingDetails): string {
  return `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a1b24;">Reserva Confirmada</h1>
      <p>Hola ${booking.name},</p>
      <p>Tu cita ha sido confirmada:</p>
      <ul>
        <li><strong>Fecha:</strong> ${booking.date}</li>
        <li><strong>Hora:</strong> ${booking.time}</li>
        ${booking.meetLink ? `<li><strong>Google Meet:</strong> ${booking.meetLink}</li>` : ''}
      </ul>
      <p>Gracias por confiar en LumicaTech.</p>
    </div>
  `;
}
