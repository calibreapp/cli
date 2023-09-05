import chalk from 'chalk'
import ora from 'ora'
import columnify from 'columnify'
import { format as dateFormat } from 'date-fns'

import { list } from '../../api/deploy.js'
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
  console.log(`${chalk.bold(index.deploys.length)} deploys`)

  const deploys = index.deploys.map(
    ({ uuid, revision, repository, username, createdAt }) => {
      return {
        uuid: chalk.grey(uuid),
        revision,
        repository,
        username,
        created: dateFormat(new Date(createdAt), 'h:mma d-MMM-yyyy')
      }
    }
  )

  console.log(
    columnify(deploys, {
      columnSplitter: ' | ',
      truncate: true,
      maxLineWidth: 'auto'
    })
  )

  if (index.pageInfo.hasNextPage) {
    const lastDeploy = index.deploys[index.deploys.length - 1]
    console.log(
      `To see deploys after ${
        lastDeploy.revision || lastDeploy.id
      }, run: calibre site deploys --site=calibre --cursor=${
        index.pageInfo.endCursor
      }`
    )
  }
}

const command = 'deploys [options]'
const describe = 'List all deployments for a Site.'
const handler = main
const builder = {
  site: options.site,
  count: options.count,
  cursor: options.cursor,
  json: options.json
}

export { command, describe, handler, builder }
