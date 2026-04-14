import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Endpoint de emergencia para resetear contraseña de admin
 * Solo disponible en desarrollo o con una clave especial
 *
 * USO: POST /api/admin/reset-password
 * Body: { "newPassword": "tu_nueva_contraseña", "confirmKey": " emergency-reset-2024" }
 *
 * ADVERTENCIA: Este endpoint debe eliminarse o protegerse adicionalmente en producción
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { newPassword, confirmKey } = body;

    // Verificar clave de confirmación (seguridad básica)
    if (confirmKey !== 'emergency-reset-2024') {
      return NextResponse.json(
        { error: 'Clave de confirmación incorrecta' },
        { status: 403 }
      );
    }

    // Validar nueva contraseña
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    // En desarrollo, permitir el reset
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚠️  Modo desarrollo: Contraseña de admin reseteada');
      console.log('Nueva contraseña:', newPassword);

      return NextResponse.json({
        success: true,
        message: 'Contraseña actualizada en desarrollo (modo DEBUG)',
        newPassword: newPassword // Solo en desarrollo
      });
    }

    // En producción, no mostrar la contraseña
    return NextResponse.json({
      success: true,
      message: 'Para actualizar en producción, usa las variables de entorno de Dokploy'
    });

  } catch (error) {
    console.error('[RESET-PASSWORD] Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar solicitud' },
      { status: 500 }
    );
  }
}
