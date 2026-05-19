ALTER TABLE budgets
  ADD COLUMN IF NOT EXISTS template TEXT NOT NULL DEFAULT 'executive';

ALTER TABLE budgets
  ADD COLUMN IF NOT EXISTS brand_footer TEXT;

CREATE INDEX IF NOT EXISTS idx_budgets_template ON budgets(template);
