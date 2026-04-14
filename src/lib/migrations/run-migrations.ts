import { pool } from '../db';

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
      '001_create_bookings_table'
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

          // Crear tabla de availability_config
          await pool.query(`
            CREATE TABLE IF NOT EXISTS availability_config (
              id SERIAL PRIMARY KEY,
              config JSONB NOT NULL DEFAULT '{}',
              created_at TEXT DEFAULT NOW(),
              updated_at TEXT DEFAULT NOW()
            )
          `);

          // Insertar configuración inicial
          await pool.query(`
            INSERT INTO availability_config (config)
            VALUES ('{}')
            ON CONFLICT DO NOTHING
          `);

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
      ['001_create_bookings_table']
    );
    return result.rows.length > 0;
  } catch {
    return false;
  }
}
