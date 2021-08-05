const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')
const logSymbols = require('log-symbols')

const { list } = require('../api/metric')
const { humaniseError } = require('../utils/api-error')
const { options } = require('../utils/cli')
const { format } = require('../utils/formatters')

const main = async args => {
  let index
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
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

module.exports = {
  command: 'metric-list',
  describe: 'Print a list of Calibre’s metrics',
  handler: main,
  builder: yargs => {
    yargs.options({
      json: options.json
    })
  }
}
