-- Add SEO columns to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_desc TEXT,
ADD COLUMN IF NOT EXISTS meta_keywords TEXT;
