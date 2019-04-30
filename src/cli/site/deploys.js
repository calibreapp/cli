const chalk = require('chalk')
const ora = require('ora')
const columnify = require('columnify')
const dateFormat = require('date-fns/format')

const { list } = require('../../api/deploy')
const { humaniseError } = require('../../utils/api-error')
const { options } = require('../../utils/cli')

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
  console.log(`${chalk.bold(index.deploys.length)} deploys`)

  const deploys = index.deploys.map(
    ({ uuid, revision, repository, username, createdAt }) => {
      return {
        uuid: chalk.grey(uuid),
        revision,
        repository,
        username,
        created: dateFormat(createdAt, 'h:mma D-MMM-YYYY')
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
      `To see deploys after ${lastDeploy.revision ||
        lastDeploy.id}, run: calibre site deploys --site=calibre --cursor=${
        index.pageInfo.endCursor
      }`
    )
  }
}

module.exports = {
  command: 'deploys [options]',
  describe: 'Print a list of deploys',
  handler: main,
  builder: yargs => {
    yargs.options({
      site: options.site,
      count: options.count,
      cursor: options.cursor,
      json: options.json
    })
  }
}
