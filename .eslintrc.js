module.exports = {
  plugins: ['node'],
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'script'
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    'no-console': 0,
    semi: [2, 'never'],
    quotes: [2, 'single', 'avoid-escape']
  }
}
