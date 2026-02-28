import { useEffect } from 'react';

export default function TawkChat() {
    useEffect(() => {
        // Tawk.to Live Chat Script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://embed.tawk.to/DEFAULT_WIDGET_ID/default';
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');

        // Use a placeholder widget ID - replace with real one in production
        // To get a real widget ID, sign up at https://www.tawk.to/
        // The script src should be: https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID

        // For now, we'll use Tawk.to's API directly
        (window as unknown as Record<string, unknown>).Tawk_API = (window as unknown as Record<string, unknown>).Tawk_API || {};
        (window as unknown as Record<string, unknown>).Tawk_LoadStart = new Date();

        document.head.appendChild(script);

        return () => {
            // Cleanup on unmount
            document.head.removeChild(script);
        };
    }, []);

    return null;
}
