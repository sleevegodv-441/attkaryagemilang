import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { useProject } from '../lib/hooks';

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useTranslation();
    const { project, loading } = useProject(slug || '');
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

    if (loading) {
        return (
            <main className="flex-grow font-[Noto_Sans]">
                <div className="w-full max-w-5xl mx-auto px-4 pt-8 animate-pulse">
                    <div className="aspect-[21/9] w-full bg-slate-200 rounded" />
                </div>
                <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                    <div className="h-10 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-full" />
                </div>
            </main>
        );
    }

    if (!project) {
        return (
            <main className="flex-grow flex items-center justify-center min-h-[60vh] font-[Noto_Sans]">
                <div className="text-center">
                    <h1 className="text-4xl font-[Newsreader] font-bold text-slate-900 mb-4">Proyek Tidak Ditemukan</h1>
                    <Link to="/portfolio" className="text-black font-medium underline underline-offset-4">Kembali ke Portfolio</Link>
                </div>
            </main>
        );
    }

    // Simple markdown rendering
    const renderContent = (content: string) => {
        return content.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{block.replace('## ', '')}</h2>;
            }
            return <p key={i}>{block}</p>;
        });
    };

    return (
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-10 py-8 sm:py-12 font-[Inter]">
            <SEO titleRaw={project.title} descriptionRaw={project.description} image={project.image_url} />

            {/* Back Button */}
            <div className="mb-8">
                <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    {t('nav.portfolio', 'Portfolio')}
                </Link>
            </div>

            {/* Header */}
            <FadeIn direction="up" className="mb-10 text-center max-w-3xl mx-auto">
                <span className="text-primary text-sm font-bold uppercase tracking-wider mb-3 block">
                    {project.category.replace('_', ' ')}
                </span>
                <h1 className="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6">
                    {project.title}
                </h1>
                <p className="text-slate-500 text-lg sm:text-xl font-normal">
                    {project.description}
                </p>
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {project.location}
                </div>
            </FadeIn>

            {/* Hero Image */}
            <FadeIn direction="up" delay={0.1} className="mb-16">
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl border border-[#e6dfcc] bg-slate-100">
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                </div>
            </FadeIn>

            {/* Metadata Stats */}
            {(project.client_name || project.duration || project.area) && (
                <FadeIn direction="up" delay={0.2} className="mb-16 max-w-4xl mx-auto bg-accent rounded-2xl p-6 sm:p-10 border border-[#e6dfcc]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                        {project.client_name && (
                            <div className="pt-4 sm:pt-0 sm:px-6 first:pt-0 first:px-0">
                                <span className="block text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Klien</span>
                                <span className="text-slate-900 font-semibold text-lg">{project.client_name}</span>
                            </div>
                        )}
                        {project.duration && (
                            <div className="pt-4 sm:pt-0 sm:px-6">
                                <span className="block text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Durasi Pengerjaan</span>
                                <span className="text-slate-900 font-semibold text-lg">{project.duration}</span>
                            </div>
                        )}
                        {project.area && (
                            <div className="pt-4 sm:pt-0 sm:px-6">
                                <span className="block text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Luas Area</span>
                                <span className="text-slate-900 font-semibold text-lg">{project.area}</span>
                            </div>
                        )}
                    </div>
                </FadeIn>
            )}

            {/* Content Section */}
            {project.content && (
                <FadeIn direction="up" delay={0.3} className="max-w-3xl mx-auto mb-16">
                    <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed">
                        {renderContent(project.content)}
                    </div>
                </FadeIn>
            )}

            {/* Image Gallery */}
            {project.image_gallery && project.image_gallery.length > 0 && (
                <FadeIn direction="up" delay={0.4} className="mb-20">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-[#d6cfbc] pb-4">Galeri Proyek</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.image_gallery.map((url, i) => (
                            <div key={i} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all border border-[#e6dfcc]" onClick={() => setLightboxSrc(url)}>
                                <img src={url} alt={`${project.title} Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-md text-4xl">zoom_in</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            )}

            {/* CTA Section */}
            <FadeIn direction="up" delay={0.5} className="mt-16 pt-16 border-t border-[#d6cfbc] text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Tertarik Membuat Proyek Serupa?</h2>
                <p className="text-slate-500 mb-8 max-w-2xl mx-auto">Diskusikan visi Anda bersama kami dan dapatkan estimasi biaya secara gratis.</p>
                <Link to="/contact" className="inline-block bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1">
                    Hubungi Kami Sekarang
                </Link>
            </FadeIn>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxSrc && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxSrc(null)}
                    >
                        <button onClick={() => setLightboxSrc(null)} className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10 bg-black/40 rounded-full p-2">
                            <span className="material-symbols-outlined text-2xl block">close</span>
                        </button>
                        <motion.img
                            src={lightboxSrc}
                            alt="Project preview"
                            className="max-h-[90vh] max-w-[95vw] object-contain cursor-default"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
