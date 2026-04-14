import { runMigrations } from './run-migrations';

let migrationsInitialized = false;

export async function initializeDatabase() {
  if (migrationsInitialized) {
    return;
  }

  // Solo ejecutar si no está deshabilitado
  if (process.env.SKIP_MIGRATIONS === 'true') {
    console.log('⏭️  Migraciones deshabilitadas (SKIP_MIGRATIONS=true)');
    migrationsInitialized = true;
    return;
  }

  try {
    console.log('🔄 Inicializando base de datos...');
    await runMigrations();
    migrationsInitialized = true;
    console.log('✅ Base de datos inicializada');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    // No fallar la app si las migraciones fallan
    migrationsInitialized = true;
  }
}
