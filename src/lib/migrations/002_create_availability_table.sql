-- Tabla de configuración de disponibilidad
CREATE TABLE IF NOT EXISTS availability_config (
  id SERIAL PRIMARY KEY,
  meeting_duration INTEGER NOT NULL DEFAULT 60,
  slots JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar configuración por defecto si no existe
INSERT INTO availability_config (meeting_duration, slots)
VALUES (60, '{}')
ON CONFLICT DO NOTHING;

-- Índice para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_availability_config_updated ON availability_config(updated_at);

-- Comentario
COMMENT ON TABLE availability_config IS 'Configuración de disponibilidad para reservas';
COMMENT ON COLUMN availability_config.meeting_duration IS 'Duración de cada reunión en minutos';
COMMENT ON COLUMN availability_config.slots IS 'Slots disponibles por fecha en formato JSONB';