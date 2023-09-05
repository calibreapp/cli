import ora from 'ora'

import { destroy } from '../../api/snapshot.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
  }

  if (process.stdout.isTTY && !args.confirm) {
    return new Error(
      'Add the --confirm flag to confirm the immediate and irreversible deletion of this Snapshot.'
    )
  }

  try {
    const response = await destroy(args)
    if (!args.json) spinner.succeed(`Snapshot deleted: ${response.iid}`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail(humaniseError(e))
    return Error(humaniseError(e))
  }
}

const command = 'delete-snapshot [options]'
const describe = 'Delete a Snapshot from a selected Site.'
const builder = {
  site: options.site,
  id: {
    demandOption: true,
    requiresArg: true,
    describe: 'The id of the Snapshot.'
  },
  confirm: {
    describe: 'Use this flag to confirm the deletion of the selected Snapshot.'
  },
  json: options.json
}
const handler = main

export { command, describe, builder, handler }
