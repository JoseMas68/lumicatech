import pool from './db';

export interface AvailabilityConfig {
  meetingDuration: number; // duración de cada reunión en minutos
  slots: Record<string, string[]>; // "2026-03-24": ["09:00", "10:30", ...]
}

/**
 * Obtener configuración de disponibilidad desde PostgreSQL
 */
export async function getAvailabilityConfig(): Promise<AvailabilityConfig> {
  try {
    const result = await pool.query(
      'SELECT meeting_duration, slots FROM availability_config ORDER BY id LIMIT 1'
    );

    if (result.rows.length > 0) {
      return {
        meetingDuration: result.rows[0].meeting_duration,
        slots: result.rows[0].slots || {}
      };
    }

    // Si no hay configuración, crear una por defecto
    const defaultConfig: AvailabilityConfig = {
      meetingDuration: 60,
      slots: {}
    };

    await pool.query(
      'INSERT INTO availability_config (meeting_duration, slots) VALUES ($1, $2)',
      [defaultConfig.meetingDuration, JSON.stringify(defaultConfig.slots)]
    );

    return defaultConfig;

  } catch (error) {
    console.error('Error getting availability config:', error);
    // En caso de error, devolver configuración por defecto
    return {
      meetingDuration: 60,
      slots: {}
    };
  }
}

/**
 * Guardar configuración de disponibilidad en PostgreSQL
 */
export async function saveAvailabilityConfig(config: AvailabilityConfig): Promise<void> {
  try {
    // Verificar si existe configuración
    const exists = await pool.query('SELECT id FROM availability_config');

    if (exists.rows.length > 0) {
      // Actualizar configuración existente
      await pool.query(
        'UPDATE availability_config SET meeting_duration = $1, slots = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
        [config.meetingDuration, JSON.stringify(config.slots), exists.rows[0].id]
      );
    } else {
      // Crear nueva configuración
      await pool.query(
        'INSERT INTO availability_config (meeting_duration, slots) VALUES ($1, $2)',
        [config.meetingDuration, JSON.stringify(config.slots)]
      );
    }

  } catch (error) {
    console.error('Error saving availability config:', error);
    throw new Error(`Failed to save availability config: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Actualizar slots para una fecha específica
 */
export async function updateDateSlots(date: string, slots: string[]): Promise<void> {
  try {
    const config = await getAvailabilityConfig();
    config.slots[date] = slots;
    await saveAvailabilityConfig(config);
  } catch (error) {
    console.error('Error updating date slots:', error);
    throw error;
  }
}

/**
 * Eliminar slots de una fecha específica
 */
export async function removeDateSlots(date: string): Promise<void> {
  try {
    const config = await getAvailabilityConfig();
    delete config.slots[date];
    await saveAvailabilityConfig(config);
  } catch (error) {
    console.error('Error removing date slots:', error);
    throw error;
  }
}