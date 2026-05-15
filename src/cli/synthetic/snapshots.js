import { styleText } from 'node:util'
import { createSpinner } from 'nanospinner'
import columnify from 'columnify'
import { format as dateFormat } from 'date-fns'

import { list } from '../../api/snapshot.js'
import { humaniseError, formatJsonError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'
import { fetchAll } from '../../utils/pagination.js'

const titleize = string => string.charAt(0).toUpperCase() + string.substring(1)

const main = async args => {
  if (args.all && args.cursor) {
    throw new Error('Cannot use --all with --cursor.')
  }

  let spinner
  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    if (args.all) {
      const snapshots = await fetchAll(
        async a => {
          const res = await list(a)
          return { items: res.snapshots, pageInfo: res.pageInfo }
        },
        args
      )

      if (!args.json) spinner.stop()
      if (args.json) return console.log(JSON.stringify(snapshots, null, 2))

      console.log(
        `${styleText('bold', String(snapshots.length))} snapshots`
      )

      const rows = snapshots.map(row => {
        return {
          id: styleText('gray', String(row.iid)),
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
    } else {
      const index = await list(args)
      if (args.json) return console.log(JSON.stringify(index, null, 2))

      spinner.stop()
      console.log(
        `${styleText('bold', String(index.snapshots.length))} snapshots`
      )

      const rows = index.snapshots.map(row => {
        return {
          id: styleText('gray', String(row.iid)),
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
          }, run: calibre synthetic snapshots --site=${args.site} --cursor=${
            index.pageInfo.endCursor
          }`
        )
      }
    }
  } catch (e) {
    if (args.json) return formatJsonError(e)
    if (spinner) spinner.stop()
    throw new Error(humaniseError(e))
  }
}

const command = 'snapshots [options]'
const describe = 'List selected Snapshots for a Site.'
const handler = main
const builder = {
  site: options.site,
  count: options.count,
  cursor: options.cursor,
  json: options.json,
  all: {
    describe: 'Fetch all snapshots (overrides --count and --cursor).',
    type: 'boolean',
    default: false
  }
}

export { command, describe, handler, builder }
