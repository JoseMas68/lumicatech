'use client';

import { useEffect } from 'react';

export default function DatabaseInitializer() {
  useEffect(() => {
    // Ejecutar migraciones automáticamente al cargar la app
    if (typeof window !== 'undefined' && process.env.SKIP_MIGRATIONS !== 'true') {
      fetch('/api/init-db')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log('✅ Base de datos inicializada:', data.message);
          } else {
            console.warn('⚠️  Advertencia de inicialización:', data.message);
          }
        })
        .catch(err => {
          console.error('❌ Error en inicialización automática:', err);
        });
    }
  }, []);

  return null; // Este componente no renderiza nada
}
