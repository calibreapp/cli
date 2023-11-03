export default {
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  testEnvironment: 'node',
  setupFiles: ['./.jest-setup.js'],
  testTimeout: 5000,
  preset: 'ts-jest/presets/default-esm',
  modulePathIgnorePatterns: ['./dist']
}
