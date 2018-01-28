const ora = require('ora')
const { pulse } = require('../../api/snapshot-metrics')
const formatPulseTimeline = require('../../views/pulse-timeline')

const main = async args => {
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  const notFound = (name, objName, args) => {
    const errorString = `${name} "${args['objName']}" not found`
    if (args.json)
      return console.error(JSON.stringify({ error: errorString }, null, 2))

    spinner.fail(errorString)
    process.exit(1)
  }

  let durationInDays = 7
  if (args['30-day']) durationInDays = 30

  try {
    const tests = await pulse({
      site: args.site,
      page: args.page,
      durationInDays
    })

    if (!tests.page) {
      const errMsg = `Page "${args.page}" could not be found`
      if (args.json)
        return console.error(
          JSON.stringify({ errors: [{ message: errMsg }] }, null, 2)
        )

      spinner.fail(errMsg)
      process.exit(1)
    }

    if (args.json) return console.log(JSON.stringify(tests, null, 2))

    spinner.stop()
    console.log(formatPulseTimeline(tests))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail(e.map(err => err.message).join(', '))
    process.exit(1)
  }
}

module.exports = {
  command: 'get-pulse-metrics [options]',
  describe: 'Get a recent timeline of metrics for a given page',
  builder: yargs => {
    yargs.options({
      site: { demandOption: true, describe: 'The identifying slug of a site' },
      page: {
        demandOption: true,
        describe: 'The identifying id of a page'
      },
      json: { describe: 'Return the list of pages as JSON' },
      '30-day': {
        describe:
          'Get the last 30 days of metrics (without this flag, the default is 7 days)'
      }
    })
  },
  handler: main
}
