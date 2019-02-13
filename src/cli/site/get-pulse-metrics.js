const ora = require('ora')
const json2csv = require('json2csv')

const { humaniseError } = require('../../utils/api-error')
const { pulse } = require('../../api/snapshot-metrics')
const formatPulseTimeline = require('../../views/pulse-timeline')
const { options } = require('../../utils/cli')

const formatCSV = payload => {
  let data = []

  const timeseries = payload.page ? payload.page.timeseries : payload.timeseries

  timeseries.series.forEach(series => {
    series.sets.forEach(set => {
      const profile = payload.testProfiles.find(
        profile => profile.uuid == set.profile.uuid
      )

      set.values.forEach(value => {
        const snapshot = timeseries.snapshots.find(
          snapshot => snapshot.id === value.snapshot
        )

        data.push({
          Timestamp: snapshot.createdAt,
          PageUuid: set.page.uuid,
          PageName: set.page.name,
          PageURL: set.page.url,
          MetricName: series.metric.name,
          MetricLabel: series.metric.label,
          MetricValue: value.value,
          SnapshotSequenceId: snapshot.sequenceId,
          TestProfileUuid: set.profile.uuid,
          TestProfileName: set.profile.name,
          DeviceName: profile.device ? profile.device.title : null,
          BandwidthName: profile.bandwidth ? profile.bandwidth.title : null,
          isMobile: profile.isMobile,
          hasDeviceEmulation: profile.hasDeviceEmulation,
          hasBandwidthEmulation: profile.hasBandwidthEmulation
        })
      })
    })
  })

  const fields = [
    'Timestamp',
    'PageUuid',
    'PageName',
    'PageURL',
    'MetricName',
    'MetricLabel',
    'MetricValue',
    'SnapshotSequenceId',
    'TestProfileUuid',
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

    if (args.json) return console.log(JSON.stringify(tests, null, 2))
    if (args.csv) return console.log(formatCSV(tests))

    spinner.stop()
    console.log(formatPulseTimeline(tests))
  } catch (e) {
    if (args.json) return console.error(e)
    if (args.csv) return console.error('Error', e)

    spinner.fail(humaniseError(e))
    throw new Error(humaniseError(e))
  }
}

module.exports = {
  command: 'get-pulse-metrics [options]',
  describe: 'Get a recent timeline of metrics for a given page',
  builder: yargs => {
    yargs.options({
      site: options.site,
      page: {
        describe: 'The identifying uuid of a page'
      },
      metrics: {
        type: 'array',
        describe:
          'A list of metrics to return. eg: --metrics=first-meaningful-paint first-interactive or use multiple --metrics flags for each metric'
      },
      json: options.json,
      csv: options.csv,
      '30-day': {
        describe:
          'Get the last 30 days of metrics (without this flag, the default is 7 days)'
      }
    })
  },
  handler: main
}
