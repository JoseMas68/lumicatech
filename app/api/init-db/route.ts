import { NextResponse } from 'next/server';
import { runMigrations } from '@/src/lib/migrations/run-migrations';

/**
 * Endpoint para inicializar la base de datos
 * Se puede llamar manualmente: GET /api/init-db
 */
export async function GET() {
  try {
    // Verificar si debemos saltar migraciones
    if (process.env.SKIP_MIGRATIONS === 'true') {
      return NextResponse.json({
        success: true,
        message: 'Migraciones deshabilitadas (SKIP_MIGRATIONS=true)'
      });
    }

    await runMigrations();

    return NextResponse.json({
      success: true,
      message: 'Base de datos inicializada correctamente'
    });
  } catch (error) {
    console.error('Error inicializando base de datos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error inicializando base de datos',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
