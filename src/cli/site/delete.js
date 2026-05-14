import { createSpinner } from 'nanospinner'

import { destroy } from '../../api/site.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  if (process.stdout.isTTY && !args.confirm) {
    return new Error(
      'Add the --confirm flag to confirm the immediate and irreversible deletion of this Site.'
    )
  }

  try {
    const response = await destroy(args)
    if (!args.json) spinner.success({ text: `Site deleted: ${response.name}` })

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }
}

const command = 'delete <slug> [options]'
const describe = 'Delete a selected Site.'
const builder = {
  confirm: {
    describe: 'Use this flag to confirm the deletion of the selected Site.'
  },
  json: options.json
}

const handler = main

export { command, describe, builder, handler }
