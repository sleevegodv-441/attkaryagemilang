import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

function FAQAccordion() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqs = [1, 2, 3, 4, 5];

    return (
        <div className="divide-y divide-neutral-200">
            {faqs.map((i) => (
                <FadeIn key={i} delay={i * 0.08}>
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between py-6 text-left group"
                    >
                        <span className="text-base md:text-lg font-medium text-slate-900 pr-8 group-hover:text-black transition-colors">{t(`faq.q${i}`)}</span>
                        <span className={`material-symbols-outlined text-xl text-slate-400 transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-60 pb-6' : 'max-h-0'}`}>
                        <p className="text-slate-500 text-sm leading-relaxed pr-12">{t(`faq.a${i}`)}</p>
                    </div>
                </FadeIn>
            ))}
        </div>
    );
}

export default function Services() {
    const { t } = useTranslation();
    return (
        <main className="flex-1 font-[Manrope]">
            <SEO titleKey="nav.services" descriptionKey="services.desc" />

            <section className="w-full bg-white pt-24 pb-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <FadeIn direction="up" className="flex flex-col gap-8 max-w-4xl">
                        <div className="inline-flex items-center gap-3 border-b border-black pb-1 w-fit">
                            <span className="text-xs font-bold uppercase tracking-widest text-black">{t('services.badge')}</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-black leading-[1.1] font-[Manrope]">
                            {t('services.title1')} <br />
                            <span className="font-bold">{t('services.title2')}</span>
                        </h1>
                        <p className="text-xl text-neutral-500 max-w-2xl font-light leading-relaxed font-[Manrope]">
                            {t('services.desc')}
                        </p>
                    </FadeIn>
                </div>
            </section>
            <section className="w-full bg-white border-y border-neutral-100 font-[Manrope]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
                        <FadeIn delay={0.1} className="py-12 md:pr-12 group">
                            <div className="mb-6">
                                <span className="material-symbols-outlined text-4xl font-light text-black">design_services</span>
                            </div>
                            <h3 className="text-lg font-semibold text-black mb-3">{t('services.h1_title')}</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">{t('services.h1_desc')}</p>
                        </FadeIn>
                        <FadeIn delay={0.2} className="py-12 md:px-12 group">
                            <div className="mb-6">
                                <span className="material-symbols-outlined text-4xl font-light text-black">verified_user</span>
                            </div>
                            <h3 className="text-lg font-semibold text-black mb-3">{t('services.h2_title')}</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">{t('services.h2_desc')}</p>
                        </FadeIn>
                        <FadeIn delay={0.3} className="py-12 md:pl-12 group">
                            <div className="mb-6">
                                <span className="material-symbols-outlined text-4xl font-light text-black">location_on</span>
                            </div>
                            <h3 className="text-lg font-semibold text-black mb-3">{t('services.h3_title')}</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">{t('services.h3_desc')}</p>
                        </FadeIn>
                    </div>
                </div>
            </section>
            <section className="w-full bg-white py-24 px-6 lg:px-8 font-[Manrope]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 border-b border-neutral-200 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <h2 className="text-3xl font-light text-black mb-2">{t('services.core_title')}</h2>
                            <p className="text-neutral-500">{t('services.core_desc')}</p>
                        </div>
                        <Link to="/portfolio" className="text-sm font-bold uppercase tracking-widest text-black hover:text-neutral-600 transition-colors flex items-center gap-2">
                            {t('services.view_all')} <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-20 lg:gap-y-20">
                        <FadeIn delay={0.1} className="group flex flex-col h-full">
                            <div className="flex items-start justify-between mb-8 border-b border-neutral-100 pb-6">
                                <span className="material-symbols-outlined text-5xl font-thin text-black group-hover:scale-110 transition-transform duration-500">horizontal_rule</span>
                                <div className="text-right">
                                    <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{t('services.start_from')}</span>
                                    <span className="block text-xl font-bold text-black">{t('services.s1_p')} <span className="text-sm font-normal text-neutral-500">/ m²</span></span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-black mb-4 group-hover:text-neutral-600 transition-colors">{t('services.s1_title')}</h3>
                            <div className="flex-grow space-y-4 mb-10">
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s1_i1')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s1_i2')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s1_i3')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s1_i4')}</span>
                                </div>
                            </div>
                            <Link to="/contact" className="w-full py-4 border border-black hover:bg-black hover:text-white text-black font-medium transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 mt-auto">
                                <span>{t('services.btn')}</span>
                            </Link>
                        </FadeIn>
                        <FadeIn delay={0.2} className="group flex flex-col h-full relative">
                            <div className="absolute -top-3 -right-3 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider z-10">{t('services.s2_badge')}</div>
                            <div className="flex items-start justify-between mb-8 border-b border-neutral-100 pb-6">
                                <span className="material-symbols-outlined text-5xl font-thin text-black group-hover:scale-110 transition-transform duration-500">foundation</span>
                                <div className="text-right">
                                    <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{t('services.start_from')}</span>
                                    <span className="block text-xl font-bold text-black">{t('services.s2_p')} <span className="text-sm font-normal text-neutral-500">/ m²</span></span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-black mb-4 group-hover:text-neutral-600 transition-colors">{t('services.s2_title')}</h3>
                            <div className="flex-grow space-y-4 mb-10">
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s2_i1')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s2_i2')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s2_i3')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s2_i4')}</span>
                                </div>
                            </div>
                            <Link to="/contact" className="w-full py-4 bg-black text-white hover:bg-neutral-800 font-medium transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 mt-auto">
                                <span>{t('services.btn')}</span>
                            </Link>
                        </FadeIn>
                        <FadeIn delay={0.3} className="group flex flex-col h-full">
                            <div className="flex items-start justify-between mb-8 border-b border-neutral-100 pb-6">
                                <span className="material-symbols-outlined text-5xl font-thin text-black group-hover:scale-110 transition-transform duration-500">construction</span>
                                <div className="text-right">
                                    <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{t('services.start_from')}</span>
                                    <span className="block text-xl font-bold text-black">{t('services.s3_p')} <span className="text-sm font-normal text-neutral-500">/ m²</span></span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-black mb-4 group-hover:text-neutral-600 transition-colors">{t('services.s3_title')}</h3>
                            <div className="flex-grow space-y-4 mb-10">
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s3_i1')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s3_i2')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s3_i3')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s3_i4')}</span>
                                </div>
                            </div>
                            <Link to="/contact" className="w-full py-4 border border-black hover:bg-black hover:text-white text-black font-medium transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 mt-auto">
                                <span>{t('services.btn')}</span>
                            </Link>
                        </FadeIn>
                        <FadeIn delay={0.4} className="group flex flex-col h-full">
                            <div className="flex items-start justify-between mb-8 border-b border-neutral-100 pb-6">
                                <span className="material-symbols-outlined text-5xl font-thin text-black group-hover:scale-110 transition-transform duration-500">chair</span>
                                <div className="text-right">
                                    <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{t('services.start_from')}</span>
                                    <span className="block text-xl font-bold text-black">{t('services.s4_p')} <span className="text-sm font-normal text-neutral-500">/ m²</span></span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-black mb-4 group-hover:text-neutral-600 transition-colors">{t('services.s4_title')}</h3>
                            <div className="flex-grow space-y-4 mb-10">
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s4_i1')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s4_i2')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s4_i3')}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                                    <span>{t('services.s4_i4')}</span>
                                </div>
                            </div>
                            <Link to="/contact" className="w-full py-4 border border-black hover:bg-black hover:text-white text-black font-medium transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 mt-auto">
                                <span>{t('services.btn')}</span>
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full bg-white py-24 px-6 lg:px-8 font-[Manrope] border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <FadeIn direction="up" className="text-center mb-16">
                        <span className="text-black text-xs font-bold uppercase tracking-[0.2em]">{t('faq.badge')}</span>
                        <h2 className="text-3xl md:text-4xl font-light text-black mt-4">{t('faq.title')}</h2>
                    </FadeIn>
                    <FAQAccordion />
                </div>
            </section>

            <section className="w-full bg-neutral-50 py-24 px-6 lg:px-8 font-[Manrope]">
                <FadeIn direction="up" className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-light text-black mb-6">{t('services.cta_title')}</h2>
                    <p className="text-neutral-500 mb-10 text-lg font-light">{t('services.cta_desc')}</p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link to="/contact" className="bg-black hover:bg-neutral-800 text-white px-10 py-4 rounded-none text-xs uppercase tracking-widest font-bold transition-all">
                            {t('services.cta_btn1')}
                        </Link>
                        <Link to="/portfolio" className="bg-transparent hover:bg-white text-black border border-black px-10 py-4 rounded-none text-xs uppercase tracking-widest font-bold transition-all">
                            {t('services.cta_btn2')}
                        </Link>
                    </div>
                </FadeIn>
            </section>
        </main>
    );
}
