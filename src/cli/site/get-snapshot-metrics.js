import ora from 'ora'
import { Parser as CSVParser } from 'json2csv'

import { snapshot } from '../../api/snapshot-metrics.js'
import formatSnapshot from '../../views/snapshot-metrics.js'
import { options } from '../../utils/cli.js'
import { humaniseError } from '../../utils/api-error.js'

const formatCSV = payload => {
  let data = []

  payload.snapshot.tests.forEach(test => {
    const testProfile = payload.testProfiles.find(
      profile => profile.uuid === test.testProfile.uuid
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
        TestProfileId: testProfile.uuid,
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
  const parser = new CSVParser({ fields })
  return parser.parse(data)
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

    if (!payload.snapshot) throw new Error('Snapshot not found')
    if (!payload.snapshot.tests.length) throw new Error('No data found')

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
      throw new Error(humaniseError(e))
    }
  }
}

const command = 'get-snapshot-metrics [options]'
const describe = 'Get the metrics of a given snapshot'
const builder = {
  site: options.site,
  snapshot: {
    demandOption: true,
    requiresArg: true,
    describe: 'The identifying id of a snapshot'
  },
  json: options.json,
  csv: options.csv
}
const handler = main

export { command, describe, builder, handler }
