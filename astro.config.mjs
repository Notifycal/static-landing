import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'astro-auto-import';
import { defineConfig } from 'astro/config';
import fs from 'fs';
import path from 'path';
import remarkCollapse from 'remark-collapse';
import remarkToc from 'remark-toc';
import { fileURLToPath } from 'url';
import config from './src/config/config.json';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const handleServiceConfigPlugin = (dirname) => {
  const pluginName = 'service-config-handler';
  const configLocalPath = path.resolve(dirname, 'config/config.local.js');
  const configSkelPath = path.resolve(dirname, 'config/config.skel.js');

  return {
    name: pluginName,
    configureServer: (server) => {
      // Only runs for the dev server
      console.log(`[${pluginName}] Serving local config.js...`);
      server.middlewares.use('/config.js', (req, res) => {
        const content = fs.readFileSync(configLocalPath, 'utf-8');
        res.setHeader('Content-Type', 'application/javascript');
        res.statusCode = 200;
        res.end(content);
      });
    },
    generateBundle() {
      // Only runs for the prod build
      console.log(`[${pluginName}] Bundling config.skel.js...`);
      const content = fs.readFileSync(configSkelPath, 'utf-8');
      this.emitFile({
        type: 'asset',
        fileName: 'config.skel.js',
        source: content
      });
      console.log(`[${pluginName}] Emitted config.skel.js to bundle.`);
    }
  };
};

// https://astro.build/config
export default defineConfig({
  site: config.site.baseUrl ? config.site.baseUrl : 'http://examplesite.com',
  base: config.site.basePath ? config.site.basePath : '/',
  trailingSlash: config.site.trailingSlash ? 'always' : 'never',
  vite: { plugins: [tailwindcss(), handleServiceConfigPlugin(dirname)] },
  integrations: [
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
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    playformCompress()
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
