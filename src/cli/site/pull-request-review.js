import ora from 'ora'

import { getPRReviewByBranch } from '../../api/pull-request-review.js'
import formatTest from '../../views/markdown.js'
import { options } from '../../utils/cli.js'
import { humaniseError } from '../../utils/api-error.js'

const main = async args => {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
    spinner.text = 'Fetching Pull Request Review'
  }

  try {
    const [response] = await getPRReviewByBranch(args.site, args.branch)

    if (args.json) return console.log(JSON.stringify(response, null, 2))

    spinner.stop()
    console.log(formatTest(response.markdownReport))
  } catch (e) {
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'pull-request-review <branch>'
const describe = 'See the results of a Pull Request Review.'
const handler = main
const builder = {
  site: options.site,
  json: options.json
}

export { command, describe, builder, handler }
