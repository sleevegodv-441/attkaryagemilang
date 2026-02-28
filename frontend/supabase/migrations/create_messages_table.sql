-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert messages (for the contact form)
CREATE POLICY "Allow public insert to messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Allow authenticated users (Admins) to read messages
CREATE POLICY "Allow authenticated read messages" ON public.messages FOR SELECT TO authenticated USING (true);

-- Allow authenticated users (Admins) to update messages (e.g., mark as read)
CREATE POLICY "Allow authenticated update messages" ON public.messages FOR UPDATE TO authenticated USING (true);

-- Allow authenticated users (Admins) to delete messages
CREATE POLICY "Allow authenticated delete messages" ON public.messages FOR DELETE TO authenticated USING (true);
