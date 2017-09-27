#!/usr/bin/env node

const updateNotifier = require('update-notifier')
const chalk = require('chalk')
const pkg = require('../package.json')

updateNotifier({ pkg }).notify()

process.env.CALIBRE_HOST = 'https://calibreapp.com'

if (!process.env.CALIBRE_API_KEY) {
  console.log(
    chalk.grey(
      'Please set CALIBRE_API_KEY as an environment variable, Get your key at'
    ),
    chalk.blue(`${process.env.CALIBRE_HOST}/profile`)
  )
  process.exit()
}

module.exports = require('yargs')
  .usage(`${chalk.bold('♤  calibre')} subcommand [options]`)
  .commandDir('cli')
  .demandCommand()
  .help('help')
  .updateStrings({
    'Commands:': chalk.grey('Commands:\n'),
    'Options:': chalk.grey('Options:\n')
  })
  .version(() => pkg.version)
  .showHelpOnFail(true)
  .epilogue('For more information on Calibre, see https://calibreapp.com.').argv
