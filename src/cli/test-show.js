const chalk = require('chalk')
const ora = require('ora')
const fetch = require('node-fetch')

const { getTestByUuid, getTestResults } = require('../api/test')
const formatTest = require('../views/test')

const main = async args => {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()

    spinner.text = 'Downloading test results'
  }

  try {
    const { response } = await getTestByUuid(args.uuid)

    if (args.json) return console.log(JSON.stringify(response, null, 2))

    spinner.stop()
    console.log(formatTest(response))
  } catch (e) {
    spinner.fail(e.message)
    process.exit(1)
  }
}

module.exports = {
  command: 'test-show <uuid>',
  describe: 'Print the details of a given test',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the test result as JSON'
    })
  }
}
