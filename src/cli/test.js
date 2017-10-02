const { URL } = require('url')

const chalk = require('chalk')
const ora = require('ora')
const fetch = require('node-fetch')
const addMinutes = require('date-fns/add_minutes')

const { create, getTestByUuid, getTestResults } = require('../api/test')
const clientInfo = require('../utils/client-info')
const headers = require('../utils/http-headers')
const formatTest = require('../views/test')

const formatErrorMessage = res => {
  switch (res.error) {
    case 'invalid_device':
      return `${res.message}: ${res.devices.join(', ')}`
    case 'invalid_connection':
      return `${res.message}: ${res.connections.join(', ')}`
    case 'invalid_location':
      return `${res.message}: ${res.locations.join(', ')}`
    default:
      return res.error
  }
}

const runIsComplete = runUuid => {
  return new Promise((resolve, reject) => {
    getTestByUuid(runUuid)
      .then(run => (run.status === 'completed' ? resolve(run) : reject(run)))
      .catch(reject)
  })
}

const delay = time => new Promise(resolve => setTimeout(resolve, time))
const waitUntilReady = (runUuid, args) => {
  let spinner
  if (!args.json) {
    spinner = ora('Scheduling test')
    spinner.color = 'magenta'
    spinner.start()
  }

  return new Promise((resolve, reject) => {
    let timelimit = addMinutes(new Date(), 5)

    const poll = () => {
      runIsComplete(runUuid)
        .then(res => {
          if (!args.json) spinner.succeed('Testing complete')
          resolve(res)
        })
        .catch(res => {
          if (res.status === 'scheduled' && !args.json)
            spinner.text = 'Waiting to start'
          if (res.status === 'running' && !args.json)
            spinner.text = 'Running test'
          if (res.status === 'timeout' || res.status === 'errored') {
            if (!args.json)
              spinner.fail(chalk.red('An unexpected error occurred'))
            return reject(res)
          }

          if (new Date() > timelimit) {
            if (!args.json)
              spinner.fail(
                'Test run did not complete in time and has been cancelled 🤦‍'
              )
            return reject(res)
          }

          delay(3000).then(poll)
        })
    }

    poll()
  })
}

const main = async function(args) {
  let runUuid, spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    runUuid = await create(args)
    if (!args.json) spinner.succeed(`Created test: ${runUuid}`)
    const { response } = await waitUntilReady(runUuid, args)
    response.reports = await getTestResults(response)

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
    console.log(formatTest(response))
  } catch (e) {
    if (args.json) return console.log(e)
    spinner.fail(formatErrorMessage(json))
    process.exit(1)
  }
}

module.exports = {
  command: 'test <url> [options]',
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
