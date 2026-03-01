import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { useBlogPosts } from '../lib/hooks';

export default function Blog() {
    const { t } = useTranslation();
    const { posts, loading } = useBlogPosts();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const featured = posts.find(p => p.is_featured) || posts[0];
    const allArticles = posts.filter(p => p.id !== featured?.id);

    // Search and Pagination logic
    const filteredArticles = allArticles.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const POSTS_PER_PAGE = 6;
    const totalPages = Math.max(1, Math.ceil(filteredArticles.length / POSTS_PER_PAGE));
    const paginatedArticles = filteredArticles.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

    // Reset pagination when searching
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const formatDate = (d: string) => {
        const date = new Date(d);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
    };

    return (
        <main className="flex-1 flex flex-col items-center py-12 px-4 md:px-10 lg:px-20 w-full font-[Manrope]">
            <SEO titleKey="nav.blog" descriptionKey="blog.stay_desc" />
            <div className="max-w-[1200px] w-full flex flex-col gap-16">
                {/* Featured Article */}
                {loading ? (
                    <div className="animate-pulse flex flex-col @xl:flex-row gap-8">
                        <div className="w-full @xl:w-3/5 aspect-[16/9] bg-slate-200 rounded" />
                        <div className="flex-1 space-y-4 py-8">
                            <div className="h-4 bg-slate-200 rounded w-1/4" />
                            <div className="h-8 bg-slate-200 rounded w-3/4" />
                            <div className="h-4 bg-slate-200 rounded w-full" />
                        </div>
                    </div>
                ) : featured && (
                    <section className="@container">
                        <FadeIn direction="up" className="flex flex-col items-stretch justify-start overflow-hidden @xl:flex-row @xl:items-center bg-white group cursor-pointer">
                            <Link to={`/blog/${featured.slug}`} className="w-full @xl:w-3/5 bg-center bg-no-repeat bg-cover aspect-[16/9] min-h-[400px] grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-in-out block" style={{ backgroundImage: `url('${featured.image_url}')` }}>
                            </Link>
                            <div className="flex w-full @xl:w-2/5 grow flex-col items-start justify-center gap-6 py-8 px-0 @xl:pl-12 @xl:py-8">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-black"></span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-black">{featured.category}</span>
                                </div>
                                <h1 className="text-black text-3xl @xl:text-4xl font-[Newsreader] font-medium leading-tight tracking-tight group-hover:underline decoration-1 underline-offset-4">
                                    {featured.title}
                                </h1>
                                <p className="text-gray-500 text-base font-light leading-relaxed line-clamp-3 font-[Noto_Sans]">
                                    {featured.excerpt}
                                </p>
                                <div className="pt-4">
                                    <Link to={`/blog/${featured.slug}`} className="flex items-center gap-2 text-black font-bold text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-70 transition-opacity">
                                        {t('blog.read')}
                                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </section>
                )}

                {/* Article Grid */}
                <section>
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between px-0 pb-8 border-b border-black mb-10 gap-4">
                        <h2 className="text-black text-3xl font-medium tracking-tight font-[Newsreader]">{t('blog.latest')}</h2>
                        <div className="relative w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-[#d6cfbc] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black font-[Noto_Sans] bg-accent transition-all"
                            />
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[3/2] bg-slate-200 mb-6" />
                                    <div className="h-3 bg-slate-200 rounded w-1/4 mb-3" />
                                    <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-slate-200 rounded w-full" />
                                </div>
                            ))
                        ) : paginatedArticles.length === 0 ? (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-accent/50 rounded-2xl border border-[#e6dfcc] border-dashed">
                                <span className="material-symbols-outlined text-4xl text-slate-500 mb-3 block">search_off</span>
                                <h3 className="text-lg font-bold text-slate-700 font-[Newsreader] mb-1">Tidak ada artikel ditemukan</h3>
                                <p className="text-slate-500 font-[Noto_Sans] text-sm">Coba gunakan kata kunci pencarian yang lain.</p>
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="mt-4 text-primary font-medium text-sm hover:underline">
                                        Hapus Pencarian
                                    </button>
                                )}
                            </div>
                        ) : (
                            paginatedArticles.map((post, i) => (
                                <FadeIn key={post.id} delay={(i % 3 + 1) * 0.1} className="flex flex-col group cursor-pointer">
                                    <Link to={`/blog/${post.slug}`} className="block">
                                        <div className="w-full bg-gray-100 bg-center bg-no-repeat aspect-[3/2] bg-cover mb-6 overflow-hidden relative">
                                            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{ backgroundImage: `url('${post.image_url}')` }}></div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between border-b border-[#e6dfcc] pb-2 mb-1">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">{post.category}</span>
                                                <span className="text-[10px] font-medium text-gray-400 font-mono">{formatDate(post.published_at)}</span>
                                            </div>
                                            <h3 className="text-black text-xl font-medium leading-snug group-hover:underline decoration-1 underline-offset-4 font-[Newsreader]">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2 font-[Noto_Sans]">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                </FadeIn>
                            ))
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {!loading && totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-16 pt-8 border-t border-[#e6dfcc]">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="size-10 flex items-center justify-center rounded-full border border-[#d6cfbc] text-slate-500 hover:bg-accent hover:text-black hover:border-black disabled:opacity-50 disabled:pointer-events-none transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`size-10 flex items-center justify-center rounded-full text-sm font-medium transition-all ${currentPage === i + 1
                                                ? 'bg-black text-white'
                                                : 'text-slate-500 hover:bg-accent hover:text-black'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="size-10 flex items-center justify-center rounded-full border border-[#d6cfbc] text-slate-500 hover:bg-accent hover:text-black hover:border-black disabled:opacity-50 disabled:pointer-events-none transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                            </button>
                        </div>
                    )}
                </section>

                <section className="mt-8 border-t border-black/10 pt-16 pb-8">
                    <FadeIn direction="up" className="flex flex-col lg:flex-row items-start justify-between gap-12">
                        <div className="flex flex-col gap-4 max-w-xl">
                            <h2 className="text-black text-3xl font-medium tracking-tight font-[Newsreader]">
                                {t('blog.stay_title')}
                            </h2>
                            <p className="text-gray-500 text-base font-light leading-relaxed font-[Noto_Sans]">
                                {t('blog.stay_desc')}
                            </p>
                        </div>
                        <div className="w-full max-w-md">
                            <form className="flex flex-col sm:flex-row gap-0 border-b border-black">
                                <input className="flex-1 bg-transparent text-black px-0 py-3 focus:ring-0 outline-none transition-all placeholder:text-gray-400 border-none" placeholder={t('blog.ph_email')} required type="email" />
                                <button className="text-black font-bold text-xs uppercase tracking-widest py-3 px-4 hover:opacity-70 transition-opacity" type="submit">
                                    {t('blog.sub')}
                                </button>
                            </form>
                            <p className="text-[10px] text-gray-400 mt-2 font-[Noto_Sans] uppercase tracking-wider">{t('blog.no_spam')}</p>
                        </div>
                    </FadeIn>
                </section>
            </div>
        </main>
    );
}
