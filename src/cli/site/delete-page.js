import ora from 'ora'

import { destroy } from '../../api/page.js'
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
      'Add the --confirm flag to confirm the immediate and irreversible deletion of this Page.'
    )
  }

  try {
    const response = await destroy(args)
    if (!args.json)
      spinner.succeed(`Page deleted: ${response.name} (${response.uuid})`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'delete-page [options]'
const describe = 'Delete a Page from a selected Site.'
const builder = {
  site: options.site,
  uuid: {
    demandOption: true,
    requiresArg: true,
    describe: 'The UUID of the Page.'
  },
  confirm: {
    describe: 'Use this flag to confirm the deletion of the selected Page.'
  },
  json: options.json
}
const handler = main

export { command, describe, builder, handler }
