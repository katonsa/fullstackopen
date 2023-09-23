module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' }, jest: { version: '29.7.0' } },
  plugins: ['react-refresh', 'jest', 'cypress'],
  rules: {
    eqeqeq: 'error',
    // 'no-trailing-spaces': 'error',
    // 'object-curly-spacing': [
    //   'error', 'always'
    // ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
