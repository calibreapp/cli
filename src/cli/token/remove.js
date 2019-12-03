const Configstore = require('configstore')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

const pkg = require('../../../package.json')
const config = new Configstore(pkg.name)

const main = async () => {
  if (config.get('token')) {
    config.set('token', null)
    console.log(`${chalk.bold.green(`${logSymbols.success} Token removed!`)}\n`)
  } else {
    console.log(`${chalk.bold.red(`${logSymbols.error} Token is not set!`)}\n`)
  }
}

module.exports = {
  command: 'remove',
  describe: 'Remove the Calibre API token used for CLI commands',
  handler: main,
  builder: yargs => {
    yargs.example('calibre token remove')
  }
}
