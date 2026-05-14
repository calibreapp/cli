import { styleText } from 'node:util'
import { createSpinner } from 'nanospinner'
import columnify from 'columnify'

import { list } from '../../api/location.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async args => {
  let index
  let spinner
  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    index = await list(args)
    if (args.json) return console.log(JSON.stringify(index, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }

  spinner.stop()
  console.log(`${styleText('bold', String(index.length))} test locations`)

  const rows = index.map(row => {
    return {
      identifier: styleText('cyan', row.tag),
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

const command = 'locations'
const describe = 'List all available test locations.'
const handler = main
const builder = {
  json: options.json
}

export { command, describe, handler, builder }
