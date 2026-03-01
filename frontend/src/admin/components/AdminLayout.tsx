import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const navItems = [
    { to: '/admin', icon: 'dashboard', label: 'Dashboard', exact: true },
    { to: '/admin/messages', icon: 'inbox', label: 'Inbox' },
    { to: '/admin/projects', icon: 'apartment', label: 'Projects' },
    { to: '/admin/blog', icon: 'article', label: 'Blog' },
    { to: '/admin/services', icon: 'design_services', label: 'Services' },
    { to: '/admin/testimonials', icon: 'reviews', label: 'Testimonials' },
    { to: '/admin/faq', icon: 'quiz', label: 'FAQ' },
    { to: '/admin/content', icon: 'edit_note', label: 'Page Content' },
    { to: '/admin/settings', icon: 'settings', label: 'Settings' },
    { to: '/admin/media', icon: 'photo_library', label: 'Media' },
];

export default function AdminLayout() {
    const { signOut } = useAuth();
    const location = useLocation();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnread = async () => {
            const { count } = await supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false);
            if (count !== null) setUnreadCount(count);
        };
        fetchUnread();

        const channel = supabase.channel('public:messages')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, fetchUnread)
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    const isActive = (path: string, exact?: boolean) => {
        if (exact) return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen flex bg-accent/50 font-[Inter,system-ui,sans-serif]">
            {/* Sidebar — light, clean, blue accent */}
            <aside className="w-60 bg-white border-r border-[#d6cfbc] flex flex-col fixed h-full z-30">
                <div className="px-5 py-5 border-b border-[#e6dfcc]">
                    <Link to="/admin" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-base">apartment</span>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-gray-900">ATT CMS</h1>
                            <p className="text-[10px] text-gray-400">Content Manager</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 py-3 px-3 overflow-y-auto">
                    <p className="px-3 pt-2 pb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Menu</p>
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all mb-0.5 justify-between ${isActive(item.to, item.exact)
                                ? 'bg-accent text-secondary'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-accent'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`material-symbols-outlined text-lg ${isActive(item.to, item.exact) ? 'text-primary' : ''}`}>{item.icon}</span>
                                {item.label}
                            </div>
                            {item.label === 'Inbox' && unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-3 border-t border-[#e6dfcc] space-y-1">
                    <Link to="/" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-xs px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        View Website
                    </Link>
                    <button
                        onClick={signOut}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-500 text-xs w-full px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-60">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
