import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'
import logSymbols from 'log-symbols'

import { list } from '../api/metric.js'
import { humaniseError } from '../utils/api-error.js'
import { format } from '../utils/formatters/index.js'
import { options } from '../utils/cli.js'

const main = async args => {
  let index
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
  }

  try {
    index = await list(args)
    if (args.json) return console.log(JSON.stringify(index, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }

  spinner.stop()
  console.log(`${chalk.bold(index.length)} metrics`)

  const rows = index.map(row => {
    return {
      identifier: chalk.cyan(row.value),
      name: row.label,
      category: row.category.label,
      good: `${row.budgetThreshold === 'GreaterThan' ? '<' : '>'} ${format({
        formatter: row.formatter,
        value: row.goodStop
      })}`,
      poor: `${row.budgetThreshold === 'GreaterThan' ? '>' : '<'} ${format({
        formatter: row.formatter,
        value: row.poorStop
      })}`,
      recommended: row.recommended
        ? chalk.bold.green(`${logSymbols.success}`)
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
const describe = 'List all available web performance metrics.'
const handler = main
const builder = {
  json: options.json
}

export { command, describe, handler, builder }
