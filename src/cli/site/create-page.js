import { URL } from 'url'
import ora from 'ora'

import { create } from '../../api/page'
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
const builder = yargs => {
  yargs
    .options({
      url: { demandOption: true, describe: 'The name of the page' },
      site: options.site,
      json: options.json
    })
    .check(({ url }) => {
      if (!url.length) return new Error('Please provide a URL')

      try {
        new URL(url)
      } catch (e) {
        return new Error('Please enter a valid URL')
      }

      return true
    })
}
const handler = main

export { command, describe, builder, handler }
