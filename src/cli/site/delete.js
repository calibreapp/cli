const ora = require('ora')

const { destroy } = require('../../api/site')
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
    if (!args.json) spinner.succeed(`Site deleted: ${response.name}`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

module.exports = {
  command: 'delete <slug> [options]',
  describe: 'Deletes a site',
  builder: yargs => {
    yargs
      .options({
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
