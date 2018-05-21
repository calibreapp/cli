const { URL } = require('url')
const ora = require('ora')

const { create } = require('../../api/page')
const { humaniseError } = require('../../utils/api-error')

const main = async function(args) {
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

module.exports = {
  command: 'create-page <name> [options]',
  describe: 'Add a page to an existing site tracked by Calibre',
  builder: yargs => {
    yargs
      .options({
        url: { demandOption: true, describe: 'The name of the page' },
        site: {
          demandOption: true,
          describe: 'The identifying slug of a site'
        },
        json: { describe: 'Return the page attributes as JSON' }
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
  },
  handler: main
}
