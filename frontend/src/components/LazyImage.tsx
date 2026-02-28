import { useState } from 'react';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export default function LazyImage({ src, alt, className = '', onClick }: LazyImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full h-full">
            {!loaded && (
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onClick={onClick}
                className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
}
