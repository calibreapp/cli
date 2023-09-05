import ora from 'ora'

import { create } from '../../api/deploy.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
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
const describe = 'Create a deployment.'
const builder = {
  site: options.site,
  revision: {
    describe:
      'The source control revision id of the code you are deploying. It could be a git hash or a tag name.'
  },
  repository: {
    describe:
      'The base URL of the repository containing the source code being deployed (e.g. https://github.com/calibreapp/app).'
  },
  username: { describe: 'The username of who deployed the code.' },
  json: options.json
}

const handler = main

export { command, describe, builder, handler }
