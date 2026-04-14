import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { PoolConfig } from 'pg';

// Configuración de la base de datos
const poolConfig: PoolConfig = {
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  database: process.env.PG_DATABASE || 'lumicatech',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

const pool = new Pool(poolConfig);

interface BookingJSON {
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  time: string;
  meetLink?: string;
  consentGiven: boolean;
  consentAt: string;
  reminderSent: boolean;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt?: string;
}

async function migrateBookings() {
  console.log('🔄 Iniciando migración de bookings.json a PostgreSQL...');

  try {
    // 1. Leer el archivo JSON
    const bookingsPath = path.join(process.cwd(), 'data', 'bookings.json');
    console.log(`📂 Leyendo ${bookingsPath}...`);

    if (!fs.existsSync(bookingsPath)) {
      console.log('⚠️  No existe bookings.json, no hay datos que migrar');
      return;
    }

    const rawData = fs.readFileSync(bookingsPath, 'utf-8');
    const jsonData = JSON.parse(rawData);
    const bookings: BookingJSON[] = jsonData.bookings || [];

    console.log(`📊 Found ${bookings.length} bookings to migrate`);

    if (bookings.length === 0) {
      console.log('✅ No hay bookings que migrar');
      return;
    }

    // 2. Conectar a PostgreSQL
    console.log('🔌 Conectando a PostgreSQL...');
    await pool.query('SELECT NOW()');
    console.log('✅ Conectado a PostgreSQL');

    // 3. Crear tabla si no existe
    console.log('📋 Creando tabla bookings...');
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
        created_at TEXT,
        updated_at TEXT
      )
    `);
    console.log('✅ Tabla bookings creada');

    // 4. Insertar datos
    console.log('📥 Insertando bookings...');
    let migrated = 0;
    let skipped = 0;

    for (const booking of bookings) {
      try {
        await pool.query(
          `INSERT INTO bookings (
            id, name, email, company, message, date, time,
            meet_link, consent_given, consent_at, reminder_sent,
            status, notes, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          ON CONFLICT (id) DO NOTHING`,
          [
            booking.id,
            booking.name,
            booking.email,
            booking.company || null,
            booking.message || null,
            booking.date,
            booking.time,
            booking.meetLink || null,
            booking.consentGiven,
            booking.consentAt,
            booking.reminderSent,
            booking.status,
            booking.notes,
            booking.createdAt,
            booking.updatedAt || null
          ]
        );
        migrated++;
      } catch (error) {
        console.log(`⚠️  Skipped booking ${booking.id}: ${error}`);
        skipped++;
      }
    }

    console.log(`\n📊 Migración completada:`);
    console.log(`   ✅ Migrados: ${migrated}`);
    console.log(`   ⏭️  Saltados: ${skipped}`);

    // 5. Verificar datos
    const result = await pool.query('SELECT COUNT(*) as total FROM bookings');
    console.log(`   📋 Total en PostgreSQL: ${result.rows[0].total}`);

    // 6. Hacer backup del JSON original
    const backupDir = path.join(process.cwd(), 'backups', 'data');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const backupFile = path.join(backupDir, `bookings_backup_${Date.now()}.json`);
    fs.copyFileSync(bookingsPath, backupFile);
    console.log(`💾 Backup guardado en: ${backupFile}`);

    console.log('\n🎉 Migración completada con éxito!');
    console.log('ℹ️  El archivo JSON original se mantiene como respaldo');

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Ejecutar migración
migrateBookings().catch(console.error);
