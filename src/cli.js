#!/usr/bin/env node

const updateNotifier = require('update-notifier')
const chalk = require('chalk')
const pkg = require('../package.json')

updateNotifier({ pkg }).notify()

module.exports = require('yargs')
  .usage(`${chalk.bold('♤  calibre')} subcommand [options]`)
  .commandDir('./cli')
  .demandCommand()
  .help('help')
  .updateStrings({
    'Commands:': chalk.grey('Commands:\n'),
    'Options:': chalk.grey('Options:\n')
  })
  .version(pkg.version)
  .recommendCommands()
  .example(
    '$0 test create https://calibreapp.com --location=Sydney --device=iPhone8 --connection=good3G',
    'Run a test on calibreapp.com from Sydney emulating an iPhone 8 with a 3G connection'
  )
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
  .epilogue(
    `For more information on Calibre, see ${process.env.CALIBRE_HOST}.`
  ).argv
