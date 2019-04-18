const ora = require('ora')
const { CookieMap } = require('cookiefile')

const formatProfile = require('../../views/test-profile')
const { update } = require('../../api/test-profile')
const { humaniseError } = require('../../utils/api-error')
const { options } = require('../../utils/cli')

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
    const response = await update({ ...args, cookies })
    if (!args.json) {
      spinner.succeed(
        `Test profile updated: ${response.name} (${response.uuid})`
      )
      console.log(formatProfile(response))
    }

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)

    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

module.exports = {
  command: 'update-test-profile [options]',
  describe: 'Update a test profile. Only updates attributes sent.',
  builder: yargs => {
    yargs
      .options({
        uuid: { demandOption: true, describe: 'The UUID of the test profile' },
        device: {
          describe: 'Sets the emulated device that the profile will be run on'
        },
        connection: {
          describe: 'Sets the emulated connection speed this profile'
        },
        site: options.site,
        json: options.json,
        javascript: {
          type: 'boolean',
          describe: 'Turn JavaScript execution on/off',
          default: true
        },
        adblocker: {
          type: 'boolean',
          describe: 'Turn adblocking on/off',
          default: false
        },
        'cookie-jar': {
          describe: 'Uses a netscape formatted cookie jar file at this path'
        }
      })
      .check(({ cookieJar }) => {
        // Validate that the cookie-jar exists
        if (cookieJar) new CookieMap(cookieJar)
        return true
      })
  },
  handler: main
}
