const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')

const { list } = require('../../api/page')

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
    spinner.fail(e.message)
    process.exit(1)
  }

  spinner.stop()
  console.log(`${chalk.bold(args.site)} has ${chalk.bold(index.length)} pages`)

  const rows = index.map(row => {
    return {
      uuid: chalk.grey(row.uuid),
      name: row.name,
      url: row.url
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
  command: 'pages [options]',
  describe: 'Print a list of pages for a given site',
  handler: main,
  builder: yargs => {
    yargs.options({
      site: { demandOption: true, describe: 'The identifying slug of a site' },
      json: { describe: 'Return the list of pages as JSON' }
    })
  }
}
