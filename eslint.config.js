import eslintJS from '@eslint/js';
import eslintAstroPlugin from 'eslint-plugin-astro';
import typescriptEslint from 'typescript-eslint';

import globals from 'globals';

// TODO: eslint-prettier-plugin is not compatible with eslint@v9 yet. Add it back when it becomes compatible.

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
  // eslintPrettierPlugin.configs.recommended, // This should be the last
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
    ignores: ['dist/**', 'eslint.config.js', 'tf/**', 'src/env.d.ts', 'config/**']
  }
];
