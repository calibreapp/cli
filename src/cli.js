#!/usr/bin/env node

const updateNotifier = require('update-notifier')
const chalk = require('chalk')
const pkg = require('../package.json')

updateNotifier({ pkg }).notify()

if (!process.env.CALIBRE_API_TOKEN) {
  throw new Error(
    'Please set CALIBRE_API_TOKEN as an environment variable. See calibreapp.com/docs/api/tokens for help.'
  )
}

module.exports = require('yargs')
  .usage(`${chalk.bold('♤  calibre')} subcommand [options]`)
  .commandDir('./cli')
  .demandCommand()
  .help('help')
  .updateStrings({
    'Commands:': chalk.grey('Commands:\n'),
    'Options:': chalk.grey('Options:\n')
  })
  .version(() => pkg.version)
  .showHelpOnFail(true)
  .recommendCommands()
  .example(
    '$0 test create https://calibreapp.com --location=Sydney --device=iPhone8 --connection=good3G',
    'Run a test on calibreapp.com from Sydney emulating an iPhone 8 with a 3G connection'
  )
  .fail((msg, err, yargs) => {
    console.error(
      chalk.bold.red(err),
      '\n\n',
      chalk.bold('--- Command documentation\n'),
      yargs.help(),
      '\n\n',
      chalk.bold('--- Stack trace below')
    )

    process.exitCode = 1
    if (err) throw err // Throw the trace, likley a unhandled promise error
  })
  .epilogue(
    `For more information on Calibre, see ${process.env.CALIBRE_HOST}.`
  ).argv
