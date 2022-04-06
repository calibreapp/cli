import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'

import { list } from '../api/location'
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
  console.log(`${chalk.bold(index.length)} test locations`)

  const rows = index.map(row => {
    return {
      identifier: chalk.cyan(row.tag),
      flag: row.emoji,
      name: row.name,
      'ipv4 address': row.agents.map(a => a.ipv4).join(', ')
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

const command = 'location-list'
const describe = 'Print a list of test locations'
const handler = main
const builder = yargs => {
  yargs.option('json', {
    describe: 'Return the list of locations as JSON'
  })
}

export { command, describe, handler, builder }
