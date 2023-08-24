import ora from 'ora'

import { create } from '../../api/snapshot.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
  }

  try {
    const response = await create(args)
    if (!args.json) spinner.succeed(`Snapshot created: ${response.iid}`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'create-snapshot [options]'
const describe = 'Create a Snapshot.'
const builder = {
  site: options.site,
  ref: { describe: 'Set a reference to the Snapshot.' },
  json: options.json
}
const handler = main

export { command, describe, builder, handler }
