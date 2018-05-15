const ora = require('ora')

const { getTestByUuid } = require('../../api/test')
const formatTest = require('../../views/test')
const { humaniseError } = require('../../utils/api-error')

const main = async args => {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()

    spinner.text = 'Downloading test results'
  }

  try {
    const response = await getTestByUuid(args.uuid)

    if (args.json) return console.log(JSON.stringify(response, null, 2))

    spinner.stop()
    console.log(formatTest(response))
  } catch (e) {
    spinner.fail(humaniseError(e))
    process.exit(1)
  }
}

module.exports = {
  command: 'show <uuid>',
  describe: 'Print the details of a given test',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the test result as JSON'
    })
  }
}
