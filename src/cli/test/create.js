const { URL } = require('url')

const ora = require('ora')
const { CookieMap } = require('cookiefile')

const { create, waitForTest } = require('../../api/test')
const formatTest = require('../../views/test')
const { humaniseError } = require('../../utils/api-error')

const main = async function(args) {
  let spinner
  let cookies = []

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

  try {
    const { uuid } = await create({ ...args, cookies })

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
    spinner.fail(humaniseError(e))
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
      .option('cookie-jar', {
        describe: 'Uses a netscape formatted cookie jar file at this path'
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
