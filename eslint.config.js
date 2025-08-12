import eslintJS from '@eslint/js';
import eslintAstroPlugin from 'eslint-plugin-astro';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import typescriptEslint from 'typescript-eslint';

import globals from 'globals';

export default [
  eslintJS.configs.recommended,
  {
    ...eslintAstroPlugin.configs.recommended,
    ...eslintAstroPlugin.configs['jsx-a11y-strict'],
    files: ['*.astro'],
    parserOptions: {
      parser: '@typescript-eslint/parser',
      extraFileExtensions: ['.astro']
    },
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    }
  },
  ...typescriptEslint.configs.recommended,
  ...typescriptEslint.configs.stylistic,
  // eslintPluginPrettierRecommended,   // This should be last, TODO: enable after fixing the other stuff
  {
    files: ['public/config.js'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    // Note: there should be no other properties in this object
    ignores: ['dist/**', 'eslint.config.js', 'tf/**', 'src/env.d.ts', 'config/**', 'public/**', '.astro/**']
  }
];
