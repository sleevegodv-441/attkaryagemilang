import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './lib/AuthContext';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <I18nextProvider i18n={i18n}>
                <AuthProvider>
                    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                        <App />
                    </Suspense>
                </AuthProvider>
            </I18nextProvider>
        </HelmetProvider>
    </StrictMode>,
)
