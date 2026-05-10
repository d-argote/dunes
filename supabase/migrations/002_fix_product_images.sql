-- Run this in Supabase Dashboard → SQL Editor
-- Maps existing products to their local images in /public

UPDATE products
SET image_url = '/shampoo.jpg'
WHERE name ILIKE '%shampoo%'
  AND (image_url IS NULL OR image_url = '');

UPDATE products
SET image_url = '/tonico.jpg'
WHERE (name ILIKE '%tónico%' OR name ILIKE '%tonico%')
  AND (image_url IS NULL OR image_url = '');

-- If you have other products without image_url, set them here:
-- UPDATE products SET image_url = '/your-image.jpg' WHERE name ILIKE '%nombre%';
