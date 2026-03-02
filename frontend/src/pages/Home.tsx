import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { useProjects, useTestimonials } from '../lib/hooks';

function useCountUp(end: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                let start = 0;
                const step = end / (duration / 16);
                const timer = setInterval(() => {
                    start += step;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);
            }
        }, { threshold: 0.3 });
        observer.observe(el);
        return () => observer.disconnect();
    }, [end, duration]);

    return { count, ref };
}

export default function Home() {
    const { t } = useTranslation();
    const { projects, loading: projectsLoading } = useProjects();
    const { testimonials, loading: testimonialsLoading } = useTestimonials();
    const homeProjects = projects.slice(0, 3);
    return (
        <main className="flex-grow">
            <SEO titleKey="home.hero.title1" descriptionKey="home.services.desc" />

            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="h-full w-full bg-cover bg-center bg-no-repeat grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcqVZcCf_ov2WCNdXj1ai3icqJBq5_9qcviyU5909Lx8Z_YAW50FwI7EagncphOn1r2pLDiYNPxLYB6fYkX4V--0kyK1fkzFIXu_VkRt2c77pmOHTg7FgoQyT3JTW6DliCLlRAQkRBNaQe2yYFcu9emxpm4f-EYurbCqxU0QrR_vkbq3BJS_wR7XvOzs7yrzEFKaqNsmiKNTU2aekC63HRx8E0eCiGsdeu4BqmIHiUEh8lnrRshna-XHf6zl3ioLWNLx6DXvuTeTtx")' }}></div>
                </div>
                <FadeIn direction="up" delay={0.2} className="relative z-20 container mx-auto px-4 lg:px-20 flex flex-col items-center text-center gap-10 max-w-5xl mt-10">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 border border-[#d6cfbc] bg-white mb-2">
                        <span className="text-xs font-semibold text-slate-800 tracking-widest uppercase font-[Noto_Sans]">{t('home.hero.badge')}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-[Newsreader] font-medium text-slate-900 leading-[1.1] tracking-tight">
                        {t('home.hero.title1')} <br className="hidden md:block" /> <span className="italic text-slate-600">{t('home.hero.title2')}</span>
                    </h1>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-slate-600 text-sm md:text-base font-[Noto_Sans] font-light tracking-wide border-t border-b border-[#e6dfcc] py-4 w-full md:w-auto">
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-slate-800 text-sm">verified</span> {t('home.hero.exp')}</span>
                        <span className="hidden md:inline text-slate-500">|</span>
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-slate-800 text-sm">verified</span> {t('home.hero.warranty')}</span>
                        <span className="hidden md:inline text-slate-500">|</span>
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-slate-800 text-sm">verified</span> {t('home.hero.transparent')}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5 mt-4 w-full sm:w-auto">
                        <Link to="/contact" className="h-12 px-6 sm:h-14 sm:px-10 bg-black hover:bg-slate-800 text-white font-[Noto_Sans] font-medium text-base transition-all flex items-center justify-center gap-2 group">
                            {t('home.hero.cta1')}
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                        <Link to="/services" className="h-12 px-6 sm:h-14 sm:px-10 border border-black hover:bg-accent text-slate-900 font-[Noto_Sans] font-medium text-base transition-all flex items-center justify-center bg-transparent">
                            {t('home.hero.cta2')}
                        </Link>
                    </div>
                </FadeIn>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400">
                    <span className="material-symbols-outlined">keyboard_arrow_down</span>
                </div>
            </section>
            <section className="py-24 bg-white relative border-t border-[#e6dfcc]">
                <div className="container mx-auto px-6 lg:px-20">
                    <FadeIn direction="up" className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-[#e6dfcc] pb-10">
                        <div className="max-w-2xl">
                            <h2 className="text-black text-xs font-bold uppercase tracking-[0.2em] mb-4 font-[Noto_Sans]">{t('home.services.badge')}</h2>
                            <h3 className="text-4xl md:text-5xl font-[Newsreader] text-slate-900 leading-tight">{t('home.services.title1')} <br /><span className="text-slate-500 italic">{t('home.services.title2')}</span></h3>
                        </div>
                        <p className="text-slate-500 max-w-md font-[Noto_Sans] text-sm leading-relaxed mb-1">
                            {t('home.services.desc')}
                        </p>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-[#e6dfcc]">
                        <FadeIn delay={0.1} className="group relative p-10 flex flex-col gap-6 hover:bg-accent transition-colors duration-500">
                            <div className="size-12 flex items-center justify-start text-black">
                                <span className="material-symbols-outlined text-4xl font-light">foundation</span>
                            </div>
                            <div className="space-y-3 z-10 mt-4">
                                <h4 className="text-2xl font-[Newsreader] font-medium text-slate-900">{t('home.services.card1_title')}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-[Noto_Sans]">{t('home.services.card1_desc')}</p>
                            </div>
                            <div className="mt-auto pt-8 flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:underline decoration-1 underline-offset-4 transition-all cursor-pointer font-[Noto_Sans]">
                                {t('home.services.more')} <span className="material-symbols-outlined text-base ml-2 group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.2} className="group relative p-10 flex flex-col gap-6 hover:bg-accent transition-colors duration-500">
                            <div className="size-12 flex items-center justify-start text-black">
                                <span className="material-symbols-outlined text-4xl font-light">construction</span>
                            </div>
                            <div className="space-y-3 z-10 mt-4">
                                <h4 className="text-2xl font-[Newsreader] font-medium text-slate-900">{t('home.services.card2_title')}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-[Noto_Sans]">{t('home.services.card2_desc')}</p>
                            </div>
                            <div className="mt-auto pt-8 flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:underline decoration-1 underline-offset-4 transition-all cursor-pointer font-[Noto_Sans]">
                                {t('home.services.more')} <span className="material-symbols-outlined text-base ml-2 group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.3} className="group relative p-10 flex flex-col gap-6 hover:bg-accent transition-colors duration-500">
                            <div className="size-12 flex items-center justify-start text-black">
                                <span className="material-symbols-outlined text-4xl font-light">chair</span>
                            </div>
                            <div className="space-y-3 z-10 mt-4">
                                <h4 className="text-2xl font-[Newsreader] font-medium text-slate-900">{t('home.services.card3_title')}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-[Noto_Sans]">{t('home.services.card3_desc')}</p>
                            </div>
                            <div className="mt-auto pt-8 flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:underline decoration-1 underline-offset-4 transition-all cursor-pointer font-[Noto_Sans]">
                                {t('home.services.more')} <span className="material-symbols-outlined text-base ml-2 group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Stats Counter Section */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-6 lg:px-20">
                    <FadeIn direction="up" className="text-center mb-16">
                        <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em] font-[Noto_Sans]">{t('stats.badge')}</span>
                        <h2 className="text-3xl md:text-4xl font-[Newsreader] font-medium text-white mt-4">{t('stats.title')}</h2>
                    </FadeIn>
                    <div className="grid grid-cols-3 gap-8 md:gap-12">
                        {[
                            { end: projects.length || 1, label: t('stats.projects'), suffix: '+' },
                            { end: projects.length || 1, label: t('stats.clients'), suffix: '+' },
                            { end: parseInt(t('home.hero.exp').replace(/\D/g, '')) || 10, label: t('stats.years'), suffix: '+' },
                        ].map((item, i) => {
                            const { count, ref } = useCountUp(item.end);
                            return (
                                <FadeIn key={i} delay={i * 0.1} className="text-center">
                                    <div ref={ref} className="text-5xl md:text-6xl font-[Newsreader] font-bold text-white mb-2">
                                        {count}{item.suffix}
                                    </div>
                                    <p className="text-white/60 text-sm font-[Noto_Sans] uppercase tracking-wider">{item.label}</p>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-24 bg-accent">
                <div className="container mx-auto px-6 lg:px-20">
                    <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-black text-xs font-bold uppercase tracking-[0.2em] font-[Noto_Sans]">{t('process.badge')}</span>
                        <h2 className="text-3xl md:text-5xl font-[Newsreader] font-medium text-slate-900 mt-4 mb-6">{t('process.title')}</h2>
                        <p className="text-slate-500 font-[Noto_Sans] font-light">{t('process.desc')}</p>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-gray-200 z-0" />
                        {[
                            { step: '01', icon: 'handshake', titleKey: 'process.s1_title', descKey: 'process.s1_desc' },
                            { step: '02', icon: 'architecture', titleKey: 'process.s2_title', descKey: 'process.s2_desc' },
                            { step: '03', icon: 'construction', titleKey: 'process.s3_title', descKey: 'process.s3_desc' },
                            { step: '04', icon: 'key', titleKey: 'process.s4_title', descKey: 'process.s4_desc' },
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.15} className="flex flex-col items-center text-center relative z-10">
                                <div className="size-24 rounded-full bg-white border-2 border-[#d6cfbc] flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-3xl text-black font-light">{item.icon}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-400 tracking-widest mb-2 font-[Noto_Sans]">{t('process.step')} {item.step}</span>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 font-[Noto_Sans]">{t(item.titleKey)}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-[Noto_Sans] max-w-[250px]">{t(item.descKey)}</p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-accent">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-black text-xs font-bold uppercase tracking-[0.2em] font-[Noto_Sans]">{t('home.portfolio.badge')}</span>
                        <h2 className="text-3xl md:text-5xl font-[Newsreader] font-medium text-slate-900 mt-4 mb-6">{t('home.portfolio.title')}</h2>
                        <p className="text-slate-500 font-[Noto_Sans] font-light">{t('home.portfolio.desc')}</p>
                    </div>
                    {projectsLoading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="animate-pulse bg-slate-200 aspect-[4/3] lg:h-[600px] rounded" />
                            <div className="flex flex-col gap-8">
                                <div className="animate-pulse bg-slate-200 flex-1 rounded" />
                                <div className="animate-pulse bg-slate-200 flex-1 rounded" />
                            </div>
                        </div>
                    ) : homeProjects.length === 0 ? (
                        <div className="text-center py-16 border-2 border-dashed border-[#d6cfbc]">
                            <span className="material-symbols-outlined text-5xl text-slate-500">apartment</span>
                            <p className="text-slate-400 mt-4 font-[Noto_Sans]">Belum ada proyek</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* First project - large */}
                            <FadeIn delay={0.1} className="group relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-500">
                                <div className="aspect-[4/3] lg:aspect-auto lg:h-[600px] overflow-hidden">
                                    <div className="h-full w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0" style={{ backgroundImage: `url("${homeProjects[0].image_url}")` }}></div>
                                </div>
                                <div className="p-6 sm:p-8 bg-white border border-[#e6dfcc] border-t-0 overflow-hidden">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider font-[Noto_Sans]">{homeProjects[0].location}</span>
                                        <h3 className="text-xl sm:text-2xl font-[Newsreader] font-bold text-slate-900">{homeProjects[0].title}</h3>
                                        <Link to="/portfolio" className="inline-flex items-center text-black text-xs font-bold uppercase tracking-widest mt-4 group-hover:underline underline-offset-4 decoration-1 break-words">
                                            {t('home.portfolio.detail')}
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                            {/* 2nd and 3rd projects - stacked right */}
                            <div className="flex flex-col gap-8 h-full">
                                {homeProjects.slice(1, 3).map((p, i) => (
                                    <FadeIn key={p.id} delay={(i + 2) * 0.1} className="group relative overflow-hidden flex-1 bg-white shadow-sm hover:shadow-xl transition-shadow duration-500">
                                        <div className="h-[280px] overflow-hidden">
                                            <div className="h-full w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0" style={{ backgroundImage: `url("${p.image_url}")` }}></div>
                                        </div>
                                        <div className="p-6 bg-white border border-[#e6dfcc] border-t-0">
                                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider font-[Noto_Sans]">{p.location}</span>
                                            <h3 className="text-xl font-[Newsreader] font-bold text-slate-900 mt-2">{p.title}</h3>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    )}
                    <FadeIn direction="up" className="mt-16 text-center">
                        <Link to="/portfolio" className="inline-flex items-center justify-center h-12 px-8 border border-black text-black font-[Noto_Sans] font-medium hover:bg-black hover:text-white transition-colors">
                            {t('home.portfolio.all')}
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-white border-t border-[#e6dfcc]">
                <div className="container mx-auto px-6 lg:px-20">
                    <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-black text-xs font-bold uppercase tracking-[0.2em] font-[Noto_Sans]">{t('testimonials.badge')}</span>
                        <h2 className="text-3xl md:text-5xl font-[Newsreader] font-medium text-slate-900 mt-4 mb-6">{t('testimonials.title')}</h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonialsLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="animate-pulse bg-slate-100 p-10 rounded space-y-4">
                                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                                    <div className="h-20 bg-slate-200 rounded" />
                                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                                </div>
                            ))
                        ) : testimonials.length === 0 ? (
                            <div className="col-span-3 text-center py-12 border-2 border-dashed border-[#d6cfbc]">
                                <span className="material-symbols-outlined text-4xl text-slate-500">chat</span>
                                <p className="text-slate-400 mt-2 font-[Noto_Sans]">Belum ada testimoni</p>
                            </div>
                        ) : (
                            testimonials.slice(0, 3).map((item, i) => (
                                <FadeIn key={item.id} delay={(i + 1) * 0.15} className="bg-accent p-8 md:p-10 flex flex-col gap-6 border border-[#e6dfcc] hover:shadow-lg transition-shadow duration-500">
                                    <div className="flex gap-1 text-yellow-400">
                                        {[...Array(item.rating)].map((_, j) => (
                                            <span key={j} className="material-symbols-outlined text-lg">star</span>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed font-[Noto_Sans] font-light italic flex-grow">
                                        "{item.quote}"
                                    </p>
                                    <div className="border-t border-[#d6cfbc] pt-6 flex items-center gap-4">
                                        <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-slate-500">person</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 font-[Noto_Sans] text-sm">{item.name}</p>
                                            <p className="text-slate-400 text-xs font-[Noto_Sans]">{item.role}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))
                        )}
                    </div>
                </div>
            </section>
            <section className="py-24 relative overflow-hidden bg-white border-t border-[#e6dfcc]">
                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn direction="up" className="max-w-4xl mx-auto border border-[#d6cfbc] bg-white p-10 md:p-20 text-center shadow-sm relative overflow-hidden">
                        <h2 className="text-3xl md:text-5xl font-[Newsreader] font-medium text-slate-900 mb-6">{t('home.cta.title')}</h2>
                        <p className="text-slate-700 text-lg mb-10 max-w-xl mx-auto font-[Noto_Sans]">{t('home.cta.desc')}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="bg-black text-white hover:bg-slate-800 px-6 py-3 sm:px-10 sm:py-4 font-medium font-[Noto_Sans] transition-colors min-w-[200px]">
                                {t('home.cta.btn1')}
                            </Link>
                            <Link to="/contact" className="bg-transparent border border-black text-black hover:bg-accent px-6 py-3 sm:px-10 sm:py-4 font-medium font-[Noto_Sans] transition-colors min-w-[200px]">
                                {t('home.cta.btn2')}
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
