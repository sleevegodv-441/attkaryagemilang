import { useEffect, useState } from 'react';
import { supabase, type PageContent } from '../../lib/supabaseClient';
import { translateToEnglish } from '../../lib/translate';

type FieldType = 'text' | 'textarea' | 'image';
interface Field { key: string; label: string; type: FieldType; placeholder: string }
interface Section { id: string; label: string; description: string; previewHint: string; fields: Field[] }
interface PageConfig { label: string; icon: string; previewUrl: string; sections: Section[] }

const PAGE_MAP: Record<string, PageConfig> = {
    home: {
        label: 'Home', icon: 'home', previewUrl: '/',
        sections: [
            {
                id: 'seo', label: '🔍 SEO Metadata', description: 'Pengaturan SEO untuk Home', previewHint: 'Tidak terlihat di web', fields: [
                    { key: 'meta_title', label: 'Meta Title', type: 'text', placeholder: 'PT. ATT Karya Gemilang - Kontraktor...' },
                    { key: 'meta_desc', label: 'Meta Description', type: 'textarea', placeholder: 'Layanan jasa kontraktor bangun baru dan...' },
                    { key: 'meta_keywords', label: 'Meta Keywords', type: 'textarea', placeholder: 'kontraktor jakarta, bangun rumah, renovasi...' },
                ]
            },
            {
                id: 'hero', label: '🏠 Hero Banner', description: 'Judul besar, USP, dan tombol CTA', previewHint: 'Full-width banner pertama', fields: [
                    { key: 'bg_image', label: 'Background Image', type: 'image', placeholder: 'URL gambar background hero' },
                    { key: 'badge', label: 'Badge Text', type: 'text', placeholder: 'Premium Construction' },
                    { key: 'title1', label: 'Judul Baris 1', type: 'text', placeholder: 'Membangun & Merenovasi' },
                    { key: 'title2', label: 'Judul Baris 2 (italic)', type: 'text', placeholder: 'Rumah Impian' },
                    { key: 'exp', label: 'USP 1', type: 'text', placeholder: '10+ Tahun Pengalaman' },
                    { key: 'warranty', label: 'USP 2', type: 'text', placeholder: 'Garansi 3 Bulan' },
                    { key: 'transparent', label: 'USP 3', type: 'text', placeholder: 'Transparan' },
                    { key: 'cta1', label: 'Tombol CTA Utama', type: 'text', placeholder: 'Konsultasi Sekarang' },
                    { key: 'cta2', label: 'Tombol CTA Sekunder', type: 'text', placeholder: 'Lihat Layanan' },
                ]
            },
            {
                id: 'services', label: '🔧 Preview Layanan (3 Kartu)', description: 'Bangun Baru, Renovasi, Interior', previewHint: 'Section 3 kartu layanan', fields: [
                    { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Layanan Kami' },
                    { key: 'title1', label: 'Judul Baris 1', type: 'text', placeholder: 'Solusi Konstruksi & Renovasi' },
                    { key: 'title2', label: 'Judul Baris 2', type: 'text', placeholder: 'Terpercaya & Modern' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Kami menyediakan berbagai layanan...' },
                    { key: 'card1_title', label: 'Kartu 1 — Judul', type: 'text', placeholder: 'Bangun Rumah Baru' },
                    { key: 'card1_desc', label: 'Kartu 1 — Desc', type: 'textarea', placeholder: 'Konstruksi rumah dari nol...' },
                    { key: 'card2_title', label: 'Kartu 2 — Judul', type: 'text', placeholder: 'Renovasi Total' },
                    { key: 'card2_desc', label: 'Kartu 2 — Desc', type: 'textarea', placeholder: 'Peremajaan bangunan lama...' },
                    { key: 'card3_title', label: 'Kartu 3 — Judul', type: 'text', placeholder: 'Desain Interior' },
                    { key: 'card3_desc', label: 'Kartu 3 — Desc', type: 'textarea', placeholder: 'Sentuhan akhir estetik...' },
                ]
            },
            {
                id: 'stats', label: '📊 Statistik Counter', description: 'Angka proyek, klien, tahun, tim', previewHint: 'Section hitam dengan angka animasi', fields: [
                    { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Pencapaian Kami' },
                    { key: 'title', label: 'Judul', type: 'text', placeholder: 'Angka Berbicara' },
                    { key: 'projects', label: 'Label Proyek', type: 'text', placeholder: 'Proyek Selesai' },
                    { key: 'clients', label: 'Label Klien', type: 'text', placeholder: 'Klien Puas' },
                    { key: 'years', label: 'Label Tahun', type: 'text', placeholder: 'Tahun Pengalaman' },
                    { key: 'team', label: 'Label Tim', type: 'text', placeholder: 'Tim Ahli' },
                ]
            },
            {
                id: 'partners', label: '🤝 Partner Logos', description: 'Logo brand partner', previewHint: 'Deretan 6 logo partner', fields: [
                    { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Partner Material Kami' },
                ]
            },
            {
                id: 'process', label: '📋 Proses Kerja', description: '4 langkah: Konsultasi → Desain → Konstruksi → Serah Terima', previewHint: '4 lingkaran icon + garis', fields: [
                    { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Cara Kami Bekerja' },
                    { key: 'title', label: 'Judul', type: 'text', placeholder: 'Proses yang Transparan' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Dari konsultasi awal...' },
                    { key: 's1_title', label: 'Step 1 Judul', type: 'text', placeholder: 'Konsultasi & Survey' },
                    { key: 's1_desc', label: 'Step 1 Desc', type: 'text', placeholder: 'Diskusi kebutuhan...' },
                    { key: 's2_title', label: 'Step 2 Judul', type: 'text', placeholder: 'Desain & RAB' },
                    { key: 's2_desc', label: 'Step 2 Desc', type: 'text', placeholder: 'Pembuatan desain...' },
                    { key: 's3_title', label: 'Step 3 Judul', type: 'text', placeholder: 'Konstruksi' },
                    { key: 's3_desc', label: 'Step 3 Desc', type: 'text', placeholder: 'Pengerjaan proyek...' },
                    { key: 's4_title', label: 'Step 4 Judul', type: 'text', placeholder: 'Serah Terima' },
                    { key: 's4_desc', label: 'Step 4 Desc', type: 'text', placeholder: 'Pengecekan akhir...' },
                ]
            },
            {
                id: 'portfolio', label: '🖼️ Preview Portfolio', description: '3 proyek unggulan di home', previewHint: 'Grid 1 besar + 2 kecil', fields: [
                    { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Portofolio' },
                    { key: 'title', label: 'Judul', type: 'text', placeholder: 'Proyek Terbaru Kami' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Dedikasi kami...' },
                ]
            },
            {
                id: 'cta', label: '📞 CTA', description: 'Ajakan di bawah halaman', previewHint: 'Banner "Siap Mewujudkan?"', fields: [
                    { key: 'title', label: 'Judul', type: 'text', placeholder: 'Siap Mewujudkan Rumah Impian?' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Konsultasikan kebutuhan...' },
                    { key: 'btn1', label: 'Tombol 1', type: 'text', placeholder: 'Hubungi via WhatsApp' },
                    { key: 'btn2', label: 'Tombol 2', type: 'text', placeholder: 'Jadwalkan Temu Janji' },
                ]
            },
        ],
    },
    about: {
        label: 'Tentang Kami', icon: 'info', previewUrl: '/about',
        sections: [
            {
                id: 'seo', label: '🔍 SEO Metadata', description: 'Pengaturan SEO untuk About', previewHint: 'Tidak terlihat di web', fields: [
                    { key: 'meta_title', label: 'Meta Title', type: 'text', placeholder: 'Tentang Kami - PT. ATT Karya Gemilang' },
                    { key: 'meta_desc', label: 'Meta Description', type: 'textarea', placeholder: 'Pelajari lebih lanjut tentang sejarah dan visi misi...' },
                    { key: 'meta_keywords', label: 'Meta Keywords', type: 'textarea', placeholder: 'tentang att karya, sejarah kontraktor, visi misi...' },
                ]
            },
            {
                id: 'main', label: '🏢 Header & Deskripsi', description: 'Judul, deskripsi, kutipan', previewHint: 'Atas halaman About', fields: [
                    { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Tentang Kami' },
                    { key: 'title1', label: 'Judul Baris 1', type: 'text', placeholder: 'Membangun Kepercayaan' },
                    { key: 'title2', label: 'Judul Baris 2', type: 'text', placeholder: 'Mewujudkan Impian' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'PT. ATT Karya Gemilang...' },
                    { key: 'quote', label: 'Kutipan', type: 'text', placeholder: '"Kualitas adalah pondasi..."' },
                    { key: 'about_image', label: 'Gambar About', type: 'image', placeholder: 'URL gambar About' },
                ]
            },
            {
                id: 'vision', label: '🎯 Visi & Misi', description: 'Visi dan 4 poin misi', previewHint: '2 kolom di tengah halaman', fields: [
                    { key: 'vision_title', label: 'Judul Visi', type: 'text', placeholder: 'Visi Kami' },
                    { key: 'vision_desc', label: 'Isi Visi', type: 'textarea', placeholder: 'Menjadi perusahaan kontraktor...' },
                    { key: 'mission_title', label: 'Judul Misi', type: 'text', placeholder: 'Misi Kami' },
                    { key: 'm1', label: 'Misi 1', type: 'text', placeholder: 'Memberikan layanan...' },
                    { key: 'm2', label: 'Misi 2', type: 'text', placeholder: 'Menawarkan transparansi...' },
                    { key: 'm3', label: 'Misi 3', type: 'text', placeholder: 'Menyediakan solusi...' },
                    { key: 'm4', label: 'Misi 4', type: 'text', placeholder: 'Menjamin ketepatan waktu...' },
                ]
            },
            {
                id: 'why', label: '⭐ Kenapa Pilih Kami', description: '4 kartu keunggulan', previewHint: 'Grid 2x2 kartu', fields: [
                    { key: 'why_badge', label: 'Badge', type: 'text', placeholder: 'Kelebihan Kami' },
                    { key: 'why_title', label: 'Judul Section', type: 'text', placeholder: 'Mengapa Memilih ATT?' },
                    { key: 'w1_title', label: 'Keunggulan 1 Judul', type: 'text', placeholder: 'Gratis Survey & Desain' },
                    { key: 'w1_desc', label: 'Keunggulan 1 Desc', type: 'textarea', placeholder: 'Kami memberikan...' },
                    { key: 'w2_title', label: 'Keunggulan 2 Judul', type: 'text', placeholder: 'Garansi 3 Bulan' },
                    { key: 'w2_desc', label: 'Keunggulan 2 Desc', type: 'textarea', placeholder: 'Ketenangan pikiran...' },
                    { key: 'w3_title', label: 'Keunggulan 3 Judul', type: 'text', placeholder: 'Transparansi Harga' },
                    { key: 'w3_desc', label: 'Keunggulan 3 Desc', type: 'textarea', placeholder: 'RAB dibuat rinci...' },
                    { key: 'w4_title', label: 'Keunggulan 4 Judul', type: 'text', placeholder: 'Tim Profesional' },
                    { key: 'w4_desc', label: 'Keunggulan 4 Desc', type: 'textarea', placeholder: 'Dikerjakan oleh tukang...' },
                ]
            },
            {
                id: 'cta', label: '📞 CTA About', description: 'Tombol ajakan bawah', previewHint: 'Banner "Berencana membangun?"', fields: [
                    { key: 'cta_title', label: 'Judul CTA', type: 'text', placeholder: 'Berencana membangun?' },
                    { key: 'cta_btn', label: 'Tombol CTA', type: 'text', placeholder: 'Konsultasikan Sekarang' },
                ]
            },
        ],
    },
    services: {
        label: 'Layanan', icon: 'design_services', previewUrl: '/services',
        sections: [
            {
                id: 'seo', label: '🔍 SEO Metadata', description: 'Pengaturan SEO untuk Services', previewHint: 'Tidak terlihat di web', fields: [
                    { key: 'meta_title', label: 'Meta Title', type: 'text', placeholder: 'Layanan Kami - PT. ATT Karya Gemilang' },
                    { key: 'meta_desc', label: 'Meta Description', type: 'textarea', placeholder: 'Jasa kontraktor bangun baru, renovasi total...' },
                    { key: 'meta_keywords', label: 'Meta Keywords', type: 'textarea', placeholder: 'jasa bangun rumah, jasa renovasi, jasa desain interior...' },
                ]
            },
            {
                id: 'header', label: '📋 Header Halaman', description: 'Judul dan deskripsi layanan', previewHint: 'Atas halaman Services', fields: [
                    { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Layanan Premium Kami' },
                    { key: 'title1', label: 'Judul Baris 1', type: 'text', placeholder: 'Konstruksi &' },
                    { key: 'title2', label: 'Judul Baris 2', type: 'text', placeholder: 'Keunggulan Desain' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Harga transparan...' },
                ]
            },
            {
                id: 'highlights', label: '✨ 3 Highlight Badges', description: 'Gratis Survey, Garansi, Cakupan', previewHint: '3 kartu horizontal', fields: [
                    { key: 'h1_title', label: 'Highlight 1 Judul', type: 'text', placeholder: 'Gratis Survey & Desain' },
                    { key: 'h1_desc', label: 'Highlight 1 Desc', type: 'text', placeholder: 'Konsultasi awal tanpa biaya...' },
                    { key: 'h2_title', label: 'Highlight 2 Judul', type: 'text', placeholder: 'Garansi 3 Bulan' },
                    { key: 'h2_desc', label: 'Highlight 2 Desc', type: 'text', placeholder: 'Ketenangan pikiran...' },
                    { key: 'h3_title', label: 'Highlight 3 Judul', type: 'text', placeholder: 'Cakupan Jabodetabek' },
                    { key: 'h3_desc', label: 'Highlight 3 Desc', type: 'text', placeholder: 'Melayani Jakarta...' },
                ]
            },
            {
                id: 'cta', label: '📞 CTA Layanan', description: 'Ajakan bawah halaman', previewHint: 'Banner CTA bawah', fields: [
                    { key: 'cta_title', label: 'Judul CTA', type: 'text', placeholder: 'Siap memulai proyek?' },
                    { key: 'cta_desc', label: 'Deskripsi CTA', type: 'textarea', placeholder: 'Jadwalkan konsultasi...' },
                    { key: 'cta_btn1', label: 'Tombol 1', type: 'text', placeholder: 'Pesan Survey Gratis' },
                    { key: 'cta_btn2', label: 'Tombol 2', type: 'text', placeholder: 'Lihat Portofolio' },
                ]
            },
        ],
    },
    portfolio: {
        label: 'Portfolio', icon: 'apartment', previewUrl: '/portfolio',
        sections: [
            {
                id: 'seo', label: '🔍 SEO Metadata', description: 'Pengaturan SEO untuk Portfolio', previewHint: 'Tidak terlihat di web', fields: [
                    { key: 'meta_title', label: 'Meta Title', type: 'text', placeholder: 'Portfolio Proyek - PT. ATT Karya Gemilang' },
                    { key: 'meta_desc', label: 'Meta Description', type: 'textarea', placeholder: 'Lihat hasil kerja terbaik dari PT. ATT Karya...' },
                    { key: 'meta_keywords', label: 'Meta Keywords', type: 'textarea', placeholder: 'portfolio kontraktor, hasil proyek rumah, proyek interior...' },
                ]
            },
            {
                id: 'header', label: '🖼️ Header Portfolio', description: 'Judul dan deskripsi', previewHint: 'Atas halaman Portfolio', fields: [
                    { key: 'title', label: 'Judul', type: 'text', placeholder: 'Karya Unggulan Kami' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Transformasi ruang...' },
                ]
            },
            {
                id: 'featured', label: '⭐ Featured Before/After', description: 'Proyek sorotan + slider', previewHint: 'Slider before/after', fields: [
                    { key: 'feat_badge', label: 'Badge', type: 'text', placeholder: 'Project Sorotan' },
                    { key: 'feat_title', label: 'Judul', type: 'text', placeholder: 'Fasad Renovation' },
                    { key: 'feat_before_img', label: 'Gambar Before', type: 'image', placeholder: 'URL gambar sebelum' },
                    { key: 'feat_after_img', label: 'Gambar After', type: 'image', placeholder: 'URL gambar sesudah' },
                    { key: 'feat_desc_title', label: 'Judul Desc', type: 'text', placeholder: 'Transformasi Total' },
                    { key: 'feat_desc_p', label: 'Deskripsi', type: 'textarea', placeholder: 'Renovasi fasad modern...' },
                    { key: 'v_client', label: 'Nama Klien', type: 'text', placeholder: 'Bpk. Handoko' },
                    { key: 'v_duration', label: 'Durasi', type: 'text', placeholder: '4 Bulan' },
                    { key: 'v_area', label: 'Luas Area', type: 'text', placeholder: '250m²' },
                ]
            },
            {
                id: 'cta', label: '📞 CTA Portfolio', description: 'Ajakan bawah', previewHint: 'Banner CTA bawah', fields: [
                    { key: 'cta_title', label: 'Judul CTA', type: 'text', placeholder: 'Siap mewujudkan visi?' },
                    { key: 'cta_desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Diskusikan proyek...' },
                    { key: 'cta_btn1', label: 'Tombol 1', type: 'text', placeholder: 'Konsultasi Gratis' },
                    { key: 'cta_btn2', label: 'Tombol 2', type: 'text', placeholder: 'Lihat Pricelist' },
                ]
            },
        ],
    },
    contact: {
        label: 'Kontak', icon: 'contact_mail', previewUrl: '/contact',
        sections: [
            {
                id: 'seo', label: '🔍 SEO Metadata', description: 'Pengaturan SEO untuk Contact', previewHint: 'Tidak terlihat di web', fields: [
                    { key: 'meta_title', label: 'Meta Title', type: 'text', placeholder: 'Hubungi Kami - PT. ATT Karya Gemilang' },
                    { key: 'meta_desc', label: 'Meta Description', type: 'textarea', placeholder: 'Hubungi tim PT. ATT Karya Gemilang untuk konsultasi...' },
                    { key: 'meta_keywords', label: 'Meta Keywords', type: 'textarea', placeholder: 'kontak kontraktor, whatsapp kontraktor tangsel...' },
                ]
            },
            {
                id: 'header', label: '📧 Header Kontak', description: 'Judul halaman kontak', previewHint: 'Atas halaman Contact', fields: [
                    { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Hubungi Kami' },
                    { key: 'title', label: 'Judul', type: 'text', placeholder: 'Mari Diskusikan Proyek Anda' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Tim kami siap membantu...' },
                ]
            },
            {
                id: 'info', label: '📍 Info Kontak', description: 'Alamat, telepon, email, jam', previewHint: 'Kartu info di samping form', fields: [
                    { key: 'address', label: 'Alamat', type: 'textarea', placeholder: 'Jl. Raya Konstruksi No. 123' },
                    { key: 'phone', label: 'Telepon', type: 'text', placeholder: '+62 877 7222 9006' },
                    { key: 'email', label: 'Email', type: 'text', placeholder: 'info@attkaryagemilang.com' },
                    { key: 'hours_weekday', label: 'Jam Weekday', type: 'text', placeholder: 'Senin - Jumat: 08:00 - 17:00' },
                    { key: 'hours_weekend', label: 'Jam Weekend', type: 'text', placeholder: 'Sabtu: 09:00 - 14:00' },
                ]
            },
            {
                id: 'form', label: '📝 Label Formulir', description: 'Label dan placeholder form', previewHint: 'Input nama, WA, pesan, tombol kirim', fields: [
                    { key: 'name_label', label: 'Label Nama', type: 'text', placeholder: 'Nama Lengkap' },
                    { key: 'phone_label', label: 'Label WA', type: 'text', placeholder: 'Nomor WhatsApp' },
                    { key: 'type_label', label: 'Label Tipe', type: 'text', placeholder: 'Tipe Proyek' },
                    { key: 'budget_label', label: 'Label Budget', type: 'text', placeholder: 'Budget Estimasi' },
                    { key: 'message_label', label: 'Label Pesan', type: 'text', placeholder: 'Detail Proyek' },
                    { key: 'submit_btn', label: 'Tombol Submit', type: 'text', placeholder: 'Kirim Pesan via WhatsApp' },
                ]
            },
        ],
    },
    calculator: {
        label: 'Kalkulator', icon: 'calculate', previewUrl: '/kalkulator',
        sections: [
            {
                id: 'seo', label: '🔍 SEO Metadata', description: 'Pengaturan SEO untuk Kalkulator', previewHint: 'Tidak terlihat di web', fields: [
                    { key: 'meta_title', label: 'Meta Title', type: 'text', placeholder: 'Kalkulator Estimasi Biaya Bangun Rumah' },
                    { key: 'meta_desc', label: 'Meta Description', type: 'textarea', placeholder: 'Gunakan kalkulator kami untuk menghitung perkiraan...' },
                    { key: 'meta_keywords', label: 'Meta Keywords', type: 'textarea', placeholder: 'kalkulator bangun rumah, estimasi biaya RAB...' },
                ]
            },
            {
                id: 'header', label: '🧮 Header Kalkulator', description: 'Judul estimasi biaya', previewHint: 'Atas halaman Kalkulator', fields: [
                    { key: 'title', label: 'Judul', type: 'text', placeholder: 'Simulasi Biaya Proyek' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Dapatkan gambaran awal...' },
                ]
            },
        ],
    },
    blog: {
        label: 'Blog', icon: 'article', previewUrl: '/blog',
        sections: [
            {
                id: 'seo', label: '🔍 SEO Metadata', description: 'Pengaturan SEO untuk Blog', previewHint: 'Tidak terlihat di web', fields: [
                    { key: 'meta_title', label: 'Meta Title', type: 'text', placeholder: 'Artikel & Berita - PT. ATT Karya Gemilang' },
                    { key: 'meta_desc', label: 'Meta Description', type: 'textarea', placeholder: 'Temukan artikel menarik seputar desain rumah...' },
                    { key: 'meta_keywords', label: 'Meta Keywords', type: 'textarea', placeholder: 'artikel arsitektur, tips bangun rumah, desain interior...' },
                ]
            },
            {
                id: 'newsletter', label: '📰 Newsletter', description: 'Form berlangganan bawah blog', previewHint: '"Tetap Terupdate"', fields: [
                    { key: 'stay_title', label: 'Judul', type: 'text', placeholder: 'Tetap Terupdate' },
                    { key: 'stay_desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Dapatkan tips...' },
                    { key: 'ph_email', label: 'Placeholder Email', type: 'text', placeholder: 'Masukkan email Anda' },
                ]
            },
        ],
    },
};

export default function AdminContent() {
    const [contents, setContents] = useState<PageContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState('home');
    const [values, setValues] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState<string | null>(null);
    const [saved, setSaved] = useState<string | null>(null);
    const [savingAll, setSavingAll] = useState(false);
    const [previewKey, setPreviewKey] = useState(0);
    const pageConfig = PAGE_MAP[activePage];

    const fetchContent = async () => {
        setLoading(true);
        const { data } = await supabase.from('page_content').select('*').eq('page', activePage);
        setContents(data || []);
        const v: Record<string, string> = {};
        (data || []).forEach(c => { v[`${c.section}__${c.key}`] = c.value; });
        setValues(v);
        setLoading(false);
    };
    useEffect(() => { fetchContent(); }, [activePage]);

    const handleImageUpload = async (ck: string, file: File) => {
        const path = `content/${Date.now()}.${file.name.split('.').pop()}`;
        const { error } = await supabase.storage.from('images').upload(path, file);
        if (!error) { const { data } = supabase.storage.from('images').getPublicUrl(path); setValues(p => ({ ...p, [ck]: data.publicUrl })); }
    };

    const saveSection = async (sectionId: string, fields: { key: string; type?: string }[], skipRefresh = false) => {
        setSaving(sectionId);
        for (const f of fields) {
            const ck = `${sectionId}__${f.key}`;
            const val = values[ck] || '';
            // Auto-translate to English (skip images)
            const valEn = (f as Field).type === 'image' ? val : await translateToEnglish(val);
            const ex = contents.find(c => c.section === sectionId && c.key === f.key);
            if (ex) {
                await supabase.from('page_content').update({ value: val, value_en: valEn }).eq('id', ex.id);
            } else {
                await supabase.from('page_content').insert({ page: activePage, section: sectionId, key: f.key, value: val, value_en: valEn });
            }
        }
        setSaving(null);
        if (!skipRefresh) {
            setSaved(sectionId);
            setPreviewKey(k => k + 1);
            setTimeout(() => setSaved(null), 2000);
            await fetchContent();
        }
    };

    const saveAll = async () => {
        setSavingAll(true);
        for (const s of pageConfig.sections) await saveSection(s.id, s.fields, true);
        setSavingAll(false);
        setPreviewKey(k => k + 1);
        setSaved('all');
        setTimeout(() => setSaved(null), 2000);
        await fetchContent();
    };

    return (
        <div className="-m-8 h-[calc(100vh)] flex flex-col">
            {/* Top Bar */}
            <div className="bg-white border-b border-[#e6dfcc] px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400">apartment</span>
                        <span className="text-sm text-gray-400">ATT CMS</span>
                        <span className="text-gray-300">/</span>
                    </div>
                    <h1 className="text-lg font-bold text-gray-900">
                        <span className="material-symbols-outlined text-base align-middle mr-1 text-primary">{pageConfig.icon}</span>
                        {pageConfig.label} Page Editor
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <a href={pageConfig.previewUrl} target="_blank" className="flex items-center gap-2 text-sm text-gray-500 border border-[#d6cfbc] rounded-lg px-4 py-2 hover:bg-accent">
                        <span className="material-symbols-outlined text-sm">open_in_new</span> Preview
                    </a>
                    <button onClick={saveAll} disabled={savingAll} className="flex items-center gap-2 bg-primary text-white text-sm font-medium rounded-lg px-5 py-2 hover:bg-primary-hover disabled:opacity-60">
                        {savingAll ? (
                            <><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> Saving...</>
                        ) : saved === 'all' ? (
                            <><span className="material-symbols-outlined text-sm">check_circle</span> Published!</>
                        ) : (
                            <><span className="material-symbols-outlined text-sm">publish</span> Publish Changes</>
                        )}
                    </button>
                </div>
            </div>

            {/* Page tabs */}
            <div className="bg-white border-b border-[#e6dfcc] px-6 py-2 flex gap-1 flex-shrink-0 overflow-x-auto">
                {Object.entries(PAGE_MAP).map(([key, cfg]) => (
                    <button key={key} onClick={() => setActivePage(key)}
                        className={`px-4 py-2 rounded-[10px] text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${activePage === key ? 'bg-accent text-secondary font-bold' : 'text-gray-500 hover:text-gray-700 hover:bg-accent'
                            }`}>
                        <span className="material-symbols-outlined text-base">{cfg.icon}</span>
                        {cfg.label}
                    </button>
                ))}
            </div>

            {/* Split Pane: Form | Preview */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left: Form */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#e6dfcc] bg-accent/50">
                    {loading ? (
                        <div className="p-12 text-center"><span className="material-symbols-outlined animate-spin text-gray-300">progress_activity</span></div>
                    ) : (
                        <div className="p-6 space-y-5">
                            {pageConfig.sections.map(section => (
                                <div key={section.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="px-5 py-3.5 bg-accent/50 flex items-center justify-between border-b border-gray-50">
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900">{section.label}</h3>
                                            <p className="text-[11px] text-gray-400 mt-0.5">{section.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {(saved === section.id || saved === 'all') && <span className="text-green-600 text-xs font-medium flex items-center gap-1"><span className="material-symbols-outlined text-xs">check_circle</span> Saved</span>}
                                            <button onClick={() => saveSection(section.id, section.fields)} disabled={saving === section.id}
                                                className="bg-accent text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#e6dfcc] transition-colors disabled:opacity-60 flex items-center gap-1">
                                                {saving === section.id ? <span className="material-symbols-outlined text-xs animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-xs">save</span>} Save
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-5 space-y-4">
                                        {section.fields.map(field => {
                                            const ck = `${section.id}__${field.key}`;
                                            return (
                                                <div key={ck}>
                                                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{field.label}</label>
                                                    {field.type === 'image' ? (
                                                        <div className="space-y-2">
                                                            {values[ck] && (
                                                                <div className="bg-accent rounded-lg p-3 inline-block">
                                                                    <img src={values[ck]} alt="" className="h-16 object-contain" />
                                                                </div>
                                                            )}
                                                            <div className="flex gap-2">
                                                                <input value={values[ck] || ''} onChange={e => setValues({ ...values, [ck]: e.target.value })} placeholder={field.placeholder} className="flex-1 px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                                                                <label className="flex items-center gap-1 bg-accent px-4 py-2.5 rounded-lg text-xs font-medium text-primary hover:bg-[#e6dfcc] cursor-pointer transition-colors">
                                                                    <span className="material-symbols-outlined text-sm">upload</span> Upload
                                                                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(ck, f); }} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ) : field.type === 'textarea' ? (
                                                        <textarea value={values[ck] || ''} onChange={e => setValues({ ...values, [ck]: e.target.value })} placeholder={field.placeholder} rows={2} className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                                                    ) : (
                                                        <input value={values[ck] || ''} onChange={e => setValues({ ...values, [ck]: e.target.value })} placeholder={field.placeholder} className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Live Preview */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-gray-100 flex flex-col">
                    <div className="px-4 py-3 bg-white border-b border-[#e6dfcc] flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-gray-400 text-sm">desktop_windows</span>
                            <span className="text-xs font-medium text-gray-500">Live Preview</span>
                        </div>
                        <button onClick={() => setPreviewKey(k => k + 1)} className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">refresh</span> Refresh
                        </button>
                    </div>
                    <div className="flex-1 p-4 overflow-hidden">
                        <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden border border-[#e6dfcc]">
                            <iframe key={previewKey} src={pageConfig.previewUrl} className="w-full h-full border-0" title="Preview"
                                style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
