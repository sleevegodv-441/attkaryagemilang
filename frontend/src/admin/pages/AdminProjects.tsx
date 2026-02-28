import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, type Project } from '../../lib/supabaseClient';

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [previewKey, setPreviewKey] = useState(0);

    const fetchProjects = async () => {
        setLoading(true);
        const { data } = await supabase.from('projects').select('*').order('sort_order');
        setProjects(data || []);
        setLoading(false);
    };
    useEffect(() => { fetchProjects(); }, []);

    const deleteProject = async (id: string) => {
        if (!confirm('Hapus proyek ini?')) return;
        await supabase.from('projects').delete().eq('id', id);
        fetchProjects();
        setPreviewKey(k => k + 1);
    };

    return (
        <div className="-m-8 h-[calc(100vh)] flex flex-col">
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">apartment</span>
                    <div><h1 className="text-lg font-bold text-gray-900">Manage Projects</h1><p className="text-xs text-gray-400">Kelola portofolio proyek</p></div>
                </div>
                <Link to="/admin/projects/new" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span> Tambah Project
                </Link>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left: List */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto bg-gray-50/50 border-b lg:border-b-0 lg:border-r border-gray-100">
                    {loading ? (
                        <div className="p-12 text-center"><span className="material-symbols-outlined animate-spin text-gray-300">progress_activity</span></div>
                    ) : projects.length === 0 ? (
                        <div className="p-12 text-center">
                            <span className="material-symbols-outlined text-4xl text-gray-200">apartment</span>
                            <p className="text-gray-400 mt-2">Belum ada proyek</p>
                            <Link to="/admin/projects/new" className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium mt-3 hover:underline"><span className="material-symbols-outlined text-sm">add</span> Tambah proyek pertama</Link>
                        </div>
                    ) : (
                        <div className="p-4 space-y-2">
                            {projects.map(p => (
                                <div key={p.id} className="bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                    {p.image_url ? <img src={p.image_url} alt={p.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" /> : <div className="w-16 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center"><span className="material-symbols-outlined text-gray-300">image</span></div>}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 text-sm truncate">{p.title}</h3>
                                        <div className="flex gap-2 mt-1">
                                            <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-medium">{p.category?.replace('_', ' ')}</span>
                                            {p.location && <span className="text-[10px] text-gray-400">{p.location}</span>}
                                            {p.is_featured && <span className="bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded-full font-medium">Featured</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                        <Link to={`/admin/projects/${p.id}`} className="text-gray-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"><span className="material-symbols-outlined text-lg">edit</span></Link>
                                        <button onClick={() => deleteProject(p.id)} className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Live Preview */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-gray-100 flex flex-col">
                    <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-gray-400 text-sm">desktop_windows</span>
                            <span className="text-xs font-medium text-gray-500">Live Preview — Portfolio Page</span>
                        </div>
                        <button onClick={() => setPreviewKey(k => k + 1)} className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"><span className="material-symbols-outlined text-sm">refresh</span> Refresh</button>
                    </div>
                    <div className="flex-1 p-4 overflow-hidden">
                        <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
                            <iframe key={previewKey} src="/portfolio" className="w-full h-full border-0" title="Preview"
                                style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
