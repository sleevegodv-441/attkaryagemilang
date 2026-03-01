import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { useProjects } from '../lib/hooks';
import { getCategoryLabel } from '../lib/supabaseClient';

export default function Portfolio() {
    const { t } = useTranslation();
    const { projects, loading: projectsLoading } = useProjects();
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredProjects = activeFilter === 'all' ? projects : projects.filter(p => p.category.includes(activeFilter));
    const featuredProject = projects.find(p => p.is_featured);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxSrc(null); };
        if (lightboxSrc) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [lightboxSrc]);

    return (
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-10 py-8 sm:py-12 font-[Inter]">
            <SEO titleKey="nav.portfolio" descriptionKey="portfolio.desc" />
            {/* Hero Section */}
            <FadeIn direction="up" className="mb-10 sm:mb-16">
                <h1 className="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-4">
                    {t('portfolio.title')}
                </h1>
                <p className="text-slate-500 text-lg sm:text-xl font-normal max-w-2xl">
                    {t('portfolio.desc')}
                </p>
            </FadeIn>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3 mb-12 border-b border-[#d6cfbc] pb-6">
                {[
                    { key: 'all', label: t('portfolio.filter_all') },
                    { key: 'bangun_baru', label: 'Project Build' },
                    { key: 'renovasi', label: 'Build Renovation' },
                    { key: 'interior', label: 'Interior' },
                    { key: 'commercial', label: 'Commercial' },
                    { key: 'desain', label: 'Project Desain' },
                ].map(f => (
                    <button key={f.key} onClick={() => setActiveFilter(f.key)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === f.key ? 'bg-primary text-white shadow-sm' : 'bg-white border border-[#d6cfbc] text-slate-600 hover:bg-accent'}`}>
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Featured Project: Before/After Slider Simulation */}
            {featuredProject && (
                <FadeIn direction="up" className="mb-20">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <span className="text-primary text-sm font-bold uppercase tracking-wider mb-1 block">{t('portfolio.feat_badge', 'Sorotan Proyek')}</span>
                            <h2 className="text-slate-900 dark:text-white text-2xl sm:text-3xl font-bold">{featuredProject.title}</h2>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-slate-500 text-sm">
                            <span className="material-symbols-outlined text-lg">drag_pan</span>
                            {t('portfolio.feat_tip', 'Geser untuk melihat Perubahan')}
                        </div>
                    </div>

                    {/* Before/After Container */}
                    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-[#e6dfcc] dark:border-slate-800 group select-none">
                        {(featuredProject.before_image && featuredProject.after_image) ? (
                            <ReactCompareSlider
                                itemOne={<ReactCompareSliderImage src={featuredProject.before_image} alt="Before" />}
                                itemTwo={<ReactCompareSliderImage src={featuredProject.after_image} alt="After" />}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img src={featuredProject.image_url} alt={featuredProject.title} className="w-full h-full object-cover" />
                        )}

                        {/* Custom Labels on top of the slider */}
                        {(featuredProject.before_image && featuredProject.after_image) && (
                            <>
                                <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-medium pointer-events-none">{t('portfolio.feat_before', 'Sebelum')}</div>
                                <div className="absolute bottom-6 right-6 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-medium pointer-events-none">{t('portfolio.feat_after', 'Sesudah')}</div>
                            </>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center p-6 bg-white dark:bg-slate-800 border border-[#e6dfcc] dark:border-slate-700 rounded-xl shadow-sm">
                        <div className="flex flex-col gap-1 flex-1">
                            <p className="text-slate-900 dark:text-white font-bold text-lg">{featuredProject.description ? 'Deskripsi Proyek' : t('portfolio.feat_desc_title')}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{featuredProject.description || t('portfolio.feat_desc_p')}</p>
                        </div>
                        <div className="flex gap-8 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-[#e6dfcc] dark:border-slate-700">
                            <div>
                                <span className="block text-xs text-slate-400 font-medium uppercase tracking-wide">{t('portfolio.l_client', 'Klien')}</span>
                                <span className="text-slate-800 dark:text-slate-200 font-medium">{featuredProject.client_name || '-'}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 font-medium uppercase tracking-wide">{t('portfolio.l_duration', 'Durasi')}</span>
                                <span className="text-slate-800 dark:text-slate-200 font-medium">{featuredProject.duration || '-'}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 font-medium uppercase tracking-wide">{t('portfolio.l_area', 'Area')}</span>
                                <span className="text-slate-800 dark:text-slate-200 font-medium">{featuredProject.area || '-'}</span>
                            </div>
                            <div className="flex items-center ml-4">
                                <Link to={`/portfolio/${featuredProject.slug || featuredProject.id}`} className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 flex items-center gap-2">
                                    Detail <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            )}

            {/* Secondary Projects Grid */}
            <section>
                <div className="flex justify-between items-end mb-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('portfolio.other_title')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {projectsLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[4/3] bg-slate-200 rounded-lg mb-4" />
                                <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-slate-200 rounded w-1/2" />
                            </div>
                        ))
                    ) : filteredProjects.length === 0 ? (
                        <div className="col-span-3 text-center py-12">
                            <span className="material-symbols-outlined text-4xl text-slate-500">search_off</span>
                            <p className="text-slate-500 mt-2">Belum ada proyek</p>
                        </div>
                    ) : (
                        filteredProjects.map((p, i) => (
                            <FadeIn key={p.id} delay={i * 0.1} className="group cursor-pointer">
                                <Link to={`/portfolio/${p.slug || p.id}`}>
                                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-slate-100 mb-4 border border-[#e6dfcc]">
                                        <img
                                            alt={p.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            src={p.image_url}
                                            loading="lazy"
                                        />
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                                            {p.category.split(',').map(c => c.trim()).filter(Boolean).slice(0, 2).map((cat, i) => (
                                                <span key={i} className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-slate-800">{getCategoryLabel(cat)}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{p.title}</h4>
                                        <div className="flex items-center gap-2 text-sm text-slate-500 font-light">
                                            <span>{p.location}</span>
                                            {p.area && <><span className="size-1 bg-slate-300 rounded-full"></span><span>{p.area}</span></>}
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>
                        ))
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <FadeIn direction="up" className="mt-20 sm:mt-32">
                <div className="bg-primary/5 dark:bg-slate-800/50 rounded-2xl p-8 sm:p-16 text-center">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4">{t('portfolio.cta_title')}</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8">
                        {t('portfolio.cta_desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-500/20 transition-all">
                            {t('portfolio.cta_btn1')}
                        </Link>
                        <Link to="/services" className="bg-white dark:bg-slate-700 hover:bg-accent text-slate-900 dark:text-white border border-[#d6cfbc] dark:border-slate-600 font-bold py-3 px-8 rounded-lg transition-all">
                            {t('portfolio.cta_btn2')}
                        </Link>
                    </div>
                </div>
            </FadeIn>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxSrc && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxSrc(null)}
                    >
                        <button onClick={() => setLightboxSrc(null)} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10">
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                        <motion.img
                            src={lightboxSrc}
                            alt="Project preview"
                            className="max-h-[85vh] max-w-[90vw] object-contain cursor-default"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

