const { URL } = require('url')
const ora = require('ora')

const { update } = require('../../api/page')
const { humaniseError } = require('../../utils/api-error')

const main = async function(args) {
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

module.exports = {
  command: 'update-page [options]',
  describe: 'Update the name and/or URL of a page',
  builder: yargs => {
    yargs
      .options({
        uuid: { demandOption: true, describe: 'The UUID of the page' },
        name: { describe: 'The name of the page' },
        url: { describe: 'The URL of the page' },
        site: {
          demandOption: true,
          describe: 'The identifying slug of a site'
        },
        json: { describe: 'Return the page attributes as JSON' }
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
  },
  handler: main
}
