// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'

// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// )


import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist'], // Ignore the 'dist' folder
  },
  {
    extends: [
      js.configs.recommended, // JavaScript recommended config
      'plugin:react/recommended', // React recommended config
      'plugin:@typescript-eslint/recommended', // TypeScript recommended config
    ],
    files: ['**/*.{ts,tsx}'], // Apply only to TypeScript and TSX files
    languageOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020
      parser: tsParser, // Use TypeScript parser
      sourceType: 'module', // Enable ES modules
      globals: globals.browser, // Browser global variables
    },
    plugins: {
      react, // React plugin for linting
      'react-hooks': reactHooks, // React hooks plugin
      'react-refresh': reactRefresh, // React refresh plugin
      '@typescript-eslint': tseslint, // TypeScript linting
    },
    rules: {
      ...react.configs.recommended.rules, // React recommended rules
      ...reactHooks.configs.recommended.rules, // React hooks recommended rules
      '@typescript-eslint/explicit-function-return-type': 'off', // Disable explicit return type for functions
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn for unused variables
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ], // React refresh rule
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];
