import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import { defaultLang, hideDefaultLang, languages } from './src/i18n/ui';

import playformCompress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: defaultLang,
    locales: Object.keys(languages),
    routing: {
      prefixDefaultLocale: !hideDefaultLang
    }
  },
  integrations: [
    icon(),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    playformCompress()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
