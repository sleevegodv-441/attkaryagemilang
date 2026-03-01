import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function AdminBlogForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: '', slug: '', excerpt: '', content: '', category: '',
        image_url: '', is_featured: false, published_at: new Date().toISOString().slice(0, 16),
        meta_title: '', meta_desc: '', meta_keywords: ''
    });

    useEffect(() => {
        if (isEdit) {
            supabase.from('blog_posts').select('*').eq('id', id).single().then(({ data }) => {
                if (data) setForm({ ...data, published_at: data.published_at?.slice(0, 16) || '' });
            });
        }
    }, [id, isEdit]);

    const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        const payload = { ...form, slug: form.slug || generateSlug(form.title) };
        if (isEdit) { await supabase.from('blog_posts').update(payload).eq('id', id); }
        else { await supabase.from('blog_posts').insert(payload); }
        setSaving(false); navigate('/admin/blog');
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        const path = `blog/${Date.now()}.${file.name.split('.').pop()}`;
        const { error } = await supabase.storage.from('images').upload(path, file);
        if (!error) { const { data } = supabase.storage.from('images').getPublicUrl(path); setForm({ ...form, image_url: data.publicUrl }); }
    };

    const set = (key: string, val: string | boolean) => setForm({ ...form, [key]: val });

    const formattedDate = form.published_at ? new Date(form.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanggal Publish';

    return (
        <div className="-m-8 h-[calc(100vh)] flex flex-col">
            <div className="bg-white border-b border-[#e6dfcc] px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/admin/blog')} className="text-gray-400 hover:text-gray-700 transition-colors"><span className="material-symbols-outlined">arrow_back</span></button>
                    <div><h1 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Article' : 'New Article'}</h1><p className="text-xs text-gray-400">Write and publish blog content</p></div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/admin/blog')} className="text-sm text-gray-500 border border-[#d6cfbc] rounded-lg px-4 py-2 hover:bg-accent transition-colors">Cancel</button>
                    <button onClick={(e) => handleSubmit(e as unknown as React.FormEvent)} disabled={saving} className="flex items-center gap-2 bg-primary text-white text-sm font-medium rounded-lg px-5 py-2 hover:bg-primary-hover disabled:opacity-60 transition-colors">
                        {saving && <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>}
                        <span className="material-symbols-outlined text-sm">publish</span> {isEdit ? 'Update' : 'Publish'}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left: Form */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto bg-accent/50 border-b lg:border-b-0 lg:border-r border-[#e6dfcc]">
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        <div className="bg-white rounded-xl shadow-sm border-[#e6dfcc] border p-5 space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">article</span> Article Info</h3>
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Title</label>
                                <input value={form.title} onChange={e => { set('title', e.target.value); if (!form.slug) setForm(f => ({ ...f, slug: generateSlug(e.target.value) })); }} required placeholder="Article title" className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Slug</label><input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="auto-generated" className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" /></div>
                                <div><label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Category</label><input value={form.category} onChange={e => set('category', e.target.value)} placeholder="Renovasi, Tips, etc" className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" /></div>
                            </div>
                            <div><label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Excerpt</label><textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2} placeholder="Brief summary..." className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" /></div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border-[#e6dfcc] border p-5 space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">search</span> SEO Metadata</h3>
                            <div><label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Meta Title</label><input value={form.meta_title} onChange={e => set('meta_title', e.target.value)} placeholder="SEO Title (optional)" className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" /></div>
                            <div><label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Meta Description</label><textarea value={form.meta_desc} onChange={e => set('meta_desc', e.target.value)} rows={2} placeholder="SEO Description (optional)" className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" /></div>
                            <div><label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Meta Keywords</label><textarea value={form.meta_keywords} onChange={e => set('meta_keywords', e.target.value)} rows={2} placeholder="keyword1, keyword2, keyword3" className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" /></div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border-[#e6dfcc] border p-5 space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">edit_note</span> Content</h3>
                            <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={14} placeholder="Write your article (supports markdown)..." className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm resize-y font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border-[#e6dfcc] border p-5 space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">image</span> Cover Image</h3>
                            {form.image_url && <img src={form.image_url} alt="" className="w-full h-44 object-cover rounded-lg" />}
                            <div className="flex gap-2">
                                <input value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="Paste image URL" className="flex-1 px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                                <label className="flex items-center gap-1 bg-gray-100 px-4 py-2.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors">
                                    <span className="material-symbols-outlined text-sm">upload</span> Upload
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </label>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border-[#e6dfcc] border p-5 space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">settings</span> Settings</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Publish Date</label><input type="datetime-local" value={form.published_at} onChange={e => set('published_at', e.target.value)} className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" /></div>
                                <div className="flex items-end pb-1"><label className="flex items-center gap-2.5 cursor-pointer"><input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked as unknown as string)} className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300" /><span className="text-sm text-gray-700">Featured article</span></label></div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right: Live Card Preview */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-gray-100 flex flex-col">
                    <div className="px-4 py-3 bg-white border-b border-[#e6dfcc] flex items-center gap-2 flex-shrink-0">
                        <span className="material-symbols-outlined text-gray-400 text-sm">visibility</span>
                        <span className="text-xs font-medium text-gray-500">Live Preview</span>
                        <span className="text-[10px] text-gray-400 ml-2">— Tampilan kartu di halaman blog</span>
                    </div>
                    <div className="flex-1 p-8 flex items-start justify-center overflow-y-auto">
                        <div className="w-full max-w-sm">
                            {/* Website-style Blog Card Preview */}
                            <div className="bg-white shadow-lg overflow-hidden rounded-xl border border-[#e6dfcc] group">
                                <div className="aspect-[16/10] overflow-hidden bg-gray-200 relative">
                                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                                            {form.category || 'Category'}
                                        </span>
                                    </div>
                                    {form.image_url ? (
                                        <img src={form.image_url} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-gray-300">image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-medium">
                                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                                        {formattedDate}
                                    </div>
                                    <h3 className="text-[18px] font-bold text-gray-900 font-[Newsreader] leading-snug line-clamp-2">
                                        {form.title || 'Judul Artikel Anda Akan Tampil Di Sini'}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                                        {form.excerpt || 'Ringkasan artikel akan tampil di sini. Pastikan kalimat awal menarik untuk dibaca.'}
                                    </p>
                                    <div className="mt-5 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                                        Baca Selengkapnya
                                        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mini info box */}
                            <div className="mt-6 bg-accent border border-blue-200 rounded-xl p-4 space-y-2">
                                <p className="text-xs font-medium text-secondary flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sm">info</span> Preview kartu ini akan tampil di:
                                </p>
                                <div className="text-[11px] text-primary space-y-1">
                                    <p>📍 Halaman <strong>Blog</strong> — grid artikel terbaru</p>
                                    <p>📍 Halaman <strong>Home</strong> — jika ditandai sebagai "Featured"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
