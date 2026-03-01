import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, type BlogPost } from '../../lib/supabaseClient';

export default function AdminBlog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [previewKey, setPreviewKey] = useState(0);

    const fetchPosts = async () => { setLoading(true); const { data } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false }); setPosts(data || []); setLoading(false); };
    useEffect(() => { fetchPosts(); }, []);
    const deletePost = async (id: string) => { if (!confirm('Hapus artikel ini?')) return; await supabase.from('blog_posts').delete().eq('id', id); fetchPosts(); setPreviewKey(k => k + 1); };

    return (
        <div className="-m-8 h-[calc(100vh)] flex flex-col">
            <div className="bg-white border-b border-[#e6dfcc] px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">article</span>
                    <div><h1 className="text-lg font-bold text-gray-900">Blog Posts</h1><p className="text-xs text-gray-400">Kelola artikel blog</p></div>
                </div>
                <Link to="/admin/blog/new" className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span> Tulis Artikel
                </Link>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto bg-accent/50 border-b lg:border-b-0 lg:border-r border-[#e6dfcc]">
                    {loading ? (
                        <div className="p-12 text-center"><span className="material-symbols-outlined animate-spin text-gray-300">progress_activity</span></div>
                    ) : posts.length === 0 ? (
                        <div className="p-12 text-center">
                            <span className="material-symbols-outlined text-4xl text-gray-200">article</span>
                            <p className="text-gray-400 mt-2">Belum ada artikel</p>
                            <Link to="/admin/blog/new" className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3 hover:underline"><span className="material-symbols-outlined text-sm">add</span> Tulis artikel pertama</Link>
                        </div>
                    ) : (
                        <div className="p-4 space-y-2">
                            {posts.map(post => (
                                <div key={post.id} className="bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                    {post.image_url ? <img src={post.image_url} alt={post.title} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" /> : <div className="w-20 h-14 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center"><span className="material-symbols-outlined text-gray-300">image</span></div>}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 text-sm truncate">{post.title}</h3>
                                        <div className="flex gap-2 mt-1">
                                            <span className="bg-accent text-primary text-[10px] px-2 py-0.5 rounded-full font-medium">{post.category}</span>
                                            <span className="text-[10px] text-gray-400">/{post.slug}</span>
                                            {post.is_featured && <span className="bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded-full font-medium">Featured</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                        <Link to={`/admin/blog/${post.id}`} className="text-gray-400 hover:text-primary p-1.5 rounded-lg hover:bg-accent transition-colors"><span className="material-symbols-outlined text-lg">edit</span></Link>
                                        <button onClick={() => deletePost(post.id)} className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-gray-100 flex flex-col">
                    <div className="px-4 py-3 bg-white border-b border-[#e6dfcc] flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-gray-400 text-sm">desktop_windows</span><span className="text-xs font-medium text-gray-500">Live Preview — Blog Page</span></div>
                        <button onClick={() => setPreviewKey(k => k + 1)} className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"><span className="material-symbols-outlined text-sm">refresh</span> Refresh</button>
                    </div>
                    <div className="flex-1 p-4 overflow-hidden">
                        <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
                            <iframe key={previewKey} src="/blog" className="w-full h-full border-0" title="Preview" style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
