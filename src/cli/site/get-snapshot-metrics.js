const ora = require('ora')
const { snapshot } = require('../../api/snapshot-metrics')
const formatSnapshot = require('../../views/snapshot-metrics')

const main = async args => {
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    const tests = await snapshot({
      site: args.site,
      snapshotId: args.snapshot
    })

    if (!tests.tests.length) {
      if (args.json)
        return console.error(
          JSON.stringify({ error: 'no data found', args: args }, null, 2)
        )

      spinner.fail('No data found for this search')
      process.exit(1)
    }

    if (args.json) return console.log(JSON.stringify(tests, null, 2))

    spinner.stop()
    console.log(formatSnapshot(tests))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail(e.map(err => err.message).join(', '))
    process.exit(1)
  }
}

module.exports = {
  command: 'get-snapshot-metrics [options]',
  describe: 'Get the metrics of a given snapshot',
  builder: yargs => {
    yargs.options({
      site: { demandOption: true, describe: 'The identifying slug of a site' },
      snapshot: {
        demandOption: true,
        describe: 'The identifying id of a snapshot'
      },
      json: { describe: 'Return the list of pages as JSON' }
    })
  },
  handler: main
}
