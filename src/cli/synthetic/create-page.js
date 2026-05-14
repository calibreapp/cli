import { URL } from 'url'
import { createSpinner } from 'nanospinner'

import { create } from '../../api/page.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    new URL(args.url)
  } catch {
    return new Error('Please enter a valid URL')
  }

  try {
    const response = await create(args)
    if (!args.json)
      spinner.success({ text: `Page added: ${response.name} (${response.uuid})` })

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }
}

const command = 'create-page <name> [options]'
const describe = 'Add a Page to an existing Site tracked by Calibre.'
const builder = {
  site: options.site,
  url: {
    demandOption: true,
    requiresArg: true,
    describe: 'The URL of the Page.'
  },
  json: options.json
}
const handler = main

export { command, describe, builder, handler }
