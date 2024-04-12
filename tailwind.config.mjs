/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...themes.light,
          primary: '#5ad529'
          // 'primary-content': '#FFF',
          // secondary: ''
        }
      }
    ],
    darkTheme: 'light' // don't want any dark themes
  }
};
