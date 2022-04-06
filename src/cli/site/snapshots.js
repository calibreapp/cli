import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'
import dateFormat from 'date-fns/format'

import { list } from '../../api/snapshot'
import { humaniseError } from '../../utils/api-error'
import { options } from '../../utils/cli'

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
      `To see snapshots after ${
        lastSnapshot.ref || lastSnapshot.id
      }, run: calibre site snapshots --site=calibre --cursor=${
        index.pageInfo.endCursor
      }`
    )
  }
}

const command = 'snapshots [options]'
const describe = 'Print a list of snapshots'
const handler = main
const builder = yargs => {
  yargs.options({
    site: options.site,
    count: options.count,
    cursor: options.cursor,
    json: options.json
  })
}

export { command, describe, handler, builder }
