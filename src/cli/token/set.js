import Configstore from 'configstore'
import chalk from 'chalk'
import logSymbols from 'log-symbols'

import pkg from '../../../package.json'
const config = new Configstore(pkg.name)

const main = async ({ key }) => {
  config.set('token', key)
  console.log(`${chalk.bold.green(`${logSymbols.success} Token saved!`)}\n`)
}

const command = 'set <key>'
const describe = 'Set the Calibre API token used for CLI commands'
const handler = main
const builder = yargs => {
  yargs.example('calibre token set xxx123')
}

export { command, describe, handler, builder }
