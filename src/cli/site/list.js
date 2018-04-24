const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')
const dateFormat = require('date-fns/format')

const { list } = require('../../api/site')
const { humaniseError } = require('../../utils/api-error')

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
  console.log(`${chalk.bold(index.length)} sites`)

  const rows = index.map(row => {
    return {
      identifier: chalk.grey(row.slug),
      name: row.name,
      status: `${dateFormat(row.createdAt, 'h:mma D-MMM-YYYY')}`
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
  command: 'list',
  describe: 'Print a list of sites being tracked by Calibre',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the list of sites as JSON'
    })
  }
}
