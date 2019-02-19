const ora = require('ora')
const { CookieMap } = require('cookiefile')

const formatProfile = require('../../views/test-profile')
const { create } = require('../../api/test-profile')
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

  if (args.disableJavascript) args.jsIsDisabled = true

  if (args.cookieJar) {
    const jar = new CookieMap(args.cookieJar)

    for (const cookie of jar.values()) {
      const { name, value, domain, path, httpOnly, https } = cookie
      cookies.push({ name, value, domain, path, httpOnly, secure: https })
    }
  }

  try {
    const response = await create({ ...args, cookies })
    if (!args.json) {
      spinner.succeed('Created Test Profile')
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
  command: 'create-test-profile <name> [options]',
  describe: 'Add a test profile to a site',
  builder: yargs => {
    yargs
      .options({
        device: {
          describe: 'Sets the emulated device that the profile will be run on'
        },
        connection: {
          describe: 'Sets the emulated connection speed this profile'
        },
        site: options.site,
        json: options.json,
        disableJavascript: {
          type: 'boolean',
          describe: 'Disable JavaScript'
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
