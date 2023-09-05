import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'

import { list } from '../../api/test-profile.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async args => {
  let index
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
  }

  try {
    index = await list(args)
    if (args.json) return console.log(JSON.stringify(index, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }

  spinner.stop()

  console.log('\n')

  const rows = index.map(row => {
    return {
      uuid: chalk.cyan(row.uuid),
      name: row.name,
      device: row.device ? row.device.title : 'Desktop',
      connection: row.bandwidth ? row.bandwidth.title : 'Not Throttled',
      'javascript disabled': row.jsIsDisabled ? 'Yes' : 'No',
      'adblocker enabled': row.adBlockerIsEnabled ? 'Yes' : 'No',
      cookies: row.cookies.map(cookie => cookie.name).join(', ') || 'None'
    }
  })

  console.log(
    columnify(rows, {
      columnSplitter: ' | ',
      truncate: true,
      maxLineWidth: 'auto'
    })
  )
}

const command = 'test-profiles [options]'
const describe = 'List all Test Profiles for a Site.'
const handler = main
const builder = {
  site: options.site,
  json: options.json
}

export { command, describe, handler, builder }
