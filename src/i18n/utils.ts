import esTranslations from './es.json';
import enTranslations from './en.json';

const translations: Record<string, Record<string, string>> = {
    es: esTranslations,
    en: enTranslations,
};

export function t(lang: string, key: string): string {
    return translations[lang]?.[key] || key;
}

export function getAlternateLanguageUrl(currentUrl: URL, currentLang: string): string {
    const alternateLang = currentLang === 'es' ? 'en' : 'es';
    const pathname = currentUrl.pathname;
    const newPathname = pathname.replace(`/${currentLang}`, `/${alternateLang}`);
    return newPathname;
}
