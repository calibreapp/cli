const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')

const { list } = require('../api/connection')
const { humaniseError } = require('../utils/api-error')

const main = async args => {
  let index
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    index = await list(args)
    if (args.json) return console.log(JSON.stringify(index, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail(humaniseError(e))
    process.exit(1)
  }

  spinner.stop()
  console.log(`${chalk.bold(index.length)} emulated connection speeds`)

  const rows = index.map(row => {
    return {
      identifier: chalk.cyan(row.name)
    }
  })

  console.log(
    columnify(rows, {
      columnSplitter: ' | ',
      truncate: true,
      maxLineWidth: 'auto'
    })
  )
}

module.exports = {
  command: 'connection-list',
  describe: 'Print a list of Calibre’s prebaked emulated connection options',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the list of devices as JSON'
    })
  }
}
