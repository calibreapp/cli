import { styleText } from 'node:util'
import { createSpinner } from 'nanospinner'
import columnify from 'columnify'
import { format as dateFormat } from 'date-fns'

import { list } from '../../api/site.js'
import { options } from '../../utils/cli.js'
import { humaniseError, formatJsonError } from '../../utils/api-error.js'

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
    if (args.json) return formatJsonError(e)
    spinner.stop()
    throw new Error(humaniseError(e))
  }

  spinner.stop()
  console.log(`${styleText('bold', String(index.length))} sites`)

  const rows = index.map(row => {
    const statuses = []
    if (row.monitoringStatus) {
      if (row.monitoringStatus.synthetic === null) statuses.push(styleText('green', 'synthetic'))
      if (row.monitoringStatus.crux === null) statuses.push(styleText('green', 'crux'))
      if (row.monitoringStatus.rum === null) statuses.push(styleText('green', 'rum'))
    }

    return {
      slug: styleText('gray', row.slug),
      name: row.name,
      monitoring: statuses.join(' ') || styleText('gray', '—'),
      created: dateFormat(new Date(row.createdAt), 'h:mma d-MMM-yyyy')
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

const command = 'list'
const describe = 'List all Sites you are tracking in Calibre.'
const handler = main
const builder = {
  json: options.json
}

export { command, describe, builder, handler }
