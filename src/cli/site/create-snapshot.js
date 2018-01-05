const { URL } = require('url')

const chalk = require('chalk')
const ora = require('ora')

const { create } = require('../../api/snapshot')
const clientInfo = require('../../utils/client-info')
const headers = require('../../utils/http-headers')

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
    spinner.fail(e[0].message)
    process.exit(1)
  }
}

module.exports = {
  command: 'snapshot <site> [options]',
  describe: 'Create a snapshot',
  builder: yargs => {
    yargs.option('ref', {
      describe: 'Sets a reference to the snapshot'
    })
  },
  handler: main
}
