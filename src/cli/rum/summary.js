import { createSpinner } from 'nanospinner'
import columnify from 'columnify'

import { summary } from '../../api/rum.js'
import { humaniseError, formatJsonError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'
import { rumFilterOptions } from '../../utils/rum-options.js'
import { format } from '../../utils/formatters/index.js'
import { colorByGrading } from '../../views/grading.js'

const METRIC_LABELS = new Map([
  ['lcp', 'Largest Contentful Paint'],
  ['cls', 'Cumulative Layout Shift'],
  ['inp', 'Interaction to Next Paint'],
  ['fcp', 'First Contentful Paint'],
  ['ttfb', 'Time to First Byte'],
  ['rtt', 'Round Trip Time']
])

const main = async args => {
  let result
  let spinner
  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    result = await summary(args)
    if (args.json) return console.log(JSON.stringify(result, null, 2))
  } catch (e) {
    if (args.json) return formatJsonError(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }

  if (!result.aggregate || result.aggregate.length === 0) {
    spinner.error({
      text: 'No RUM data available. Check that RUM is enabled for this site with: calibre rum config --site=<slug>'
    })
    process.exitCode = 2
    return
  }

  spinner.success({ text: 'RUM Summary' })

  console.log(
    `Live visitors: ${result.liveVisitors} | Countries: ${result.distinctCountriesCount} | Sessions: ${result.aggregate[0].sessionCount}`
  )
  console.log('')

  if (result.uxRating && result.uxRating.length > 0) {
    const overall = result.uxRating.find(r => r.metric === 'overall_rating')
    if (overall) {
      console.log(
        `UX Rating: Good ${overall.goodPercentage.toFixed(1)}% | Needs Improvement ${overall.needsImprovementPercentage.toFixed(1)}% | Poor ${overall.poorPercentage.toFixed(1)}%`
      )
    }
  }

  console.log('')

  const agg = new Map(Object.entries(result.aggregate[0]))
  const formatters = new Map(
    (result.metrics || []).map(m => [m.value, m.formatter])
  )
  const metrics = ['lcp', 'cls', 'inp', 'fcp', 'ttfb', 'rtt']
  const rows = metrics
    .filter(m => agg.get(m) !== null && agg.get(m) !== undefined)
    .map(m => ({
      metric: METRIC_LABELS.get(m) || m,
      p75: colorByGrading(
        format({ formatter: formatters.get(m), value: agg.get(m) }),
        agg.get(`${m}Grading`)
      )
    }))

  console.log(
    columnify(rows, {
      columnSplitter: ' | ',
      truncate: true,
      maxLineWidth: 'auto'
    })
  )
}

const command = 'summary [options]'
const describe =
  'Display Real User Metrics (RUM) dashboard — live visitors, aggregate web vitals, and UX ratings.'
const handler = main
const builder = {
  site: options.site,
  json: options.json,
  ...rumFilterOptions
}

export { command, describe, handler, builder }
