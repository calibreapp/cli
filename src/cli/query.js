const ora = require('ora')

const { query } = require('../api/graphql')
const { humaniseError } = require('../utils/api-error')

const main = async args => {
  let spinner
  spinner = ora('Connecting to Calibre')
  spinner.color = 'magenta'
  spinner.start()

  let result
  try {
    result = await query(args)
  } catch (e) {
    spinner.fail()
    throw new Error(humaniseError(e))
  }

  spinner.stop()
  console.log(result)
}

module.exports = {
  command: 'query',
  describe: 'Query the Calibre GraphQL API',
  handler: main,
  builder: yargs => {
    yargs.options({
      query: {
        describe: 'GraphQL query to execute',
        demandOption: true,
        type: 'string',
        requiresArg: true
      },
      variables: {
        describe: 'Pass query variables as named arguments',
      },
    })
    yargs.example('calibre query --query=\'query GetSite($slug: String!) {organisation{site(slug: $slug){slug}}}\' --slug=calibre')
  }
}
