/**
 * Auto-translate text from Indonesian to English using MyMemory Translation API.
 * Free tier: ~5000 chars/day without API key, sufficient for CMS content edits.
 */
export async function translateToEnglish(text: string): Promise<string> {
    if (!text || text.trim().length === 0) return '';

    // Skip translation for URLs, image paths, numbers-only, or very short text
    if (/^https?:\/\//.test(text) || /^\d+[\d.,m²%+]*$/.test(text.trim())) {
        return text;
    }

    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|en`;
        const res = await fetch(url);
        const data = await res.json();

        if (data?.responseStatus === 200 && data?.responseData?.translatedText) {
            return data.responseData.translatedText;
        }
        return text; // fallback to original if translation fails
    } catch {
        return text; // fallback on network error
    }
}

/**
 * Batch translate multiple values. Translates sequentially to respect rate limits.
 */
export async function batchTranslate(
    entries: { key: string; value: string }[]
): Promise<Record<string, string>> {
    const result: Record<string, string> = {};
    for (const entry of entries) {
        result[entry.key] = await translateToEnglish(entry.value);
    }
    return result;
}
