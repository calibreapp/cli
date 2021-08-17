const ora = require('ora')
const subDays = require('date-fns/subDays')
const parseISO = require('date-fns/parseISO')

const { humaniseError } = require('../../utils/api-error')
const { list } = require('../../api/time-series')
const formatPulseTimeline = require('../../views/pulse-timeline')
const { options } = require('../../utils/cli')

const main = async args => {
  let spinner
  if (!args.json && !args.csv) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  let to, from
  if (args['30-day']) {
    to = new Date()
    from = subDays(new Date(), 30)
  } else {
    if (args.to) to = parseISO(args.to)
    if (args.from) from = parseISO(args.from)
  }

  const variables = {
    site: args.site,
    pages: args.pages,
    measurements: args.metrics,
    from,
    to
  }

  try {
    const { csv, ...timeSeries } = await list(variables)

    if (args.csv) return console.log(csv)
    if (args.json) return console.log(JSON.stringify(timeSeries, null, 2))

    spinner.stop()
    console.log(formatPulseTimeline(timeSeries))
  } catch (e) {
    if (args.json) return console.error(e)
    if (args.csv) return console.error('Error', e)

    spinner.fail(humaniseError(e))
    throw new Error(humaniseError(e))
  }
}

module.exports = {
  command: 'metrics [options]',
  describe: 'Get timeseries metrics for a given site',
  builder: yargs => {
    yargs.options({
      site: options.site,
      pages: options.pages,
      profiles: options.profiles,
      metrics: options.metrics,
      json: options.json,
      csv: options.csv,
      from: options.from,
      to: options.to,
      '30-day': {
        describe:
          'Get the last 30 days of metrics (without this flag, the to and from values will be used)'
      }
    })
  },
  handler: main
}
