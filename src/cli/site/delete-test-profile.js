import ora from 'ora'

import { destroy } from '../../api/test-profile.js'
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
      'Add the --confirm flag to confirm the immediate & irreversible deletion of this test profile.'
    )
  }

  try {
    const response = await destroy(args)
    if (!args.json)
      spinner.succeed(
        `Test Profile deleted: ${response.name} (${response.uuid})`
      )

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'delete-test-profile [options]'
const describe = 'Deletes a test profile from a site'
const builder = {
  site: options.site,
  uuid: {
    demandOption: true,
    requiresArg: true,
    describe: 'The UUID of the test profile'
  },
  confirm: {
    describe: 'Confirm the deletion'
  },
  json: options.json
}
const handler = main

export { command, describe, builder, handler }
