import ora from 'ora'
import cookiefile from 'cookiefile'

import formatProfile from '../../views/test-profile.js'
import { create } from '../../api/test-profile.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const { CookieMap } = cookiefile

const main = async function (args) {
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

const command = 'create-test-profile <name> [options]'
const describe = 'Add a Test Profile to a Site.'
const builder = {
  site: options.site,
  device: {
    describe: 'Choose the emulated test device.',
    default: 'Desktop'
  },
  connection: {
    describe: 'Choose the emulated network connection speed.'
  },
  javascript: {
    type: 'boolean',
    describe: 'Turn JavaScript execution on or off.',
    default: true
  },
  adblocker: {
    type: 'boolean',
    describe: 'Turn adblocking on or off.',
    default: false
  },
  'cookie-jar': {
    describe:
      'Set cookies by specifying a path to a Netscape formatted cookie jar file.'
  },
  json: options.json
}
const handler = main

export { command, describe, builder, handler }
