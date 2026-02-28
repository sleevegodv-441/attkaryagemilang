import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface FileObject { name: string; id: string; created_at: string; metadata: { mimetype: string; size: number }; }

export default function AdminMedia() {
    const [files, setFiles] = useState<FileObject[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [copied, setCopied] = useState('');

    const fetchFiles = async () => {
        setLoading(true);
        const { data } = await supabase.storage.from('images').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
        setFiles((data as unknown as FileObject[]) || []);
        setLoading(false);
    };
    useEffect(() => { fetchFiles(); }, []);

    const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        const path = `uploads/${Date.now()}.${file.name.split('.').pop()}`;
        await supabase.storage.from('images').upload(path, file);
        setUploading(false); fetchFiles();
    };

    const getUrl = (name: string) => { const { data } = supabase.storage.from('images').getPublicUrl(name); return data.publicUrl; };
    const copyUrl = (name: string) => { navigator.clipboard.writeText(getUrl(name)); setCopied(name); setTimeout(() => setCopied(''), 2000); };
    const deleteFile = async (name: string) => { if (!confirm('Hapus file ini?')) return; await supabase.storage.from('images').remove([name]); fetchFiles(); };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-gray-900">Media Library</h1><p className="text-gray-400 text-sm mt-1">Upload dan kelola gambar</p></div>
                <label className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 cursor-pointer transition-colors">
                    {uploading ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">cloud_upload</span>}
                    Upload Image
                    <input type="file" accept="image/*" onChange={upload} className="hidden" />
                </label>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-12 text-center"><span className="material-symbols-outlined animate-spin text-gray-300">progress_activity</span></div>
            ) : files.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                    <span className="material-symbols-outlined text-4xl text-gray-200">photo_library</span>
                    <p className="text-gray-400 mt-2">Belum ada gambar</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {files.filter(f => !f.name.startsWith('.')).map(f => (
                        <div key={f.id || f.name} className="bg-white rounded-xl overflow-hidden group hover:shadow-lg transition-shadow">
                            <div className="aspect-square bg-gray-100 relative">
                                <img src={getUrl(f.name)} alt={f.name} className="w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button onClick={() => copyUrl(f.name)} className="bg-white text-gray-900 p-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-sm">{copied === f.name ? 'check' : 'content_copy'}</span>
                                    </button>
                                    <button onClick={() => deleteFile(f.name)} className="bg-red-500 text-white p-2.5 rounded-xl hover:bg-red-600 transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </div>
                            <div className="px-3 py-2.5">
                                <p className="text-xs text-gray-400 truncate">{f.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
