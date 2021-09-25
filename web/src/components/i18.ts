import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from 'ra-language-english';
import spanishMessages from "@blackbox-vision/ra-language-spanish";
import {TranslationMessages} from "ra-core";

const messages: {[x: string]:TranslationMessages} = {
    es: spanishMessages,
    en: englishMessages
};

export const i18nProvider = polyglotI18nProvider((locale: string) => messages[locale]);