const ora = require('ora')
const { parse: json2csv } = require('json2csv')
const { snapshot } = require('../../api/snapshot-metrics')
const formatSnapshot = require('../../views/snapshot-metrics')
const { options } = require('../../utils/cli')

const formatCSV = payload => {
  let data = []

  payload.snapshot.tests.forEach(test => {
    const testProfile = payload.testProfiles.find(
      profile => profile.id === test.testProfile.id
    )

    test.measurements.forEach(measurement => {
      data.push({
        Timestamp: payload.snapshot.createdAt,
        PageName: test.page.name,
        PageURL: test.page.url,
        MetricName: measurement.name,
        MetricLabel: measurement.label,
        MetricValue: measurement.value,
        SnapshotSequenceId: payload.snapshot.sequenceId,
        TestProfileId: testProfile.id,
        TestProfileName: testProfile.name,
        DeviceName: testProfile.device && testProfile.device.title,
        BandwidthName: testProfile.bandwidth && testProfile.bandwidth.title,
        isMobile: testProfile.isMobile,
        hasDeviceEmulation: testProfile.hasDeviceEmulation,
        hasBandwidthEmulation: testProfile.hasBandwidthEmulation
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

  try {
    const payload = await snapshot({
      site: args.site,
      snapshotId: args.snapshot
    })

    if (!payload.snapshot.tests.length) {
      if (args.json)
        return console.error(
          JSON.stringify({ error: 'no data found', args: args }, null, 2)
        )

      if (args.csv)
        return json2csv({ data: ['No data found'], fields: ['Error'] })

      spinner.fail()
      throw new Error('No data found for this search')
    }

    if (args.json) return console.log(JSON.stringify(payload, null, 2))
    if (args.csv) return console.log(formatCSV(payload))

    spinner.stop()

    console.log(
      formatSnapshot({
        snapshot: payload.snapshot,
        testProfiles: payload.testProfiles
      })
    )
  } catch (e) {
    if (args.json || args.csv) {
      console.error(e)
    } else {
      spinner.fail()
      throw new Error(e.map(err => err.message).join(', '))
    }
  }
}

module.exports = {
  command: 'get-snapshot-metrics [options]',
  describe: 'Get the metrics of a given snapshot',
  builder: yargs => {
    yargs.options({
      site: options.site,
      snapshot: {
        demandOption: true,
        describe: 'The identifying id of a snapshot'
      },
      json: options.json,
      csv: options.csv
    })
  },
  handler: main
}
