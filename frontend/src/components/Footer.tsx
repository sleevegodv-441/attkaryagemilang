import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Footer() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    useEffect(() => {
        supabase.from('site_settings').select('key, value').in('key', ['address', 'phone', 'email', 'company_name']).then(({ data }) => {
            if (data) setSettings(Object.fromEntries(data.map(i => [i.key, i.value])));
        });
    }, []);
    return (
        <footer className="bg-white border-t border-[#d6cfbc] pt-20 pb-10 mt-auto">
            <div className="container mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 text-slate-900 mb-6">
                            <span className="material-symbols-outlined !text-[28px]">apartment</span>
                            <h2 className="text-lg font-bold uppercase tracking-wider font-[Noto_Sans]">{settings.company_name || 'PT. ATT Karya Gemilang'}</h2>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-[Noto_Sans]">Mitra terpercaya dalam membangun dan merenovasi hunian impian dengan standar kualitas terbaik.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-black transition-colors"><span className="material-symbols-outlined">thumb_up</span></a>
                            <a href="#" className="text-slate-400 hover:text-black transition-colors"><span className="material-symbols-outlined">photo_camera</span></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-slate-900 font-bold mb-6 font-[Noto_Sans] text-sm uppercase tracking-widest">Layanan</h3>
                        <ul className="flex flex-col gap-3 text-slate-500 text-sm font-[Noto_Sans]">
                            <li><Link to="/services" className="hover:text-black transition-colors">Bangun Rumah</Link></li>
                            <li><Link to="/services" className="hover:text-black transition-colors">Renovasi</Link></li>
                            <li><Link to="/services" className="hover:text-black transition-colors">Desain Interior</Link></li>
                            <li><Link to="/services" className="hover:text-black transition-colors">Arsitektur</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-slate-900 font-bold mb-6 font-[Noto_Sans] text-sm uppercase tracking-widest">Perusahaan</h3>
                        <ul className="flex flex-col gap-3 text-slate-500 text-sm font-[Noto_Sans]">
                            <li><Link to="/about" className="hover:text-black transition-colors">Tentang Kami</Link></li>
                            <li><Link to="/portfolio" className="hover:text-black transition-colors">Proyek</Link></li>
                            <li><Link to="/blog" className="hover:text-black transition-colors">Karir / Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-black transition-colors">Kontak</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-slate-900 font-bold mb-6 font-[Noto_Sans] text-sm uppercase tracking-widest">Kontak</h3>
                        <ul className="flex flex-col gap-3 text-slate-500 text-sm font-[Noto_Sans]">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-slate-900 text-base mt-0.5">location_on</span>
                                <span className="max-w-[200px]">{settings.address || 'Jl. Arsitek No. 88, Jakarta Selatan, 12345'}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-900 text-base">call</span>
                                <span>{settings.phone || '+62 21 5555 6789'}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-900 text-base">mail</span>
                                <span>{settings.email?.split(' / ')[0] || 'info@attkaryagemilang.com'}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#e6dfcc] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-[Noto_Sans]">
                    <p>© 2024 PT. ATT Karya Gemilang. All rights reserved.</p>
                    <div className="flex gap-6 items-center">
                        <Link to="/admin/login" className="hover:text-black transition-colors font-medium">Staff Login</Link>
                        <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
