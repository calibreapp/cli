import { URL } from 'url'

import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'
import { format as dateFormat } from 'date-fns'

import { getList } from '../../api/test.js'
import { options } from '../../utils/cli.js'
import { humaniseError } from '../../utils/api-error.js'

const titleize = string => string.charAt(0).toUpperCase() + string.substring(1)

const main = async args => {
  let index
  let spinner
  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    index = await getList()
    if (args.json) return console.log(JSON.stringify(index, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }

  spinner.stop()
  console.log(`${chalk.bold('♤  calibre')} test runs\n`)

  const rows = index.map(row => {
    const url = new URL(row.url)
    const formattedTestUrl = `${url.hostname}${url.pathname}`

    return {
      uuid: chalk.grey(row.uuid),
      url: formattedTestUrl,
      device: row.device ? row.device.title : 'Desktop',
      connection: row.bandwidth ? row.bandwidth.title : 'Not Throttled',
      location: row.location.shortName,
      status: `${titleize(row.status)} ${dateFormat(
        new Date(row.updatedAt),
        'h:mma d-MMM-yyyy'
      )}`
    }
  })

  console.log(
    columnify(rows, {
      columnSplitter: ' | ',
      truncate: true,
      maxLineWidth: 'auto',
      config: {
        url: { maxWidth: 20 }
      }
    })
  )
}

const command = 'list'
const describe = 'List all previously run Single Page Tests (includes UUID, URL, device, connection, test location and status).'
const handler = main
const builder = {
  json: options.json
}

export { command, describe, builder, handler }
