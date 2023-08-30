import ora from 'ora'
import { AsyncParser } from '@json2csv/node'

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
  
  const parser = new AsyncParser({
    fields,
  }, {}, {})

  return parser.parse(data).promise()
}

const main = async args => {
  let spinner
  if (!args.json && !args.csv) {
    spinner = ora('Connecting to Calibre').start()
  }

  try {
    const payload = await snapshot({
      site: args.site,
      snapshotId: args.snapshot
    })

    if (!payload.snapshot) throw new Error('Snapshot not found')
    if (!payload.snapshot.tests.length) throw new Error('No data found')

    if (args.json) return console.log(JSON.stringify(payload, null, 2))
    if (args.csv) return console.log(await formatCSV(payload))

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
const describe = 'Get all metrics of a given Snapshot.'
const builder = {
  site: options.site,
  snapshot: {
    demandOption: true,
    requiresArg: true,
    describe: 'The id of a Snapshot.'
  },
  json: options.json,
  csv: options.csv
}
const handler = main

export { command, describe, builder, handler }
