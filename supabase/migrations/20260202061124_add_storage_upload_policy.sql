-- Add storage policies for cue-images bucket
-- Allow authenticated users to upload/insert images
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cue-images');

-- Allow authenticated users to update images (for upsert)
CREATE POLICY "Authenticated users can update images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'cue-images')
  WITH CHECK (bucket_id = 'cue-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'cue-images');
