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
const describe = 'Run a test against any public URL'
const builder = {
  device: {
    describe: 'Sets the emulated device that the test will be run on'
  },
  location: {
    demandOption: true,
    requiresArg: true,
    describe: 'The test will be run on a machine in this location'
  },
  connection: {
    describe: 'Sets the emulated connection speed for this test'
  },
  adblocker: {
    describe: 'Turn adblocking on/off',
    type: 'boolean',
    default: false
  },
  private: {
    describe: 'Private tests are only accessible by logged in team members',
    type: 'boolean',
    default: false
  },
  'cookie-jar': {
    describe: 'Uses a netscape formatted cookie jar file at this path'
  },
  headers: {
    describe:
      "Stringify'd JSON HTTP Header key/value pairs or path to JSON file of HTTP Header key/value pairs "
  },
  json: options.json,
  waitForTest: {
    describe: 'Wait for test to complete before returning',
    type: 'boolean',
    default: false
  }
}

const handler = main

export { command, describe, builder, handler }
