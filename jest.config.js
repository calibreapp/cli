export default {
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  testEnvironment: 'node',
  setupFiles: ['./.jest-setup.js'],
  // chalk appears to inline it's dependencies, but jest requires module resolution help
  // https://github.com/chalk/chalk/blob/main/package.json#L11-L17
  moduleNameMapper: {
    '#ansi-styles': 'chalk/source/vendor/ansi-styles/index.js',
    '#supports-color': 'chalk/source/vendor/supports-color/index.js'
  }
}
