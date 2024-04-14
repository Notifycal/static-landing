import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { defaultLang, hideDefaultLang, languages } from './src/i18n/ui';
import icon from 'astro-icon';

import playformCompress from '@playform/compress';

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
    tailwind(),
    icon(),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    playformCompress()
  ]
});
