module.exports = {
  plugins: ['node'],
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'script',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  env: {
    es6: true,
    node: true,
    jest: true
  },
  rules: {
    'no-console': 0,
    semi: [2, 'never'],
    quotes: [2, 'single', 'avoid-escape'],
    complexity: 0,
    duplication: 0
  }
}
