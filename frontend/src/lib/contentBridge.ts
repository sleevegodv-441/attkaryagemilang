import { supabase } from './supabaseClient';
import i18n from '../i18n';

/**
 * Maps page_content DB rows (page, section, key) → i18n translation key.
 * 
 * Some sections nest under the page (e.g., home.hero.badge),
 * while others are top-level (e.g., stats.badge) or flat (e.g., about.badge).
 */

// Sections where the i18n key is `{section}.{key}` (top-level, not nested under page)
const TOP_LEVEL_SECTIONS: Record<string, string[]> = {
    home: ['stats', 'partners', 'process', 'testimonials'],
};

// Sections where keys go directly under the page namespace: `{page}.{key}` (section is stripped)
const FLAT_SECTIONS: Record<string, string[]> = {
    about: ['main', 'vision', 'why', 'cta'],
    services: ['header', 'highlights', 'cta'],
    portfolio: ['header', 'featured', 'cta'],
    contact: ['header', 'info', 'form'],
    calculator: ['header'],
    blog: ['newsletter'],
};

// Pages whose i18n namespace differs from the DB page name
const PAGE_NAMESPACE_MAP: Record<string, string> = {
    calculator: 'calc',
};

function getI18nKey(page: string, section: string, key: string): string {
    // SEO metadata sections don't have i18n keys (handled separately)
    if (section === 'seo') return '';

    // Top-level sections: key is {section}.{key}
    if (TOP_LEVEL_SECTIONS[page]?.includes(section)) {
        return `${section}.${key}`;
    }

    // Flat sections: key is {namespace}.{key} (section stripped)
    const namespace = PAGE_NAMESPACE_MAP[page] || page;
    if (FLAT_SECTIONS[page]?.includes(section)) {
        return `${namespace}.${key}`;
    }

    // Default: nested key {namespace}.{section}.{key}
    return `${namespace}.${section}.${key}`;
}

/**
 * Fetch all page_content from Supabase and override i18n translations.
 * - Indonesian ('id') uses `value` column
 * - English ('en') uses `value_en` column (auto-translated)
 */
export async function loadContentOverrides(): Promise<void> {
    const { data, error } = await supabase.from('page_content').select('*');
    if (error || !data || data.length === 0) return;

    const overridesId: Record<string, string> = {};
    const overridesEn: Record<string, string> = {};

    for (const row of data) {
        const i18nKey = getI18nKey(row.page, row.section, row.key);
        if (!i18nKey) continue;

        if (row.value) overridesId[i18nKey] = row.value;
        if (row.value_en) overridesEn[i18nKey] = row.value_en;
    }

    // Apply Indonesian overrides
    if (Object.keys(overridesId).length > 0) {
        const existingId = i18n.getResourceBundle('id', 'translation') || {};
        const mergedId = deepMerge(existingId, expandKeys(overridesId));
        i18n.addResourceBundle('id', 'translation', mergedId, true, true);
    }

    // Apply English overrides
    if (Object.keys(overridesEn).length > 0) {
        const existingEn = i18n.getResourceBundle('en', 'translation') || {};
        const mergedEn = deepMerge(existingEn, expandKeys(overridesEn));
        i18n.addResourceBundle('en', 'translation', mergedEn, true, true);
    }
}

/**
 * Expand dot-notation keys into nested object.
 * e.g., { "home.hero.badge": "X" } → { home: { hero: { badge: "X" } } }
 */
function expandKeys(flat: Record<string, string>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [dotKey, value] of Object.entries(flat)) {
        const parts = dotKey.split('.');
        let current = result;
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]] || typeof current[parts[i]] !== 'object') {
                current[parts[i]] = {};
            }
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
    }
    return result;
}

/**
 * Deep merge source into target, overwriting leaf values.
 */
function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
    const output = { ...target };
    for (const key of Object.keys(source)) {
        if (
            source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) &&
            output[key] && typeof output[key] === 'object' && !Array.isArray(output[key])
        ) {
            output[key] = deepMerge(output[key], source[key]);
        } else {
            output[key] = source[key];
        }
    }
    return output;
}
