-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Create storage policies using auth.role() check
-- This is more reliable for Supabase storage

-- Allow authenticated users to upload to cue-images bucket
CREATE POLICY "Allow authenticated uploads to cue-images" ON storage.objects
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'cue-images' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to update in cue-images bucket
CREATE POLICY "Allow authenticated updates to cue-images" ON storage.objects
  FOR UPDATE 
  USING (
    bucket_id = 'cue-images' 
    AND auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'cue-images' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete from cue-images bucket
CREATE POLICY "Allow authenticated deletes from cue-images" ON storage.objects
  FOR DELETE 
  USING (
    bucket_id = 'cue-images' 
    AND auth.role() = 'authenticated'
  );

-- Ensure public read access for all images in cue-images bucket
CREATE POLICY "Allow public read from cue-images" ON storage.objects
  FOR SELECT 
  USING (bucket_id = 'cue-images');
