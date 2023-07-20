import { promises as fs } from 'fs'
import ora from 'ora'

import {
  create,
  waitForReviewCompletion
} from '../../api/pull-request-review.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json || !args.markdown) {
    const spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  if (args.configPath) {
    args.config = await fs.readFile(args.configPath, 'utf8')
  }

  try {
    const response = await create(args)

    if (args.json && !args.waitForResult) {
      return console.log(JSON.stringify(response, null, 2))
    }

    if (args.markdown && !args.waitForResult) {
      return console.log(response.markdownReport)
    }

    if (args.waitForResult) {
      spinner.succeed(`Pull Request Review queued (${response.branch})`)
    } else if (!args.json) {
      const review = await waitForReviewCompletion(args.site, response.branch)

      // TODO: Convert markdown to terminal output
      console.log(review.markdownReport)
    }
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'create-pull-request-review [options]'
const describe = 'Create a Pull Request Review of a preview deployment.'
const builder = {
  title: {
    describe: 'e.g. "My Pull Request"'
  },
  site: options.site,
  url: {
    demandOption: true,
    requiresArg: true,
    describe:
      'The base URL of the preview deployment (e.g. https://my-pull-request-123.example.com).'
  },
  branch: {
    describe:
      'The branch of the preview deployment. e.g. "my-pull-request-123".',
    demandOption: true,
    requiresArg: true
  },
  sha: {
    describe:
      'The source control revision of the deployed code. e.g.: 9c72279, '
  },
  configPath: {
    describe: 'Path to a Calibre YAML config file.'
  },
  waitForResult: {
    describe: 'Wait for PR to be evaluated before returning.',
    type: 'boolean',
    default: false
  },

  json: options.json,
  markdown: options.markdown
}

const handler = main

export { command, describe, builder, handler }
