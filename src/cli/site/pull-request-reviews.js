import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'

import { list } from '../../api/pull-request-review.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

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
  const rows = index.pullRequestReviews.map(row => {
    return {
      uuid: chalk.grey(row.uuid),
      name: row.name,
      url: row.url,
      status: row.status
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

const command = 'pull-request-reviews [options]'
const describe = 'List Pull Request reviews for a selected Site.'
const handler = main
const builder = {
  site: options.site,
  json: options.json
}

export { command, describe, handler, builder }
