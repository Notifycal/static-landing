import { defaultLang, type LanguageCode } from '../i18n-const';

const translations: Record<LanguageCode, { min: string; mins: string }> = {
  es: {
    min: 'Min de lectura',
    mins: 'Mins de lectura'
  },
  en: {
    min: 'Min read',
    mins: 'Mins read'
  },
  ca: {
    min: 'Min de lectura',
    mins: 'Mins de lectura'
  }
};

const readingTime = (content: string, lang: LanguageCode = defaultLang): string => {
  const WPS = 275 / 60;

  let images = 0;
  const regex = /\w/;

  const words = content.split(' ').filter((word) => {
    if (word.includes('<img')) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  const imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);
  const t = translations[lang];

  if (minutes < 10) {
    if (minutes < 2) {
      return '0' + minutes + ` ${t.min}`;
    } else {
      return '0' + minutes + ` ${t.mins}`;
    }
  } else {
    return minutes + ` ${t.mins}`;
  }
};

export default readingTime;
