/**
 * Utilidades de validación y sanitización de inputs
 */

/**
 * Sanitiza string para prevenir XSS
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Eliminar caracteres null
  let sanitized = input.replace(/\0/g, '');

  // Limitar longitud
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // Escapar caracteres HTML peligrosos
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };

  return sanitized.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
}

/**
 * Valida email con regex más estricto
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!email || typeof email !== 'string') {
    return false;
  }

  if (email.length > 254) { // RFC 5321
    return false;
  }

  const [localPart, domain] = email.split('@');

  if (!localPart || !domain) {
    return false;
  }

  if (localPart.length > 64) { // RFC 5321
    return false;
  }

  return emailRegex.test(email);
}

/**
 * Valida formato de fecha YYYY-MM-DD
 */
export function isValidDate(dateString: string): boolean {
  if (!dateString || typeof dateString !== 'string') {
    return false;
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  const now = new Date();

  // Verificar que es una fecha válida
  if (isNaN(date.getTime())) {
    return false;
  }

  // Verificar que no es en el pasado
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const comparisonDate = new Date(dateString);
  comparisonDate.setHours(0, 0, 0, 0);

  if (comparisonDate < today) {
    return false;
  }

  // Verificar que no es más de 1 año en el futuro
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  if (comparisonDate > maxDate) {
    return false;
  }

  return true;
}

/**
 * Valida formato de hora HH:MM
 */
export function isValidTime(timeString: string): boolean {
  if (!timeString || typeof timeString !== 'string') {
    return false;
  }

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(timeString);
}

/**
 * Valida nombre (solo letras, espacios, y caracteres comunes)
 */
export function isValidName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }

  if (name.length < 2 || name.length > 100) {
    return false;
  }

  // Permitir letras, espacios, acentos, apóstrofes y guiones
  const nameRegex = /^[a-zA-ZáéíóúñÑÁÉÍÓÚäëïöüÄËÏÖÜçÇ\-'\s]+$/;
  return nameRegex.test(name);
}

/**
 * Valida mensaje (longitud y caracteres permitidos)
 */
export function isValidMessage(message: string): boolean {
  if (typeof message !== 'string') {
    return false;
  }

  if (message.length > 2000) {
    return false;
  }

  // Permitir caracteres comunes pero no scripts o patrones sospechosos
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick=, onload=, etc.
    /<iframe/i,
    /<embed/i,
    /<object/i,
  ];

  return !dangerousPatterns.some(pattern => pattern.test(message));
}

/**
 * Valida y sanitiza datos de booking
 */
export interface BookingData {
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  time: string;
  consentGiven: boolean;
}

export function validateBookingData(data: any): { valid: boolean; errors: string[]; sanitized?: BookingData } {
  const errors: string[] = [];

  if (!data) {
    return { valid: false, errors: ['No se proporcionaron datos'] };
  }

  // Validar nombre
  if (!data.name || !isValidName(data.name)) {
    errors.push('Nombre inválido. Debe tener entre 2 y 100 caracteres');
  }

  // Validar email
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Email inválido');
  }

  // Validar fecha
  if (!data.date || !isValidDate(data.date)) {
    errors.push('Fecha inválida o en el pasado');
  }

  // Validar hora
  if (!data.time || !isValidTime(data.time)) {
    errors.push('Hora inválida');
  }

  // Validar consentimiento
  if (!data.consentGiven || data.consentGiven !== true) {
    errors.push('Debes aceptar la política de privacidad');
  }

  // Validar company (opcional)
  if (data.company && typeof data.company === 'string') {
    if (data.company.length > 100) {
      errors.push('Nombre de compañía demasiado largo');
    }
  }

  // Validar mensaje (opcional)
  if (data.message && typeof data.message === 'string') {
    if (!isValidMessage(data.message)) {
      errors.push('Mensaje contiene contenido no permitido');
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Sanitizar datos
  const sanitized: BookingData = {
    name: sanitizeString(data.name, 100),
    email: data.email.trim().toLowerCase(),
    company: data.company ? sanitizeString(data.company, 100) : undefined,
    message: data.message ? sanitizeString(data.message, 2000) : undefined,
    date: data.date,
    time: data.time,
    consentGiven: true,
  };

  return { valid: true, errors: [], sanitized };
}
