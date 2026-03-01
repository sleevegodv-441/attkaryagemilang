import { useEffect, useState } from 'react';
import { supabase, type Testimonial } from '../../lib/supabaseClient';

export default function AdminTestimonials() {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', role: '', quote: '', rating: 5, is_active: true, sort_order: 0 });
    const [previewKey, setPreviewKey] = useState(0);

    const fetch_ = async () => { setLoading(true); const { data } = await supabase.from('testimonials').select('*').order('sort_order'); setItems(data || []); setLoading(false); };
    useEffect(() => { fetch_(); }, []);

    const startEdit = (t: Testimonial) => { setEditing(t.id); setForm({ name: t.name, role: t.role, quote: t.quote, rating: t.rating, is_active: t.is_active, sort_order: t.sort_order }); };
    const startNew = () => { setEditing('new'); setForm({ name: '', role: '', quote: '', rating: 5, is_active: true, sort_order: 0 }); };
    const save = async () => { if (editing === 'new') { await supabase.from('testimonials').insert(form); } else { await supabase.from('testimonials').update(form).eq('id', editing); } setEditing(null); fetch_(); setPreviewKey(k => k + 1); };
    const remove = async (id: string) => { if (!confirm('Hapus?')) return; await supabase.from('testimonials').delete().eq('id', id); fetch_(); setPreviewKey(k => k + 1); };

    return (
        <div className="-m-8 h-[calc(100vh)] flex flex-col">
            <div className="bg-white border-b border-[#e6dfcc] px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">reviews</span>
                    <div><h1 className="text-lg font-bold text-gray-900">Testimonials</h1><p className="text-xs text-gray-400">Kelola testimoni klien</p></div>
                </div>
                <button onClick={startNew} className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover flex items-center gap-2"><span className="material-symbols-outlined text-sm">add</span> Tambah</button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto bg-accent/50 border-b lg:border-b-0 lg:border-r border-[#e6dfcc]">
                    {editing && (
                        <div className="m-4 bg-white rounded-xl p-5 space-y-4 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">reviews</span> {editing === 'new' ? 'New Testimonial' : 'Edit Testimonial'}</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama" className="px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                                <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Role (e.g. Pemilik Rumah, BSD)" className="px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                            </div>
                            <textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} placeholder="Testimoni" rows={3} className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                            <div className="flex gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500">Rating:</label>
                                    <select value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })} className="px-3 py-2 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                                        {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} ⭐</option>)}
                                    </select>
                                </div>
                                <label className="flex items-center gap-2.5 ml-auto cursor-pointer"><input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded text-primary focus:ring-primary" /> <span className="text-sm text-gray-700">Active</span></label>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={save} className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover">Save</button>
                                <button onClick={() => setEditing(null)} className="text-gray-500 px-5 py-2 rounded-lg text-sm border border-[#d6cfbc] hover:bg-accent">Cancel</button>
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <div className="p-12 text-center"><span className="material-symbols-outlined animate-spin text-gray-300">progress_activity</span></div>
                    ) : (
                        <div className="p-4 space-y-2">
                            {items.map(t => (
                                <div key={t.id} className="bg-white rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
                                    <div className="size-9 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5"><span className="material-symbols-outlined text-primary text-base">person</span></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-gray-900 text-sm">{t.name}</h3>
                                            {!t.is_active && <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-medium">Hidden</span>}
                                        </div>
                                        <p className="text-[10px] text-gray-400">{t.role}</p>
                                        <p className="text-xs text-gray-500 mt-1 italic line-clamp-2">"{t.quote}"</p>
                                        <p className="text-[10px] text-amber-500 mt-0.5">{'⭐'.repeat(t.rating)}</p>
                                    </div>
                                    <button onClick={() => startEdit(t)} className="text-gray-400 hover:text-primary p-1 rounded-lg hover:bg-accent transition-colors"><span className="material-symbols-outlined text-base">edit</span></button>
                                    <button onClick={() => remove(t.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors"><span className="material-symbols-outlined text-base">delete</span></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-gray-100 flex flex-col">
                    <div className="px-4 py-3 bg-white border-b border-[#e6dfcc] flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-gray-400 text-sm">desktop_windows</span><span className="text-xs font-medium text-gray-500">Live Preview — Homepage Testimonials</span></div>
                        <button onClick={() => setPreviewKey(k => k + 1)} className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"><span className="material-symbols-outlined text-sm">refresh</span> Refresh</button>
                    </div>
                    <div className="flex-1 p-4 overflow-hidden">
                        <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
                            <iframe key={previewKey} src="/" className="w-full h-full border-0" title="Preview" style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
