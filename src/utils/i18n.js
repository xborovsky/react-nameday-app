import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import cz from '../translations/cz.json';
import en from '../translations/en.json';
import sk from '../translations/sk.json';

i18n.use(LanguageDetector)
    .init({
        resources : {
            en : {
                translations : en
            },
            cz : {
                translations : cz
            },
            sk : {
                translations : sk
            }
        },
        fallbackLng : 'en',
        ns: ['translations'],
        defaultNS: 'translations',
        interpolation : {
            escapeValue : false,
            formatSeparator : ','
        },
        react : {
            wait : true
        }
    });

export default i18n;