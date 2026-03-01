import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

export default function Calculator() {
    const { t } = useTranslation();
    const [area, setArea] = useState<number | ''>('');
    const [service, setService] = useState<string>('bangun_baru');
    const [spec, setSpec] = useState<string>('standard');

    const baseRates: Record<string, Record<string, number>> = {
        bangun_baru: {
            standard: 3500000,
            premium: 4500000,
            luxury: 6000000,
        },
        renovasi_total: {
            standard: 2500000,
            premium: 3500000,
            luxury: 5000000,
        },
        interior: {
            standard: 2000000,
            premium: 3000000,
            luxury: 4500000,
        }
    };

    const calculateEstimate = () => {
        if (!area || isNaN(Number(area))) return 0;
        const rate = baseRates[service]?.[spec] || 0;
        return Number(area) * rate;
    };

    const estimate = calculateEstimate();

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };

    const wamessage = `Halo Tim ATT Karya Gemilang, saya ingin berkonsultasi mengenai rencana proyek saya:\n\n- Layanan: ${service.replace('_', ' ')}\n- Spesifikasi: ${spec}\n- Luas Perkiraan: ${area || 0} m2\n- Estimasi Biaya: ${formatRupiah(estimate)}\n\nMohon info lebih lanjut untuk proses survey lokasinya. Terima kasih.`;

    return (
        <main className="flex-grow bg-accent font-[Noto_Sans] py-20 lg:py-32">
            <SEO titleKey="nav.estimator" descriptionKey="calc.desc" />
            <div className="container mx-auto px-4 lg:px-20 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left Column: Form */}
                    <FadeIn direction="left" className="w-full lg:w-3/5 bg-white p-8 md:p-12 shadow-sm border border-[#e6dfcc] rounded-3xl">
                        <h1 className="text-3xl lg:text-4xl font-[Newsreader] font-bold text-slate-900 mb-2">{t('calc.title')}</h1>
                        <p className="text-slate-500 mb-10 font-light text-sm md:text-base">{t('calc.desc')}</p>

                        <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                            {/* Jenis Layanan */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block">{t('calc.l1')}</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { id: 'bangun_baru', label: t('calc.s1'), icon: 'foundation' },
                                        { id: 'renovasi_total', label: t('calc.s2'), icon: 'construction' },
                                        { id: 'interior', label: t('calc.s3'), icon: 'chair' }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setService(item.id)}
                                            className={`flex flex-col items-center justify-center p-6 border rounded-xl gap-3 transition-all ${service === item.id ? 'border-primary bg-accent/50 text-secondary shadow-sm ring-1 ring-blue-600' : 'border-[#d6cfbc] hover:border-slate-300 bg-white text-slate-600'}`}
                                        >
                                            <span className="material-symbols-outlined text-3xl font-light">{item.icon}</span>
                                            <span className="font-semibold text-sm text-center">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Spesifikasi Material */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block">{t('calc.l2')}</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { id: 'standard', title: t('calc.sp1_title'), desc: t('calc.sp1_desc') },
                                        { id: 'premium', title: t('calc.sp2_title'), desc: t('calc.sp2_desc') },
                                        { id: 'luxury', title: t('calc.sp3_title'), desc: t('calc.sp3_desc') }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setSpec(item.id)}
                                            className={`flex flex-col items-start p-5 border rounded-xl gap-2 transition-all text-left ${spec === item.id ? 'border-primary bg-accent/50 text-secondary shadow-sm ring-1 ring-blue-600' : 'border-[#d6cfbc] hover:border-slate-300 bg-white text-slate-600'}`}
                                        >
                                            <span className="font-bold">{item.title}</span>
                                            <span className="text-xs opacity-80 leading-relaxed">{item.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Luas Area */}
                            <div className="space-y-4">
                                <label htmlFor="area" className="text-sm font-bold text-slate-700 uppercase tracking-wider block">{t('calc.l3')}</label>
                                <div className="relative max-w-xs">
                                    <input
                                        id="area"
                                        type="number"
                                        min="0"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value === '' ? '' : Number(e.target.value))}
                                        className="w-full h-14 pl-5 pr-12 text-xl font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-primary outline-none transition-all shadow-sm"
                                        placeholder={t('calc.ph_area')}
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                                        m²
                                    </div>
                                </div>
                            </div>
                        </form>
                    </FadeIn>

                    {/* Right Column: Result Panel */}
                    <FadeIn direction="right" delay={0.2} className="w-full lg:w-2/5">
                        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl sticky top-32 flex flex-col h-full">
                            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">calculate</span>
                                {t('calc.res_title')}
                            </span>

                            <div className="mb-10 flex-grow">
                                <p className="text-slate-400 text-sm mb-2 font-medium">{t('calc.res_p')}</p>
                                <div className="text-4xl md:text-5xl font-[Newsreader] font-bold text-white mb-4 tracking-tight break-words">
                                    {estimate > 0 ? formatRupiah(estimate) : t('calc.empty_rp')}
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    {t('calc.res_note1')}<b>{area || 0} m²</b>{t('calc.res_note2')} <b>{service === 'bangun_baru' ? t('calc.s1') : service === 'renovasi_total' ? t('calc.s2') : t('calc.s3')}</b> {t('calc.res_note3')} <b>{spec === 'standard' ? t('calc.sp1_title') : spec === 'premium' ? t('calc.sp2_title') : t('calc.sp3_title')}</b>.
                                </p>
                            </div>

                            <div className="space-y-4 mt-auto">
                                <a
                                    href={`https://wa.me/6287772229006?text=${encodeURIComponent(wamessage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex h-14 items-center justify-center bg-primary hover:bg-accent0 text-white font-bold rounded-xl transition-all gap-2 w-full ${(area && estimate > 0) ? 'opacity-100 cursor-pointer shadow-lg shadow-blue-500/30 hover:scale-[1.02]' : 'opacity-50 pointer-events-none'}`}
                                >
                                    <span className="material-symbols-outlined text-xl">forum</span>
                                    {t('calc.btn')}
                                </a>

                                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest">
                                    {t('calc.warn')}
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                </div>
            </div>
        </main>
    );
}
