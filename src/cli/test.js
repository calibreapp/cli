const { URL } = require('url')

const chalk = require('chalk')
const ora = require('ora')
const fetch = require('node-fetch')
const addMinutes = require('date-fns/add_minutes')

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

const startRun = ({ url, location, device, connection }) => {
  const spinner = ora(chalk.magenta('Connecting to Calibre'))
  spinner.color = 'magenta'
  spinner.start()

  return new Promise((resolve, reject) => {
    fetch(`${process.env.CALIBRE_HOST}/api/cli/run`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        url,
        location,
        device,
        connection,
        client_name: clientInfo.name,
        client_version: clientInfo.version
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          spinner.fail(formatErrorMessage(json))
          return reject(json)
        }

        spinner.succeed(`Created test: ${json.uuid}`)
        return resolve(json.uuid)
      })
  })
}

const getRunByUuid = runUuid => {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${process.env.CALIBRE_HOST}/api/cli/run/${runUuid}`, {
        headers
      })
        .then(res => resolve(res.json()))
        .catch(reject)
    } catch (e) {
      console.error(e)
    }
  })
}

const runIsComplete = runUuid => {
  return new Promise((resolve, reject) => {
    getRunByUuid(runUuid)
      .then(run => (run.status === 'completed' ? resolve(run) : reject(run)))
      .catch(reject)
  })
}

const delay = time => new Promise(resolve => setTimeout(resolve, time))
const waitUntilReady = runUuid => {
  const spinner = ora('Scheduling test')
  spinner.color = 'magenta'
  spinner.start()

  return new Promise((resolve, reject) => {
    let timelimit = addMinutes(new Date(), 5)

    const poll = () => {
      runIsComplete(runUuid)
        .then(res => {
          spinner.succeed('Testing complete')
          resolve(res)
        })
        .catch(res => {
          if (res.status === 'scheduled') spinner.text = 'Waiting to start'
          if (res.status === 'running') spinner.text = 'Running test'
          if (res.status === 'timeout' || res.status === 'errored') {
            spinner.fail(chalk.red('An unexpected error occurred'))
            return reject(res)
          }

          if (new Date() > timelimit) {
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
  let runUuid

  try {
    runUuid = await startRun(args)
  } catch (e) {
    process.exit()
  }

  waitUntilReady(runUuid)
    .then(({ response }) => {
      console.log(formatTest(response))
    })
    .catch(res => {
      console.error(res)
    })
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
