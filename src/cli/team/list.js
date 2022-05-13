import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'

import { list } from '../../api/team.js'
import { options } from '../../utils/cli.js'
import { humaniseError } from '../../utils/api-error.js'

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
  console.log(`${chalk.bold(index.length)} sites`)

  const rows = index.map(row => {
    return {
      slug: chalk.grey(row.slug),
      name: row.name,
      description: row.description
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
const describe =
  'List Teams based on API Token access. For Admin Tokens, this will list all teams or as specified based on your settings. For Personal Access Tokens, this will list Teams that you have access to.'
const handler = main
const builder = {
  json: options.json
}

export { command, describe, builder, handler }
