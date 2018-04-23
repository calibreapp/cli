const { URL } = require('url')
const ora = require('ora')

const { destroy } = require('../../api/page')

const main = async function(args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    const response = await destroy(args)
    if (!args.json)
      spinner.succeed(`Page deleted: ${response.name} (${response.uuid})`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail(e[0].message)
    process.exit(1)
  }
}

module.exports = {
  command: 'delete-page [options]',
  describe: 'Deletes a page from a site',
  builder: yargs => {
    yargs.options({
      uuid: { demandOption: true, describe: 'The UUID of the page' },
      site: {
        demandOption: true,
        describe: 'The identifying slug of a site'
      },
      json: { describe: 'Return the list of pages as JSON' }
    })
  },
  handler: main
}
