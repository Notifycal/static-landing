import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { unpluginFonts } from '@notifycal/shared/theme';
import { ourServiceConfigPlugin } from '@notifycal/shared/utils';
import playformCompress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';
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
    sitemap({
      i18n: {
        defaultLocale: defaultLang,
        locales: Object.keys(languages).reduce((acc, lang) => ({ ...acc, [lang]: lang }), {})
      },
      serialize: (item) => {
        const url = new URL(item.url);
        const pathname = url.pathname;

        if (pathname === '/' || pathname === '/en/' || pathname === '/ca/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (pathname.includes('/about') || pathname.includes('/roadmap')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }

        item.lastmod = new Date();
        return item;
      }
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
  },
  server: {
    host: true
  }
});
