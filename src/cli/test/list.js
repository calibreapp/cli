const { URL } = require('url')

const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')
const dateFormat = require('date-fns/format')

const { getList } = require('../../api/test')
const { humaniseError } = require('../../utils/api-error')

const titleize = string => string.charAt(0).toUpperCase() + string.substring(1)

const main = async args => {
  let index
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    index = await getList()
    if (args.json) return console.log(JSON.stringify(index, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }

  spinner.stop()
  console.log(`${chalk.bold('♤  calibre')} test runs\n`)

  const rows = index.map(row => {
    const url = new URL(row.url)
    const formattedTestUrl = `${url.hostname}${url.pathname}`

    return {
      uuid: chalk.grey(row.uuid),
      url: formattedTestUrl,
      device: row.device ? row.device.title : 'Desktop',
      connection: row.bandwidth ? row.bandwidth.title : 'Not Throttled',
      location: `${row.location.emoji}  ${row.location.shortName}`,
      status: `${titleize(row.status)} ${dateFormat(
        new Date(row.updatedAt),
        'h:mma d-MMM-yyyy'
      )}`
    }
  })

  console.log(
    columnify(rows, {
      columnSplitter: ' | ',
      truncate: true,
      maxLineWidth: 'auto',
      config: {
        url: { maxWidth: 20 }
      }
    })
  )
}

module.exports = {
  command: 'list',
  describe: 'Print a list of previously run tests',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the list of tests as JSON'
    })
  }
}
