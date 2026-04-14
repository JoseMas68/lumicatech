import pool from '../db';

/**
 * Ejecutar todas las migraciones pendientes
 */
export async function runMigrations() {
  try {
    console.log('🔄 Ejecutando migraciones de base de datos...');

    // Crear tabla de migraciones si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        migration_name TEXT UNIQUE NOT NULL,
        executed_at TEXT DEFAULT NOW()
      )
    `);

    // Leer todas las migraciones
    const migrations = [
      '001_create_bookings_table',
      '002_create_availability_table'
    ];

    // Ejecutar cada migración si no se ha ejecutado
    for (const migration of migrations) {
      const exists = await pool.query(
        'SELECT * FROM schema_migrations WHERE migration_name = $1',
        [migration]
      );

      if (exists.rows.length === 0) {
        console.log(`📋 Ejecutando migración: ${migration}`);

        // Ejecutar el SQL de la migración
        if (migration === '001_create_bookings_table') {
          await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              email TEXT NOT NULL,
              company TEXT,
              message TEXT,
              date TEXT NOT NULL,
              time TEXT NOT NULL,
              meet_link TEXT,
              consent_given BOOLEAN DEFAULT true,
              consent_at TEXT,
              reminder_sent BOOLEAN DEFAULT false,
              status TEXT DEFAULT 'nuevo',
              notes TEXT DEFAULT '',
              created_at TEXT DEFAULT NOW(),
              updated_at TEXT
            )
          `);

          // Crear índices
          await pool.query('CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date)');
          await pool.query('CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)');
          await pool.query('CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email)');
          await pool.query('CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at)');

          // Marcar migración como ejecutada
          await pool.query(
            'INSERT INTO schema_migrations (migration_name) VALUES ($1)',
            [migration]
          );

          console.log(`✅ Migración ${migration} completada`);
        } else if (migration === '002_create_availability_table') {
          // Eliminar tabla antigua si existe con estructura incorrecta
          await pool.query('DROP TABLE IF EXISTS availability_config CASCADE');

          // Crear tabla de disponibilidad con estructura correcta
          await pool.query(`
            CREATE TABLE availability_config (
              id SERIAL PRIMARY KEY,
              meeting_duration INTEGER NOT NULL DEFAULT 60,
              slots JSONB NOT NULL DEFAULT '{}',
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `);

          // Insertar configuración por defecto
          await pool.query(`
            INSERT INTO availability_config (meeting_duration, slots)
            VALUES (60, '{}')
          `);

          // Crear índice
          await pool.query('CREATE INDEX idx_availability_config_updated ON availability_config(updated_at)');

          // Marcar migración como ejecutada
          await pool.query(
            'INSERT INTO schema_migrations (migration_name) VALUES ($1)',
            [migration]
          );

          console.log(`✅ Migración ${migration} completada`);
        }
      } else {
        console.log(`⏭️  Migración ${migration} ya ejecutada, omitiendo`);
      }
    }

    console.log('🎉 Todas las migraciones completadas');
    return true;

  } catch (error) {
    console.error('❌ Error ejecutando migraciones:', error);
    throw error;
  }
}

/**
 * Verificar si las migraciones están actualizadas
 */
export async function checkMigrations(): Promise<boolean> {
  try {
    const result = await pool.query(
      'SELECT * FROM schema_migrations WHERE migration_name = $1',
      ['002_create_availability_table']
    );
    return result.rows.length > 0;
  } catch {
    return false;
  }
}