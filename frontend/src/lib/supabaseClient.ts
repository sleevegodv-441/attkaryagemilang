import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Project {
    id: string;
    title: string;
    category: string;
    location: string;
    description: string;
    image_url: string;
    client_name: string;
    duration: string;
    area: string;
    is_featured: boolean;
    sort_order: number;
    created_at: string;
    slug?: string;
    content?: string;
    before_image?: string;
    after_image?: string;
    image_gallery?: string[];
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    image_url: string;
    is_featured: boolean;
    published_at: string;
    created_at: string;
    meta_title?: string;
    meta_desc?: string;
    meta_keywords?: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    price_label: string;
    features: string[];
    icon: string;
    is_popular: boolean;
    sort_order: number;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    quote: string;
    rating: number;
    is_active: boolean;
    sort_order: number;
}

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    sort_order: number;
    is_active: boolean;
}

export interface PageContent {
    id: string;
    page: string;
    section: string;
    key: string;
    value: string;
    updated_at: string;
}

export interface SiteSetting {
    id: string;
    key: string;
    value: string;
    type: string;
}
