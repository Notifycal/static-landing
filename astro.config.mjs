import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import { defaultLang, hideDefaultLang, languages } from './src/i18n/ui';

import { handleBundleSizePlugin } from '@notifycal/shared/utils';

import playformCompress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';

const maxBundleChunkSizeInBytes = 4.1 * 1024 * 1024; // MB
const maxTotalBundleSizeInBytes = 4.3 * 1024 * 1024; // MB

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
    plugins: [tailwindcss()],
    build: {
      reportCompressedSize: true,
      chunkSizeWarningLimit: (maxBundleChunkSizeInBytes / 1024) * 0.9, // Expressed in KB. The budget is 90% of the limit.
      rollupOptions: {
        plugins: [handleBundleSizePlugin(maxBundleChunkSizeInBytes, maxTotalBundleSizeInBytes)]
      }
    },
  }
});
