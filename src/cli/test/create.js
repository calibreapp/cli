const { URL } = require('url')

const ora = require('ora')
const { CookieMap } = require('cookiefile')
const fs = require('fs')

const { create, waitForTest } = require('../../api/test')
const formatTest = require('../../views/test')
const { humaniseError } = require('../../utils/api-error')

const main = async function(args) {
  let spinner
  let cookies = []
  let headers = []

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  if (args.cookieJar) {
    const jar = new CookieMap(args.cookieJar)

    for (const cookie of jar.values()) {
      const { name, value, domain, path, httpOnly, https } = cookie

      cookies.push({ name, value, domain, path, httpOnly, secure: https })
    }
  }

  if (args.headers) {
    try {
      headers = JSON.parse(args.headers)
    } catch (e) {
      headers = fs.readFileSync(args.headers, 'utf-8')
      headers = JSON.parse(headers)
    }

    headers = [].concat(headers).map(header => {
      const name = Object.keys(header)[0]
      return {
        name,
        value: header[name]
      }
    })
  }

  try {
    const { uuid } = await create({ ...args, cookies, headers })

    if (!args.json) {
      spinner.succeed(`Test scheduled: ${uuid}`)

      spinner = ora('Running test')
      spinner.color = 'magenta'
      spinner.start()
    }

    const response = await waitForTest(uuid)

    if (args.json) return console.log(JSON.stringify(response, null, 2))

    if (response.status === 'completed') {
      spinner.succeed('Test complete')
    } else {
      spinner.fail('Test complete')
    }
    console.log(formatTest(response))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
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
      .option('adblocker', {
        describe: 'Turn adblocking on/off',
        type: 'boolean',
        default: false
      })
      .option('private', {
        describe: 'Private tests are only accessible by logged in team members',
        type: 'boolean',
        default: false
      })
      .option('cookie-jar', {
        describe: 'Uses a netscape formatted cookie jar file at this path'
      })
      .option('headers', {
        describe:
          "Stringify'd JSON HTTP Header key/value pairs or path to JSON file of HTTP Header key/value pairs "
      })
      .demandOption(
        'location',
        'Please provide the location your URL should be tested from'
      )
      .check(({ url, location, cookieJar }) => {
        if (!url.length) return new Error('Please provide a URL')

        try {
          new URL(url)
        } catch (e) {
          return new Error('Please enter a valid URL')
        }

        if (!location) return new Error('Please set --location')

        // Validate that the cookie-jar exists
        if (cookieJar) new CookieMap(cookieJar)

        return true
      })
  },
  handler: main
}
