-- Add image_key and image_url to properties
ALTER TABLE properties ADD COLUMN IF NOT EXISTS image_key text;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS image_url text;

-- Add image_key and image_url to blog_posts
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_key text;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_url text;
