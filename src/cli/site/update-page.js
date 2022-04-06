import { URL } from 'url'
import ora from 'ora'

import { update } from '../../api/page'
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
const describe = 'Update the name and/or URL of a page'
const builder = yargs => {
  yargs
    .options({
      uuid: { demandOption: true, describe: 'The UUID of the page' },
      name: { describe: 'The name of the page' },
      url: { describe: 'The URL of the page' },
      site: options.site,
      json: options.json
    })
    .check(({ url }) => {
      if (url) {
        try {
          new URL(url)
        } catch (e) {
          return new Error('Please enter a valid URL')
        }
      }

      return true
    })
}
const handler = main

export { command, describe, builder, handler }
