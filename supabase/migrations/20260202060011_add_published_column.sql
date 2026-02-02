-- Add published column to cues table
-- Default to true for existing cues, new cues from admin will be false
ALTER TABLE cues ADD COLUMN published BOOLEAN NOT NULL DEFAULT true;

-- Update RLS policy to only show published cues to anonymous users
-- Authenticated users can see all cues
DROP POLICY IF EXISTS "Allow public read access to cues" ON cues;

CREATE POLICY "Public can read published cues" ON cues
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can read all cues" ON cues
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to update cues (for publishing)
CREATE POLICY "Authenticated users can update cues" ON cues
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
