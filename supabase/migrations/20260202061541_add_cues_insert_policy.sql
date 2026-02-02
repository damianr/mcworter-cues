-- Allow authenticated users to insert cues
CREATE POLICY "Authenticated users can insert cues" ON cues
  FOR INSERT TO authenticated
  WITH CHECK (true);
