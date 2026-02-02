-- Drop ALL existing SELECT policies on cues to start fresh
DROP POLICY IF EXISTS "Public read access for cues" ON cues;
DROP POLICY IF EXISTS "Allow public read access to cues" ON cues;
DROP POLICY IF EXISTS "Public can read published cues" ON cues;
DROP POLICY IF EXISTS "Authenticated users can read all cues" ON cues;

-- Create correct policies:
-- Anonymous users can ONLY see published cues
CREATE POLICY "Anon can read published cues" ON cues
  FOR SELECT TO anon
  USING (published = true);

-- Authenticated users can see ALL cues (including unpublished for preview)
CREATE POLICY "Authenticated can read all cues" ON cues
  FOR SELECT TO authenticated
  USING (true);
