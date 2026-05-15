import { styleText } from 'node:util'
import { createSpinner } from 'nanospinner'
import columnify from 'columnify'

import { list } from '../../api/page.js'
import { humaniseError, formatJsonError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'
import { fetchAll } from '../../utils/pagination.js'

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
      const pages = await fetchAll(
        async a => {
          const res = await list(a)
          return { items: res.pages, pageInfo: res.pageInfo }
        },
        args
      )

      if (!args.json) spinner.stop()
      if (args.json) return console.log(JSON.stringify(pages, null, 2))

      console.log(`${styleText('bold', String(pages.length))} pages`)

      const rows = pages.map(row => {
        return {
          uuid: styleText('gray', row.uuid),
          name: row.name,
          url: row.url
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
      console.log(`${styleText('bold', String(index.pages.length))} pages`)

      const rows = index.pages.map(row => {
        return {
          uuid: styleText('gray', row.uuid),
          name: row.name,
          url: row.url
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
        const lastPage = rows[rows.length - 1]
        console.log(
          `To see pages after ${
            lastPage.name || lastPage.uuid
          }, run: calibre synthetic pages --site=${args.site} --cursor=${
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

const command = 'pages [options]'
const describe = 'List Pages for a selected Site.'
const handler = main
const builder = {
  site: options.site,
  count: options.count,
  cursor: options.cursor,
  json: options.json,
  all: {
    describe: 'Fetch all pages (overrides --count and --cursor).',
    type: 'boolean',
    default: false
  }
}

export { command, describe, handler, builder }
