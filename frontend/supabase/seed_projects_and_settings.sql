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
    ('VILLA RESORT - HERRY SUGIANTO', 'Project Design', 'Sentul City, Bogor - Indonesia', '', true, now()),
    ('ANDRI LAZUARDI HOUSE', 'Project Design', 'Rorotan, Jakarta Utara - Indonesia', '', true, now()),
    ('INTERIOR SHOW UNIT IMPERIAL GADING', 'Project Design & Build Interior', 'Sukapura, Jakarta Utara - Indonesia', '', true, now()),
    ('PONDOK GADING RESIDENCE', 'Project Design', 'Kelapa Gading, Jakarta Utara - Indonesia', '', true, now()),
    ('INTERIOR SHOW UNIT PONDOK GADING RESIDENCE', 'Project Design', 'Kelapa Gading, Jakarta Utara - Indonesia', '', false, now()),
    ('ANGGA HOUSE', 'Project Design', 'Sunter, Jakarta Utara - Indonesia', '', false, now()),
    ('WIRZA EKA HOUSE', 'Project Design', 'Grand Galaxy, Bekasi - Indonesia', '', false, now()),
    ('DENNY ADITYA HOUSE', 'Project Design & Build Renovation', 'Sukapura, Jakarta Utara - Indonesia', '', false, now()),
    ('RETNA INDAH HOUSE', 'Project Design & Build Renovation', 'Babelan, Bekasi - Indonesia', '', false, now()),
    ('RICHI OKTAVIANO HOUSE', 'Project Design', 'Tangerang, Banten - Indonesia', '', false, now()),
    ('GALLERY KOPI', 'Project Design & Build Interior', 'Grand Galaxy, Bekasi - Indonesia', '', false, now()),
    ('NEWS TARIGAN HOUSE', 'Project Design Interior', 'Sukapura, Jakarta Utara - Indonesia', '', false, now()),
    ('CHRISTYE HOUSE', 'Project Design Interior', 'Kelapa Gading, Jakarta Utara - Indonesia', '', false, now()),
    ('PRAYUDI HOUSE', 'Project Design & Build Renovation', 'Jaticempaka, Bekasi - Indonesia', '', false, now()),
    ('JAJANG HOUSE', 'Project Design & Build Renovation', 'Cawang, Jakarta Timur - Indonesia', '', false, now()),
    ('NOOR HOUSE', 'Project Design & Build Renovation', 'Pondok Rangon, Jakarta Timur - Indonesia', '', false, now()),
    ('RIKA AYUNI HOUSE', 'Project Design & Build Renovation', 'Jatiasih, Bekasi - Indonesia', '', false, now()),
    ('RISKI HOUSE', 'Project Design & Build Renovation', 'Bambu Apus, Jakarta Timur - Indonesia', '', false, now()),
    ('MARVAN HOUSE', 'Project Design & Build Renovation', 'Cibubur, Jakarta Timur - Indonesia', '', false, now()),
    ('FEBBY HOUSE', 'Project Design', 'Rawa Lumbu, Bekasi - Indonesia', '', false, now()),
    ('RUDDY HOUSE', 'Project Design', 'Harapan Indah, Bekasi - Indonesia', '', false, now()),
    ('MEYSKE HOUSE', 'Project Design', 'Segara City, Bekasi - Indonesia', '', false, now()),
    ('ANGGI HOUSE', 'Project Design', 'Pesona Loreno, Bekasi - Indonesia', '', false, now()),
    ('AKBAR HOUSE', 'Project Design', 'Babelan, Bekasi - Indonesia', '', false, now()),
    ('NOVRI HOUSE', 'Project Design', 'Wisma Asri, Bekasi - Indonesia', '', false, now()),
    ('KLINIK RATNA KOMALA', 'Project Design', 'Rawa Lumbu, Bekasi - Indonesia', '', false, now()),
    ('OKTO NAIBORHU HOUSE', 'Project Design & Build Renovation', 'Babelan, Bekasi - Indonesia', '', false, now()),
    ('NANANG HOUSE', 'Project Design & Build Renovation', 'Sukmajaya, Depok - Indonesia', '', false, now()),
    ('IGLEY HUTABARAT HOUSE', 'Project Design & Build Renovation', 'Bekasi Jaya, Bekasi - Indonesia', '', false, now()),
    ('BAYU HOUSE', 'Project Design', 'Pekayon, Bekasi - Indonesia', '', false, now()),
    ('RIANDY HOUSE', 'Project Design', 'Metland Menteng, Jakarta Timur - Indonesia', '', false, now()),
    ('DARMAWAN HOUSE', 'Project Design', 'Condet, Jakarta Timur - Indonesia', '', false, now()),
    ('CHANDRA HOUSE', 'Project Design', 'Kayu Ringin, Bekasi - Indonesia', '', false, now()),
    ('YAYAT HOUSE', 'Project Design & Build Renovation', 'Cibitung, Bekasi - Indonesia', '', false, now()),
    ('AFRYANTO HOUSE', 'Project Design & Build Renovation', 'Cipinang, Jakarta Timur - Indonesia', '', false, now()),
    ('WULAN HOUSE', 'Project Design', 'Semper, Jakarta Utara - Indonesia', '', false, now()),
    ('HILMANSYAH HOUSE', 'Project Design', 'Harapan Indah, Bekasi - Indonesia', '', false, now()),
    ('CHRISTIAN SINTONG HOUSE', 'Project Design & Build Renovation', 'Jatinegara Indah, Jakarta Timur - Indonesia', '', false, now()),
    ('IRWAN SIMARMATA HOUSE', 'Project Design & Build Renovation', 'Lamanda Estate, Bekasi - Indonesia', '', false, now());
