import { NextResponse } from 'next/server';
import pool from '@/src/lib/db';

/**
 * Endpoint de emergencia para arreglar la tabla availability_config
 * Elimina la tabla antigua y la recrea con la estructura correcta
 *
 * USO: GET /api/admin/fix-availability
 *
 * ADVERTENCIA: Esto eliminará cualquier configuración existente
 */
export async function GET() {
  try {
    console.log('🔧 Arreglando tabla availability_config...');

    // Eliminar la tabla antigua
    await pool.query('DROP TABLE IF EXISTS availability_config CASCADE');
    console.log('✅ Tabla antigua eliminada');

    // Crear la tabla nueva con estructura correcta
    await pool.query(`
      CREATE TABLE availability_config (
        id SERIAL PRIMARY KEY,
        meeting_duration INTEGER NOT NULL DEFAULT 60,
        slots JSONB NOT NULL DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla nueva creada');

    // Insertar configuración por defecto
    await pool.query(`
      INSERT INTO availability_config (meeting_duration, slots)
      VALUES (60, '{}')
    `);
    console.log('✅ Configuración por defecto insertada');

    // Crear índice
    await pool.query('CREATE INDEX idx_availability_config_updated ON availability_config(updated_at)');
    console.log('✅ Índice creado');

    // Actualizar migración
    await pool.query(`
      INSERT INTO schema_migrations (migration_name, executed_at)
      VALUES ('002_create_availability_table', NOW())
      ON CONFLICT (migration_name) DO UPDATE SET executed_at = NOW()
    `);
    console.log('✅ Migración actualizada');

    return NextResponse.json({
      success: true,
      message: 'Tabla availability_config arreglada correctamente'
    });

  } catch (error) {
    console.error('❌ Error arreglando tabla:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error arreglando tabla availability_config',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}