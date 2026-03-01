import { useEffect, useState } from 'react';
import { supabase, type Project, type BlogPost, type Service, type Testimonial, type FAQItem, type SiteSetting } from './supabaseClient';

// ─── Projects ────────────────────────────────────────
export function useProjects(featured?: boolean) {
    const [data, setData] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let q = supabase.from('projects').select('*').order('sort_order');
        if (featured) q = q.eq('is_featured', true);
        q.then(({ data }) => { setData(data || []); setLoading(false); });
    }, [featured]);

    return { projects: data, loading };
}

export function useProject(slugOrId: string) {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slugOrId) {
            setLoading(false);
            return;
        }

        // Check if slugOrId is a valid UUID
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);

        let query = supabase.from('projects').select('*');
        if (isUuid) {
            query = query.eq('id', slugOrId);
        } else {
            query = query.eq('slug', slugOrId);
        }

        query.single().then(({ data }) => {
            setProject(data);
            setLoading(false);
        });
    }, [slugOrId]);

    return { project, loading };
}

// ─── Blog Posts ──────────────────────────────────────
export function useBlogPosts(featured?: boolean) {
    const [data, setData] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let q = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
        if (featured) q = q.eq('is_featured', true).limit(1);
        q.then(({ data }) => { setData(data || []); setLoading(false); });
    }, [featured]);

    return { posts: data, loading };
}

export function useBlogPost(slug: string) {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('blog_posts').select('*').eq('slug', slug).single()
            .then(({ data }) => { setPost(data); setLoading(false); });
    }, [slug]);

    return { post, loading };
}

// ─── Services ────────────────────────────────────────
export function useServices() {
    const [data, setData] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('services').select('*').order('sort_order')
            .then(({ data }) => { setData(data || []); setLoading(false); });
    }, []);

    return { services: data, loading };
}

// ─── Testimonials ────────────────────────────────────
export function useTestimonials() {
    const [data, setData] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('testimonials').select('*').eq('is_active', true).order('sort_order')
            .then(({ data }) => { setData(data || []); setLoading(false); });
    }, []);

    return { testimonials: data, loading };
}

// ─── FAQ ─────────────────────────────────────────────
export function useFAQ() {
    const [data, setData] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('faq_items').select('*').eq('is_active', true).order('sort_order')
            .then(({ data }) => { setData(data || []); setLoading(false); });
    }, []);

    return { faqItems: data, loading };
}

// ─── Site Settings ───────────────────────────────────
export function useSiteSettings() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('site_settings').select('*')
            .then(({ data }) => {
                const map: Record<string, string> = {};
                (data as SiteSetting[] || []).forEach(s => { map[s.key] = s.value; });
                setSettings(map);
                setLoading(false);
            });
    }, []);

    return { settings, loading };
}
