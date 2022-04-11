#!/usr/bin/env node --no-warnings --experimental-json-modules

/*
  Node Support

  --experimental-json-modules for JSON imports (for package.json below)`
*/

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import updateNotifier from 'update-notifier'
import chalk from 'chalk'
import pkg from '../package.json'

updateNotifier({ pkg }).notify()

import commands from './cli-commands.js'

const cli = yargs(hideBin(process.argv))
  .usage(`${chalk.bold('♤  calibre')} subcommand [options]`)
  .commands(commands)
  .demandCommand()
  .recommendCommands()
  .strictCommands()
  .help('help')
  .updateStrings({
    'Commands:': chalk.grey('Commands:\n'),
    'Options:': chalk.grey('Options:\n')
  })
  .version(pkg.version)
  .example('$0 site list', 'List the sites in your Calibre account')
  .fail((message, error, yargs) => {
    console.error(
      '\n\n',
      chalk.bold.red(message ? message : error),
      '\n\n',
      chalk.bold('--- Command documentation\n'),
      yargs.help()
    )

    if (error && process.env.DEBUG) {
      console.error('\n\n', chalk.bold('--- Stack trace below'))
      throw error
    }

    process.exit(1)
  })
  .epilogue(`For more information on Calibre, see https://calibreapp.com`).argv

export default cli

export { commands }
