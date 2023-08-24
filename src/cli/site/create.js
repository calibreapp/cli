import ora from 'ora'
import { URL } from 'url'

import { create } from '../../api/site.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre').start()
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
      device: 'Desktop',
      connection: 'cable'
    },
    {
      name: 'iPhone, 4G LTE',
      device: 'iPhone12',
      connection: 'LTE'
    },
    {
      name: 'Motorola Moto G Power, 3G connection',
      device: 'MotorolaMotoGPower',
      connection: 'regular3G'
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
const describe = 'Add a Site for Calibre to monitor.'
const builder = {
  url: {
    demandOption: true,
    requiresArg: true,
    describe: 'The URL of the Site.'
  },
  location: {
    demandOption: true,
    requiresArg: true,
    describe: 'Choose the location for the test.'
  },
  team: {
    describe: 'The identifying slug of the Team.'
  },
  schedule: {
    describe:
      'Set the schedule for automated Snapshots. Available options: hourly, daily, every_x_hours.',
    default: 'every_x_hours'
  },
  interval: {
    describe:
      'Set the Snapshot interval. Provide UTC hour (between 0 and 23) for daily Snapshots and numeric hour interval for every_x_hours option (between 1 and 168 hours).',
    default: 6
  },
  json: options.json
}

const handler = main

export { command, describe, builder, handler }
