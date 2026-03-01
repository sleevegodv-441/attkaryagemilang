import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Fetch logo & favicon from settings
    useEffect(() => {
        supabase.from('site_settings').select('key, value').in('key', ['logo_url', 'favicon_url']).then(({ data }) => {
            if (data) {
                const logo = data.find(d => d.key === 'logo_url');
                const fav = data.find(d => d.key === 'favicon_url');
                if (logo?.value) setLogoUrl(logo.value);
                if (fav?.value) {
                    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
                    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
                    link.href = fav.value;
                }
            }
        });
    }, []);

    const toggleLanguage = () => {
        const currentLang = i18n.language || 'id';
        const newLang = currentLang.startsWith('id') ? 'en' : 'id';
        i18n.changeLanguage(newLang);
    };

    const navLinks = [
        { to: '/about', label: t('nav.about') },
        { to: '/services', label: t('nav.services') },
        { to: '/portfolio', label: t('nav.portfolio') },
        { to: '/kalkulator', label: t('nav.estimator') },
        { to: '/blog', label: t('nav.blog') },
        { to: '/contact', label: t('nav.contact') },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b bg-white/95 backdrop-blur-md px-6 lg:px-20 transition-all duration-300 ${scrolled ? 'py-3 border-[#d6cfbc] shadow-md bg-white/98' : 'py-5 border-[#e6dfcc]'}`}>
            <Link to="/" className="flex items-center gap-4 text-black" onClick={() => setMobileOpen(false)}>
                {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
                ) : (
                    <div className="size-8 text-black">
                        <span className="material-symbols-outlined !text-[32px]">apartment</span>
                    </div>
                )}
                <h2 className="text-lg font-bold leading-tight tracking-tight uppercase font-[Noto_Sans]">PT. ATT Karya Gemilang</h2>
            </Link>
            <div className="hidden lg:flex flex-1 justify-end gap-10 items-center">
                <nav className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link key={link.to} to={link.to} className="text-sm font-medium leading-normal text-slate-600 hover:text-black transition-colors font-[Noto_Sans]">{link.label}</Link>
                    ))}
                </nav>
                <div className="flex gap-4 items-center border-l border-[#d6cfbc] pl-6">
                    <Link to="/contact" className="flex h-10 items-center justify-center bg-black px-6 text-white text-sm font-medium hover:bg-slate-800 transition-all font-[Noto_Sans]">
                        {t('nav.cta')}
                    </Link>
                    <button
                        onClick={toggleLanguage}
                        className="flex h-10 w-10 items-center justify-center border border-[#d6cfbc] text-slate-900 hover:bg-accent transition-all"
                    >
                        <span className="text-xs font-bold font-[Noto_Sans]">
                            {(i18n.language || 'id').startsWith('id') ? 'EN' : 'ID'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile menu button */}
            <button className="lg:hidden text-black block" onClick={() => setMobileOpen(!mobileOpen)}>
                <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>

            {/* Mobile menu panel */}
            {mobileOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-[#d6cfbc] shadow-lg lg:hidden">
                    <nav className="flex flex-col p-6 gap-4">
                        {navLinks.map((link) => (
                            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="text-base font-medium text-slate-700 hover:text-black py-2 border-b border-[#e6dfcc] font-[Noto_Sans]">{link.label}</Link>
                        ))}
                        <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-2 flex h-12 items-center justify-center bg-black text-white font-medium font-[Noto_Sans]">
                            {t('nav.cta')}
                        </Link>
                        <button onClick={() => { toggleLanguage(); setMobileOpen(false); }} className="flex h-10 items-center justify-center border border-[#d6cfbc] text-slate-900 font-[Noto_Sans] font-bold text-sm">
                            {(i18n.language || 'id').startsWith('id') ? 'English' : 'Indonesia'}
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}
