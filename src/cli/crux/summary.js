import { createSpinner } from 'nanospinner'
import columnify from 'columnify'

import { summary } from '../../api/crux.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'
import { cruxOptions } from '../../utils/crux-options.js'
import { format } from '../../utils/formatters/index.js'
import { formatGrading, colorByGrading } from '../../views/grading.js'

const main = async args => {
  let result
  let spinner
  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    result = await summary({ site: args.site, formFactor: args.formFactor })
    if (args.json) return console.log(JSON.stringify(result, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }

  if (!result.cruxAggregateMetrics || result.cruxAggregateMetrics.length === 0) {
    spinner.stop()
    return
  }

  spinner.success({ text: `CrUX Assessment: ${formatGrading(result.cruxCvwAssessment)}` })

  if (result.cruxFormFactorDensity) {
    const d = result.cruxFormFactorDensity
    console.log(
      `Form factors: desktop ${((d.desktop || 0) * 100).toFixed(1)}% | phone ${((d.phone || 0) * 100).toFixed(1)}% | tablet ${((d.tablet || 0) * 100).toFixed(1)}%`
    )
  }

  console.log('')

  const rows = result.cruxAggregateMetrics.map(entry => ({
    metric: entry.metric?.label || entry.name,
    p75: colorByGrading(
      entry.value !== null
        ? format({ formatter: entry.metric?.formatter, value: entry.value })
        : null,
      entry.grading
    )
  }))

  console.log(
    columnify(rows, {
      columnSplitter: ' | '
    })
  )
}

const command = 'summary [options]'
const describe =
  'Display Chrome UX Report (CrUX) origin-level performance data and Core Web Vitals assessment.'
const handler = main
const builder = {
  site: options.site,
  json: options.json,
  formFactor: cruxOptions.formFactor
}

export { command, describe, handler, builder }
