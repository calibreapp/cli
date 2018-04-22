const ora = require('ora')
const json2csv = require('json2csv')

const { pulse } = require('../../api/snapshot-metrics')
const formatPulseTimeline = require('../../views/pulse-timeline')

const formatCSV = payload => {
  let data = []

  payload.page.timeseries.series.forEach(series => {
    series.sets.forEach(set => {
      const profile = payload.testProfiles.find(
        profile => profile.id == set.profile.id
      )

      set.values.forEach(value => {
        const snapshot = payload.page.timeseries.snapshots.find(
          snapshot => snapshot.id === value.snapshot
        )

        data.push({
          Timestamp: snapshot.createdAt,
          PageName: payload.page.name,
          PageURL: payload.page.url,
          MetricName: series.metric.name,
          MetricLabel: series.metric.label,
          MetricValue: value.value,
          SnapshotSequenceId: snapshot.sequenceId,
          TestProfileId: set.profile.id,
          TestProfileName: set.profile.name,
          DeviceName: profile.device.title,
          BandwidthName: profile.bandwidth.title,
          isMobile: profile.isMobile,
          hasDeviceEmulation: profile.hasDeviceEmulation,
          hasBandwidthEmulation: profile.hasBandwidthEmulation
        })
      })
    })
  })

  const fields = [
    'Timestamp',
    'PageName',
    'PageURL',
    'MetricName',
    'MetricLabel',
    'MetricValue',
    'SnapshotId',
    'SnapshotSequenceId',
    'TestProfileId',
    'TestProfileName',
    'DeviceName',
    'BandwidthName',
    'isMobile',
    'hasDeviceEmulation',
    'hasBandwidthEmulation'
  ]

  return json2csv({ data, fields })
}

const main = async args => {
  let spinner
  if (!args.json && !args.csv) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  let durationInDays = 7
  if (args['30-day']) durationInDays = 30

  try {
    const tests = await pulse({
      site: args.site,
      page: args.page,
      durationInDays,
      metrics: args.metrics
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
    if (args.csv) return console.log(formatCSV(tests))

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
      site: {
        demandOption: true,
        describe: 'The identifying slug of a site'
      },
      page: {
        demandOption: true,
        describe: 'The identifying id of a page'
      },
      metrics: {
        type: 'array',
        describe:
          'A list of metrics to return. eg: --metrics=first-meaningful-paint,first-interactive'
      },
      json: { describe: 'Return pulse data as JSON' },
      csv: { describe: 'Return pulse data as CSV' },
      '30-day': {
        describe:
          'Get the last 30 days of metrics (without this flag, the default is 7 days)'
      }
    })
  },
  handler: main
}
