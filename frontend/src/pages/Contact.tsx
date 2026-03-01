import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { supabase } from '../lib/supabaseClient';

export default function Contact() {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        try {
            // 1. Insert into Supabase
            const { error } = await supabase.from('messages').insert([{
                name: formData.name,
                phone: formData.phone,
                service: formData.service,
                message: formData.message
            }]);

            if (error) {
                console.error('Error sending message:', error);
                setSubmitted(false);
                alert('Gagal mengirim pesan. Silakan coba lagi.');
                return;
            }

            // 2. Format the message for WhatsApp (optional extra touch)
            let serviceLabel = formData.service;
            switch (formData.service) {
                case 'renovasi': serviceLabel = t('contact.s_reno'); break;
                case 'bangun': serviceLabel = t('contact.s_new'); break;
                case 'interior': serviceLabel = t('contact.s_int'); break;
                case 'konsultasi': serviceLabel = t('contact.s_cons'); break;
            }

            const text = `Halo Tim ATT Karya Gemilang, saya ${formData.name ? formData.name : 'Ingin bertanya'} (${formData.phone ? formData.phone : '-'}).%0A%0ASaya tertarik dengan layanan: *${serviceLabel ? serviceLabel : '-'}*%0A%0APesan Detail:%0A${formData.message ? formData.message : '-'}`;

            // Open WA in new tab
            window.open(`https://wa.me/6287772229006?text=${text}`, '_blank');

            // Reset form
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', service: '', message: '' });
            }, 3000);

        } catch (err) {
            console.error('Unexpected error:', err);
            setSubmitted(false);
        }
    };
    return (
        <main className="flex-grow font-[Manrope]">
            <SEO titleKey="nav.contact" descriptionKey="contact.desc" />
            <div className="relative w-full h-[350px] flex items-center justify-center bg-accent border-b border-[#e6dfcc]">
                <FadeIn direction="up" className="text-center px-4 max-w-4xl">
                    <h1 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-4">
                        {t('contact.title')}
                    </h1>
                    <p className="text-slate-600 text-lg font-normal leading-normal max-w-2xl mx-auto">
                        {t('contact.desc')}
                    </p>
                </FadeIn>
            </div>

            <div className="layout-container flex flex-col items-center py-16 px-4 md:px-10 lg:px-20 bg-white">
                <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <FadeIn direction="left" className="flex flex-col gap-10">
                        <div className="flex flex-col gap-3 border-l-4 border-black pl-6">
                            <h2 className="text-3xl font-bold leading-tight tracking-tight text-black">{t('contact.info_title')}</h2>
                            <p className="text-slate-600 text-base font-normal">{t('contact.info_desc')}</p>
                        </div>

                        <div className="grid gap-6">
                            <div className="flex gap-5 items-start p-6 border border-[#d6cfbc] bg-white hover:border-black transition-colors group">
                                <div className="text-black bg-slate-100 p-3 flex items-center justify-center">
                                    <span className="material-symbols-outlined">chat</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-bold text-lg text-black">{t('contact.wa_title')}</h3>
                                    <p className="text-slate-500 text-sm mb-1">{t('contact.wa_desc')}</p>
                                    <a href="https://wa.me/6287772229006" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-semibold hover:underline decoration-black">+62 877 7222 9006</a>
                                </div>
                            </div>

                            <div className="flex gap-5 items-start p-6 border border-[#d6cfbc] bg-white hover:border-black transition-colors group">
                                <div className="text-black bg-slate-100 p-3 flex items-center justify-center">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-bold text-lg text-black">{t('contact.email_title')}</h3>
                                    <p className="text-slate-500 text-sm mb-1">{t('contact.email_desc')}</p>
                                    <a href="mailto:info@attkaryagemilang.com" className="text-slate-900 font-semibold hover:underline decoration-black">info@attkaryagemilang.com</a>
                                </div>
                            </div>

                            <div className="flex gap-5 items-start p-6 border border-[#d6cfbc] bg-white hover:border-black transition-colors group">
                                <div className="text-black bg-slate-100 p-3 flex items-center justify-center">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-bold text-lg text-black">{t('contact.time_title')}</h3>
                                    <p className="text-slate-500 text-sm">{t('contact.time_desc1')}</p>
                                    <p className="text-slate-500 text-sm">{t('contact.time_desc2')}</p>
                                </div>
                            </div>

                            <div className="flex gap-5 items-start p-6 border border-[#d6cfbc] bg-white hover:border-black transition-colors group">
                                <div className="text-black bg-slate-100 p-3 flex items-center justify-center">
                                    <span className="material-symbols-outlined">location_on</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-bold text-lg text-black">{t('contact.loc_title')}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{t('contact.loc_desc1')}<br />{t('contact.loc_desc2')}</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="right" delay={0.2} className="flex flex-col gap-8 bg-white p-10 border border-[#d6cfbc] shadow-sm">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold leading-tight text-black">{t('contact.form_title')}</h2>
                            <p className="text-slate-500 text-sm">{t('contact.form_desc')}</p>
                        </div>

                        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('contact.f_name')}</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t('contact.ph_name')}
                                    className="form-input w-full px-4 py-3 text-base"
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('contact.f_wa')}</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t('contact.ph_wa')}
                                    className="form-input w-full px-4 py-3 text-base"
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('contact.f_service')}</span>
                                <div className="relative">
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="form-select w-full px-4 py-3 text-base appearance-none"
                                        required
                                    >
                                        <option value="" disabled>{t('contact.s_ph')}</option>
                                        <option value="renovasi">{t('contact.s_reno')}</option>
                                        <option value="bangun">{t('contact.s_new')}</option>
                                        <option value="interior">{t('contact.s_int')}</option>
                                        <option value="konsultasi">{t('contact.s_cons')}</option>
                                    </select>
                                </div>
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('contact.f_msg')}</span>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t('contact.ph_msg')}
                                    className="form-textarea w-full px-4 py-3 text-base min-h-[120px] resize-y"
                                ></textarea>
                            </label>

                            <button type="submit" disabled={submitted} className={`mt-4 w-full cursor-pointer items-center justify-center overflow-hidden h-12 px-6 transition-all text-white text-base font-bold tracking-wide flex gap-2 border rounded-none ${submitted ? 'bg-green-600 border-green-600' : 'bg-black hover:bg-slate-800 border-black'}`}>
                                {submitted ? (
                                    <>
                                        <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                                        <span>{t('contact_success.title')}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{t('contact.btn')}</span>
                                        <span className="material-symbols-outlined text-sm">send</span>
                                    </>
                                )}
                            </button>
                            {submitted && (
                                <p className="text-green-600 text-xs text-center mt-2 font-medium">{t('contact_success.desc')}</p>
                            )}
                        </form>
                    </FadeIn>
                </div>
            </div>

            <FadeIn direction="up" className="w-full h-[450px] bg-slate-100 relative border-y border-[#d6cfbc]">
                <iframe title="Google Maps Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.052219430156!2d106.82726487573138!3d-6.255953993732565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3d52674251b%3A0x66c74577874944c!2sJl.%20Raya%20Konstruksi!5e0!3m2!1sen!2sid!4v1715582345678!5m2!1sen!2sid" width="100%" height="100%" className="grayscale" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </FadeIn>
        </main>
    );
}
