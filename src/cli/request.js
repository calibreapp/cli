import ora from 'ora'

import { request } from '../api/graphql'
import { humaniseError } from '../utils/api-error'

const main = async args => {
  let spinner
  spinner = ora('Connecting to Calibre')
  spinner.color = 'magenta'
  spinner.start()

  let result
  try {
    result = await request(args)
  } catch (e) {
    spinner.fail()
    throw new Error(humaniseError(e))
  }

  spinner.stop()
  console.log(JSON.stringify(result, null, 2))
}

const command = 'request'
const describe = 'Make a request to the Calibre GraphQL API'
const handler = main
const builder = yargs => {
  yargs.options({
    query: {
      describe: 'GraphQL query to execute',
      demandOption: true,
      type: 'string',
      requiresArg: true
    },
    variables: {
      describe: 'Pass query variables as named arguments'
    }
  })
  yargs.example(
    "calibre request --query='query GetSite($slug: String!) {organisation{site(slug: $slug){slug}}}' --slug=calibre"
  )
}

export { command, describe, handler, builder }
