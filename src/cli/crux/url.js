import ora from 'ora'
import columnify from 'columnify'
import { format as dateFormat } from 'date-fns'

import { url as fetchUrl } from '../../api/crux.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'
import { cruxOptions } from '../../utils/crux-options.js'
import { format } from '../../utils/formatters/index.js'
import { formatGrading, colorByGrading } from '../../views/grading.js'

const main = async args => {
  let result
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
  }

  try {
    result = await fetchUrl({
      site: args.site,
      uuid: args.uuid,
      formFactor: args.formFactor,
      timePeriod: args.timePeriod
    })
    if (args.json) return console.log(JSON.stringify(result, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }

  if (!result.cruxUrl) {
    spinner.fail(
      'No CrUX data available for this URL. CrUX requires sufficient Chrome user traffic.'
    )
    return
  }

  const urlData = result.cruxUrl
  spinner.succeed(`${urlData.url} — ${formatGrading(urlData.cruxCvwAssessment)}`)

  if (urlData.cruxAggregateMetrics && urlData.cruxAggregateMetrics.length > 0) {
    console.log('')
    const metricRows = urlData.cruxAggregateMetrics.map(entry => ({
      metric: entry.metric?.label || entry.name,
      p75: colorByGrading(
        entry.value !== null
          ? format({ formatter: entry.metric?.formatter, value: entry.value })
          : null,
        entry.grading
      )
    }))

    console.log(
      columnify(metricRows, {
        columnSplitter: ' | '
      })
    )
  }

  if (urlData.cruxHistory && urlData.cruxHistory.length > 0) {
    console.log('')
    console.log('History:')

    const historyRows = []
    for (const metricHistory of urlData.cruxHistory) {
      const entries = metricHistory.values.slice(0, args.limit)
      for (const entry of entries) {
        historyRows.push({
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
      columnify(historyRows, {
        columnSplitter: ' | '
      })
    )
  }
}

const command = 'url <uuid> [options]'
const describe =
  'Display Chrome UX Report (CrUX) data for a specific monitored URL.'
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
