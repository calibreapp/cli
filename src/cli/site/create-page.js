import { URL } from 'url'
import ora from 'ora'

import { create } from '../../api/page.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    new URL(args.url)
  } catch (e) {
    return new Error('Please enter a valid URL')
  }

  try {
    const response = await create(args)
    if (!args.json)
      spinner.succeed(`Page added: ${response.name} (${response.uuid})`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'create-page <name> [options]'
const describe = 'Add a page to an existing site tracked by Calibre'
const builder = {
  site: options.site,
  url: {
    demandOption: true,
    requiresArg: true,
    describe: 'The name of the page'
  },
  json: options.json
}
const handler = main

export { command, describe, builder, handler }
