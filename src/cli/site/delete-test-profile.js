const ora = require('ora')

const { destroy } = require('../../api/test-profile')
const { humaniseError } = require('../../utils/api-error')
const { options } = require('../../utils/cli')

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
      spinner.succeed(
        `Test Profile deleted: ${response.name} (${response.uuid})`
      )

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

module.exports = {
  command: 'delete-test-profile [options]',
  describe: 'Deletes a test profile from a site',
  builder: yargs => {
    yargs
      .options({
        uuid: { demandOption: true, describe: 'The UUID of the test profile' },
        site: options.site,
        confirm: {
          describe: 'Confirm the deletion'
        },
        json: options.json
      })
      .check(({ confirm }) => {
        if (process.stdout.isTTY && !confirm)
          return new Error(
            'Add the --confirm flag to confirm the immediate & irreversible deletion of this test profile.'
          )
        return true
      })
  },
  handler: main
}
