-- Crear tabla de bookings
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
);

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Crear tabla de availability_config
CREATE TABLE IF NOT EXISTS availability_config (
  id SERIAL PRIMARY KEY,
  config JSONB NOT NULL DEFAULT '{}',
  created_at TEXT DEFAULT NOW(),
  updated_at TEXT DEFAULT NOW()
);

-- Insertar configuración inicial si no existe
INSERT INTO availability_config (config)
VALUES (DEFAULT)
ON CONFLICT DO NOTHING;

-- Crear función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_availability_config_updated_at
    BEFORE UPDATE ON availability_config
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
