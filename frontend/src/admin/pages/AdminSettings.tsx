import { useEffect, useState } from 'react';
import { supabase, type SiteSetting } from '../../lib/supabaseClient';

const sections = [
    { id: 'branding', label: 'Logo & Branding', icon: 'palette', desc: 'Logo navbar, favicon browser tab', keys: ['logo_url', 'favicon_url'] },
    { id: 'company', label: 'Company Information', icon: 'business', desc: 'Nama, telepon, alamat kantor', keys: ['company_name', 'phone', 'whatsapp', 'email', 'address', 'working_hours_weekday', 'working_hours_weekend'] },
    { id: 'social', label: 'Social Media', icon: 'share', desc: 'Link Instagram & Facebook', keys: ['instagram', 'facebook'] },
];

const labelMap: Record<string, { label: string; placeholder: string; icon: string; type?: 'image' }> = {
    logo_url: { label: 'Logo Navbar', placeholder: 'Upload logo yang tampil di navbar', icon: 'image', type: 'image' },
    favicon_url: { label: 'Favicon (Tab Browser)', placeholder: 'Upload icon kecil yang tampil di tab browser', icon: 'tab', type: 'image' },
    company_name: { label: 'Company Name', placeholder: 'PT. ATT Karya Gemilang', icon: 'badge' },
    phone: { label: 'Phone Number', placeholder: '+62 877 7222 9006', icon: 'call' },
    whatsapp: { label: 'WhatsApp', placeholder: '+6287772229006', icon: 'chat' },
    email: { label: 'Email Address', placeholder: 'info@attkaryagemilang.com', icon: 'mail' },
    address: { label: 'Office Address', placeholder: 'Jl. Raya Konstruksi No. 123', icon: 'location_on' },
    working_hours_weekday: { label: 'Weekday Hours', placeholder: 'Mon - Fri: 08:00 - 17:00', icon: 'schedule' },
    working_hours_weekend: { label: 'Weekend Hours', placeholder: 'Sat: 09:00 - 14:00', icon: 'schedule' },
    instagram: { label: 'Instagram', placeholder: 'https://instagram.com/attkaryagemilang', icon: 'photo_camera' },
    facebook: { label: 'Facebook', placeholder: 'https://facebook.com/attkaryagemilang', icon: 'group' },
};

export default function AdminSettings() {
    const [settings, setSettings] = useState<SiteSetting[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [values, setValues] = useState<Record<string, string>>({});
    const [previewKey, setPreviewKey] = useState(0);

    const fetch_ = async () => {
        setLoading(true);
        const { data } = await supabase.from('site_settings').select('*').order('key');
        setSettings(data || []);
        const v: Record<string, string> = {};
        (data || []).forEach(s => { v[s.key] = s.value; });
        setValues(v);
        setLoading(false);
    };
    useEffect(() => { fetch_(); }, []);

    const handleImageUpload = async (key: string, file: File) => {
        const path = `settings/${Date.now()}.${file.name.split('.').pop()}`;
        const { error } = await supabase.storage.from('images').upload(path, file);
        if (!error) {
            const { data } = supabase.storage.from('images').getPublicUrl(path);
            setValues(prev => ({ ...prev, [key]: data.publicUrl }));
        }
    };

    const saveAll = async () => {
        setSaving(true);
        for (const s of settings) {
            if (values[s.key] !== s.value) {
                await supabase.from('site_settings').update({ value: values[s.key] }).eq('id', s.id);
            }
        }
        // Insert new keys that don't exist yet (logo_url, favicon_url)
        for (const key of ['logo_url', 'favicon_url']) {
            if (values[key] && !settings.find(s => s.key === key)) {
                await supabase.from('site_settings').insert({ key, value: values[key], type: 'image' });
            }
        }
        // Update favicon dynamically
        if (values['favicon_url']) {
            let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
            link.href = values['favicon_url'];
        }
        setSaving(false); setSaved(true); setPreviewKey(k => k + 1);
        setTimeout(() => setSaved(false), 2000);
        fetch_();
    };

    return (
        <div className="-m-8 h-[calc(100vh)] flex flex-col">
            {/* Top Bar */}
            <div className="bg-white border-b border-[#e6dfcc] px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">settings</span>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Global Settings</h1>
                        <p className="text-xs text-gray-400">Logo, company info, dan branding</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {saved && <span className="text-green-600 text-sm flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Saved!</span>}
                    <button onClick={() => setPreviewKey(k => k + 1)} className="text-sm text-gray-500 border border-[#d6cfbc] rounded-lg px-4 py-2 hover:bg-accent flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">refresh</span> Refresh Preview
                    </button>
                    <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 bg-primary text-white text-sm font-medium rounded-lg px-5 py-2 hover:bg-primary-hover disabled:opacity-60">
                        {saving ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">save</span>}
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Split Pane */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left: Settings Form */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto bg-accent/50 border-b lg:border-b-0 lg:border-r border-[#e6dfcc]">
                    {loading ? (
                        <div className="p-12 text-center"><span className="material-symbols-outlined animate-spin text-gray-300">progress_activity</span></div>
                    ) : (
                        <div className="p-6 space-y-5">
                            {sections.map(section => {
                                const sectionSettings = settings.filter(s => section.keys.includes(s.key));
                                return (
                                    <div key={section.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                                        <div className="px-5 py-3.5 bg-accent/50 flex items-center gap-3">
                                            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary text-base">{section.icon}</span>
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-bold text-gray-900">{section.label}</h2>
                                                <p className="text-[10px] text-gray-400">{section.desc}</p>
                                            </div>
                                        </div>
                                        <div className="p-5 space-y-4">
                                            {section.keys.map(key => {
                                                const meta = labelMap[key] || { label: key, placeholder: '', icon: 'tune' };
                                                const isImage = meta.type === 'image' || sectionSettings.find(s => s.key === key)?.type === 'image';
                                                return (
                                                    <div key={key}>
                                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{meta.label}</label>
                                                        {isImage ? (
                                                            <div className="space-y-2">
                                                                {values[key] && (
                                                                    <div className="bg-accent rounded-lg p-3 inline-block">
                                                                        <img src={values[key]} alt="" className="h-12 object-contain" />
                                                                    </div>
                                                                )}
                                                                <div className="flex gap-2">
                                                                    <input value={values[key] || ''} onChange={e => setValues({ ...values, [key]: e.target.value })} placeholder={meta.placeholder} className="flex-1 px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                                                                    <label className="flex items-center gap-1 bg-accent px-4 py-2.5 rounded-lg text-xs font-medium text-primary hover:bg-[#e6dfcc] cursor-pointer transition-colors">
                                                                        <span className="material-symbols-outlined text-sm">upload</span> Upload
                                                                        <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(key, f); }} />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <input value={values[key] || ''} onChange={e => setValues({ ...values, [key]: e.target.value })} placeholder={meta.placeholder} className="w-full px-3.5 py-2.5 border border-[#d6cfbc] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Right: Live Preview */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-gray-100 flex flex-col">
                    <div className="px-4 py-3 bg-white border-b border-[#e6dfcc] flex items-center gap-2 flex-shrink-0">
                        <span className="material-symbols-outlined text-gray-400 text-sm">desktop_windows</span>
                        <span className="text-xs font-medium text-gray-500">Live Preview — Homepage</span>
                    </div>
                    <div className="flex-1 p-4 overflow-hidden">
                        <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
                            <iframe key={previewKey} src="/" className="w-full h-full border-0" title="Preview"
                                style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
