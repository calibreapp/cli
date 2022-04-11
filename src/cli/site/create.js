import ora from 'ora'
import { URL } from 'url'

import { create } from '../../api/site.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  const { name, location, url, team, schedule, interval } = args

  try {
    new URL(url)
  } catch (e) {
    return new Error('Please enter a valid URL')
  }

  const pages = [
    {
      url,
      name: 'Home'
    }
  ]

  const agentSettings = {
    location,
    scheduleInterval: schedule,
    scheduleAnchor: interval
  }

  const testProfiles = [
    {
      name: 'Chrome Desktop',
      connection: 'cable'
    },
    {
      name: 'MotoG4, 3G connection',
      device: 'MotorolaMotoG4',
      connection: 'regular3G'
    },
    {
      name: 'iPhone, 4G LTE',
      device: 'iPhone8',
      connection: 'LTE'
    }
  ]

  try {
    const site = await create({
      name,
      team,
      pages,
      agentSettings,
      testProfiles
    })

    if (!args.json) {
      spinner.succeed(`${site.name} added to Calibre`)
    } else {
      return console.log(JSON.stringify(site, null, 2))
    }
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'create <name> [options]'
const describe = 'Add a site for Calibre to monitor'
const builder = {
  url: {
    demandOption: true,
    requiresArg: true,
    describe: 'The homepage URL of the site'
  },
  location: {
    demandOption: true,
    requiresArg: true,
    describe: 'Calibre will monitor from this location'
  },
  team: {
    describe: 'The identifying slug of the team'
  },
  schedule: {
    describe:
      'Schedule for automated snapshots. One of: hourly, daily, every_x_hours',
    default: 'every_x_hours'
  },
  interval: {
    describe:
      "Automated snapshot interval. UTC hour of day for 'daily', hour interval for 'every_x_hours'",
    default: 6
  },
  json: options.json
}

const handler = main

export { command, describe, builder, handler }
