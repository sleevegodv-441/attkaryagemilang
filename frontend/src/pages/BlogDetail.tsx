import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { useBlogPost } from '../lib/hooks';

export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useTranslation();
    const { post, loading } = useBlogPost(slug || '');

    const formatDate = (d: string) => {
        const date = new Date(d);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
    };

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

    if (!post) {
        return (
            <main className="flex-grow flex items-center justify-center min-h-[60vh] font-[Noto_Sans]">
                <div className="text-center">
                    <h1 className="text-4xl font-[Newsreader] font-bold text-slate-900 mb-4">{t('blog_detail.not_found')}</h1>
                    <Link to="/blog" className="text-black font-medium underline underline-offset-4">{t('blog_detail.back')}</Link>
                </div>
            </main>
        );
    }

    // Simple markdown-like rendering: split by double newline for paragraphs, ## for headings
    const renderContent = (content: string) => {
        return content.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-[Newsreader] font-bold text-slate-900 mt-8 mb-4">{block.replace('## ', '')}</h2>;
            }
            return <p key={i}>{block}</p>;
        });
    };

    return (
        <main className="flex-grow font-[Noto_Sans]">
            <SEO
                titleRaw={post.meta_title || post.title}
                descriptionRaw={post.meta_desc || post.excerpt}
                keywordsRaw={post.meta_keywords || undefined}
            />

            {/* Hero Image */}
            <FadeIn direction="up" className="w-full max-w-5xl mx-auto px-4 pt-8">
                <div className="aspect-[21/9] w-full overflow-hidden bg-slate-100">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                </div>
            </FadeIn>

            <div className="max-w-3xl mx-auto px-4 py-12">
                <FadeIn direction="up" delay={0.1}>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[10px] font-bold text-black uppercase tracking-[0.15em] bg-slate-100 px-3 py-1">{post.category}</span>
                        <span className="text-[10px] font-medium text-gray-400 font-mono">{formatDate(post.published_at)}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-[Newsreader] font-bold text-slate-900 mb-6 leading-tight">{post.title}</h1>
                    <p className="text-lg text-slate-500 font-light leading-relaxed mb-10 border-b border-[#e6dfcc] pb-10">{post.excerpt}</p>
                </FadeIn>

                <FadeIn direction="up" delay={0.2}>
                    <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
                        {renderContent(post.content)}
                    </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.3} className="mt-16 pt-8 border-t border-[#e6dfcc]">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <Link to="/blog" className="flex items-center gap-2 text-black font-bold text-xs uppercase tracking-widest hover:underline underline-offset-4">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            {t('blog_detail.back')}
                        </Link>
                        <Link to="/contact" className="h-12 px-8 bg-black text-white font-medium flex items-center justify-center hover:bg-slate-800 transition-colors">
                            {t('blog_detail.consult')}
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
