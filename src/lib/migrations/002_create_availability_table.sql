-- Drop old availability_config table if exists with old structure
DROP TABLE IF EXISTS availability_config CASCADE;

-- Create new availability_config table with correct structure
CREATE TABLE availability_config (
  id SERIAL PRIMARY KEY,
  meeting_duration INTEGER NOT NULL DEFAULT 60,
  slots JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar configuración por defecto
INSERT INTO availability_config (meeting_duration, slots)
VALUES (60, '{}');

-- Índice para consultas rápidas
CREATE INDEX idx_availability_config_updated ON availability_config(updated_at);

-- Comentarios
COMMENT ON TABLE availability_config IS 'Configuración de disponibilidad para reservas';
COMMENT ON COLUMN availability_config.meeting_duration IS 'Duración de cada reunión en minutos';
COMMENT ON COLUMN availability_config.slots IS 'Slots disponibles por fecha en formato JSONB';