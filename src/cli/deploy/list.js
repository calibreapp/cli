import { styleText } from 'node:util'
import { createSpinner } from 'nanospinner'
import columnify from 'columnify'
import { format as dateFormat } from 'date-fns'

import { list } from '../../api/deploy.js'
import { humaniseError, formatJsonError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'
import { fetchAll } from '../../utils/pagination.js'

const main = async args => {
  if (args.all && args.cursor) {
    throw new Error('Cannot use --all with --cursor.')
  }

  let spinner
  if (!args.json) {
    spinner = createSpinner('Connecting to Calibre').start()
  }

  try {
    if (args.all) {
      const deploys = await fetchAll(
        async a => {
          const res = await list(a)
          return { items: res.deploys, pageInfo: res.pageInfo }
        },
        args
      )

      if (!args.json) spinner.stop()
      if (args.json) return console.log(JSON.stringify(deploys, null, 2))

      console.log(`${styleText('bold', String(deploys.length))} deploys`)

      const rows = deploys.map(
        ({ uuid, revision, repository, username, createdAt }) => {
          return {
            uuid: styleText('gray', uuid),
            revision,
            repository,
            username,
            created: dateFormat(new Date(createdAt), 'h:mma d-MMM-yyyy')
          }
        }
      )

      console.log(
        columnify(rows, {
          columnSplitter: ' | ',
          truncate: true,
          maxLineWidth: 'auto'
        })
      )
    } else {
      const index = await list(args)
      if (args.json) return console.log(JSON.stringify(index, null, 2))

      spinner.stop()
      console.log(`${styleText('bold', String(index.deploys.length))} deploys`)

      const rows = index.deploys.map(
        ({ uuid, revision, repository, username, createdAt }) => {
          return {
            uuid: styleText('gray', uuid),
            revision,
            repository,
            username,
            created: dateFormat(new Date(createdAt), 'h:mma d-MMM-yyyy')
          }
        }
      )

      console.log(
        columnify(rows, {
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
          }, run: calibre deploy list --site=${args.site} --cursor=${
            index.pageInfo.endCursor
          }`
        )
      }
    }
  } catch (e) {
    if (args.json) return formatJsonError(e)
    if (spinner) spinner.stop()
    throw new Error(humaniseError(e))
  }
}

const command = 'list [options]'
const describe = 'List all deployments for a Site.'
const handler = main
const builder = {
  site: options.site,
  count: options.count,
  cursor: options.cursor,
  json: options.json,
  all: {
    describe: 'Fetch all deploys (overrides --count and --cursor).',
    type: 'boolean',
    default: false
  }
}

export { command, describe, handler, builder }
