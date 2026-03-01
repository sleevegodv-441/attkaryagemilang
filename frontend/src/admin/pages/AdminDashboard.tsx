import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

interface Stats { projects: number; blogPosts: number; services: number; testimonials: number; }

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ projects: 0, blogPosts: 0, services: 0, testimonials: 0 });

    useEffect(() => {
        async function fetchStats() {
            const [p, b, s, t] = await Promise.all([
                supabase.from('projects').select('id', { count: 'exact', head: true }),
                supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
                supabase.from('services').select('id', { count: 'exact', head: true }),
                supabase.from('testimonials').select('id', { count: 'exact', head: true }),
            ]);
            setStats({ projects: p.count || 0, blogPosts: b.count || 0, services: s.count || 0, testimonials: t.count || 0 });
        }
        fetchStats();
    }, []);

    const cards = [
        { label: 'Projects', count: stats.projects, icon: 'apartment', to: '/admin/projects', gradient: 'from-blue-500 to-blue-600' },
        { label: 'Blog Posts', count: stats.blogPosts, icon: 'article', to: '/admin/blog', gradient: 'from-emerald-500 to-emerald-600' },
        { label: 'Services', count: stats.services, icon: 'design_services', to: '/admin/services', gradient: 'from-violet-500 to-violet-600' },
        { label: 'Testimonials', count: stats.testimonials, icon: 'reviews', to: '/admin/testimonials', gradient: 'from-amber-500 to-amber-600' },
    ];

    const quickLinks = [
        { label: 'Add New Project', icon: 'add_circle', to: '/admin/projects/new', desc: 'Create a portfolio project' },
        { label: 'Write Blog Post', icon: 'edit', to: '/admin/blog/new', desc: 'Publish a new article' },
        { label: 'Edit Page Content', icon: 'edit_note', to: '/admin/content', desc: 'Update texts & images' },
        { label: 'Site Settings', icon: 'settings', to: '/admin/settings', desc: 'Company info & branding' },
        { label: 'Upload Media', icon: 'cloud_upload', to: '/admin/media', desc: 'Manage image gallery' },
        { label: 'Manage FAQ', icon: 'quiz', to: '/admin/faq', desc: 'Questions & answers' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-400 text-sm mt-1">Overview konten website ATT Karya Gemilang</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cards.map(card => (
                    <Link key={card.label} to={card.to} className="bg-white rounded-2xl p-5 border border-[#e6dfcc] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`bg-gradient-to-br ${card.gradient} text-white p-2.5 rounded-xl`}>
                                <span className="material-symbols-outlined text-xl">{card.icon}</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-200 group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{card.count}</p>
                        <p className="text-gray-400 text-sm mt-1">{card.label}</p>
                    </Link>
                ))}
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickLinks.map(link => (
                        <Link key={link.label} to={link.to} className="bg-white rounded-xl p-4 border border-[#e6dfcc] hover:border-blue-200 hover:bg-accent/30 transition-all duration-200 flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-lg bg-accent group-hover:bg-accent flex items-center justify-center transition-colors">
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">{link.icon}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{link.label}</p>
                                <p className="text-[11px] text-gray-400">{link.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
