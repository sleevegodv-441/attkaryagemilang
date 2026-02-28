import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import BackToTop from './BackToTop';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
    const location = useLocation();
    return (
        <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden">
            <ScrollToTop />
            <Navbar />
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="flex-grow w-full pt-20"
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
        </div>
    );
}
