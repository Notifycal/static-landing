import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    })
  ]
});
