import ora from 'ora'

import { getTestByUuid } from '../../api/test.js'
import formatTest from '../../views/test.js'
import { options } from '../../utils/cli.js'
import { humaniseError } from '../../utils/api-error.js'

const main = async args => {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()

    spinner.text = 'Downloading test results'
  }

  try {
    const response = await getTestByUuid(args.uuid)

    if (args.json) return console.log(JSON.stringify(response, null, 2))

    spinner.stop()
    console.log(formatTest(response))
  } catch (e) {
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'show <uuid>'
const describe = 'Print the details of a given test'
const handler = main
const builder = {
  json: options.json
}

export { command, describe, builder, handler }
