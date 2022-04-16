import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { babel } from '@rollup/plugin-babel'

export default {
  input: 'index.js',
  output: {
    entryFileNames: '[name].cjs',
    dir: 'dist',
    format: 'cjs',
    preserveModules: true,
    exports: 'named'
  },
  external: ['@babel/runtime'],
  plugins: [
    commonjs({ include: 'node_modules/**' }),
    resolve({ preferBuiltins: true }),
    json(),
    babel({
      babelHelpers: 'runtime',
      plugins: [['@babel/plugin-transform-runtime']]
    })
  ]
}
