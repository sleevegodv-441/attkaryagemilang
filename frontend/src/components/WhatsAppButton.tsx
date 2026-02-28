import { motion } from 'framer-motion';

export default function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/6287772229006?text=Halo%20Tim%20ATT%20Karya%20Gemilang%2C%20saya%20tertarik%20untuk%20konsultasi."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 hover:scale-110 transition-transform"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            aria-label="Chat via WhatsApp"
        >
            <svg viewBox="0 0 32 32" fill="currentColor" className="size-7">
                <path d="M16.002 2.667A13.26 13.26 0 002.667 15.89a13.14 13.14 0 001.862 6.737L2.667 29.333l6.93-1.82A13.3 13.3 0 0016.002 29.2 13.27 13.27 0 0029.333 15.89 13.27 13.27 0 0016.002 2.667zm0 24.266a11.04 11.04 0 01-5.61-1.53l-.4-.24-4.17 1.09 1.11-4.07-.26-.42a10.9 10.9 0 01-1.67-5.87A11.04 11.04 0 0116.002 4.84 11.04 11.04 0 0127.065 15.89a11.04 11.04 0 01-11.063 11.043zm6.06-8.27c-.33-.17-1.96-.97-2.27-1.08s-.52-.17-.74.17-.86 1.08-1.05 1.3-.39.25-.72.08a9.06 9.06 0 01-2.68-1.66 10.08 10.08 0 01-1.85-2.31c-.19-.33 0-.51.15-.68.14-.15.33-.39.49-.59s.22-.33.33-.56.06-.42-.03-.59-.74-1.78-1.01-2.44c-.27-.64-.54-.55-.74-.56h-.63a1.2 1.2 0 00-.88.41 3.7 3.7 0 00-1.15 2.74 6.4 6.4 0 001.34 3.41c.17.22 2.32 3.55 5.63 4.97.79.34 1.4.54 1.88.7a4.52 4.52 0 002.08.13c.63-.09 1.96-.8 2.24-1.57a2.78 2.78 0 00.19-1.57c-.06-.14-.24-.22-.57-.39z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex size-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-4 bg-green-300"></span>
            </span>
        </motion.a>
    );
}
