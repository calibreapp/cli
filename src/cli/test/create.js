import { URL } from 'url'

import ora from 'ora'
import cookiefile from 'cookiefile'
import fs from 'fs'

import { create, waitForTest } from '../../api/test.js'
import formatTest from '../../views/test.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const { CookieMap } = cookiefile

const main = async function (args) {
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

  const isPrivate = args.private

  try {
    new URL(args.url)
  } catch (e) {
    return new Error('Please enter a valid URL')
  }

  try {
    const { uuid, formattedTestUrl } = await create({
      ...args,
      cookies,
      headers,
      isPrivate
    })

    if (!args.json && !args.waitForTest) {
      spinner.succeed(`Test scheduled: ${formattedTestUrl}`)
    } else {
      const test = await waitForTest(uuid)

      if (args.json) {
        console.log(JSON.stringify(test, null, 2))
      } else {
        if (test.status == 'completed') {
          spinner.succeed(`Test complete: ${formattedTestUrl}`)
          console.log(formatTest(test))
        } else {
          spinner.fail('Test complete')
        }
      }
    }
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'create <url> [options]'
const describe = 'Run a Single Page Test against any public URL.'
const builder = {
  device: {
    describe: 'Choose the emulated test device.'
  },
  location: {
    demandOption: true,
    requiresArg: true,
    describe: 'Choose the location for the test.'
  },
  connection: {
    describe: 'Choose the emulated network connection speed.'
  },
  adblocker: {
    describe: 'Turn adblocking on or off.',
    type: 'boolean',
    default: false
  },
  private: {
    describe: 'Make the results of a test private (only accessible by members of your Calibre organisation).',
    type: 'boolean',
    default: false
  },
  'cookie-jar': {
    describe: 'Set cookies by specifying a path to a Netscape formatted cookie jar file.'
  },
  headers: {
    describe:
      'Set HTTP headers by providing a path to a JSON file or a valid JSON key-value pairs.'
  },
  json: options.json,
  waitForTest: {
    describe: 'Wait for the test to complete before showing the results (default: test result link is shown immediately).',
    type: 'boolean',
    default: false
  }
}

const handler = main

export { command, describe, builder, handler }
