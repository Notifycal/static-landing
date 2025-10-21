import { format, type Locale } from 'date-fns';
import { ca, enGB, es } from 'date-fns/locale';
import { defaultLang, type LanguageCode } from '../i18n-const';

const locales: Record<LanguageCode, Locale> = {
  es,
  en: enGB,
  ca
};

const dateFormat = (
  date: Date | string,
  lang: LanguageCode = defaultLang,
  pattern: string = 'dd MMM, yyyy'
): string => {
  const dateObject = new Date(date);
  const output = format(dateObject, pattern, { locale: locales[lang] });
  return output;
};

export default dateFormat;
