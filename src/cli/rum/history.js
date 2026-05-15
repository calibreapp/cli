import { createSpinner } from 'nanospinner'
import columnify from 'columnify'
import { format as dateFormat } from 'date-fns'

import { history } from '../../api/rum.js'
import { format } from '../../utils/formatters/index.js'
import { humaniseError, formatJsonError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'
import { rumFilterOptions } from '../../utils/rum-options.js'
import { colorByGrading } from '../../views/grading.js'

const main = async args => {
  let result
  let spinner
  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    result = await history(args)
    if (args.json) return console.log(JSON.stringify(result, null, 2))
  } catch (e) {
    if (args.json) return formatJsonError(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }

  if (!result.history || result.history.length === 0) {
    spinner.stop()
    return
  }

  spinner.success({ text: 'RUM History' })

  const formatters = new Map(
    (result.metrics || []).map(m => [m.value, m.formatter])
  )

  const entries = result.history.slice(0, args.limit)
  const rows = entries.map(entry => {
    const data = new Map(Object.entries(entry))
    const fmt = key =>
      colorByGrading(
        data.get(key) !== null
          ? format({ formatter: formatters.get(key), value: data.get(key) })
          : null,
        data.get(`${key}Grading`)
      )

    return {
      date: dateFormat(new Date(entry.date), 'd-MMM-yyyy'),
      lcp: fmt('lcp'),
      cls: fmt('cls'),
      inp: fmt('inp'),
      fcp: fmt('fcp'),
      ttfb: fmt('ttfb'),
      sessions: entry.sessionCount || '—'
    }
  })

  console.log(
    columnify(rows, {
      columnSplitter: ' | ',
      truncate: true,
      maxLineWidth: 'auto'
    })
  )
}

const command = 'history [options]'
const describe = 'Display Real User Metrics (RUM) historical trends.'
const handler = main
const builder = {
  site: options.site,
  json: options.json,
  ...rumFilterOptions,
  limit: {
    describe: 'Number of history entries to display.',
    default: 25,
    type: 'number'
  }
}

export { command, describe, handler, builder }
