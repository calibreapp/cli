const chalk = require('chalk')
const ora = require('ora')
const fetch = require('node-fetch')

const clientInfo = require('../utils/client-info')
const headers = require('../utils/http-headers')

const formatTest = require('../views/test')

const getTest = uuid => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.CALIBRE_HOST}/api/cli/run/${uuid}`, { headers })
      .then(res => resolve(res.json()))
      .catch(reject)
  })
}

const fetchReport = ({ name, url }) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => resolve({ name, url, report: res }))
      .catch(reject)
  })
}

const getReports = async reports => {
  const promises = reports.map(report => fetchReport(report))
  return await Promise.all(promises)
}

const main = async args => {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()

    spinner.text = 'Downloading test results'
  }

  try {
    const { response } = await getTest(args.uuid)
    response.reports = await getReports(response.reports)

    if (args.json) return console.log(JSON.stringify(response, null, 2))

    spinner.stop()

    console.log(formatTest(response))
  } catch (e) {
    console.error(e)
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
