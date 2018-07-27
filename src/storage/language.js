const KEY = 'namedayapp.lang';
export const availableLangCodes = ['us', 'cz', 'sk', 'pl', 'fr', 'hu', 'hr', 'se', 'at', 'it', 'de', 'es'];

export const getLanguage = () => {
    return localStorage.getItem(KEY) || 'sk';
};

export const setLanguage = (langCode) => {
    if (availableLangCodes.indexOf(langCode) === -1) {
        throw 'Unknown language code! Available codes: ' + availableLangCodes.join(',');
    }
    return localStorage.setItem(KEY, langCode);
};