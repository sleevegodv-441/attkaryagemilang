import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await signIn(email, password);
        if (error) {
            setError('Email atau password salah');
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen flex font-[Inter,system-ui,sans-serif] bg-white">
            {/* Left Box: Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 group">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                    alt="Architecture"
                    className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[10s] ease-out opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <div className="relative z-10 flex flex-col justify-end p-16 h-full text-white">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-4xl text-white drop-shadow-lg">apartment</span>
                        <span className="text-2xl font-bold tracking-widest uppercase origin-left drop-shadow-lg">ATT Karya</span>
                    </div>
                    <h2 className="text-4xl font-light leading-tight mb-4 drop-shadow-md">Membangun <br /><span className="font-bold">Masa Depan.</span></h2>
                    <p className="text-slate-300 max-w-md font-light leading-relaxed drop-shadow">Selamat datang di portal manajemen konten. Silakan masuk untuk mengelola portofolio, layanan, dan artikel perusahaan.</p>
                </div>
            </div>

            {/* Right Box: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
                {/* Back to Home Link */}
                <button onClick={() => navigate('/')} className="absolute top-8 right-8 text-sm font-semibold text-slate-400 hover:text-slate-900 flex items-center gap-2 transition-colors uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Ke Website
                </button>

                <div className="w-full max-w-[400px]">
                    <div className="mb-10 lg:hidden flex block items-center justify-center gap-3">
                        <span className="material-symbols-outlined text-4xl text-slate-900">apartment</span>
                        <span className="text-2xl font-bold tracking-widest uppercase text-slate-900">ATT Karya</span>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Login Staf</h1>
                        <p className="text-slate-500 text-sm">Masukkan kredensial Anda untuk melanjutkan ke dasbor.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50/50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg flex items-start gap-3">
                                <span className="material-symbols-outlined text-base mt-0.5">error</span>
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Alamat Email</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">mail</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white text-sm transition-all"
                                        placeholder="admin@attkaryagemilang.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Kata Sandi</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">lock</span>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white text-sm transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                                    <span>Memverifikasi...</span>
                                </>
                            ) : (
                                <>
                                    <span>Masuk ke Dasbor</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} PT. ATT Karya Gemilang. System v2.0
                    </div>
                </div>
            </div>
        </div>
    );
}
