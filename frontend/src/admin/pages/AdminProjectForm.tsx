import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const categories = ['bangun_baru', 'renovasi', 'interior', 'commercial'];
const catLabels: Record<string, string> = { bangun_baru: 'Bangun Baru', renovasi: 'Renovasi', interior: 'Interior', commercial: 'Commercial' };

export default function AdminProjectForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: '', category: 'renovasi', location: '', description: '',
        image_url: '', client_name: '', duration: '', area: '',
        is_featured: false, sort_order: 0,
        slug: '', content: '', before_image: '', after_image: '', image_gallery: [] as string[]
    });

    const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    useEffect(() => {
        if (isEdit) {
            supabase.from('projects').select('*').eq('id', id).single().then(({ data }) => {
                if (data) setForm(data);
            });
        }
    }, [id, isEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const payload = { ...form, slug: form.slug || generateSlug(form.title) };
        if (isEdit) { await supabase.from('projects').update(payload).eq('id', id); }
        else { await supabase.from('projects').insert(payload); }
        setSaving(false);
        navigate('/admin/projects');
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const path = `projects/${Date.now()}.${file.name.split('.').pop()}`;
        const { error } = await supabase.storage.from('images').upload(path, file);
        if (!error) { const { data } = supabase.storage.from('images').getPublicUrl(path); setForm({ ...form, image_url: data.publicUrl }); }
    };

    const set = (key: string, val: any) => setForm({ ...form, [key]: val });

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const newUrls: string[] = [];
        for (const file of files) {
            const path = `projects/gallery/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
            const { error } = await supabase.storage.from('images').upload(path, file);
            if (!error) {
                const { data } = supabase.storage.from('images').getPublicUrl(path);
                newUrls.push(data.publicUrl);
            }
        }
        if (newUrls.length > 0) {
            setForm(prev => ({ ...prev, image_gallery: [...(prev.image_gallery || []), ...newUrls] }));
        }
    };

    return (
        <div className="-m-8 h-[calc(100vh)] flex flex-col">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/admin/projects')} className="text-gray-400 hover:text-gray-700 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Project' : 'New Project'}</h1>
                        <p className="text-xs text-gray-400">Fill in the details below</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/admin/projects')} className="text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50">Cancel</button>
                    <button onClick={(e) => { e.preventDefault(); handleSubmit(e as unknown as React.FormEvent); }} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium rounded-lg px-5 py-2 hover:bg-blue-700 disabled:opacity-60">
                        {saving && <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>}
                        <span className="material-symbols-outlined text-sm">save</span>
                        {isEdit ? 'Save Changes' : 'Create Project'}
                    </button>
                </div>
            </div>

            {/* Split Pane: Form | Preview */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Form */}
                <div className="w-1/2 overflow-y-auto bg-gray-50/50 border-r border-gray-100">
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        {/* Project Title */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500 text-base">badge</span> Project Details
                            </h3>
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Project Title</label>
                                <input value={form.title} onChange={e => { set('title', e.target.value); if (!form.slug) set('slug', generateSlug(e.target.value)); }} required placeholder="Villa Serenity" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Slug</label>
                                <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="villa-serenity" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
                                    <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                        {categories.map(c => <option key={c} value={c}>{catLabels[c]}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Location</label>
                                    <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Jakarta Selatan" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Short Description</label>
                                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Brief project description for cards..." className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        {/* Full Content */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500 text-base">edit_note</span> Full Project Detail (Content)
                            </h3>
                            <div>
                                <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={8} placeholder="Write detailed project case study here (supports markdown)..." className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm resize-y font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        {/* Image */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500 text-base">image</span> Cover Image
                            </h3>
                            {form.image_url && <img src={form.image_url} alt="" className="w-full h-44 object-cover rounded-lg" />}
                            <div className="flex gap-2">
                                <input value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="Paste image URL" className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <label className="flex items-center gap-1 bg-gray-100 px-4 py-2.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors">
                                    <span className="material-symbols-outlined text-sm">upload</span> Upload
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </label>
                            </div>
                        </div>

                        {/* Featured Before/After slider Images */}
                        {form.is_featured && (
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500 text-base">compare</span> Featured: Before/After Slider
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Before Image</label>
                                        {form.before_image && <img src={form.before_image} alt="" className="w-full h-24 object-cover rounded mb-2 border border-gray-200" />}
                                        <input value={form.before_image} onChange={e => set('before_image', e.target.value)} placeholder="Image URL" className="w-full px-3 py-2 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">After Image</label>
                                        {form.after_image && <img src={form.after_image} alt="" className="w-full h-24 object-cover rounded mb-2 border border-gray-200" />}
                                        <input value={form.after_image} onChange={e => set('after_image', e.target.value)} placeholder="Image URL" className="w-full px-3 py-2 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Image Gallery */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 justify-between w-full">
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-500 text-base">collections</span> Image Gallery (Renders, Process, Results)</span>
                                <label className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-100 cursor-pointer transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">add_photo_alternate</span> Add Photos
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                                </label>
                            </h3>
                            {form.image_gallery && form.image_gallery.length > 0 ? (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {form.image_gallery.map((url, i) => (
                                        <div key={i} className="relative group aspect-square rounded overflow-hidden border border-gray-200">
                                            <img src={url} alt="" className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => setForm(f => ({ ...f, image_gallery: f.image_gallery.filter((_, idx) => idx !== i) }))} className="absolute top-1 right-1 bg-white/90 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-50">
                                                <span className="material-symbols-outlined text-[14px]">close</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 bg-gray-50 border border-dashed border-gray-200 rounded-lg text-sm text-gray-400">
                                    No images in gallery yet
                                </div>
                            )}
                        </div>

                        {/* Meta */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500 text-base">info</span> Additional Info
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Client</label>
                                    <input value={form.client_name} onChange={e => set('client_name', e.target.value)} placeholder="Bpk. Handoko" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Duration</label>
                                    <input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="4 Bulan" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Area</label>
                                    <input value={form.area} onChange={e => set('area', e.target.value)} placeholder="250 m²" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Sort Order</label>
                                    <input type="number" value={form.sort_order} onChange={e => set('sort_order', parseInt(e.target.value) || 0)} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="flex items-end pb-1">
                                    <label className="flex items-center gap-2.5 cursor-pointer">
                                        <input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">Featured on Home page</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right: Live Card Preview */}
                <div className="w-1/2 bg-gray-100 flex flex-col">
                    <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-2 flex-shrink-0">
                        <span className="material-symbols-outlined text-gray-400 text-sm">visibility</span>
                        <span className="text-xs font-medium text-gray-500">Live Preview</span>
                        <span className="text-[10px] text-gray-400 ml-2">— Tampilan kartu di halaman portfolio</span>
                    </div>
                    <div className="flex-1 p-8 flex items-start justify-center overflow-y-auto">
                        <div className="w-full max-w-sm">
                            {/* Website-style Project Card Preview */}
                            <div className="bg-white shadow-lg overflow-hidden rounded-xl border border-gray-100 group">
                                <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                                    {form.image_url ? (
                                        <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-gray-300">image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{form.location || 'Location'}</span>
                                    <h3 className="text-lg font-bold text-gray-900 mt-1 font-[Newsreader]">{form.title || 'Project Title'}</h3>
                                    {form.description && <p className="text-gray-500 text-xs mt-2 line-clamp-2">{form.description}</p>}
                                </div>
                            </div>

                            {/* Mini info box */}
                            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                                <p className="text-xs font-medium text-blue-700 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sm">info</span> Preview kartu ini akan tampil di:
                                </p>
                                <div className="text-[11px] text-blue-600 space-y-1">
                                    <p>📍 Halaman <strong>Portfolio</strong> — grid galeri proyek</p>
                                    <p>📍 Halaman <strong>Home</strong> — 3 proyek teratas</p>
                                </div>
                            </div>

                            {/* Meta details preview */}
                            {(form.client_name || form.duration || form.area) && (
                                <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-2">
                                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Project Details</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {form.client_name && <div><p className="text-[10px] text-gray-400">Client</p><p className="text-xs font-medium text-gray-900">{form.client_name}</p></div>}
                                        {form.duration && <div><p className="text-[10px] text-gray-400">Duration</p><p className="text-xs font-medium text-gray-900">{form.duration}</p></div>}
                                        {form.area && <div><p className="text-[10px] text-gray-400">Area</p><p className="text-xs font-medium text-gray-900">{form.area}</p></div>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
