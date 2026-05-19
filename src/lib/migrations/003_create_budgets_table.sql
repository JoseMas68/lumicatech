-- Crear tabla de presupuestos
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
);

CREATE INDEX IF NOT EXISTS idx_budgets_status ON budgets(status);
CREATE INDEX IF NOT EXISTS idx_budgets_email ON budgets(client_email);
CREATE INDEX IF NOT EXISTS idx_budgets_created_at ON budgets(created_at);
CREATE INDEX IF NOT EXISTS idx_budgets_token ON budgets(token);
