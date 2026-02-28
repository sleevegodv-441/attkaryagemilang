import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
    return (
        <main className="flex-grow flex items-center justify-center min-h-[70vh] bg-white font-[Noto_Sans]">
            <SEO titleRaw="404 - Page Not Found" descriptionRaw="The page you are looking for does not exist." />
            <div className="text-center px-6 max-w-xl">
                <h1 className="text-[120px] md:text-[180px] font-[Newsreader] font-bold text-slate-900 leading-none">404</h1>
                <p className="text-xl md:text-2xl text-slate-600 font-light mb-2">Halaman Tidak Ditemukan</p>
                <p className="text-sm text-slate-400 mb-10 leading-relaxed">
                    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan kembali ke beranda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/" className="h-12 px-8 bg-black text-white font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-sm">home</span>
                        Kembali ke Beranda
                    </Link>
                    <Link to="/contact" className="h-12 px-8 border border-black text-black font-medium flex items-center justify-center hover:bg-slate-50 transition-colors">
                        Hubungi Kami
                    </Link>
                </div>
            </div>
        </main>
    );
}
