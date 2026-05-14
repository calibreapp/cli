import { createSpinner } from 'nanospinner'
import columnify from 'columnify'

import { pages } from '../../api/rum.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'
import { rumFilterOptions } from '../../utils/rum-options.js'
import { format } from '../../utils/formatters/index.js'
import { colorByGrading } from '../../views/grading.js'

const main = async args => {
  let result
  let spinner
  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    result = await pages(args)
    if (args.json) return console.log(JSON.stringify(result, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }

  if (!result.aggregate || result.aggregate.length === 0) {
    spinner.stop()
    return
  }

  spinner.success({ text: `${result.totalCount} pages` })

  const formatters = new Map(
    (result.metrics || []).map(m => [m.value, m.formatter])
  )

  const rows = result.aggregate.map(entry => {
    const data = new Map(Object.entries(entry))
    const fmt = key =>
      colorByGrading(
        data.get(key) !== null
          ? format({ formatter: formatters.get(key), value: data.get(key) })
          : null,
        data.get(`${key}Grading`)
      )

    return {
      path: entry.path || '—',
      sessions: entry.sessionCount || entry.count,
      lcp: fmt('lcp'),
      cls: fmt('cls'),
      inp: fmt('inp')
    }
  })

  console.log(
    columnify(rows, {
      columnSplitter: ' | '
    })
  )

  if (result.aggregate.length >= args.limit) {
    console.log(
      `\nTo see more pages, run: calibre rum pages --site=${args.site} --offset=${args.offset + args.limit}`
    )
  }
}

const command = 'pages [options]'
const describe = 'Display Real User Metrics (RUM) page-level breakdown.'
const handler = main
const builder = {
  site: options.site,
  json: options.json,
  ...rumFilterOptions,
  limit: {
    describe: 'Number of pages to display.',
    default: 25,
    type: 'number'
  },
  offset: {
    describe: 'Number of pages to skip.',
    default: 0,
    type: 'number'
  },
  sortBy: {
    describe: 'Sort pages by field.',
    default: 'sessionCount',
    type: 'string'
  }
}

export { command, describe, handler, builder }
