import { NextResponse } from 'next/server';
import { getAvailabilityConfig } from '@/src/lib/availability-config';

/**
 * Obtener lista de días que tienen horas disponibles
 * Query: ?year=2026&month=4 (opcional, por defecto mes actual)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    const month = parseInt(searchParams.get('month') || new Date().getMonth().toString());

    const config = await getAvailabilityConfig();

    // Filtrar slots para el mes específico
    const availableDays: string[] = [];
    const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;

    Object.keys(config.slots).forEach(dateStr => {
      if (dateStr.startsWith(monthPrefix)) {
        const slots = config.slots[dateStr];
        if (slots && slots.length > 0) {
          availableDays.push(dateStr);
        }
      }
    });

    return NextResponse.json({
      availableDays,
      meetingDuration: config.meetingDuration
    });

  } catch (error) {
    console.error('[AVAILABILITY] Error getting availability:', error);
    return NextResponse.json(
      { error: 'Error obtaining availability' },
      { status: 500 }
    );
  }
}