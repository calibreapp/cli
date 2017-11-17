const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')
const dateFormat = require('date-fns/format')

const { list } = require('../api/snapshot')

const titleize = string => string.charAt(0).toUpperCase() + string.substring(1)

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
  console.log(`${chalk.bold(index.length)} snapshots`)

  const rows = index.map(row => {
    return {
      id: chalk.grey(row.id),
      url: row.html_url,
      ref: row.ref,
      client: row.client,
      status: `${titleize(row.status)} ${dateFormat(
        row.created_at,
        'h:mma D-MMM-YYYY'
      )}`
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
  command: 'snapshot-list <site>',
  describe: 'Print a list of snapshots',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the list of snapshots as JSON'
    })
  }
}
