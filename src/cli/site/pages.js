import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'

import { list } from '../../api/page.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async args => {
  let index
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
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
  console.log(`${chalk.bold(index.pages.length)} pages`)

  const rows = index.pages.map(row => {
    return {
      uuid: chalk.grey(row.uuid),
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
      }, run: calibre site pages --site=calibre --cursor=${
        index.pageInfo.endCursor
      }`
    )
  }
}

const command = 'pages [options]'
const describe = 'List Pages for a selected Site.'
const handler = main
const builder = {
  site: options.site,
  count: options.count,
  cursor: options.cursor,
  json: options.json
}

export { command, describe, handler, builder }
