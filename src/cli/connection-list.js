import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'

import { list } from '../api/connection'
import { humaniseError } from '../utils/api-error'

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
  console.log(`${chalk.bold(index.length)} emulated connection speeds`)

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

const command = 'connection-list'
const describe = 'Print a list of connection speeds'
const handler = main
const builder = yargs => {
  yargs.option('json', {
    describe: 'Return the list of devices as JSON'
  })
}

export { command, describe, handler, builder }
