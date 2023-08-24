import ora from 'ora'
import columnify from 'columnify'
import { format as dateFormat } from 'date-fns'

import { list } from '../../api/pull-request-review.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async args => {
  let pullRequestReviews
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    pullRequestReviews = await list(args)
    if (args.json)
      return console.log(JSON.stringify(pullRequestReviews, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }

  spinner.stop()
  const rows = pullRequestReviews.map(row => {
    return {
      title: row.title,
      branch: row.branch,
      sha: row.sha,
      status: row.status,
      created: dateFormat(new Date(row.createdAt), 'h:mma d-MMM-yyyy')
    }
  })

  console.log(
    columnify(rows, {
      columnSplitter: ' | ',
      truncate: true,
      config: {
        title: {
          maxWidth: 40
        },
        sha: {
          maxWidth: 8
        }
      }
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
