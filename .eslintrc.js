module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
  },
};
