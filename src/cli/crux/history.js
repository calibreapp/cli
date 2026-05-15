import { createSpinner } from 'nanospinner'
import columnify from 'columnify'
import { format as dateFormat } from 'date-fns'

import { history } from '../../api/crux.js'
import { humaniseError, formatJsonError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'
import { cruxOptions } from '../../utils/crux-options.js'
import { format } from '../../utils/formatters/index.js'
import { colorByGrading } from '../../views/grading.js'

const main = async args => {
  let result
  let spinner
  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    result = await history({
      site: args.site,
      formFactor: args.formFactor,
      timePeriod: args.timePeriod
    })
    if (args.json) return console.log(JSON.stringify(result, null, 2))
  } catch (e) {
    if (args.json) return formatJsonError(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }

  if (!result.cruxHistory || result.cruxHistory.length === 0) {
    spinner.stop()
    return
  }

  spinner.success({ text: 'CrUX History' })

  const rows = []
  for (const metricHistory of result.cruxHistory) {
    const entries = metricHistory.values.slice(0, args.limit)
    for (const entry of entries) {
      rows.push({
        period: dateFormat(new Date(entry.collectionPeriodEnd), 'd-MMM-yyyy'),
        metric: metricHistory.metric?.label || metricHistory.metric?.name,
        p75: colorByGrading(
          entry.p75Value !== null
            ? format({
                formatter: metricHistory.metric?.formatter,
                value: entry.p75Value
              })
            : null,
          entry.p75Grading
        )
      })
    }
  }

  console.log(
    columnify(rows, {
      columnSplitter: ' | ',
      truncate: true,
      maxLineWidth: 'auto'
    })
  )
}

const command = 'history [options]'
const describe =
  'Display Chrome UX Report (CrUX) historical trends for a site.'
const handler = main
const builder = {
  site: options.site,
  json: options.json,
  formFactor: cruxOptions.formFactor,
  timePeriod: cruxOptions.timePeriod,
  limit: {
    describe: 'Number of history entries to display per metric.',
    default: 25,
    type: 'number'
  }
}

export { command, describe, handler, builder }
