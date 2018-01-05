const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')

const { list } = require('../../api/test_profile')

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

  console.log(`\n`)

  const rows = index.map(row => {
    return {
      uuid: chalk.cyan(row.uuid),
      name: row.name,
      device: row.device.title ? row.device.title : 'Desktop',
      connection: row.bandwidth.title ? row.bandwidth.title : 'Not Throttled',
      'javascript disabled': row.jsIsDisabled ? 'Yes' : 'No',
      cookies: row.cookies.map(cookie => cookie.name).join(', ') || 'None'
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
  command: 'test-profiles <site>',
  describe: 'Print a list of test profiles for a given site',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the list of test profiles as JSON'
    })
  }
}
