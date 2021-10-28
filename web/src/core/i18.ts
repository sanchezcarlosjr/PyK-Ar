import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from 'ra-language-english';
import {TranslationMessages} from "ra-core";

const messages: {[x: string]:TranslationMessages} = {
    en: englishMessages
};

export const i18nProvider = polyglotI18nProvider((locale: string) => messages[locale], 'en');