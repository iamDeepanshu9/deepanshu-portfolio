-- Add new columns to the blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS category text DEFAULT 'Design',
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS featured_image text,
ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS scheduled_date timestamptz;

-- Update existing rows to have default values if needed
UPDATE blogs SET category = 'Design' WHERE category IS NULL;
UPDATE blogs SET tags = '{}' WHERE tags IS NULL;
UPDATE blogs SET is_published = true WHERE is_published IS NULL;
