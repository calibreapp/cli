const ora = require('ora')

const { destroy } = require('../../api/deploy')
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
    if (!args.json) spinner.succeed(`Deploy deleted: ${response.uuid}`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail(humaniseError(e))
    return Error(humaniseError(e))
  }
}

module.exports = {
  command: 'delete-deploy [options]',
  describe: 'Deletes a deploy from a site',
  builder: yargs => {
    yargs
      .options({
        uuid: { demandOption: true, describe: 'The uuid of the deploy' },
        site: options.site,
        confirm: {
          describe: 'Confirm the deletion'
        },
        json: options.json
      })
      .check(({ confirm }) => {
        if (process.stdout.isTTY && !confirm)
          return new Error(
            'Add the --confirm flag to confirm the immediate & irreversible deletion of this deploy.'
          )
        return true
      })
  },
  handler: main
}
