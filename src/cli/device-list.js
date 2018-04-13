const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')

const { list } = require('../api/device')

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
    spinner.fail(e.message)
    process.exit(1)
  }

  spinner.stop()
  console.log(`${chalk.bold(index.length)} test devices`)

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
  command: 'device-list',
  describe: 'Print a list of Calibre’s test devices',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the list of devices as JSON'
    })
  }
}
