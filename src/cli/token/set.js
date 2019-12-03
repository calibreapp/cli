const Configstore = require('configstore')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

const pkg = require('../../../package.json')
const config = new Configstore(pkg.name)

const main = async ({ key }) => {
  config.set('token', key)
  console.log(`${chalk.bold.green(`${logSymbols.success} Token saved!`)}\n`)
}

module.exports = {
  command: 'set <key>',
  describe: 'Set the Calibre API token used for CLI commands',
  handler: main,
  builder: yargs => {
    yargs.example('calibre token set xxx123')
  }
}
