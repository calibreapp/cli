import { promises as fs } from 'fs'
import ora from 'ora'

import {
  create,
  waitForReviewCompletion
} from '../../api/pull-request-review.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'
import formatMarkdownResult from '../../views/markdown.js'

const print = function (args, pullRequestReviewResponse) {
  if (args.json) {
    return console.log(JSON.stringify(pullRequestReviewResponse, null, 2))
  }

  if (args.markdown) {
    return console.log(pullRequestReviewResponse.markdownReport)
  }

  return console.log(
    formatMarkdownResult(pullRequestReviewResponse.markdownReport)
  )
}

const main = async function (args) {
  let spinner

  if (!args.json && !args.markdown) {
    spinner = ora('Connecting to Calibre').start()
  }

  if (args.configPath) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    args.config = await fs.readFile(args.configPath, 'utf8')
  }

  try {
    const response = await create(args)

    if (!args.waitForResult) {
      spinner.succeed(`Pull Request Review queued: ${args.branch}.`)

      console.log(
        `View progress by running \`calibre site pull-request-review ${args.branch} --site=${args.site}\``
      )

      return print(args, response)
    } else {
      if (spinner) {
        spinner.succeed(`Pull Request Review queued: ${args.branch}`)
        spinner = ora('Waiting for Pull Request Review to complete').start()
      }

      const completedResponse = await waitForReviewCompletion(
        args.site,
        args.branch
      )

      if (spinner) {
        spinner.succeed('Pull Request Review completed')
      }

      print(args, completedResponse)

      if (
        args.failOnUnmetBudget &&
        completedResponse.metricBudgetStatus === 'unmet'
      ) {
        throw new Error('Pull Request Review failed due to unmet budget')
      }
    }
  } catch (e) {
    if (args.json || args.markdown) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'create-pull-request-review [options]'
const describe = 'Create a Pull Request Review of a preview deployment.'
const builder = {
  title: {
    describe: 'e.g. "My Pull Request"',
    demandOption: true,
    requiresArg: true
  },
  site: options.site,
  url: {
    describe:
      'The base URL of the preview deployment (e.g.: https://my-pull-request-123.example.com).',
    demandOption: true,
    requiresArg: true
  },
  branch: {
    describe:
      'The branch of the preview deployment. e.g.: "my-pull-request-123".',
    demandOption: true,
    requiresArg: true
  },
  sha: {
    describe:
      'The source control revision of the deployed code. e.g.: 9c72279.',
    demandOption: true,
    requiresArg: true
  },
  configPath: {
    describe: 'Path to a Calibre YAML config file.'
  },
  waitForResult: {
    describe: 'Wait for pull request to be evaluated before returning.',
    type: 'boolean',
    default: false
  },
  failOnUnmetBudget: {
    describe:
      'Return a command failure if any existing budget is exceeded. (Requires --waitForResult to be set.)',
    type: 'boolean',
    default: false
  },

  json: options.json,
  markdown: options.markdown
}

const handler = main

export { command, describe, builder, handler }
