import { useEffect, useState } from 'react';
import { supabase, type FAQItem } from '../../lib/supabaseClient';

export default function AdminFAQ() {
    const [items, setItems] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({ question: '', answer: '', sort_order: 0, is_active: true });
    const [previewKey, setPreviewKey] = useState(0);

    const fetch_ = async () => { setLoading(true); const { data } = await supabase.from('faq_items').select('*').order('sort_order'); setItems(data || []); setLoading(false); };
    useEffect(() => { fetch_(); }, []);

    const startEdit = (f: FAQItem) => { setEditing(f.id); setForm({ question: f.question, answer: f.answer, sort_order: f.sort_order, is_active: f.is_active }); };
    const startNew = () => { setEditing('new'); setForm({ question: '', answer: '', sort_order: items.length, is_active: true }); };
    const save = async () => { if (editing === 'new') { await supabase.from('faq_items').insert(form); } else { await supabase.from('faq_items').update(form).eq('id', editing); } setEditing(null); fetch_(); setPreviewKey(k => k + 1); };
    const remove = async (id: string) => { if (!confirm('Hapus FAQ ini?')) return; await supabase.from('faq_items').delete().eq('id', id); fetch_(); setPreviewKey(k => k + 1); };

    return (
        <div className="-m-8 h-[calc(100vh)] flex flex-col">
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">quiz</span>
                    <div><h1 className="text-lg font-bold text-gray-900">FAQ</h1><p className="text-xs text-gray-400">Kelola pertanyaan yang sering ditanyakan</p></div>
                </div>
                <button onClick={startNew} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><span className="material-symbols-outlined text-sm">add</span> Tambah</button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto bg-gray-50/50 border-b lg:border-b-0 lg:border-r border-gray-100">
                    {editing && (
                        <div className="m-4 bg-white rounded-xl p-5 space-y-4 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="material-symbols-outlined text-blue-500 text-base">quiz</span> {editing === 'new' ? 'New FAQ' : 'Edit FAQ'}</h3>
                            <input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} placeholder="Pertanyaan" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            <textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} placeholder="Jawaban" rows={4} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            <div className="flex gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Sort</label>
                                    <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <label className="flex items-center gap-2.5 ml-auto cursor-pointer"><input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" /> <span className="text-sm text-gray-700">Active</span></label>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={save} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
                                <button onClick={() => setEditing(null)} className="text-gray-500 px-5 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50">Cancel</button>
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <div className="p-12 text-center"><span className="material-symbols-outlined animate-spin text-gray-300">progress_activity</span></div>
                    ) : (
                        <div className="p-4 space-y-2">
                            {items.map((f, i) => (
                                <div key={f.id} className="bg-white rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
                                    <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-[10px] font-bold text-blue-600">{i + 1}</span></div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 text-sm">{f.question} {!f.is_active && <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded-full ml-1 font-medium">Hidden</span>}</h3>
                                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{f.answer}</p>
                                    </div>
                                    <button onClick={() => startEdit(f)} className="text-gray-400 hover:text-blue-600 p-1 rounded-lg hover:bg-blue-50 transition-colors"><span className="material-symbols-outlined text-base">edit</span></button>
                                    <button onClick={() => remove(f.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors"><span className="material-symbols-outlined text-base">delete</span></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-gray-100 flex flex-col">
                    <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-gray-400 text-sm">desktop_windows</span><span className="text-xs font-medium text-gray-500">Live Preview — About Page FAQ</span></div>
                        <button onClick={() => setPreviewKey(k => k + 1)} className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"><span className="material-symbols-outlined text-sm">refresh</span> Refresh</button>
                    </div>
                    <div className="flex-1 p-4 overflow-hidden">
                        <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
                            <iframe key={previewKey} src="/about" className="w-full h-full border-0" title="Preview" style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
