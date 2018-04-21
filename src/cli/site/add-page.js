const { URL } = require('url')
const ora = require('ora')

const { create } = require('../../api/page')

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
    spinner.fail(e[0].message)
    process.exit(1)
  }
}

module.exports = {
  command: 'add-page [options]',
  describe: 'Add a page to an existing site tracked by Calibre',
  builder: yargs => {
    yargs
      .options({
        name: { demandOption: true, describe: 'The name of the page' },
        url: { demandOption: true, describe: 'The name of the page' },
        site: {
          demandOption: true,
          describe: 'The identifying slug of a site'
        },
        json: { describe: 'Return the list of pages as JSON' }
      })
      .check(({ url, location, cookieJar }) => {
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
