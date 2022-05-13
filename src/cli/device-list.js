import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'

import { list } from '../api/device.js'
import { humaniseError } from '../utils/api-error.js'
import { options } from '../utils/cli.js'

const main = async args => {
  let index
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
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
  console.log(`${chalk.bold(index.length)} test devices`)

  const rows = index.map(row => {
    return {
      identifier: chalk.cyan(row.name)
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

const command = 'device-list'
const describe = 'List all available test devices.'
const handler = main
const builder = {
  json: options.json
}

export { command, describe, handler, builder }
