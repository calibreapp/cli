import ora from 'ora'
import columnify from 'columnify'

import { urls } from '../../api/crux.js'
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
    result = await urls({ site: args.site, formFactor: args.formFactor })
    if (args.json) return console.log(JSON.stringify(result, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }

  if (
    !result.cruxUrlsList ||
    !result.cruxUrlsList.edges ||
    result.cruxUrlsList.edges.length === 0
  ) {
    spinner.fail(
      'No CrUX URL data available for this site. CrUX requires sufficient Chrome user traffic.'
    )
    return
  }

  spinner.succeed(`${result.cruxUrlsList.edges.length} CrUX URLs`)

  const rows = result.cruxUrlsList.edges.map(({ node }) => {
    const row = {
      url: node.url,
      assessment: formatGrading(node.cruxCvwAssessment)
    }

    if (node.cruxAggregateMetrics) {
      for (const entry of node.cruxAggregateMetrics) {
        row[entry.name] = colorByGrading(
          entry.value !== null
            ? format({ formatter: entry.metric?.formatter, value: entry.value })
            : null,
          entry.grading
        )
      }
    }

    return row
  })

  console.log(
    columnify(rows, {
      columnSplitter: ' | '
    })
  )
}

const command = 'urls [options]'
const describe =
  'List Chrome UX Report (CrUX) monitored URLs with their metrics and Core Web Vitals assessment.'
const handler = main
const builder = {
  site: options.site,
  json: options.json,
  formFactor: cruxOptions.formFactor
}

export { command, describe, handler, builder }
