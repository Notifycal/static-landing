import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import partytown from '@astrojs/partytown';

import { defaultLang, hideDefaultLang, languages } from './src/i18n/ui';

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
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    })
  ]
});
