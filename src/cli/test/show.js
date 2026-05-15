import { createSpinner } from 'nanospinner'

import { getTestByUuid } from '../../api/test.js'
import formatTest from '../../views/markdown.js'
import { options } from '../../utils/cli.js'
import { humaniseError } from '../../utils/api-error.js'

const main = async args => {
  let spinner

  if (!args.json && !args.markdown) {
    spinner = createSpinner('Connecting to Calibre').start()
    spinner.update({ text: 'Downloading test results' })
  }

  try {
    const response = await getTestByUuid(args.uuid)

    if (args.json) {
      return console.log(JSON.stringify(response, null, 2))
    }
    if (args.markdown) {
      return console.log(response.markdownReport)
    }

    spinner.stop()
    console.log(formatTest(response.markdownReport))
  } catch (e) {
    spinner.stop()
    throw new Error(humaniseError(e))
  }
}

const command = 'show <uuid>'
const describe =
  'See the results of a Single Page Test (also as outputted by the test create command).'
const handler = main
const builder = {
  json: options.json,
  markdown: options.markdown
}

export { command, describe, builder, handler }
