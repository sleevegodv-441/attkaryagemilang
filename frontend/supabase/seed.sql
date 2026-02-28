-- ============================================
-- SEED DATA — All current dummy content
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================

-- Projects (6 from Portfolio page)
INSERT INTO projects (title, category, location, description, image_url, area, is_featured, sort_order) VALUES
('Rumah Minimalis Modern', 'bangun_baru', 'BSD City', 'Rumah minimalis modern 2 lantai', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgFtHJqD4tdc1d50h1GNqyA3Q0Nunv_HBipMOVW3EZMYrjG5N4RU_-kDKVnprQfJhbFbsx4plZclWu5zaFZItunMcSP0vmh3QOUlFvCdFPhFftL5Y-35NMaL46vysIhUpxetjGT98dPtsXuZSlwUjUKnJK7r3SW-581HuzUrIILyHpr7z2_gRqQxaMg5TPYxX-JpcoAOmYYbhWbWWsvEJ5T6kPDd-hmcj798xUdWcMAc-gN4LAkcHZ9zs0WXppSKXe5AvQIJrp93Bz', '180m²', true, 1),
('Interior Dapur Scandinavian', 'interior', 'Bintaro', 'Interior dapur scandinavian modern', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw3YgQnhFmcSySgfm6Z1gDv-seuIgvqQ98BRYd9XQtGkut5eguKg34lnd5xQKkkrJ5dy9s6mEpQeW1X1YPn3R3g5eWuQdRm8lKBJToBXFJfveKJxOYmuUsSwnrIMIbrBGO8M8dOHTcznCJX-4qT1741utOYvO275lhHbAWHegp5Gq7upp6_KOuUMxSI6DeOh__3daGnQjTKc8_Ca1Kw2CupiRhajkql703VG71EADOTtLwt12wDvT-st3ji67Byj1aLtp_AbLdhw3i', '45m²', false, 2),
('Kantor Startup Tech', 'commercial', 'Sudirman', 'Renovasi kantor startup tech modern', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyxA3Q0BZBzMSLqdHVha-QNEJAV7atv1atjWQ-fmuswjjyUdfudmd864GJMOoChx5fy_vOtE9Sz0tWk5baMPzuZY4IIcvYVoVYmlgnulMe7J8LY3biXZfS1ye9Z752GSBY_fVeYO8qy95h5kjKxPLOvPWiisjAlAdIII089MyIZz4zsXQ6k81gT7-qRnM9pFe4haEs3d3E0EwjuQSJ3qrLrOeA0MZwX8QdwgKo5_zeqQszVD81dnBSMqvulr13NAtUGIh_ZaZ894bl', '400m²', false, 3),
('Apartemen Penthouse Luxury', 'interior', 'Kemang', 'Interior apartemen penthouse mewah', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5YMIhqAcFBJe5R46T-SQFUkRDE0HX2_G6Bh6TMHDe6xLN02ktceoqD56bZmpRTJZCdiHwm8T_iRqdVKTOGJWltk1iAGnfo1CZGGC0FfwgDi2rTdI4lx1zgWnnUXrpgWkC4cG4FIHg9VZWGahJKBoob_KvjycEfPszMhFKMbI_TRJoJ-Y7zDyW6f7_MEaVR8wIAFbu4ZT6tUK1sinnKMY783ZFTns5mwxJHKEoPFwYIobwx5_Wk-R4AoDP1oQaV43Dt7AaLEEHn8XO', '120m²', true, 4),
('Kamar Utama Klasik', 'renovasi', 'Menteng', 'Renovasi kamar utama bergaya klasik', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxL37DuVBBRokBggU1adL2pLr9-lmiW19W3jwrf07JoV5K4qQC-ry62LS8_07_pUc0zN3PS0DussQGiUrnXs_3xAXO5dZL9eJDW5-P9OWOhYNTF7ycPp3etnw85huV7mJzceiEc0nYr2jpXaU-BNyg_ivs31GMq4asxzUKx-CSqzYX7JJ71JPsK5LkmQ1M1Z12r2R3eqksf7B0j8HSw-xVB9Ozi_lXitDqSH_-TtbWGAa0mwvAaGSUuu8rUD6uTyLtIW0aZW3GdSgp', '60m²', false, 5),
('Renovasi Coffee Shop', 'commercial', 'Depok', 'Renovasi coffee shop industrial modern', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2KI31WakFNKvjhP0hpqXxmveBid1zKWphB9jQ7uZvZ96kzQdaAkxOXtqY8D9cVwHE0mw1A5HsEASKl3MhuapecFlBu5Vjw5H-1h1Eux81X-garn8GAPdW8-fTVAGF1wawVcMiLLP0gpaLuT9QuxhA3MzxDtLRlzmuW21G0dBQYP4BGavt_4SYUVT7J5EItMoAS_fUu5eRpYet9Dc-VL8aaNW72vPjwfkG95YrnUJxfsSQsJNkaQ43aoHkZA5bMtI0xgjteb-dap6s', '90m²', false, 6);

-- Blog Posts (3 articles)
INSERT INTO blog_posts (slug, title, excerpt, content, category, image_url, is_featured, published_at) VALUES
('renovasi-atap', 'Panduan Lengkap Renovasi Atap Rumah: Waktu, Biaya, dan Tips Memilih Material Terbaik', 'Atap adalah mahkota rumah Anda. Renovasi atap yang tepat waktu mencegah kerusakan struktural. Pelajari jenis material, estimasi biaya, dan kapan waktu yang tepat untuk merenovasi.', 'Perawatan rumah merupakan investasi jangka panjang yang tidak boleh diabaikan. Dengan memperhatikan kondisi bangunan secara berkala, Anda bisa menghindari kerusakan besar yang memerlukan biaya perbaikan mahal.

## Mengapa Perawatan Berkala Penting?

Bangunan, seperti halnya kendaraan, memerlukan perawatan rutin agar tetap dalam kondisi optimal. Kelembaban, perubahan suhu, dan faktor lingkungan lainnya dapat menyebabkan kerusakan struktural jika tidak ditangani dengan cepat.

## Kapan Harus Memanggil Profesional?

Jika Anda menemukan retakan pada dinding yang lebih lebar dari 2mm, kebocoran berulang, atau pergeseran fondasi, segera hubungi kontraktor profesional.', 'Renovasi', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyDMB8BcnAZUgNaUJPjS96H2QMgDEC5bo-5bKHjuqILRZ0ymlaAtvZUanEvqnL1wgG-Ob5osSG5nPyS_-tNH1thZIdEB-wsSGlDyhFfy59Uzwo1SvEOe20iWY9NcQvk2xtUPf4lalt2QlGbInMCO29_Z60ztAT9CvJbdykFD0jaj5uNCWZUzKDGvacxCnhpzq2ilKcpeK_J3QwiwMnKui_hvjBSK6YzS_WPtT7xcj2bcja_ZAx2cPWdx0vOw5HNX1GGRGpb2apTJNp', true, '2024-11-15'),
('bata-merah-vs-hebel', 'Bata Merah vs Hebel: Perbandingan Mendalam untuk Dinding Rumah Modern Anda', 'Pemilihan material dinding mempengaruhi kekuatan, biaya, dan efisiensi energi rumah. Kami bandingkan bata merah dan hebel dari berbagai aspek.', 'Pemilihan material dinding adalah keputusan penting dalam pembangunan rumah. Dua pilihan populer di Indonesia adalah bata merah tradisional dan bata ringan (hebel). Masing-masing memiliki kelebihan dan kekurangan.

## Bata Merah
Bata merah terbuat dari tanah liat yang dibakar. Kelebihannya: tahan panas, kuat, dan harga relatif murah. Kekurangannya: berat, pemasangan lebih lama.

## Hebel (Bata Ringan)
Hebel terbuat dari campuran semen, pasir kuarsa, dan bahan pengembang. Kelebihannya: ringan, presisi ukuran, pemasangan cepat, isolasi termal baik.', 'Material', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2N8fT688gXzgVQnbX0r8yUUaqehmr3C-77Oegz50a8x-LP7mpStKg9kJdgbcra16nlnGTAgzyJdlNPD8MugiIMGXX93r1zDGpCDJl6MP5YdJY9nxGNDmFn5vUDTJZpjS2-dARiXiN2wmT9G4YfEuGd9OgONhAd_-CDW3fif0l8h5JBgPZam4PnBc21F1whktCvElsA1xa1c--0DHBH5E4pM13-KDbeK2cxIHgTFgxbW-iYaBoEz9pff4u2GKxF6DOIz3PTE6yE8-p', false, '2024-10-24'),
('denah-arsitektur', 'Memahami Denah Arsitektur: Cara Membaca dan Merencanakan Tata Ruang yang Optimal', 'Denah arsitektur bukan hanya gambar teknis. Pelajari cara membaca denah dan merencanakan tata ruang yang fungsional untuk keluarga Anda.', 'Denah arsitektur adalah fondasi dari setiap proyek pembangunan rumah. Memahami denah dengan benar akan membantu Anda berkomunikasi lebih efektif dengan arsitek dan kontraktor.

## Elemen Penting dalam Denah
Sebuah denah yang baik mencakup dimensi ruangan, posisi pintu dan jendela, arah mata angin, dan keterangan material yang digunakan.

## Tips Perencanaan Tata Ruang
Pertimbangkan alur sirkulasi keluarga, pencahayaan alami, dan privasi antar ruangan.', 'Tips', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzMll59J_HnOvctGx9XAkB94Vo2sYgNvUvSj0_lfD3GyMOlLZquPUfCD-jR1c8jiQ0ysYL99wuo3E-F6dJQhovGkX76djO0pX_5nu5LOqjRI1xS2HQWpvET6yeMPbkB4N_hE7M-NVx4HX3LMYFGwsjd5JCuJozRUXFJZec29i79RdRjaBIw8jxbkKa5J_XYfVUS_H_i7CLQCA9g9--dinuAMwcM9KI6TuyzET-_Wi69mvPOozYALnFlTSG9qTgJAURrEbEbthjaMBt', false, '2024-10-20');

-- Services (4)
INSERT INTO services (title, description, price_label, features, icon, is_popular, sort_order) VALUES
('Desain Arsitektur', 'Perencanaan detail layout rumah impian Anda', 'Rp 150rb / m²', ARRAY['Visualisasi 3D & Rendering', 'Perencanaan Detail Layout', 'Panduan Pemilihan Material', 'Gambar Kerja Teknik'], 'architecture', false, 1),
('Bangun Baru', 'Konstruksi rumah dari nol dengan material berkualitas', 'Rp 3,5 Juta / m²', ARRAY['Layanan Konstruksi Penuh', 'Manajemen Proyek End-to-End', 'Pemeriksaan Jaminan Mutu', 'Bantuan Perizinan'], 'home', true, 2),
('Renovasi Bangunan', 'Peremajaan bangunan lama menjadi hunian modern', 'Rp 2,5 Juta / m²', ARRAY['Analisis & Perbaikan Struktur', 'Modernisasi Ruang', 'Pembaruan Finishing', 'Pembaruan Kelistrikan & Pipa'], 'build', false, 3),
('Desain Interior', 'Sentuhan akhir estetik untuk setiap sudut ruangan', 'Rp 2 Juta / m²', ARRAY['Optimalisasi Perencanaan Ruang', 'Desain Custom Furniture', 'Dekorasi & Penataan', 'Konsep Pencahayaan'], 'palette', false, 4);

-- Testimonials (3)
INSERT INTO testimonials (name, role, quote, rating, is_active, sort_order) VALUES
('Bapak Handoko', 'Pemilik Rumah, BSD', 'Tim ATT sangat profesional. Hasil renovasi rumah kami melebihi ekspektasi. Harga transparan dan tepat waktu!', 5, true, 1),
('Ibu Ratna', 'Pemilik Apartemen, Kemang', 'Desain interior apartemen saya sangat cantik. Tim sangat detail dan responsif terhadap setiap permintaan perubahan.', 5, true, 2),
('Bapak Adi', 'Owner Cafe, Depok', 'Renovasi cafe saya berjalan lancar dari awal sampai akhir. Budget terkontrol dan kualitas pengerjaan premium.', 5, true, 3);

-- FAQ Items (5)
INSERT INTO faq_items (question, answer, sort_order, is_active) VALUES
('Berapa lama proses pembangunan rumah dari awal hingga selesai?', 'Waktu pengerjaan bervariasi tergantung luas bangunan dan kompleksitas desain. Untuk rumah 2 lantai tipe 100-150m², biasanya membutuhkan waktu 4-6 bulan. Timeline detail akan kami jelaskan saat konsultasi awal.', 1, true),
('Apakah bisa renovasi sebagian tanpa harus merenovasi seluruh rumah?', 'Tentu bisa! Kami menerima renovasi parsial seperti dapur, kamar mandi, fasad, atau penambahan ruangan. Tim kami akan survey dan memberikan solusi terbaik sesuai kebutuhan dan budget Anda.', 2, true),
('Bagaimana sistem pembayaran yang berlaku?', 'Pembayaran dilakukan bertahap sesuai progress pekerjaan: 30% di awal (DP), 30% saat progress 50%, 30% saat progress 90%, dan 10% saat serah terima. Semua tercantum jelas di kontrak kerja.', 3, true),
('Apakah ada garansi setelah proyek selesai?', 'Ya, kami memberikan garansi pemeliharaan selama 3 bulan setelah serah terima kunci. Selama masa garansi, kami akan memperbaiki kerusakan yang terjadi akibat kesalahan pengerjaan tanpa biaya tambahan.', 4, true),
('Apakah termasuk pengurusan IMB/PBG?', 'Ya, untuk proyek bangun baru kami menyediakan layanan bantuan pengurusan Persetujuan Bangunan Gedung (PBG) sebagai bagian dari paket layanan. Biaya pengurusan akan diinformasikan di RAB.', 5, true);
