-- Add English translation column to page_content table
ALTER TABLE page_content ADD COLUMN IF NOT EXISTS value_en TEXT DEFAULT '';
