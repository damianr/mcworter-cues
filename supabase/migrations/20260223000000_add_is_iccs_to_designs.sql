ALTER TABLE designs ADD COLUMN IF NOT EXISTS is_iccs BOOLEAN DEFAULT FALSE;

UPDATE designs SET is_iccs = TRUE WHERE id IN ('map', 'feather');
