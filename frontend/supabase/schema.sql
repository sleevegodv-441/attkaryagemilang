-- ============================================
-- ATT Karya Gemilang CMS — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Projects
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'renovasi',
    location TEXT DEFAULT '',
    description TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    client_name TEXT DEFAULT '',
    duration TEXT DEFAULT '',
    area TEXT DEFAULT '',
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    excerpt TEXT DEFAULT '',
    content TEXT DEFAULT '',
    category TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Services
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL DEFAULT '',
    description TEXT DEFAULT '',
    price_label TEXT DEFAULT '',
    features TEXT[] DEFAULT '{}',
    icon TEXT DEFAULT 'construction',
    is_popular BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0
);

-- 4. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT '',
    role TEXT DEFAULT '',
    quote TEXT DEFAULT '',
    rating INTEGER DEFAULT 5,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0
);

-- 5. FAQ Items
CREATE TABLE IF NOT EXISTS faq_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL DEFAULT '',
    answer TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- 6. Page Content (key-value for text per page/section)
CREATE TABLE IF NOT EXISTS page_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(page, section, key)
);

-- 7. Site Settings (global config)
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT DEFAULT '',
    type TEXT DEFAULT 'text'
);

-- ============================================
-- Row Level Security (RLS)
-- Public = read only, Admin = full access
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read faq_items" ON faq_items FOR SELECT USING (true);
CREATE POLICY "Public read page_content" ON page_content FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);

-- Admin write policies (authenticated users)
CREATE POLICY "Admin insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete projects" ON projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert blog_posts" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update blog_posts" ON blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete blog_posts" ON blog_posts FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert services" ON services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update services" ON services FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete services" ON services FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update testimonials" ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert faq_items" ON faq_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update faq_items" ON faq_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete faq_items" ON faq_items FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert page_content" ON page_content FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update page_content" ON page_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete page_content" ON page_content FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert site_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update site_settings" ON site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete site_settings" ON site_settings FOR DELETE TO authenticated USING (true);

-- ============================================
-- Storage Bucket for images
-- ============================================
-- Run this separately or via Supabase Dashboard:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- ============================================
-- Seed Data: Site Settings
-- ============================================
INSERT INTO site_settings (key, value, type) VALUES
    ('company_name', 'PT. ATT Karya Gemilang', 'text'),
    ('phone', '+62 877 7222 9006', 'text'),
    ('whatsapp', '6287772229006', 'text'),
    ('email', 'info@attkaryagemilang.com', 'text'),
    ('address', 'Jl. Raya Konstruksi No. 123, Jakarta Selatan', 'text'),
    ('instagram', 'https://instagram.com/attkaryagemilang', 'url'),
    ('facebook', '', 'url'),
    ('working_hours_weekday', 'Senin - Jumat: 08:00 - 17:00', 'text'),
    ('working_hours_weekend', 'Sabtu: 09:00 - 14:00', 'text'),
    ('hero_image', '', 'image'),
    ('about_image', '', 'image')
ON CONFLICT (key) DO NOTHING;
