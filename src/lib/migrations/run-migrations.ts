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
      '002_create_availability_table',
      '003_create_budgets_table',
      '004_create_clients_services_tables',
      '005_add_budget_template_fields'
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
        } else if (migration === '003_create_budgets_table') {
          await pool.query(`
            CREATE TABLE IF NOT EXISTS budgets (
              id TEXT PRIMARY KEY,
              token TEXT UNIQUE NOT NULL,
              booking_id TEXT,
              client_name TEXT NOT NULL,
              client_email TEXT NOT NULL,
              company TEXT,
              title TEXT NOT NULL,
              notes TEXT,
              currency TEXT NOT NULL DEFAULT 'EUR',
              tax_percent NUMERIC(10,2) NOT NULL DEFAULT 0,
              discount NUMERIC(12,2) NOT NULL DEFAULT 0,
              subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
              tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
              final_total NUMERIC(12,2) NOT NULL DEFAULT 0,
              items JSONB NOT NULL DEFAULT '[]'::jsonb,
              status TEXT NOT NULL DEFAULT 'borrador',
              valid_until TEXT,
              created_at TEXT DEFAULT NOW(),
              updated_at TEXT,
              last_sent_at TEXT,
              responded_at TEXT,
              response_notes TEXT
            )
          `);

          await pool.query('CREATE INDEX IF NOT EXISTS idx_budgets_status ON budgets(status)');
          await pool.query('CREATE INDEX IF NOT EXISTS idx_budgets_email ON budgets(client_email)');
          await pool.query('CREATE INDEX IF NOT EXISTS idx_budgets_created_at ON budgets(created_at)');
          await pool.query('CREATE INDEX IF NOT EXISTS idx_budgets_token ON budgets(token)');

          await pool.query(
            'INSERT INTO schema_migrations (migration_name) VALUES ($1)',
            [migration]
          );

          console.log(`✅ Migración ${migration} completada`);
        } else if (migration === '004_create_clients_services_tables') {
          await pool.query(`
            CREATE TABLE IF NOT EXISTS clients (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              email TEXT NOT NULL,
              company TEXT,
              phone TEXT,
              tax_id TEXT,
              address TEXT,
              notes TEXT,
              created_at TEXT DEFAULT NOW(),
              updated_at TEXT
            )
          `);

          await pool.query('CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email)');
          await pool.query('CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at)');

          await pool.query(`
            CREATE TABLE IF NOT EXISTS services (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              description TEXT,
              category TEXT,
              base_price NUMERIC(12,2) NOT NULL DEFAULT 0,
              active BOOLEAN NOT NULL DEFAULT true,
              created_at TEXT DEFAULT NOW(),
              updated_at TEXT
            )
          `);

          await pool.query('CREATE INDEX IF NOT EXISTS idx_services_active ON services(active)');
          await pool.query('CREATE INDEX IF NOT EXISTS idx_services_category ON services(category)');
          await pool.query('CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at)');

          await pool.query(
            'INSERT INTO schema_migrations (migration_name) VALUES ($1)',
            [migration]
          );

          console.log(`✅ Migración ${migration} completada`);
        } else if (migration === '005_add_budget_template_fields') {
          await pool.query(`
            ALTER TABLE budgets
            ADD COLUMN IF NOT EXISTS template TEXT NOT NULL DEFAULT 'executive'
          `);

          await pool.query(`
            ALTER TABLE budgets
            ADD COLUMN IF NOT EXISTS brand_footer TEXT
          `);

          await pool.query('CREATE INDEX IF NOT EXISTS idx_budgets_template ON budgets(template)');

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
      ['004_create_clients_services_tables']
    );
    return result.rows.length > 0;
  } catch {
    return false;
  }
}