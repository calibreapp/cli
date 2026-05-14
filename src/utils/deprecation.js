import { styleText } from 'node:util'

const deprecatedHandler = (oldCommand, newCommand, handler) => {
  return async args => {
    if (!process.env.CALIBRE_SUPPRESS_DEPRECATIONS) {
      process.stderr.write(
        styleText('yellow',
          `[calibre:deprecated] "${oldCommand}" has moved to "${newCommand}"\n`
        )
      )
    }
    return handler(args)
  }
}

export { deprecatedHandler }
