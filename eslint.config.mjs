import importPlugin from 'eslint-plugin-import'
import globals from 'globals'

export default [
  { ignores: ['node_modules/**', 'dist/**', 'build/**', 'vite.config.js'] },
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: { import: importPlugin },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, Intl: 'readonly' },
    },
    settings: {
      'import/extensions': ['.js', '.jsx'],
      'import/resolver': {
        node: { extensions: ['.js', '.jsx'] },
        alias: { map: [['@', './src']], extensions: ['.js', '.jsx'] },
      },
    },
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,

      'no-unused-vars': 'off', // Non-critical, code works fine with unused vars
      'import/no-named-as-default': 'off', // Can cause runtime import errors, usually fine to leave as is
      'import/no-named-as-default-member': 'off', // Can cause runtime import errors

      // Critical rules that prevent runtime errors
      'no-undef': 'error', // Undefined variables cause runtime errors

      // Override recommended import rules for stricter checking
      'import/no-self-import': 'error', // Extremely fast rule, breaking results in infinite loop/bundling error

      // Disable expensive rules for performance
      'import/no-cycle': 'off', // AI rarely makes this error, and the rule is very slow to run
    },
  },
]
