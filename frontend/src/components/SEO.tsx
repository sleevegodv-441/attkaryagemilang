import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    titleKey?: string;
    descriptionKey?: string;
    titleRaw?: string;
    descriptionRaw?: string;
    keywordsRaw?: string;
    image?: string;
    url?: string;
    schemaType?: string;
}

export default function SEO({
    titleKey,
    descriptionKey,
    titleRaw,
    descriptionRaw,
    keywordsRaw,
    image = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyDMB8BcnAZUgNaUJPjS96H2QMgDEC5bo-5bKHjuqILRZ0ymlaAtvZUanEvqnL1wgG-Ob5osSG5nPyS_-tNH1thZIdEB-wsSGlDyhFfy59Uzwo1SvEOe20iWY9NcQvk2xtUPf4lalt2QlGbInMCO29_Z60ztAT9CvJbdykFD0jaj5uNCWZUzKDGvacxCnhpzq2ilKcpeK_J3QwiwMnKui_hvjBSK6YzS_WPtT7xcj2bcja_ZAx2cPWdx0vOw5HNX1GGRGpb2apTJNp',
    url = 'https://pt-attkaryagemilang.com',
    schemaType = 'WebPage'
}: SEOProps) {
    const { t, i18n } = useTranslation();

    const siteName = 'PT. ATT Karya Gemilang';
    const translatedTitle = titleKey ? t(titleKey) : titleRaw;
    const finalTitle = translatedTitle ? `${translatedTitle} | ${siteName}` : siteName;
    const finalDescription = descriptionKey ? t(descriptionKey) : descriptionRaw || t('home.hero.title1') + ' ' + t('home.hero.title2');

    const schemaOrgJSONLD = [
        {
            '@context': 'http://schema.org',
            '@type': schemaType,
            url: url,
            name: finalTitle,
            description: finalDescription,
        },
    ];

    const currentLang = i18n.language === 'id' ? 'id-ID' : 'en-US';

    return (
        <Helmet htmlAttributes={{ lang: i18n.language }}>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            {keywordsRaw && <meta name="keywords" content={keywordsRaw} />}
            <meta name="image" content={image} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content={currentLang} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={image} />

            {/* Hreflang for bilingual support */}
            <link rel="alternate" hrefLang="x-default" href={url} />
            <link rel="alternate" hrefLang="id" href={url} />
            <link rel="alternate" hrefLang="en" href={url} />

            {/* Schema.org */}
            <script type="application/ld+json">
                {JSON.stringify(schemaOrgJSONLD)}
            </script>
        </Helmet>
    );
}
