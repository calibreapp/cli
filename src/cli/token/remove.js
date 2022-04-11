import Configstore from 'configstore'
import chalk from 'chalk'
import logSymbols from 'log-symbols'

const config = new Configstore('calibre')

const main = async () => {
  if (config.get('token')) {
    config.set('token', null)
    console.log(`${chalk.bold.green(`${logSymbols.success} Token removed!`)}\n`)
  } else {
    console.log(`${chalk.bold.red(`${logSymbols.error} Token is not set!`)}\n`)
  }
}

const command = 'remove'
const describe =
  'Remove the Calibre API token used for CLI commands. e.g.: calibre token remove'
const handler = main
const builder = {}

export { command, describe, handler, builder }
