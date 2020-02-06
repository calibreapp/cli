const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')
const dateFormat = require('date-fns/format')

const { list } = require('../../api/snapshot')
const { humaniseError } = require('../../utils/api-error')
const { options } = require('../../utils/cli')

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
    spinner.fail()
    throw new Error(humaniseError(e))
  }

  spinner.stop()
  console.log(`${chalk.bold(index.snapshots.length)} snapshots`)

  const rows = index.snapshots.map(row => {
    return {
      id: chalk.grey(row.iid),
      url: row.htmlUrl,
      ref: row.ref,
      client: row.client,
      status: `${row.status ? titleize(row.status) : ''} ${dateFormat(
        new Date(row.createdAt),
        'h:mma d-MMM-yyyy'
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

  if (index.pageInfo.hasNextPage) {
    const lastSnapshot = rows[rows.length - 1]
    console.log(
      `To see snapshots after ${lastSnapshot.ref ||
        lastSnapshot.id}, run: calibre site snapshots --site=calibre --cursor=${
        index.pageInfo.endCursor
      }`
    )
  }
}

module.exports = {
  command: 'snapshots [options]',
  describe: 'Print a list of snapshots',
  handler: main,
  builder: yargs => {
    yargs.options({
      site: options.site,
      count: options.count,
      cursor: options.cursor,
      json: options.json
    })
  }
}
