import { createSpinner } from 'nanospinner'

import { config } from '../../api/rum.js'
import { humaniseError, formatJsonError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async args => {
  let result
  let spinner
  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    result = await config({ site: args.site })
    if (args.json) return console.log(JSON.stringify(result, null, 2))
  } catch (e) {
    if (args.json) return formatJsonError(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }

  if (!result) {
    spinner.stop()
    return
  }

  spinner.success({ text: 'RUM Configuration' })

  console.log(`  Enabled: ${result.enabled}`)
  console.log(`  Sample Rate: ${result.sampleRate}`)
  if (result.allowedOrigins && result.allowedOrigins.length > 0) {
    console.log(`  Allowed Origins: ${result.allowedOrigins.join(', ')}`)
  }
  if (result.endpoint) {
    console.log(`  Endpoint: ${result.endpoint}`)
  }
  if (result.identifier) {
    console.log(`  Identifier: ${result.identifier}`)
  }
  console.log(`  Data Retention: ${result.dataRetentionMonths} months (max: ${result.maxDataRetentionMonths})`)
  console.log(`  Exclude EU: ${result.excludeEu}`)
  if (result.suspendedAt) {
    console.log(`  Suspended At: ${result.suspendedAt}`)
  }
}

const command = 'config [options]'
const describe =
  'Display Real User Metrics (RUM) configuration for a site.'
const handler = main
const builder = {
  site: options.site,
  json: options.json
}

export { command, describe, handler, builder }
