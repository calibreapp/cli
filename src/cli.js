#!/usr/bin/env node

import fs from 'fs'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import updateNotifier from 'simple-update-notifier'
import chalk from 'chalk'

const pkg = JSON.parse(
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8')
)

updateNotifier({ pkg })

import commands from './cli-commands.js'

yargs(hideBin(process.argv))
  .usage(`${chalk.bold('♠  calibre')} subcommand [options]`)
  .scriptName('calibre')
  .commands(commands)
  .demandCommand()
  .recommendCommands()
  .strictCommands()
  .help('help')
  .updateStrings({
    'Commands:': chalk.grey('Commands:\n'),
    'Options:': chalk.grey('Options:\n'),
    'Examples:': chalk.grey('Examples:\n')
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
    // eslint-disable-next-line n/no-process-exit
    process.exit(1)
  })
  .epilogue('For more information on Calibre, see https://calibreapp.com').argv
