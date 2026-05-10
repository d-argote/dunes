-- Run this in Supabase Dashboard → SQL Editor
-- Creates a public bucket for product images

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read
CREATE POLICY "Public read product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

-- Allow service role to upload (used by our API route)
CREATE POLICY "Service role upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'products');

-- Allow service role to delete
CREATE POLICY "Service role delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'products');
