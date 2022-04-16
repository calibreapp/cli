#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import updateNotifier from 'update-notifier'
import chalk from 'chalk'
import { readPackage } from 'read-pkg'

const pkg = await readPackage({ cwd: __dirname })

updateNotifier({ pkg }).notify()

import commands from './cli-commands.js'

yargs(hideBin(process.argv))
  .usage(`${chalk.bold('♠  calibre')} subcommand [options]`)
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
  .example(
    '$0 token set <token>',
    'Store Calibre API token in ~/.config/configstore/calibre.json'
  )
  .example('$0 site list', 'List the sites in your Calibre account')
  .example('$0 test create <url>', 'Create a single page test')
  .fail((message, error, yargs) => {
    console.error(
      '\n\n',
      chalk.bold.red(message ? message : error),
      '\n\n',
      yargs.help()
    )

    if (error && process.env.DEBUG) {
      console.error('\n\n', chalk.bold('--- Stack trace below'))
      throw error
    }
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })
  .epilogue('For more information on Calibre, see https://calibreapp.com').argv
