import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

export default function About() {
    const { t } = useTranslation();
    return (
        <main className="flex-grow bg-white font-[Noto_Sans]">
            <SEO titleKey="nav.about" descriptionKey="about.desc" />
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white border-b border-gray-100 py-24 lg:py-32">
                <div className="container mx-auto px-6 lg:px-20 relative z-10">
                    <FadeIn direction="up" className="max-w-4xl">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 border border-slate-200 bg-white mb-8">
                            <span className="text-xs font-semibold text-slate-800 tracking-widest uppercase">{t('about.badge')}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-[Newsreader] font-medium text-slate-900 leading-[1.1] tracking-tight mb-8">
                            {t('about.title1')} <br className="hidden md:block" />
                            <span className="italic text-slate-500">{t('about.title2')}</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-light">
                            {t('about.desc')}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FadeIn direction="left" className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 shadow-xl overflow-hidden group">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCyxA3Q0BZBzMSLqdHVha-QNEJAV7atv1atjWQ-fmuswjjyUdfudmd864GJMOoChx5fy_vOtE9Sz0tWk5baMPzuZY4IIcvYVoVYmlgnulMe7J8LY3biXZfS1ye9Z752GSBY_fVeYO8qy95h5kjKxPLOvPWiisjAlAdIII089MyIZz4zsXQ6k81gT7-qRnM9pFe4haEs3d3E0EwjuQSJ3qrLrOeA0MZwX8QdwgKo5_zeqQszVD81dnBSMqvulr13NAtUGIh_ZaZ894bl")' }}>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-10 pt-32">
                                <span className="material-symbols-outlined text-white text-5xl mb-4 font-light">architecture</span>
                                <p className="text-white text-xl font-[Newsreader] italic">{t('about.quote')}</p>
                            </div>
                        </FadeIn>

                        <FadeIn direction="right" delay={0.2} className="flex flex-col gap-16">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="w-12 h-[1px] bg-black"></span>
                                    <h2 className="text-2xl font-[Newsreader] font-medium text-slate-900">{t('about.vision_title')}</h2>
                                </div>
                                <p className="text-slate-600 leading-relaxed font-light">
                                    {t('about.vision_desc')}
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="w-12 h-[1px] bg-black"></span>
                                    <h2 className="text-2xl font-[Newsreader] font-medium text-slate-900">{t('about.mission_title')}</h2>
                                </div>
                                <ul className="space-y-4 text-slate-600 font-light">
                                    <li className="flex gap-4">
                                        <span className="material-symbols-outlined text-black mt-1">check_circle</span>
                                        <span>{t('about.m1')}</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="material-symbols-outlined text-black mt-1">check_circle</span>
                                        <span>{t('about.m2')}</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="material-symbols-outlined text-black mt-1">check_circle</span>
                                        <span>{t('about.m3')}</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="material-symbols-outlined text-black mt-1">check_circle</span>
                                        <span>{t('about.m4')}</span>
                                    </li>
                                </ul>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white border-y border-gray-100">
                <div className="container mx-auto px-6 lg:px-20">
                    <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-black text-xs font-bold uppercase tracking-[0.2em]">{t('about.why_badge')}</span>
                        <h2 className="text-3xl md:text-5xl font-[Newsreader] font-medium text-slate-900 mt-4 mb-6">{t('about.why_title')}</h2>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        <FadeIn delay={0.1} className="flex flex-col gap-4">
                            <span className="material-symbols-outlined text-4xl text-black font-light mb-2">design_services</span>
                            <h3 className="text-lg font-bold text-slate-900">{t('about.w1_title')}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {t('about.w1_desc')}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2} className="flex flex-col gap-4">
                            <span className="material-symbols-outlined text-4xl text-black font-light mb-2">verified_user</span>
                            <h3 className="text-lg font-bold text-slate-900">{t('about.w2_title')}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {t('about.w2_desc')}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.3} className="flex flex-col gap-4">
                            <span className="material-symbols-outlined text-4xl text-black font-light mb-2">handshake</span>
                            <h3 className="text-lg font-bold text-slate-900">{t('about.w3_title')}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {t('about.w3_desc')}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.4} className="flex flex-col gap-4">
                            <span className="material-symbols-outlined text-4xl text-black font-light mb-2">engineering</span>
                            <h3 className="text-lg font-bold text-slate-900">{t('about.w4_title')}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {t('about.w4_desc')}
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-black text-white text-center">
                <FadeIn direction="up" className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-[Newsreader] font-medium mb-8">{t('about.cta_title')}</h2>
                    <Link to="/contact" className="inline-flex h-14 px-10 items-center justify-center bg-white text-black font-medium transition-transform hover:scale-105">
                        {t('about.cta_btn')}
                    </Link>
                </FadeIn>
            </section>
        </main>
    );
}
