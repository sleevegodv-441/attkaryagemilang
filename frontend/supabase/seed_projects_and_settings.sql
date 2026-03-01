-- PT. ATT KARYA GEMILANG
-- SQL Script for seeding 39 projects and updating company settings
-- Run this script in the Supabase SQL Editor

-- ==========================================
-- 1. UPDATE COMPANY PROFILE SETTINGS
-- ==========================================
INSERT INTO site_settings (key, value, type)
VALUES 
    ('company_name', 'PT. ATT Karya Gemilang', 'text'),
    ('phone', '+62 877 7222 9006 / +62 856 5405 5137', 'text'),
    ('whatsapp', '6287772229006', 'text'),
    ('email', 'attkaryagemilang@gmail.com / att.studio22@gmail.com', 'text'),
    ('address', 'Jln. Marzuki VII RT. 011/014 Penggilingan Cakung - Jakarta Timur', 'text'),
    ('instagram', 'https://instagram.com/att_karya_gemilang', 'url')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- ==========================================
-- 2. INSERT 39 REAL PROJECTS
-- ==========================================
-- This will insert the 39 projects. Images are left empty so that they can be uploaded via the Admin CMS.
INSERT INTO projects (title, category, location, image_url, is_featured, created_at)
VALUES
    ('VILLA RESORT - HERRY SUGIANTO', 'desain', 'Sentul City, Bogor - Indonesia', '', true, now()),
    ('ANDRI LAZUARDI HOUSE', 'desain', 'Rorotan, Jakarta Utara - Indonesia', '', true, now()),
    ('INTERIOR SHOW UNIT IMPERIAL GADING', 'desain,interior', 'Sukapura, Jakarta Utara - Indonesia', '', true, now()),
    ('PONDOK GADING RESIDENCE', 'desain', 'Kelapa Gading, Jakarta Utara - Indonesia', '', true, now()),
    ('INTERIOR SHOW UNIT PONDOK GADING RESIDENCE', 'desain', 'Kelapa Gading, Jakarta Utara - Indonesia', '', false, now()),
    ('ANGGA HOUSE', 'desain', 'Sunter, Jakarta Utara - Indonesia', '', false, now()),
    ('WIRZA EKA HOUSE', 'desain', 'Grand Galaxy, Bekasi - Indonesia', '', false, now()),
    ('DENNY ADITYA HOUSE', 'desain,renovasi', 'Sukapura, Jakarta Utara - Indonesia', '', false, now()),
    ('RETNA INDAH HOUSE', 'desain,renovasi', 'Babelan, Bekasi - Indonesia', '', false, now()),
    ('RICHI OKTAVIANO HOUSE', 'desain', 'Tangerang, Banten - Indonesia', '', false, now()),
    ('GALLERY KOPI', 'desain,interior', 'Grand Galaxy, Bekasi - Indonesia', '', false, now()),
    ('NEWS TARIGAN HOUSE', 'desain,interior', 'Sukapura, Jakarta Utara - Indonesia', '', false, now()),
    ('CHRISTYE HOUSE', 'desain,interior', 'Kelapa Gading, Jakarta Utara - Indonesia', '', false, now()),
    ('PRAYUDI HOUSE', 'desain,renovasi', 'Jaticempaka, Bekasi - Indonesia', '', false, now()),
    ('JAJANG HOUSE', 'desain,renovasi', 'Cawang, Jakarta Timur - Indonesia', '', false, now()),
    ('NOOR HOUSE', 'desain,renovasi', 'Pondok Rangon, Jakarta Timur - Indonesia', '', false, now()),
    ('RIKA AYUNI HOUSE', 'desain,renovasi', 'Jatiasih, Bekasi - Indonesia', '', false, now()),
    ('RISKI HOUSE', 'desain,renovasi', 'Bambu Apus, Jakarta Timur - Indonesia', '', false, now()),
    ('MARVAN HOUSE', 'desain,renovasi', 'Cibubur, Jakarta Timur - Indonesia', '', false, now()),
    ('FEBBY HOUSE', 'desain', 'Rawa Lumbu, Bekasi - Indonesia', '', false, now()),
    ('RUDDY HOUSE', 'desain', 'Harapan Indah, Bekasi - Indonesia', '', false, now()),
    ('MEYSKE HOUSE', 'desain', 'Segara City, Bekasi - Indonesia', '', false, now()),
    ('ANGGI HOUSE', 'desain', 'Pesona Loreno, Bekasi - Indonesia', '', false, now()),
    ('AKBAR HOUSE', 'desain', 'Babelan, Bekasi - Indonesia', '', false, now()),
    ('NOVRI HOUSE', 'desain', 'Wisma Asri, Bekasi - Indonesia', '', false, now()),
    ('KLINIK RATNA KOMALA', 'desain', 'Rawa Lumbu, Bekasi - Indonesia', '', false, now()),
    ('OKTO NAIBORHU HOUSE', 'desain,renovasi', 'Babelan, Bekasi - Indonesia', '', false, now()),
    ('NANANG HOUSE', 'desain,renovasi', 'Sukmajaya, Depok - Indonesia', '', false, now()),
    ('IGLEY HUTABARAT HOUSE', 'desain,renovasi', 'Bekasi Jaya, Bekasi - Indonesia', '', false, now()),
    ('BAYU HOUSE', 'desain', 'Pekayon, Bekasi - Indonesia', '', false, now()),
    ('RIANDY HOUSE', 'desain', 'Metland Menteng, Jakarta Timur - Indonesia', '', false, now()),
    ('DARMAWAN HOUSE', 'desain', 'Condet, Jakarta Timur - Indonesia', '', false, now()),
    ('CHANDRA HOUSE', 'desain', 'Kayu Ringin, Bekasi - Indonesia', '', false, now()),
    ('YAYAT HOUSE', 'desain,renovasi', 'Cibitung, Bekasi - Indonesia', '', false, now()),
    ('AFRYANTO HOUSE', 'desain,renovasi', 'Cipinang, Jakarta Timur - Indonesia', '', false, now()),
    ('WULAN HOUSE', 'desain', 'Semper, Jakarta Utara - Indonesia', '', false, now()),
    ('HILMANSYAH HOUSE', 'desain', 'Harapan Indah, Bekasi - Indonesia', '', false, now()),
    ('CHRISTIAN SINTONG HOUSE', 'desain,renovasi', 'Jatinegara Indah, Jakarta Timur - Indonesia', '', false, now()),
    ('IRWAN SIMARMATA HOUSE', 'desain,renovasi', 'Lamanda Estate, Bekasi - Indonesia', '', false, now());
