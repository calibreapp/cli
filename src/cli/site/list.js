import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'
import { format as dateFormat } from 'date-fns'

import { list } from '../../api/site.js'
import { options } from '../../utils/cli.js'
import { humaniseError } from '../../utils/api-error.js'

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
  console.log(`${chalk.bold(index.length)} sites`)

  const rows = index.map(row => {
    return {
      slug: chalk.grey(row.slug),
      name: row.name,
      status: `${dateFormat(new Date(row.createdAt), 'h:mma d-MMM-yyyy')}`
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

const command = 'list'
const describe = 'Print a list of sites being tracked by Calibre'
const handler = main
const builder = {
  json: options.json
}

export { command, describe, builder, handler }
