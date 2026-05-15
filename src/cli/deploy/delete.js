import { createSpinner } from 'nanospinner'

import { destroy } from '../../api/deploy.js'
import { humaniseError, formatJsonError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  if (process.stdout.isTTY && !args.confirm) {
    return new Error(
      'Add the --confirm flag to confirm the immediate and irreversible deletion of this deploy.'
    )
  }

  try {
    const response = await destroy(args)
    if (!args.json) spinner.success({ text: `Deploy deleted: ${response.uuid}` })

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return formatJsonError(e)
    spinner.stop()
    return Error(humaniseError(e))
  }
}

const command = 'delete [options]'
const describe = 'Delete a deploy from a selected Site.'
const builder = {
  site: options.site,
  uuid: {
    demandOption: true,
    requiresArg: true,
    describe: 'The UUID of the deploy.'
  },
  confirm: {
    describe: 'Use this flag to confirm the deletion of the selected deploy.'
  },
  json: options.json
}
const handler = main

export { command, describe, builder, handler }
