import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { unpluginFonts } from '@notifycal/shared/theme';
import { ourServiceConfigPlugin } from '@notifycal/shared/utils';
import playformCompress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'astro-auto-import';
import { defineConfig } from 'astro/config';
import path from 'path';
import remarkCollapse from 'remark-collapse';
import remarkToc from 'remark-toc';
import Unfonts from 'unplugin-fonts/astro';
import { fileURLToPath } from 'url';
import config from './src/config/config.json';
import { defaultLang, languages, showDefaultLang } from './src/lib/i18n-const';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: config.site.baseUrl ? config.site.baseUrl : 'http://examplesite.com',
  base: config.site.basePath ? config.site.basePath : '/',
  trailingSlash: config.site.trailingSlash ? 'always' : 'never',
  vite: { plugins: [tailwindcss(), ourServiceConfigPlugin(dirname)] },
  i18n: {
    defaultLocale: defaultLang,
    locales: Object.keys(languages),
    routing: {
      prefixDefaultLocale: showDefaultLang
    }
  },
  integrations: [
    Unfonts({
      google: {
        families: unpluginFonts
      }
    }),
    react(),
    sitemap(),
    AutoImport({
      imports: [
        '@/shortcodes/Button',
        '@/shortcodes/Accordion',
        '@/shortcodes/Notice',
        '@/shortcodes/Video',
        '@/shortcodes/Youtube',
        '@/shortcodes/Blockquote',
        '@/shortcodes/Badge',
        '@/shortcodes/ContentBlock',
        '@/shortcodes/Changelog',
        '@/shortcodes/Tab',
        '@/shortcodes/Tabs'
      ]
    }),
    mdx(),
    playformCompress({
      HTML: {
        'html-minifier-terser': { sortClassName: false, removeComments: false }
      }
    })
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: 'Table of contents'
        }
      ]
    ],
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true
    },
    extendDefaultPlugins: true
  }
});
