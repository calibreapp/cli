const ora = require('ora')

const { destroy } = require('../../api/snapshot')
const { humaniseError } = require('../../utils/api-error')

const main = async function(args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    const response = await destroy(args)
    if (!args.json) spinner.succeed(`Snapshot deleted: ${response.iid}`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail(humaniseError(e))
    return Error(humaniseError(e))
  }
}

module.exports = {
  command: 'delete-snapshot [options]',
  describe: 'Deletes a snapshot from a site',
  builder: yargs => {
    yargs
      .options({
        iid: { demandOption: true, describe: 'The iid of the snapshot' },
        site: {
          demandOption: true,
          describe: 'The identifying slug of a site'
        },
        confirm: {
          describe: 'Confirm the deletion'
        },
        json: { describe: 'Return the snapshot attributes as JSON' }
      })
      .check(({ confirm }) => {
        if (process.stdout.isTTY && !confirm)
          return new Error(
            'Add the --confirm flag to confirm the immediate & irreversible deletion of this snapshot.'
          )
        return true
      })
  },
  handler: main
}
