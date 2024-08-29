import js from '@eslint/js'
import node from 'eslint-plugin-n'
import pluginSecurity from 'eslint-plugin-security'
import pluginJest from 'eslint-plugin-jest'

export default [
  {
    ignores: ['coverage/', 'examples/', 'dist/', 'eslint.config.js']
  },
  js.configs.recommended,
  node.configs['flat/recommended-module'],
  pluginSecurity.configs.recommended,
  pluginJest.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'no-console': 0,
      'n/shebang': 0,
      semi: [2, 'never'],
      quotes: [2, 'single', 'avoid-escape'],
      complexity: 0,
      duplication: 0
    }
  }
]
