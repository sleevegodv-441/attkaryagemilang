-- ATT CMS
-- SQL Script for creating the 'images' storage bucket and setting up RLS policies
-- Run this script in the Supabase SQL Editor

-- ==========================================
-- 1. CREATE STORAGE BUCKET
-- ==========================================
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- ==========================================
-- 2. SETUP STORAGE RLS POLICIES
-- ==========================================
-- Allow public read access to the 'images' bucket so website visitors can see images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

-- Allow authenticated users (Admin) to insert/upload images
create policy "Admin Upload"
on storage.objects for insert
with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- Allow authenticated users (Admin) to update images
create policy "Admin Update"
on storage.objects for update
using ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- Allow authenticated users (Admin) to delete images
create policy "Admin Delete"
on storage.objects for delete
using ( bucket_id = 'images' and auth.role() = 'authenticated' );
