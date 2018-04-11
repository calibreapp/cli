const { URL } = require('url')

const chalk = require('chalk')
const ora = require('ora')

const { create, waitForTest } = require('../../api/test')
const formatTest = require('../../views/test')

const formatErrorMessage = errors => {
  const error = errors[0]

  if (error.problems && error.problems[0]) {
    return error.problems[0].explanation
  } else {
    return error.message
  }
}

const main = async function(args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    const { uuid } = await create(args)

    if (!args.json) {
      spinner.succeed(`Test scheduled: ${uuid}`)

      spinner = ora('Running test')
      spinner.color = 'magenta'
      spinner.start()
    }

    const response = await waitForTest(uuid)

    if (args.json) return console.log(JSON.stringify(response, null, 2))

    spinner.succeed('Test complete')
    console.log(formatTest(response))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail(formatErrorMessage(e))
    process.exit(1)
  }
}

module.exports = {
  command: 'create <url> [options]',
  describe: 'Run a test against any public URL',
  builder: yargs => {
    yargs
      .option('device', {
        describe: 'Sets the emulated device that the test will be run on'
      })
      .option('location', {
        describe: 'The test will be run on a machine in this location'
      })
      .option('connection', {
        describe: 'Sets the emulated connection speed for this test'
      })
      .option('json', {
        describe: 'Return the test result as JSON'
      })
      .demandOption(
        'location',
        'Please provide the location your URL should be tested from'
      )
      .check(({ url, location }) => {
        if (!url.length) return new Error('Please provide a URL')

        try {
          new URL(url)
        } catch (e) {
          return new Error('Please enter a valid URL')
        }

        if (!location) return new Error('Please set --location')

        return true
      })
  },
  handler: main
}
