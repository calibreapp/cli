const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')
const dateFormat = require('date-fns/format')

const { list } = require('../../api/site')
const { humaniseError } = require('../../utils/api-error')

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
  console.log(`${chalk.bold(index.length)} sites`)

  const rows = index.map(row => {
    return {
      slug: chalk.grey(row.slug),
      name: row.name,
      status: `${dateFormat(new Date( row.createdAt ), 'h:mma d-MMM-yyyy')}`
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
  command: 'list',
  describe: 'Print a list of sites being tracked by Calibre',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the list of sites as JSON'
    })
  }
}
