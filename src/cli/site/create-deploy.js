import ora from 'ora'

import { create } from '../../api/deploy'
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
    if (!args.json) spinner.succeed(`Deploy created: ${response.uuid}`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'create-deploy [options]'
const describe = 'Create a deploy'
const builder = yargs => {
  yargs.options({
    revision: {
      describe:
        'The source control revision id of the code you are deploying (e.g. git hash or tag name)'
    },
    repository: {
      describe:
        'The base URL of the repository containing the source code being deployed (e.g. https://github.com/calibreapp/app)'
    },
    username: { describe: 'THe name of the user who deployed the code' },
    site: options.site,
    json: options.json
  })
}

const handler = main

export { command, describe, builder, handler }
