import Configstore from 'configstore'
import chalk from 'chalk'
import logSymbols from 'log-symbols'

const config = new Configstore('calibre')

const main = async ({ key }) => {
  config.set('token', key)
  console.log(`${chalk.bold.green(`${logSymbols.success} Token saved!`)}\n`)
}

const command = 'set <key>'
const describe = 'Set the Calibre API token used for CLI commands'
const handler = main
const builder = {}

export { command, describe, handler, builder }
