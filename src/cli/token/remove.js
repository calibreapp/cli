import Configstore from 'configstore'
import chalk from 'chalk'
import logSymbols from 'log-symbols'

const config = new Configstore('calibre')

const main = async () => {
  if (config.get('token')) {
    config.set('token', null)
    console.log(`${chalk.bold.green(`${logSymbols.success} API Token removed.`)}\n`)
  } else {
    console.log(`${chalk.bold.red(`${logSymbols.error} API Token is not set.`)}\n`)
  }
}

const command = 'remove'
const describe = 'Remove the saved API Token used for CLI commands (from ~/.config/configstore/calibre.json).'
const handler = main
const builder = {}

export { command, describe, handler, builder }
