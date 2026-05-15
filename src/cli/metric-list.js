import { styleText } from 'node:util'
import { createSpinner } from 'nanospinner'
import columnify from 'columnify'

import { list } from '../api/metric.js'
import { humaniseError, formatJsonError } from '../utils/api-error.js'
import { format } from '../utils/formatters/index.js'
import { options } from '../utils/cli.js'

const main = async args => {
  let index
  let spinner
  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    index = await list(args)
    if (args.json) return console.log(JSON.stringify(index, null, 2))
  } catch (e) {
    if (args.json) return formatJsonError(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }

  spinner.stop()
  console.log(`${styleText('bold', String(index.length))} metrics`)

  const rows = index.map(row => {
    return {
      identifier: styleText('cyan', row.value),
      name: row.label,
      category: row.category?.label || '—',
      good: `${row.budgetThreshold === 'GreaterThan' ? '<' : '>'} ${format({
        formatter: row.formatter,
        value: row.goodStop
      })}`,
      poor: `${row.budgetThreshold === 'GreaterThan' ? '>' : '<'} ${format({
        formatter: row.formatter,
        value: row.poorStop
      })}`,
      recommended: row.recommended
        ? styleText(['bold', 'green'], '\u2714')
        : null
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

const command = 'metric-list'
const describe = 'List available web performance metrics. Returns synthetic metrics by default.'
const handler = main
const builder = {
  json: options.json,
  type: {
    describe: 'Filter metrics by data source.',
    choices: ['synthetic', 'crux', 'rum'],
    type: 'string'
  }
}

export { command, describe, handler, builder }
