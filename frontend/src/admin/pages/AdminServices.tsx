import { useEffect, useState } from 'react';
import { supabase, type Service } from '../../lib/supabaseClient';

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({ title: '', description: '', price_label: '', features: '' as string, icon: 'construction', is_popular: false, sort_order: 0 });
    const [previewKey, setPreviewKey] = useState(0);

    const fetchServices = async () => { setLoading(true); const { data } = await supabase.from('services').select('*').order('sort_order'); setServices(data || []); setLoading(false); };
    useEffect(() => { fetchServices(); }, []);

    const startEdit = (s: Service) => { setEditing(s.id); setForm({ title: s.title, description: s.description, price_label: s.price_label, features: (s.features || []).join('\n'), icon: s.icon, is_popular: s.is_popular, sort_order: s.sort_order }); };
    const startNew = () => { setEditing('new'); setForm({ title: '', description: '', price_label: '', features: '', icon: 'construction', is_popular: false, sort_order: 0 }); };
    const save = async () => { const payload = { ...form, features: form.features.split('\n').filter(Boolean) }; if (editing === 'new') { await supabase.from('services').insert(payload); } else { await supabase.from('services').update(payload).eq('id', editing); } setEditing(null); fetchServices(); setPreviewKey(k => k + 1); };
    const remove = async (id: string) => { if (!confirm('Hapus layanan ini?')) return; await supabase.from('services').delete().eq('id', id); fetchServices(); setPreviewKey(k => k + 1); };

    return (
        <div className="-m-8 h-[calc(100vh)] flex flex-col">
            <div className="bg-white border-b border-[#e6dfcc] px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">design_services</span>
                    <div><h1 className="text-lg font-bold text-gray-900">Services</h1><p className="text-xs text-gray-400">Kelola layanan</p></div>
                </div>
                <button onClick={startNew} className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover flex items-center gap-2"><span className="material-symbols-outlined text-sm">add</span> Tambah</button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto bg-accent/50 border-b lg:border-b-0 lg:border-r border-[#e6dfcc]">
                    {editing && (
                        <div className="m-4 bg-white rounded-xl p-5 space-y-4 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">design_services</span> {editing === 'new' ? 'New Service' : 'Edit Service'}</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                                <input value={form.price_label} onChange={e => setForm({ ...form, price_label: e.target.value })} placeholder="Price Label" className="px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                                <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="Material Icon" className="px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                                <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} placeholder="Sort" className="px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                            </div>
                            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={2} className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                            <textarea value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} placeholder="Features (one per line)" rows={3} className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                            <label className="flex items-center gap-2.5 cursor-pointer"><input type="checkbox" checked={form.is_popular} onChange={e => setForm({ ...form, is_popular: e.target.checked })} className="w-4 h-4 rounded text-primary focus:ring-primary" /> <span className="text-sm text-gray-700">Popular badge</span></label>
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
                            {services.map(s => (
                                <div key={s.id} className="bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-primary">{s.icon}</span></div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 text-sm">{s.title} {s.is_popular && <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full ml-1 font-medium">Popular</span>}</h3>
                                        <p className="text-xs text-gray-400">{s.price_label} · {(s.features || []).length} features</p>
                                    </div>
                                    <button onClick={() => startEdit(s)} className="text-gray-400 hover:text-primary p-1.5 rounded-lg hover:bg-accent transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                                    <button onClick={() => remove(s.id)} className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-gray-100 flex flex-col">
                    <div className="px-4 py-3 bg-white border-b border-[#e6dfcc] flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-gray-400 text-sm">desktop_windows</span><span className="text-xs font-medium text-gray-500">Live Preview — Services Page</span></div>
                        <button onClick={() => setPreviewKey(k => k + 1)} className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"><span className="material-symbols-outlined text-sm">refresh</span> Refresh</button>
                    </div>
                    <div className="flex-1 p-4 overflow-hidden">
                        <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
                            <iframe key={previewKey} src="/services" className="w-full h-full border-0" title="Preview" style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
