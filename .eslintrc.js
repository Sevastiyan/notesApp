module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest': true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    eqeqeq: 'error',
    // 'no-trailing-spaces': 'warning',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}
