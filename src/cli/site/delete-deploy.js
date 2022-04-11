import ora from 'ora'

import { destroy } from '../../api/deploy.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  if (process.stdout.isTTY && !args.confirm) {
    return new Error(
      'Add the --confirm flag to confirm the immediate & irreversible deletion of this deploy.'
    )
  }

  try {
    const response = await destroy(args)
    if (!args.json) spinner.succeed(`Deploy deleted: ${response.uuid}`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail(humaniseError(e))
    return Error(humaniseError(e))
  }
}

const command = 'delete-deploy [options]'
const describe = 'Deletes a deploy from a site'
const builder = {
  site: options.site,
  uuid: {
    demandOption: true,
    requiresArg: true,
    describe: 'The uuid of the deploy'
  },
  confirm: {
    describe: 'Confirm the deletion'
  },
  json: options.json
}
const handler = main

export { command, describe, builder, handler }
