import { URL } from 'url'
import ora from 'ora'

import { update } from '../../api/page.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
  }

  if (args.url) {
    try {
      new URL(args.url)
    } catch {
      return new Error('Please enter a valid URL')
    }
  }

  try {
    const response = await update(args)
    if (!args.json)
      spinner.succeed(`Page updated: ${response.name} (${response.uuid})`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'update-page [options]'
const describe = 'Update the name or URL of a Page.'
const builder = {
  uuid: {
    demandOption: true,
    requiresArg: true,
    describe: 'The UUID of the Page.'
  },
  name: { describe: 'Update the name of the Page.' },
  url: { describe: 'Update the URL of the Page.' },
  site: options.site,
  json: options.json
}

const handler = main

export { command, describe, builder, handler }
