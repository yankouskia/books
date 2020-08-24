module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended', 'prettier/react'],
  plugins: ['react', 'react-hooks'],
  env: {
    browser: true,
    es6: true,
    node: true,
    serviceworker: true,
  },
  rules: {
    'prefer-const': 'error',
    'react/prop-types': 0,
    'no-unused-vars': ['error'],
    'no-console': ['error', { allow: ['clear', 'info', 'warn', 'error'] }],
    'react/jsx-no-target-blank': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 'off',
  },
  parserOptions: {
    sourceType: 'module',
  },
};
