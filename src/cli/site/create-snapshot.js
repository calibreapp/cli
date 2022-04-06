import ora from 'ora'

import { create } from '../../api/snapshot'
import { humaniseError } from '../../utils/api-error'
import { options } from '../../utils/cli'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
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
const describe = 'Create a snapshot'
const builder = yargs => {
  yargs.options({
    ref: { describe: 'Sets a reference to the snapshot' },
    site: options.site,
    json: options.json
  })
}
const handler = main

export { command, describe, builder, handler }
