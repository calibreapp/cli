import ora from 'ora'
import cookiefile from 'cookiefile'

import formatProfile from '../../views/test-profile.js'
import { update } from '../../api/test-profile.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const { CookieMap } = cookiefile

const main = async function (args) {
  let spinner
  let cookies = []

  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
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
        `Test Profile updated: ${response.name} (${response.uuid})`
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
const command = 'update-test-profile [options]'
const describe =
  'Update Test Profile settings. Only changes specified attributes.'
const builder = {
  uuid: {
    demandOption: true,
    requiresArg: true,
    describe: 'The UUID of the Test Profile.'
  },
  device: {
    describe: 'Set the emulated device.'
  },
  connection: {
    describe: 'Set the emulated network connection speed.'
  },
  site: options.site,
  json: options.json,
  javascript: {
    type: 'boolean',
    describe: 'Turn JavaScript execution on or off',
    default: true
  },
  'cookie-jar': {
    describe:
      'Set cookies by specifying a path to a Netscape formatted cookie jar file.'
  }
}

const handler = main
export { command, describe, builder, handler }
