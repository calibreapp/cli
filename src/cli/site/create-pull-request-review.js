import ora from 'ora'

import {
  create,
  waitForReviewCompletion
} from '../../api/pull-request-review.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    const response = await create(args)
    if (!args.json && !args.waitForResult) {
      spinner.succeed(`Pull Request Review created: ${response.uuid}`)
    } else {
      const review = await waitForReviewCompletion(args.site, response.uuid)

      if (review.status == 'completed') {
        spinner.succeed(`Pull Request Review completed: ${review.uuid}`)
        // Print markdown report, JSON or whatever happens here
      }
    }

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'create-pull-request-review [options]'
const describe = 'Create a Pull Request Review of a preview deployment.'
const builder = {
  name: {
    describe: 'e.g. "My Pull Request"'
  },
  site: options.site,
  url: {
    demandOption: true,
    requiresArg: true,
    describe:
      'The base URL of the preview deployment (e.g. https://my-pull-request-123.example.com).'
  },
  sha: {
    describe:
      'The source control revision of the deployed code. e.g.: 9c72279, '
  },
  waitForResult: {
    describe: 'Wait for PR to be evaluated before returning.',
    type: 'boolean',
    default: false
  },

  json: options.json
}

const handler = main

export { command, describe, builder, handler }
