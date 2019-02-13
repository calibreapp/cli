const ora = require('ora')

const { create } = require('../../api/snapshot')
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
    const response = await create(args)
    if (!args.json) spinner.succeed(`Snapshot created: ${response.iid}`)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

module.exports = {
  command: 'create-snapshot [options]',
  describe: 'Create a snapshot',
  builder: yargs => {
    yargs.options({
      ref: { describe: 'Sets a reference to the snapshot' },
      site: options.site,
      json: options.json
    })
  },
  handler: main
}
